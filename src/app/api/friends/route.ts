import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";

export async function POST(req: Request) {
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { email, payId } = await req.json();

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true }
        });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const friend = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { payId: payId }
                ]
            },
            select: { id: true, name: true, payId: true }
        });

        if (!friend) return NextResponse.json({ error: "Friend not found" }, { status: 404 });
        if (friend.id === user.id) return NextResponse.json({ error: "Cannot add yourself" }, { status: 400 });

        const existing = await prisma.friendship.findFirst({
            where: {
                userId: user.id,
                friendId: friend.id
            }
        });

        if (existing) return NextResponse.json({ error: "Already friends" }, { status: 400 });

        await prisma.friendship.create({
            data: {
                userId: user.id,
                friendId: friend.id
            }
        });

        // Only return necessary data
        return NextResponse.json({
            success: true,
            friend: { name: friend.name, payId: friend.payId }
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add friend" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            friends: {
                include: {
                    friend: {
                        select: { id: true, name: true, payId: true }
                    }
                }
            }
        }
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Only return id, name, payId for each friend
    return NextResponse.json(user.friends.map(f => ({
        id: f.friend.id,
        name: f.friend.name,
        payId: f.friend.payId
    })));
}
