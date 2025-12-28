import React from 'react';
import { Star, GitFork, MoveDiagonal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card'

export default function RepoCard({ repo, onSelect }) {
    return (
        <button
            type="button"
            onClick={() => onSelect?.(repo)}
            className="group block h-full w-full text-left rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
            aria-label={`View details for ${repo.full_name ?? repo.name}`}
        >
            <Card className="h-full border-zinc-100 dark:border-zinc-700/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-5 flex flex-col h-full">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-1">
                        {repo.name}
                    </h3>
                    <MoveDiagonal className="h-4 w-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 line-clamp-2 grow">
                    {repo.description || 'No description available for this repository.'}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-700/50">
                    {repo.language && (
                        <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-700/50 font-medium text-zinc-700 dark:text-zinc-300">
                            <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                            {repo.language}
                        </span>
                    )}

                    <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" />
                        <span>{repo.stargazers_count.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5" />
                        <span>{repo.forks_count.toLocaleString()}</span>
                    </div>
                </div>
                </CardContent>
            </Card>
        </button>
    );
}
