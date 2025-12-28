import React from 'react'
import { Github, Twitter, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Footer() {
    return (
        <footer className="py-8 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-lg transition">
                            <img src="./src/assets/logo.svg" alt="Repo Recommender Logo" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Repo Recommender</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">Discover the best open-source repositories</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <nav className="flex items-center gap-2">
                            <Button asChild variant="ghost" size="icon" className="rounded-md">
                                <a href="https://github.com/JeetMajumdar2003" target="_blank" rel="noopener noreferrer" aria-label="View project on GitHub">
                                    <Github className="h-4 w-4" />
                                </a>
                            </Button>

                            <Button asChild variant="ghost" size="icon" className="rounded-md">
                                <a href="https://x.com/@jeet_exist" target="_blank" rel="noopener noreferrer" aria-label="Visit Twitter profile">
                                    <Twitter className="h-4 w-4" />
                                </a>
                            </Button>

                            <Button asChild variant="ghost" size="icon" className="rounded-md">
                                <a href="https://linkedin.com/in/jeet-majumdar648" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn profile">
                                    <Linkedin className="h-4 w-4" />
                                </a>
                            </Button>
                        </nav>

                        <div className="hidden md:block h-5 w-px bg-zinc-200 dark:bg-zinc-800 mx-2" />

                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            <div>Built with ♥ by @JeetMajumdar2003</div>
                            <div className="mt-1">© {new Date().getFullYear()} Repo Recommender</div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
