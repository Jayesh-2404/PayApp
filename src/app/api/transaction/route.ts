import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { receiverId, amount } = await req.json();

        if (!receiverId || !amount || amount <= 0) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }

        // Transaction Logic
        // 1. Get Sender
        const sender = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!sender) return NextResponse.json({ error: "Sender not found" }, { status: 404 });

        // 2. Check Balance
        if (sender.amount < amount) {
            return NextResponse.json({ error: "Insufficient funds" }, { status: 400 });
        }

        // 3. Get Receiver
        const receiver = await prisma.user.findUnique({ where: { id: receiverId } });
        if (!receiver) return NextResponse.json({ error: "Receiver not found" }, { status: 404 });

        // 4. Perform Transaction (Atomic)
        const transaction = await prisma.$transaction([
            // Deduct from sender
            prisma.user.update({
                where: { id: sender.id },
                data: { amount: { decrement: amount } }
            }),
            // Add to receiver
            prisma.user.update({
                where: { id: receiver.id },
                data: { amount: { increment: amount } }
            }),
            // Create Record
            prisma.transaction.create({
                data: {
                    senderId: sender.id,
                    receiverId: receiver.id,
                    amount: amount,
                    transactionId: `TX-${Date.now()}` // Simple unique ID gen
                }
            })
        ]);

        return NextResponse.json({ success: true, transaction: transaction[2] });

    } catch (error) {
        console.error("Transmission error:", error);
        return NextResponse.json({ error: "Transaction failed" }, { status: 500 });
    }
}
