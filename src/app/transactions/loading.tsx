import { Skeleton, TransactionSkeleton } from "@/components/ui/LoadingSkeleton";

export default function TransactionsLoading() {
    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <Skeleton className="h-8 w-40 mb-2" />
                <Skeleton className="h-4 w-56" />
            </div>

            <div className="bg-card border border-border rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-border">
                    <Skeleton className="h-5 w-32" />
                </div>
                <div className="divide-y divide-border">
                    <TransactionSkeleton />
                    <TransactionSkeleton />
                    <TransactionSkeleton />
                    <TransactionSkeleton />
                    <TransactionSkeleton />
                </div>
            </div>
        </div>
    );
}
