"use client";

export function Skeleton({ className = "" }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-muted rounded-xl ${className}`} />
    );
}

export function CardSkeleton() {
    return (
        <div className="bg-card border border-border rounded-3xl p-8">
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-8 w-48 mb-6" />
            <Skeleton className="h-12 w-full" />
        </div>
    );
}

export function TransactionSkeleton() {
    return (
        <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-20" />
                </div>
            </div>
            <div className="text-right">
                <Skeleton className="h-5 w-16 mb-1" />
                <Skeleton className="h-3 w-12" />
            </div>
        </div>
    );
}

export function DashboardSkeleton() {
    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Welcome */}
            <div>
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-48" />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* PayID Card */}
                <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <Skeleton className="h-3 w-20 mb-2" />
                            <Skeleton className="h-10 w-32" />
                        </div>
                        <Skeleton className="w-12 h-12 rounded-xl" />
                    </div>
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-12 h-12 rounded-full" />
                        <div>
                            <Skeleton className="h-3 w-24 mb-2" />
                            <Skeleton className="h-5 w-36" />
                        </div>
                    </div>
                </div>

                {/* Balance Card */}
                <div className="bg-primary/20 rounded-3xl p-6">
                    <Skeleton className="h-3 w-28 mb-2" />
                    <Skeleton className="h-10 w-36 mb-6" />
                    <Skeleton className="h-14 w-full rounded-2xl" />
                </div>
            </div>

            {/* Transactions */}
            <div className="bg-card border border-border rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-border flex justify-between items-center">
                    <div>
                        <Skeleton className="h-5 w-40 mb-2" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                </div>
                <div className="divide-y divide-border">
                    <TransactionSkeleton />
                    <TransactionSkeleton />
                    <TransactionSkeleton />
                </div>
            </div>
        </div>
    );
}

export function PageSkeleton({ title = "Loading..." }: { title?: string }) {
    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
            </div>
            <CardSkeleton />
        </div>
    );
}
