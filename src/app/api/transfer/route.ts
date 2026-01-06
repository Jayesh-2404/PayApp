import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const session = await getServerSession();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { receiverPayId, amount } = await req.json();

        if (!receiverPayId || !amount || amount <= 0) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }

        // Get sender
        const sender = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!sender) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check balance
        if (sender.amount < amount) {
            return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
        }

        // Find receiver by PayID
        const receiver = await prisma.user.findUnique({
            where: { payId: receiverPayId }
        });

        if (!receiver) {
            return NextResponse.json({ error: "PayID not found" }, { status: 404 });
        }

        if (receiver.id === sender.id) {
            return NextResponse.json({ error: "Cannot send to yourself" }, { status: 400 });
        }

        // Perform transaction atomically
        const [updatedSender, updatedReceiver, transaction] = await prisma.$transaction([
            prisma.user.update({
                where: { id: sender.id },
                data: { amount: { decrement: amount } }
            }),
            prisma.user.update({
                where: { id: receiver.id },
                data: { amount: { increment: amount } }
            }),
            prisma.transaction.create({
                data: {
                    senderId: sender.id,
                    receiverId: receiver.id,
                    amount: amount,
                    transactionId: `TXN${Date.now()}`
                }
            })
        ]);

        return NextResponse.json({
            success: true,
            transaction,
            receiver: { name: receiver.name, payId: receiver.payId }
        });

    } catch (error) {
        console.error("Transfer error:", error);
        return NextResponse.json({ error: "Transfer failed" }, { status: 500 });
    }
}
