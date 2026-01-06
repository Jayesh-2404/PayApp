import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { BiArrowBack, BiDownArrowAlt, BiUpArrowAlt, BiUser } from "react-icons/bi";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function TransactionsPage() {
    const session = await getServerSession();

    if (!session?.user?.email) {
        redirect("/auth/login");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            sentTransactions: {
                include: { receiver: true },
                orderBy: { createdAt: 'desc' },
            },
            receivedTransactions: {
                include: { sender: true },
                orderBy: { createdAt: 'desc' },
            },
        },
    });

    if (!user) {
        redirect("/auth/login");
    }

    const allTransactions = [
        ...user.sentTransactions.map(tx => ({ ...tx, type: 'sent' as const })),
        ...user.receivedTransactions.map(tx => ({ ...tx, type: 'received' as const })),
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const totalSent = user.sentTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    const totalReceived = user.receivedTransactions.reduce((sum, tx) => sum + tx.amount, 0);

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/dashboard" className="p-2 hover:bg-accent rounded-xl transition-colors">
                    <BiArrowBack className="w-6 h-6" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold">Transaction History</h1>
                    <p className="text-muted-foreground text-sm">All your transactions</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-card border border-border rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center">
                            <BiUpArrowAlt className="w-5 h-5 text-destructive" />
                        </div>
                        <span className="text-sm text-muted-foreground">Total Sent</span>
                    </div>
                    <p className="text-2xl font-bold text-destructive">₹{totalSent.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <BiDownArrowAlt className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">Total Received</span>
                    </div>
                    <p className="text-2xl font-bold text-primary">₹{totalReceived.toLocaleString('en-IN')}</p>
                </div>
            </div>

            {/* Transaction List */}
            <div className="bg-card border border-border rounded-3xl overflow-hidden">
                <div className="p-5 border-b border-border">
                    <p className="font-semibold">{allTransactions.length} Transactions</p>
                </div>

                {allTransactions.length === 0 ? (
                    <div className="p-12 text-center text-muted-foreground">
                        No transactions yet
                    </div>
                ) : (
                    <div className="divide-y divide-border">
                        {allTransactions.map((tx) => (
                            <div key={tx.id} className="p-5 flex items-center justify-between hover:bg-accent/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.type === 'sent'
                                            ? 'bg-destructive/10'
                                            : 'bg-primary/10'
                                        }`}>
                                        <BiUser className={`w-5 h-5 ${tx.type === 'sent' ? 'text-destructive' : 'text-primary'}`} />
                                    </div>
                                    <div>
                                        <p className="font-semibold">
                                            {tx.type === 'sent' ? tx.receiver.name : tx.sender.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {tx.type === 'sent' ? `To: ${tx.receiver.payId}` : `From: ${tx.sender.payId}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold text-lg ${tx.type === 'sent' ? 'text-destructive' : 'text-primary'
                                        }`}>
                                        {tx.type === 'sent' ? '-' : '+'}₹{tx.amount.toLocaleString('en-IN')}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(tx.createdAt).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short'
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
