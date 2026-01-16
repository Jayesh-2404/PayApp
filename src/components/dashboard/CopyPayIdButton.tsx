"use client";

import { useState } from "react";
import { BiCopy, BiCheck } from "react-icons/bi";

type CopyPayIdButtonProps = {
    payId: string;
};

export function CopyPayIdButton({ payId }: CopyPayIdButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(payId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`p-2 rounded-lg transition-all ${copied
                    ? "bg-primary/20 text-primary"
                    : "bg-muted hover:bg-accent"
                }`}
            title={copied ? "Copied!" : "Copy PayID"}
        >
            {copied ? (
                <BiCheck className="w-4 h-4" />
            ) : (
                <BiCopy className="w-4 h-4" />
            )}
        </button>
    );
}
