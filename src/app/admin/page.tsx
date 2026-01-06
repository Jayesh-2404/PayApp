import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { StatCard } from "@/components/dashboard/StatCard";

const prisma = new PrismaClient();

export default async function AdminPage() {
    const session = await getServerSession();
    if (!session?.user?.email) redirect("/");

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user || !user.isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
                <h1 className="text-4xl font-bold text-destructive mb-4">Access Denied</h1>
                <p className="text-lg text-muted-foreground">You do not have administrative privileges.</p>
            </div>
        );
    }

    // Fetch stats directly server-side
    const totalUsers = await prisma.user.count();
    const totalTransactions = await prisma.transaction.count();
    const volume = await prisma.transaction.aggregate({ _sum: { amount: true } });

    const transactions = await prisma.transaction.findMany({
        take: 20,
        orderBy: { createdAt: 'desc' },
        include: { sender: true, receiver: true }
    });

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Users" value={totalUsers} />
                <StatCard title="Total Transactions" value={totalTransactions} />
                <StatCard title="Total Volume" value={`$${(volume._sum.amount || 0).toLocaleString()}`} />
            </div>

            <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                    <h2 className="text-xl font-semibold">Recent Transactions (Global)</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted text-muted-foreground">
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">Sender</th>
                                <th className="p-4">Receiver</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-accent/50 transition-colors">
                                    <td className="p-4 font-mono text-xs">{tx.transactionId}</td>
                                    <td className="p-4">{tx.sender.name}</td>
                                    <td className="p-4">{tx.receiver.name}</td>
                                    <td className="p-4 font-bold text-green-500">${tx.amount}</td>
                                    <td className="p-4 text-muted-foreground">{new Date(tx.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
