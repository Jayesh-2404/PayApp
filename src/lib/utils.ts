import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Helper function for Tailwind CSS class merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate a random 5-character pay ID
export function generatePayId(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
}

// Create transaction ID by combining sender and receiver pay IDs
export function createTransactionId(senderPayId: string, receiverPayId: string): string {
  return `${senderPayId}${receiverPayId}`;
}

// Format currency in rupees
export function formatCurrency(amount: number): string {
  return `₹${amount.toFixed(2)}`;
}