import React from 'react';
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonCard() {
    return (
        <Card className="h-full border-zinc-100 dark:border-zinc-700/50">
            <CardContent className="p-5 flex flex-col h-full">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4 grow" />

                <div className="pt-4 mt-auto border-t border-zinc-100 dark:border-zinc-700/50 flex items-center gap-4">
                    <Skeleton className="h-5 w-20 rounded-md" />
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="ml-auto h-4 w-16" />
                </div>
            </CardContent>
        </Card>
    );
}
