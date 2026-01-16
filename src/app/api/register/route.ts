import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { generatePayId } from "@/lib/utils";
import { ApiResponse, UserResponse } from "@/types";

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<UserResponse["user"]>>> {
  try {
    const { name, email, password } = await req.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate a unique 5-character pay ID
    let payId = generatePayId();
    let isPayIdUnique = false;

    // Ensure pay ID is unique
    while (!isPayIdUnique) {
      const existingPayId = await prisma.user.findUnique({
        where: { payId },
      });

      if (!existingPayId) {
        isPayIdUnique = true;
      } else {
        payId = generatePayId();
      }
    }

    // Create new user with hashed password
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        payId,
        amount: 1000, // Initial reward amount
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          payId: newUser.payId,
          amount: newUser.amount,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to register user" },
      { status: 500 }
    );
  }
}