import { useMemo, useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import RepoList from './components/RepoList'
import RepoModal from './components/RepoModal'
import Footer from './components/Footer'
import useDebounce from './hooks/useDebounce'
import { fetchRepositories, fetchTrendingRepositories } from './api/github'
import { Loader2 } from 'lucide-react'
import { Button } from './components/ui/button'

function App() {
  const [search, setSearch] = useState('')
  const [language, setLanguage] = useState('all')
  const [sort, setSort] = useState('stars')
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [selectedRepo, setSelectedRepo] = useState(null)
  const [trendingRange, setTrendingRange] = useState('week')

  const debouncedSearch = useDebounce(search, 500)

  const trendingSince = useMemo(() => {
    if (sort !== 'trending') return null
    const days = trendingRange === 'day' ? 1 : trendingRange === 'month' ? 30 : 7
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    // YYYY-MM-DD for GitHub search qualifiers
    return since.toISOString().split('T')[0]
  }, [sort, trendingRange])

  // Ref for the abort controller to handle cancellations
  const abortControllerRef = useRef(null)

  // Effect handles initial load and filter changes
  useEffect(() => {
    const fetchInitialData = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      abortControllerRef.current = new AbortController()

      setLoading(true)
      setError(null)

      try {
        const fetchFn = sort === 'trending' ? fetchTrendingRepositories : fetchRepositories

        const data = await fetchFn(
          {
            search: debouncedSearch,
            language,
            sort,
            page: 1,
            trendingRange,
            trendingSince,
          },
          abortControllerRef.current.signal
        )

        setRepos(data.items)
        setPage(1)
        setHasMore(data.items.length === 20)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [debouncedSearch, language, sort, trendingRange, trendingSince])

  // Function for Load More
  const handleLoadMore = async () => {
    setLoading(true)
    const nextPage = page + 1

    try {
      const fetchFn = sort === 'trending' ? fetchTrendingRepositories : fetchRepositories

      const data = await fetchFn(
        {
          search: debouncedSearch,
          language,
          sort,
          page: nextPage,
          trendingRange,
          trendingSince,
        }
      )

      setRepos(prev => [...prev, ...data.items])
      setPage(nextPage)
      setHasMore(data.items.length === 20)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark transition-colors duration-200 flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-6xl grow">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Discover Top Repositories
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Explore the best of GitHub. Search by name, filter by language, or browse trending projects.
          </p>
        </div>

        <SearchBar value={search} onChange={setSearch} />

        <FilterBar
          language={language}
          setLanguage={setLanguage}
          sort={sort}
          setSort={setSort}
          trendingRange={trendingRange}
          setTrendingRange={setTrendingRange}
        />

        <RepoList
          repos={repos}
          loading={loading && !repos.length}
          error={error}
          onSelectRepo={setSelectedRepo}
        />

        <RepoModal
          repo={selectedRepo}
          open={!!selectedRepo}
          onOpenChange={(nextOpen) => {
            if (!nextOpen) setSelectedRepo(null)
          }}
        />

        {repos.length > 0 && hasMore && (
          <div className="mt-12 text-center pb-8">
            <Button
              onClick={handleLoadMore}
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                'Load More Repositories'
              )}
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
