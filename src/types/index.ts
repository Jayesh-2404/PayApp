import { User, Transaction } from "@prisma/client";

// Extend the default NextAuth session types
declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    payId: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      payId: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    payId: string;
  }
}

// Types for API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface UserResponse {
  user: {
    id: string;
    name: string;
    email: string;
    payId: string;
    amount: number;
  };
}

export interface TransactionResponse {
  transactions: (Transaction & {
    sender: Pick<User, "name" | "payId">;
    receiver: Pick<User, "name" | "payId">;
  })[];
}

export interface PaymentRequest {
  receiverPayId: string;
  amount: number;
}

export interface RegisterRequest {
  name: string;
  email: string;
}