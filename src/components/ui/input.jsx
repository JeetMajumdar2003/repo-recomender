import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => (
    <input
        ref={ref}
        type={type}
        className={cn(
            "flex h-11 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-base text-zinc-900 shadow-sm transition-shadow file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:border-violet-500 hover:border-violet-400 focus-visible:shadow-[0_0_0_4px_rgba(139,92,246,0.18)] disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus-visible:border-violet-400 dark:hover:border-violet-500/70 dark:focus-visible:shadow-[0_0_0_4px_rgba(139,92,246,0.22)]",
            className
        )}
        {...props}
    />
))
Input.displayName = "Input"

export { Input }
