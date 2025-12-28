import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
                secondary:
                    "border-transparent bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-200",
                outline:
                    "border-zinc-200 text-zinc-900 dark:border-zinc-700 dark:text-zinc-100",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

function Badge({ className, variant, ...props }) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge }
