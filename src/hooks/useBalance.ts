"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

interface BalanceData {
    amount: number;
    payId: string;
    name: string;
}

export function useBalance(initialData?: BalanceData) {
    const { data: session } = useSession();
    const [balance, setBalance] = useState<number | null>(initialData?.amount ?? null);
    const [isLoading, setIsLoading] = useState(!initialData);
    const [error, setError] = useState<string | null>(null);

    const fetchBalance = useCallback(async () => {
        if (!session?.user?.email) return;

        try {
            const res = await fetch("/api/user/balance");
            if (!res.ok) throw new Error("Failed to fetch balance");

            const data = await res.json();
            setBalance(data.amount);
            setError(null);
        } catch (err) {
            console.error("Balance fetch error:", err);

        } finally {
            setIsLoading(false);
        }
    }, [session]);

    useEffect(() => {
        // Initial fetch if no initial data
        if (!initialData) {
            fetchBalance();
        }

        // Poll every 5 seconds
        const intervalId = setInterval(fetchBalance, 5000);

        // Provide a way to stop polling when window is not focused (optional optimization)
        // For this app, we'll keep it simple and just poll

        return () => clearInterval(intervalId);
    }, [fetchBalance, initialData]);

    return { balance, isLoading, error, refreshBalance: fetchBalance };
}
