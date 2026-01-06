import { ReactNode } from "react";

interface StatCardProps {
    title: string;
    value?: string | number;
    children?: ReactNode;
    className?: string;
}

export function StatCard({ title, value, children, className }: StatCardProps) {
    return (
        <div className={`bg-card text-card-foreground p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between ${className}`}>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">{title}</h3>
            {value && <div className="text-2xl font-bold">{value}</div>}
            {children}
        </div>
    );
}

interface CreditCardProps {
    balance: number;
    cardNumber: string;
    expiry: string;
    holderName: string;
    brand: "visa" | "mastercard";
    variant?: "dark" | "light"; // For the two cards in UI
}

export function CreditCard({ balance, cardNumber, expiry, holderName, brand, variant = "dark" }: CreditCardProps) {
    const isDark = variant === "dark";

    return (
        <div className={`p-6 rounded-3xl flex flex-col justify-between h-48 relative overflow-hidden shadow-lg ${isDark
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-900 border border-slate-200"
            }`}>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <div className="w-32 h-32 rounded-full border-4 border-current"></div>
            </div>

            <div className="flex justify-between items-start z-10">
                <div className="flex gap-2">
                    <div className="w-10 h-6 bg-yellow-500/80 rounded-sm"></div>
                </div>
                <span className="font-bold text-lg italic">{brand.toUpperCase()}</span>
            </div>

            <div className="z-10">
                <p className="text-xl tracking-widest font-mono mb-4">{cardNumber}</p>

                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs opacity-70 mb-1">Cardholder Name</p>
                        <p className="font-medium text-sm">{holderName}</p>
                    </div>
                    <div>
                        <p className="text-xs opacity-70 mb-1">Expiry Date</p>
                        <p className="font-medium text-sm">{expiry}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
