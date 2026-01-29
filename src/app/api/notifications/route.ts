import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";

// GET notifications 
export async function GET() {
    const session = await getServerSession();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            receivedTransactions: {
                include: { sender: true },
                orderBy: { createdAt: 'desc' },
                take: 20,
            },
        },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Transform transactions to notifications
    const notifications = user.receivedTransactions.map(tx => ({
        id: tx.id,
        message: `${tx.sender.name} sent you ₹${tx.amount}`,
        amount: tx.amount,
        sender: tx.sender.name,
        createdAt: tx.createdAt.toISOString(),
        read: tx.read,
    }));

    return NextResponse.json(notifications);
}

// PATCH - mark all as read
export async function PATCH() {
    const session = await getServerSession();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true }
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Mark all unread received transactions as read
    await prisma.transaction.updateMany({
        where: {
            receiverId: user.id,
            read: false
        },
        data: {
            read: true
        }
    });

    return NextResponse.json({ success: true });
}
