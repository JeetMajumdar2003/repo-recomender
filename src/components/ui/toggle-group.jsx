import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

import { cn } from "@/lib/utils"

const ToggleGroup = React.forwardRef(({ className, ...props }, ref) => (
    <ToggleGroupPrimitive.Root
        ref={ref}
        className={cn(
            "inline-flex items-center rounded-md bg-zinc-100 p-1 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-200 dark:ring-zinc-800",
            className
        )}
        {...props}
    />
))
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef(({ className, ...props }, ref) => (
    <ToggleGroupPrimitive.Item
        ref={ref}
        className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-4 py-1.5 text-sm font-medium text-zinc-600 transition-all hover:text-zinc-900 data-[state=on]:bg-white data-[state=on]:text-violet-600 data-[state=on]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 dark:text-zinc-300 dark:hover:text-white dark:data-[state=on]:bg-zinc-800 dark:data-[state=on]:text-violet-300",
            className
        )}
        {...props}
    />
))
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
