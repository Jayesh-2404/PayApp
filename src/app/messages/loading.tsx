import { Skeleton } from "@/components/ui/LoadingSkeleton";

export default function MessagesLoading() {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <Skeleton className="h-8 w-32 mb-2" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-10 w-28 rounded-xl" />
            </div>

            <div className="bg-card border border-border rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-3" style={{ height: '550px' }}>
                {/* Friend List Skeleton */}
                <div className="border-r border-border">
                    <div className="p-4 border-b border-border bg-muted/50">
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="divide-y divide-border">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="p-4 flex items-center gap-3">
                                <Skeleton className="w-10 h-10 rounded-full" />
                                <div className="flex-1">
                                    <Skeleton className="h-4 w-24 mb-1" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area Skeleton */}
                <div className="md:col-span-2 flex items-center justify-center">
                    <div className="text-center">
                        <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
                        <Skeleton className="h-5 w-40 mx-auto mb-2" />
                        <Skeleton className="h-4 w-52 mx-auto" />
                    </div>
                </div>
            </div>
        </div>
    );
}
