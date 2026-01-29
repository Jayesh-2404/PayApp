"use client";

import Link from "next/link";
import { BiSend, BiLoaderAlt } from "react-icons/bi";
import { useBalance } from "@/hooks/useBalance";
import { useEffect, useState } from "react";

interface BalanceCardProps {
    initialAmount: number;
    initialPayId: string;
    initialName: string;
}

export default function BalanceCard({ initialAmount, initialPayId, initialName }: BalanceCardProps) {
    const { balance, isLoading } = useBalance({
        amount: initialAmount,
        payId: initialPayId,
        name: initialName
    });

    const [displayBalance, setDisplayBalance] = useState(initialAmount);
    const [isAnimating, setIsAnimating] = useState(false);

    // Handle smooth transition when balance changes
    useEffect(() => {
        if (balance !== null && balance !== displayBalance) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                setDisplayBalance(balance);
                setIsAnimating(false);
            }, 300); // 300ms fade out/in effect
            return () => clearTimeout(timer);
        }
    }, [balance, displayBalance]);

    return (
        <div className="bg-primary text-primary-foreground rounded-3xl p-6 flex flex-col justify-between h-full relative overflow-hidden group">
            {/* Decorative background circle */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-primary-foreground/70 text-sm font-medium">Available Balance</p>
                    {isLoading && <BiLoaderAlt className="animate-spin text-primary-foreground/50 w-4 h-4" />}
                </div>

                <div className={`transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                    <p className="text-4xl font-bold tracking-tight">
                        ₹{displayBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </p>
                </div>
            </div>

            <Link
                href="/transfer"
                className="mt-6 flex items-center justify-center gap-2 bg-primary-foreground text-primary py-4 rounded-2xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-black/5 active:scale-95"
            >
                <BiSend className="w-5 h-5" />
                Send Money
            </Link>
        </div>
    );
}
