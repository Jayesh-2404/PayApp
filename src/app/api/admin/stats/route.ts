import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const session = await getServerSession();

    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // In a real app, verify isAdmin = true here. 
    // For now, checking the flag from DB
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user || !user.isAdmin) {
        return NextResponse.json({ error: "Forbidden: Admin only" }, { status: 403 });
    }

    const totalUsers = await prisma.user.count();
    const totalTransactions = await prisma.transaction.count();
    const recentTransactions = await prisma.transaction.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
            sender: true,
            receiver: true
        }
    });

    // Calculate total volume
    const volume = await prisma.transaction.aggregate({
        _sum: {
            amount: true
        }
    });

    return NextResponse.json({
        totalUsers,
        totalTransactions,
        totalVolume: volume._sum.amount || 0,
        recentTransactions
    });
}
