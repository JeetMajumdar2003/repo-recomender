import React from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    Calendar,
    ExternalLink,
    GitFork,
    Eye,
    Star,
    Scale,
    CircleDot,
    AlertCircle,
} from "lucide-react"

function formatDate(dateString) {
    if (!dateString) return "—"
    const d = new Date(dateString)
    if (Number.isNaN(d.getTime())) return "—"
    return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })
}

function formatNumber(n) {
    if (typeof n !== "number") return "—"
    return n.toLocaleString()
}

export default function RepoModal({ repo, open, onOpenChange }) {
    const topics = Array.isArray(repo?.topics) ? repo.topics : []

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                {!repo ? (
                    <div className="py-6 text-center text-zinc-500 dark:text-zinc-400">
                        No repository selected.
                    </div>
                ) : (
                    <div className="space-y-4">
                        <DialogHeader>
                            <div className="flex items-start gap-3">
                                {repo.owner?.avatar_url ? (
                                    <img
                                        src={repo.owner.avatar_url}
                                        alt={`${repo.owner?.login ?? "Owner"} avatar`}
                                        className="h-10 w-10 rounded-md border border-zinc-200 dark:border-zinc-800"
                                        loading="lazy"
                                    />
                                ) : null}

                                <div className="min-w-0">
                                    <DialogTitle className="truncate text-zinc-900 dark:text-zinc-50">
                                        {repo.full_name ?? repo.name}
                                    </DialogTitle>
                                    <DialogDescription className="mt-1">
                                        {repo.description || "No description provided."}
                                    </DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>

                        <div className="flex flex-wrap items-center gap-2">
                            {repo.language ? (
                                <Badge variant="secondary" className="gap-1">
                                    <CircleDot className="h-3.5 w-3.5" />
                                    {repo.language}
                                </Badge>
                            ) : null}

                            {repo.license?.spdx_id ? (
                                <Badge variant="outline" className="gap-1">
                                    <Scale className="h-3.5 w-3.5" />
                                    {repo.license.spdx_id}
                                </Badge>
                            ) : null}

                            {typeof repo.open_issues_count === "number" ? (
                                <Badge variant="outline" className="gap-1">
                                    <AlertCircle className="h-3.5 w-3.5" />
                                    {formatNumber(repo.open_issues_count)} issues
                                </Badge>
                            ) : null}
                        </div>

                        {topics.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {topics.slice(0, 12).map((t) => (
                                    <Badge key={t} variant="default">
                                        {t}
                                    </Badge>
                                ))}
                            </div>
                        ) : null}

                        <Separator />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                                <Star className="h-4 w-4 text-zinc-500" />
                                <span className="font-medium">Stars</span>
                                <span className="ml-auto tabular-nums">{formatNumber(repo.stargazers_count)}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                                <GitFork className="h-4 w-4 text-zinc-500" />
                                <span className="font-medium">Forks</span>
                                <span className="ml-auto tabular-nums">{formatNumber(repo.forks_count)}</span>
                            </div>

                            {typeof repo.watchers_count === "number" ? (
                                <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                                    <Eye className="h-4 w-4 text-zinc-500" />
                                    <span className="font-medium">Watchers</span>
                                    <span className="ml-auto tabular-nums">{formatNumber(repo.watchers_count)}</span>
                                </div>
                            ) : null}

                            <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                                <Calendar className="h-4 w-4 text-zinc-500" />
                                <span className="font-medium">Updated</span>
                                <span className="ml-auto tabular-nums">{formatDate(repo.updated_at)}</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 sm:justify-end pt-2">
                            <Button asChild variant="outline">
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View on GitHub
                                    <ExternalLink className="ml-1 h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
