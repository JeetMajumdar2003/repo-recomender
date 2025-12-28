const API_URL = 'https://api.github.com/search/repositories'
const REST_API = 'https://api.github.com'

const TOKEN = import.meta?.env?.VITE_GITHUB_TOKEN

const DEFAULT_QUERY = 'stars:>1000'

function buildQuery({ search, language, topic, preset }) {
  const parts = []
  if (search?.trim()) parts.push(search.trim())
  if (language && language !== 'all') parts.push(`language:${language}`)
  if (topic?.trim()) parts.push(`topic:${topic.trim()}`)
  if (preset?.query) parts.push(preset.query)
  if (preset?.topic) parts.push(`topic:${preset.topic}`)
  return parts.length ? parts.join(' ') : DEFAULT_QUERY
}

function buildHeaders(accept = 'application/vnd.github+json') {
  const headers = { Accept: accept }
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`
  return headers
}

function getSinceISODate({ trendingSince, trendingRange }) {
  if (trendingSince) return trendingSince
  const days = trendingRange === 'day' ? 1 : trendingRange === 'month' ? 30 : 7
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
}

const starsGainedCache = new Map()

async function fetchStarsGainedSince(fullName, sinceISODate, signal) {
  const cacheKey = `${fullName}::${sinceISODate}`
  if (starsGainedCache.has(cacheKey)) return starsGainedCache.get(cacheKey)

  // If we don't have a token, it's very easy to hit rate limits with per-repo calls.
  // We return 0 and let the search ranking act as a fallback.
  if (!TOKEN) {
    starsGainedCache.set(cacheKey, 0)
    return 0
  }

  const sinceMs = new Date(`${sinceISODate}T00:00:00Z`).getTime()
  if (Number.isNaN(sinceMs)) {
    starsGainedCache.set(cacheKey, 0)
    return 0
  }

  let gained = 0
  const perPage = 100
  const maxPages = 5

  for (let page = 1; page <= maxPages; page++) {
    const url = `${REST_API}/repos/${fullName}/stargazers?per_page=${perPage}&page=${page}`
    const res = await fetch(url, {
      headers: buildHeaders('application/vnd.github.star+json'),
      signal,
    })

    if (!res.ok) {
      // Fail soft; trending should still work via search ordering
      break
    }

    const data = await res.json().catch(() => [])
    if (!Array.isArray(data) || data.length === 0) break

    for (const entry of data) {
      const starredAt = entry?.starred_at
      const ts = starredAt ? Date.parse(starredAt) : NaN
      if (!Number.isNaN(ts) && ts >= sinceMs) gained += 1
    }

    // Heuristic: if the oldest item in this page is older than the window, we can stop early.
    const lastStarredAt = data[data.length - 1]?.starred_at
    const lastTs = lastStarredAt ? Date.parse(lastStarredAt) : NaN
    if (!Number.isNaN(lastTs) && lastTs < sinceMs) break

    if (data.length < perPage) break
  }

  starsGainedCache.set(cacheKey, gained)
  return gained
}

export async function fetchRepositories(
  { search, language, topic, sort = 'stars', order = 'desc', page = 1, perPage = 20, preset },
  signal,
) {
  const query = buildQuery({ search, language, topic, preset })
  const params = new URLSearchParams({
    q: query,
    sort,
    order,
    per_page: perPage,
    page,
  })

  const response = await fetch(`${API_URL}?${params.toString()}`, {
    headers: buildHeaders(),
    signal,
  })

  if (!response.ok) {
    if (response.status === 403) {
      const reset = response.headers.get('x-ratelimit-reset')
      const resetDate = reset ? new Date(parseInt(reset, 10) * 1000) : null
      const when = resetDate ? ` around ${resetDate.toLocaleTimeString()}` : ''
      throw new Error(`GitHub API rate limit reached. Please try again${when}.`)
    }
    const body = await response.json().catch(() => ({}))
    throw new Error(body.message || 'Failed to fetch repositories.')
  }

  const data = await response.json()
  return {
    items: data.items ?? [],
    totalCount: data.total_count ?? 0,
  }
}

// "Trending" isn't a first-class GitHub Search sort.
// Here we approximate trending by:
//   1) searching for repos pushed within the time window, and
//   2) when a token is available, sorting by stars gained within that window.
export async function fetchTrendingRepositories(
  { search, language, topic, page = 1, perPage = 20, trendingRange = 'week', trendingSince },
  signal,
) {
  const sinceISODate = getSinceISODate({ trendingSince, trendingRange })

  // Use pushed qualifier to focus on recently active repos.
  const preset = { query: `pushed:>${sinceISODate}` }

  const data = await fetchRepositories(
    {
      search,
      language,
      topic,
      sort: 'stars',
      order: 'desc',
      page,
      perPage,
      preset,
    },
    signal,
  )

  // Enrich with stars gained (best-effort).
  const enriched = await Promise.all(
    data.items.map(async (repo) => {
      const gained = await fetchStarsGainedSince(repo.full_name, sinceISODate, signal)
      return { ...repo, stars_gained: gained, trending_since: sinceISODate }
    })
  )

  enriched.sort(
    (a, b) =>
      (b.stars_gained ?? 0) - (a.stars_gained ?? 0) ||
      (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0)
  )

  return { ...data, items: enriched }
}
