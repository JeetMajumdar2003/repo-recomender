import React from 'react';
import { Filter, ArrowUpDown, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const languages = [
    { value: 'all', label: 'All Languages' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'java', label: 'Java' },
    { value: 'c++', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'c#', label: 'C#' },
];

const sortOptions = [
    { value: 'stars', label: 'Most Stars' },
    { value: 'forks', label: 'Most Forks' },
    { value: 'trending', label: 'Trending' },
    { value: 'updated', label: 'Recently Updated' },
];

const trendingRanges = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
];

export default function FilterBar({ language, setLanguage, sort, setSort, trendingRange, setTrendingRange }) {
    const selectedLanguage = languages.find(l => l.value === language) ?? languages[0];
    const selectedRange = trendingRanges.find(r => r.value === trendingRange) ?? trendingRanges[1];

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
            {/* Language Filter */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full sm:w-56 justify-between rounded-md"
                            aria-label="Filter by language"
                        >
                            <span className="inline-flex items-center gap-2 min-w-0">
                                <Filter className="h-4 w-4 text-zinc-500" />
                                <span className="truncate">{selectedLanguage.label}</span>
                            </span>
                            <ChevronDown className="h-4 w-4 text-zinc-500" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuLabel>Language</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {languages.map((lang) => (
                            <DropdownMenuItem
                                key={lang.value}
                                onSelect={() => setLanguage(lang.value)}
                            >
                                {lang.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {sort === 'trending' && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full sm:w-40 justify-between rounded-md"
                                aria-label="Trending timeframe"
                            >
                                <span className="inline-flex items-center gap-2 min-w-0">
                                    <ArrowUpDown className="h-4 w-4 text-zinc-500" />
                                    <span className="truncate">{selectedRange.label}</span>
                                </span>
                                <ChevronDown className="h-4 w-4 text-zinc-500" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-40">
                            <DropdownMenuLabel>Trending range</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {trendingRanges.map((r) => (
                                <DropdownMenuItem
                                    key={r.value}
                                    onSelect={() => setTrendingRange?.(r.value)}
                                >
                                    {r.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>

            {/* Sort Options */}
            <ToggleGroup
                type="single"
                value={sort}
                onValueChange={(v) => {
                    if (v) setSort(v)
                }}
                aria-label="Sort repositories"
            >
                {sortOptions.map((option) => (
                    <ToggleGroupItem key={option.value} value={option.value} aria-label={option.label}>
                        {option.label}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
    );
}
