import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button'
import Logo from '@/assets/logo.svg'

export default function Header() {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                return savedTheme;
            }
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        }
        return 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-950/55 backdrop-blur supports-backdrop-filter:bg-white/55 dark:supports-backdrop-filter:bg-zinc-950/45">
            <div className="relative">
                <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-zinc-200/80 to-transparent dark:via-zinc-800/80" />

                <div className="container mx-auto max-w-6xl px-4">
                    <div className="flex items-center justify-between gap-4 py-4">
                        <button
                            type="button"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="group flex min-w-0 items-center gap-3 text-left"
                            aria-label="Scroll to top"
                        >
                            <div className="grid h-10 w-10 place-items-center rounded-lg transition">
                                <img src={Logo} alt="Repo Recommender Logo" />
                            </div>

                            <div className="min-w-0">
                                <h1 className="truncate text-2xl tracking-tight text-zinc-900 dark:text-white sm:text-2xl font-bold">
                                    Repo Recommender
                                </h1>
                            </div>
                        </button>

                        <div className="flex items-center gap-2">
                            <Button
                                onClick={toggleTheme}
                                variant="outline"
                                size="icon"
                                className="rounded-md bg-white/60 shadow-sm hover:bg-white dark:bg-zinc-950/30 dark:hover:bg-zinc-950/50"
                                aria-label="Toggle theme"
                            >
                                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
