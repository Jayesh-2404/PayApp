"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BiArrowBack, BiSearch, BiCheck, BiUser, BiErrorCircle } from "react-icons/bi";
import Link from "next/link";

export default function AddFriendPage() {
    const [searchValue, setSearchValue] = useState("");
    const [searchType, setSearchType] = useState<"email" | "payId">("payId");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");
        setIsSuccess(false);

        try {
            const res = await fetch("/api/friends", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    [searchType]: searchValue,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setIsSuccess(true);
                setMessage(`${data.friend?.name || "Friend"} added successfully!`);
                setTimeout(() => {
                    router.push("/messages");
                }, 1500);
            } else {
                setMessage(data.error || "Failed to add friend");
            }
        } catch (error) {
            setMessage("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/messages" className="p-2 hover:bg-accent rounded-xl transition-colors">
                    <BiArrowBack className="w-6 h-6" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold">Add Friend</h1>
                    <p className="text-muted-foreground text-sm">Search by PayID or email</p>
                </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6">
                {/* Toggle */}
                <div className="flex bg-muted rounded-xl p-1 mb-6">
                    <button
                        type="button"
                        onClick={() => setSearchType("payId")}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${searchType === "payId" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                            }`}
                    >
                        PayID
                    </button>
                    <button
                        type="button"
                        onClick={() => setSearchType("email")}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${searchType === "email" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                            }`}
                    >
                        Email
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            {searchType === "payId" ? "Enter PayID" : "Enter Email"}
                        </label>
                        <div className="relative">
                            {searchType === "payId" ? (
                                <BiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            ) : (
                                <BiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            )}
                            <input
                                type={searchType === "email" ? "email" : "text"}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder={searchType === "payId" ? "Enter 5-digit PayID" : "friend@email.com"}
                                maxLength={searchType === "payId" ? 5 : undefined}
                                className={`w-full pl-12 pr-4 py-4 bg-muted border border-transparent rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground ${searchType === "payId" ? "font-mono tracking-widest text-lg" : ""
                                    }`}
                                required
                            />
                        </div>
                    </div>

                    {/* Message */}
                    {message && (
                        <div className={`flex items-center gap-3 p-4 rounded-xl ${isSuccess
                                ? "bg-primary/10 text-primary"
                                : "bg-destructive/10 text-destructive"
                            }`}>
                            {isSuccess ? <BiCheck className="w-5 h-5" /> : <BiErrorCircle className="w-5 h-5" />}
                            <p className="text-sm font-medium">{message}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading || !searchValue}
                        className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Searching..." : "Add Friend"}
                    </button>
                </form>
            </div>
        </div>
    );
}
