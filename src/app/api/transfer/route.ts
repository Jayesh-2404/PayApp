import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";

// Simple in-memory store for idempotency (in production, use Redis)
const processedRequests = new Map<string, { timestamp: number; result: any }>();
const IDEMPOTENCY_WINDOW = 60000; // 1 minute

// Clean old entries periodically
function cleanOldEntries() {
    const now = Date.now();
    for (const [key, value] of processedRequests.entries()) {
        if (now - value.timestamp > IDEMPOTENCY_WINDOW) {
            processedRequests.delete(key);
        }
    }
}

export async function POST(req: Request) {
    const session = await getServerSession();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { receiverPayId, amount, idempotencyKey } = await req.json();

        if (!receiverPayId || !amount || amount <= 0) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }

        // Check idempotency to prevent double payments
        if (idempotencyKey) {
            cleanOldEntries();
            const existing = processedRequests.get(idempotencyKey);
            if (existing) {
                // Return the same response as before
                return NextResponse.json(existing.result);
            }
        }

        // Get sender
        const sender = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true, amount: true, payId: true }
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
            where: { payId: receiverPayId },
            select: { id: true, name: true, payId: true }
        });

        if (!receiver) {
            return NextResponse.json({ error: "PayID not found" }, { status: 404 });
        }

        if (receiver.id === sender.id) {
            return NextResponse.json({ error: "Cannot send to yourself" }, { status: 400 });
        }

        // Perform transaction atomically
        const [, , transaction] = await prisma.$transaction([
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

        const result = {
            success: true,
            transaction: {
                id: transaction.id,
                amount: transaction.amount,
                transactionId: transaction.transactionId
            },
            receiver: { name: receiver.name, payId: receiver.payId }
        };

        // Store the result for idempotency
        if (idempotencyKey) {
            processedRequests.set(idempotencyKey, {
                timestamp: Date.now(),
                result
            });
        }

        return NextResponse.json(result);

    } catch (error) {
        console.error("Transfer error:", error);
        return NextResponse.json({ error: "Transfer failed" }, { status: 500 });
    }
}
