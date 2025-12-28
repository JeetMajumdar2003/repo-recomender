import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input'

export default function SearchBar({ value, onChange }) {
    return (
        <div className="relative w-full max-w-xl mx-auto mb-8 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-400 group-focus-within:text-violet-500 transition-colors" />
            </div>
            <Input
                type="text"
                className="pl-11 pr-4 shadow-sm hover:shadow-md transition-all text-base font-medium"
                placeholder="Search repositories..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-label="Search repositories"
            />
        </div>
    );
}
