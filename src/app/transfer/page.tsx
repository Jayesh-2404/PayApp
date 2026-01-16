"use client";

import { useState, useRef } from "react";
import { BiSend, BiCheckCircle, BiErrorCircle, BiUser } from "react-icons/bi";
import { useRouter } from "next/navigation";

export default function TransferPage() {
    const [payId, setPayId] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const router = useRouter();

    // Prevent double submission
    const isSubmitting = useRef(false);

    const handleTransfer = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prevent double-click
        if (isSubmitting.current || status === "loading") return;
        if (!payId || !amount) return;

        isSubmitting.current = true;
        setStatus("loading");
        setMessage("");

        try {
            const res = await fetch("/api/transfer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    receiverPayId: payId,
                    amount: parseFloat(amount),
                    // Idempotency key to prevent duplicate transactions
                    idempotencyKey: `${Date.now()}-${payId}-${amount}`
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setMessage(`Successfully sent ₹${amount} to ${data.receiver?.name || payId}!`);
                setTimeout(() => {
                    router.push("/dashboard");
                    router.refresh();
                }, 2000);
            } else {
                setStatus("error");
                setMessage(data.error || "Transfer failed");
                isSubmitting.current = false;
            }
        } catch (err) {
            setStatus("error");
            setMessage("An error occurred");
            isSubmitting.current = false;
        }
    };

    const quickAmounts = [100, 500, 1000, 2000, 5000];

    return (
        <div className="max-w-lg mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Send Money</h1>
                <p className="text-muted-foreground text-sm">Transfer to any PayID instantly</p>
            </div>

            {status === "success" ? (
                <div className="bg-card border border-border rounded-3xl p-12 text-center">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BiCheckCircle className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Transfer Successful!</h2>
                    <p className="text-muted-foreground">{message}</p>
                    <p className="text-sm text-muted-foreground mt-4">Redirecting to dashboard...</p>
                </div>
            ) : (
                <div className="bg-card border border-border rounded-3xl p-8">
                    <form onSubmit={handleTransfer} className="space-y-6">
                        {/* PayID Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Recipient PayID</label>
                            <div className="relative">
                                <BiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                <input
                                    type="text"
                                    value={payId}
                                    onChange={(e) => setPayId(e.target.value)}
                                    placeholder="Enter 5-digit PayID"
                                    maxLength={5}
                                    className="w-full pl-12 pr-4 py-4 bg-muted border border-transparent rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary text-lg font-mono tracking-widest transition-all placeholder:text-muted-foreground placeholder:tracking-normal placeholder:font-normal"
                                    required
                                    disabled={status === "loading"}
                                />
                            </div>
                        </div>

                        {/* Amount Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Amount</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-primary">₹</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0"
                                    min="1"
                                    className="w-full pl-12 pr-4 py-4 bg-muted border border-transparent rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary text-3xl font-bold transition-all placeholder:text-muted-foreground"
                                    required
                                    disabled={status === "loading"}
                                />
                            </div>
                        </div>

                        {/* Quick Amounts */}
                        <div className="flex flex-wrap gap-2">
                            {quickAmounts.map((amt) => (
                                <button
                                    key={amt}
                                    type="button"
                                    onClick={() => setAmount(String(amt))}
                                    disabled={status === "loading"}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50 ${amount === String(amt)
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
                                        }`}
                                >
                                    ₹{amt.toLocaleString()}
                                </button>
                            ))}
                        </div>

                        {/* Error Message */}
                        {status === "error" && (
                            <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl">
                                <BiErrorCircle className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm">{message}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={status === "loading" || !payId || !amount}
                            className="w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground py-4 rounded-2xl font-semibold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === "loading" ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <BiSend className="w-5 h-5" />
                                    Send ₹{amount ? parseInt(amount).toLocaleString() : '0'}
                                </>
                            )}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
