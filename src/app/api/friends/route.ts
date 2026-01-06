import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { email, payId } = await req.json();

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const friend = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { payId: payId }
                ]
            }
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

        return NextResponse.json({ success: true, friend });
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
                    friend: true
                }
            }
        }
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user.friends.map(f => f.friend));
}
