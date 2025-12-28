import React from 'react';
import RepoCard from './RepoCard';
import SkeletonCard from './SkeletonCard';
import { PackageOpen } from 'lucide-react';

export default function RepoList({ repos, loading, error, onSelectRepo }) {
    if (loading && (!repos || repos.length === 0)) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/20">
                <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">Something went wrong</h3>
                <p className="text-red-600 dark:text-red-400 max-w-md mx-auto">{error}</p>
            </div>
        );
    }

    if (!repos?.length) {
        return (
            <div className="text-center py-24 px-4">
                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <PackageOpen className="h-8 w-8 text-zinc-400" />
                </div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1">No repositories found</h3>
                <p className="text-zinc-500 dark:text-zinc-400">Try adjusting your filters or search terms</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} onSelect={onSelectRepo} />
            ))}
        </div>
    );
}
