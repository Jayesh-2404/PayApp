import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import Link from "next/link";
import { BiSend, BiHistory, BiUser } from "react-icons/bi";
import { CopyPayIdButton } from "@/components/dashboard/CopyPayIdButton";

export default async function DashboardPage() {
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
        take: 5,
      },
      receivedTransactions: {
        include: { sender: true },
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
    },
  });

  if (!user) {
    redirect("/auth/login");
  }

  const allTransactions = [
    ...user.sentTransactions.map(tx => ({ ...tx, type: 'sent' as const })),
    ...user.receivedTransactions.map(tx => ({ ...tx, type: 'received' as const })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground text-sm">Here's your account overview</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* PayID Card */}
        <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-8 relative overflow-hidden">
          {/* Accent Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Your PayID</p>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold tracking-wider text-primary">{user.payId}</span>
                  <CopyPayIdButton payId={user.payId} />
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">₹</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <BiUser className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Account Holder</p>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-primary text-primary-foreground rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <p className="text-primary-foreground/70 text-sm mb-2">Available Balance</p>
            <p className="text-4xl font-bold">
              ₹{user.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <Link
            href="/transfer"
            className="mt-6 flex items-center justify-center gap-2 bg-primary-foreground text-primary py-4 rounded-2xl font-semibold hover:opacity-90 transition-opacity"
          >
            <BiSend className="w-5 h-5" />
            Send Money
          </Link>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-card border border-border rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <p className="text-sm text-muted-foreground">Your last 5 transactions</p>
          </div>
          <Link href="/transactions" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
            View All <BiHistory className="w-4 h-4" />
          </Link>
        </div>

        {allTransactions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <BiHistory className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No transactions yet</p>
            <p className="text-sm text-muted-foreground mt-1">Send money to get started!</p>
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
                      {new Date(tx.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${tx.type === 'sent' ? 'text-destructive' : 'text-primary'
                    }`}>
                    {tx.type === 'sent' ? '-' : '+'}₹{tx.amount.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">{tx.type}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}