import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { createTransactionId } from "@/lib/utils";
import { ApiResponse } from "@/types";

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<{ success: boolean }>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { receiverPayId, amount } = await req.json();
    
    // Validate input
    if (!receiverPayId || !amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: "Invalid payment details" },
        { status: 400 }
      );
    }

    // Get sender's details
    const sender = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!sender) {
      return NextResponse.json(
        { success: false, error: "Sender not found" },
        { status: 404 }
      );
    }

    // Check if sender has sufficient funds
    if (sender.amount < amount) {
      return NextResponse.json(
        { success: false, error: "Insufficient funds" },
        { status: 400 }
      );
    }

    // Get receiver's details
    const receiver = await prisma.user.findUnique({
      where: { payId: receiverPayId },
    });

    if (!receiver) {
      return NextResponse.json(
        { success: false, error: "Receiver not found" },
        { status: 404 }
      );
    }

    // Don't allow self-transfers
    if (sender.id === receiver.id) {
      return NextResponse.json(
        { success: false, error: "Cannot transfer to yourself" },
        { status: 400 }
      );
    }

    // Create transaction ID
    const transactionId = createTransactionId(sender.payId, receiver.payId);

    // Use a transaction to ensure atomic operations
    await prisma.$transaction([
      // Update sender's balance
      prisma.user.update({
        where: { id: sender.id },
        data: { amount: { decrement: amount } },
      }),
      
      // Update receiver's balance
      prisma.user.update({
        where: { id: receiver.id },
        data: { amount: { increment: amount } },
      }),
      
      // Create transaction record
      prisma.transaction.create({
        data: {
          senderId: sender.id,
          receiverId: receiver.id,
          amount,
          transactionId,
        },
      }),
    ]);

    return NextResponse.json(
      { success: true, data: { success: true } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process payment" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<any>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [
          { senderId: session.user.id },
          { receiverId: session.user.id },
        ],
      },
      include: {
        sender: {
          select: {
            name: true,
            payId: true,
          },
        },
        receiver: {
          select: {
            name: true,
            payId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      { success: true, data: { transactions } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get transactions error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}