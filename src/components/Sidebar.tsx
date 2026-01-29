"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
    BiGridAlt,
    BiTransfer,
    BiHistory,
    BiLineChart,
    BiMessageSquareDetail,
    BiCog,
    BiLogOut,
    BiX
} from "react-icons/bi";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: BiGridAlt },
    { name: "Transfer", href: "/transfer", icon: BiTransfer },
    { name: "Transactions", href: "/transactions", icon: BiHistory },
    { name: "Analysis", href: "/analysis", icon: BiLineChart },
    { name: "Messages", href: "/messages", icon: BiMessageSquareDetail },
];

const bottomItems = [
    { name: "Settings", href: "/settings", icon: BiCog },
];

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
    const pathname = usePathname();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        signOut({ callbackUrl: '/' });
    };

    const handleLinkClick = () => {
        if (onClose) onClose();
    };

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`
                w-72 h-screen bg-card border-r border-border flex flex-col fixed left-0 top-0 overflow-y-auto z-50
                transition-transform duration-300 ease-in-out md:translate-x-0
                ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
            `}>
                {/* Logo */}
                <div className="p-6 border-b border-border flex justify-between items-center">
                    <Link href="/dashboard" className="flex items-center gap-3" onClick={handleLinkClick}>
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-lg">₹</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">PayApp</h1>
                            <p className="text-xs text-muted-foreground">Digital Wallet</p>
                        </div>
                    </Link>

                    {/* Close button for mobile */}
                    <button
                        onClick={onClose}
                        className="md:hidden p-2 text-muted-foreground hover:text-foreground"
                    >
                        <BiX className="w-6 h-6" />
                    </button>
                </div>

                {/* Main Navigation */}
                <nav className="flex-1 p-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-3">Menu</p>
                    <div className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={handleLinkClick}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 ${isActive ? "" : "group-hover:scale-110 transition-transform"}`} />
                                    <span className="font-medium text-sm">{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Bottom Section */}
                <div className="p-4 border-t border-border">
                    {bottomItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={handleLinkClick}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 mb-2 ${isActive
                                    ? "bg-accent text-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium text-sm">{item.name}</span>
                            </Link>
                        );
                    })}
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="flex items-center gap-3 px-4 py-3 w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all rounded-xl"
                    >
                        <BiLogOut className="w-5 h-5" />
                        <span className="font-medium text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                    <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Confirm Logout</h3>
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="p-1 hover:bg-accent rounded-lg transition-colors"
                            >
                                <BiX className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-muted-foreground mb-6">Are you sure you want to logout from your account?</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="flex-1 py-3 px-4 bg-muted text-foreground rounded-xl font-medium hover:bg-accent transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex-1 py-3 px-4 bg-destructive text-destructive-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
