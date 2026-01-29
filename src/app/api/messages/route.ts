import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";

export async function GET(req: Request) {
    const session = await getServerSession();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const friendId = searchParams.get("friendId");

    if (!friendId) {
        return NextResponse.json({ error: "Friend ID required" }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: user.id, receiverId: friendId },
                    { senderId: friendId, receiverId: user.id }
                ]
            },
            orderBy: { createdAt: "asc" },
            select: {
                id: true,
                text: true,
                type: true,
                amount: true,
                senderId: true,
                createdAt: true
            }
        });

        const formattedMessages = messages.map(msg => ({
            id: msg.id,
            text: msg.text,
            type: msg.type,
            amount: msg.amount,
            senderId: msg.senderId === user.id ? "me" : msg.senderId,
            createdAt: msg.createdAt.toISOString()
        }));

        return NextResponse.json(formattedMessages);
    } catch (error) {
        console.error("Failed to fetch messages:", error);
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}

// POST a new message
export async function POST(req: Request) {
    const session = await getServerSession();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { friendId, text, type = "text", amount } = await req.json();

        if (!friendId || !text) {
            return NextResponse.json({ error: "Friend ID and text required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Verify the friend exists
        const friend = await prisma.user.findUnique({
            where: { id: friendId },
            select: { id: true }
        });

        if (!friend) {
            return NextResponse.json({ error: "Friend not found" }, { status: 404 });
        }

        const message = await prisma.message.create({
            data: {
                text,
                type,
                amount: type === "payment" ? amount : null,
                senderId: user.id,
                receiverId: friendId
            },
            select: {
                id: true,
                text: true,
                type: true,
                amount: true,
                senderId: true,
                createdAt: true
            }
        });

        return NextResponse.json({
            id: message.id,
            text: message.text,
            type: message.type,
            amount: message.amount,
            senderId: "me",
            createdAt: message.createdAt.toISOString()
        });
    } catch (error) {
        console.error("Failed to send message:", error);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}
