import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const session = await getServerSession();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            sentTransactions: true,
            receivedTransactions: true,
        },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const totalSent = user.sentTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    const totalReceived = user.receivedTransactions.reduce((sum, tx) => sum + tx.amount, 0);

    // Generate monthly data (last 6 months)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const monthlyData = [];

    for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthName = months[date.getMonth()];

        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const sent = user.sentTransactions
            .filter(tx => {
                const txDate = new Date(tx.createdAt);
                return txDate >= monthStart && txDate <= monthEnd;
            })
            .reduce((sum, tx) => sum + tx.amount, 0);

        const received = user.receivedTransactions
            .filter(tx => {
                const txDate = new Date(tx.createdAt);
                return txDate >= monthStart && txDate <= monthEnd;
            })
            .reduce((sum, tx) => sum + tx.amount, 0);

        monthlyData.push({ month: monthName, sent, received });
    }

    return NextResponse.json({
        balance: user.amount,
        totalSent,
        totalReceived,
        monthlyData,
    });
}
