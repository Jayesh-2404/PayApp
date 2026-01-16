import { Skeleton, CardSkeleton } from "@/components/ui/LoadingSkeleton";

export default function AnalysisLoading() {
    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <Skeleton className="h-8 w-56 mb-2" />
                <Skeleton className="h-4 w-72" />
            </div>

            {/* Filter */}
            <div className="flex gap-3">
                <Skeleton className="h-10 w-28 rounded-xl" />
                <Skeleton className="h-10 w-28 rounded-xl" />
                <Skeleton className="h-10 w-28 rounded-xl" />
            </div>

            {/* Chart Card */}
            <div className="bg-card border border-border rounded-3xl p-8">
                <Skeleton className="h-6 w-40 mb-4" />
                <Skeleton className="h-64 w-full rounded-xl" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
        </div>
    );
}
