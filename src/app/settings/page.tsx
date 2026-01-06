"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BiUser, BiMoon, BiSun, BiBell, BiShield, BiInfoCircle } from "react-icons/bi";

export default function SettingsPage() {
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [notifications, setNotifications] = useState(true);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-muted-foreground text-sm">Manage your account preferences</p>
            </div>

            {/* Profile Section */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-border flex items-center gap-3">
                    <BiUser className="w-5 h-5 text-primary" />
                    <h2 className="font-semibold">Profile</h2>
                </div>
                <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Name</p>
                            <p className="text-sm text-muted-foreground">{session?.user?.name || "User"}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">{session?.user?.email || "email@example.com"}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Appearance Section */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-border flex items-center gap-3">
                    {theme === 'dark' ? <BiMoon className="w-5 h-5 text-primary" /> : <BiSun className="w-5 h-5 text-primary" />}
                    <h2 className="font-semibold">Appearance</h2>
                </div>
                <div className="p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Theme</p>
                            <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                        </div>
                        <div className="flex bg-muted rounded-xl p-1">
                            <button
                                onClick={() => setTheme('dark')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${theme === 'dark' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
                                    }`}
                            >
                                Dark
                            </button>
                            <button
                                onClick={() => setTheme('light')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${theme === 'light' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
                                    }`}
                            >
                                Light
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-border flex items-center gap-3">
                    <BiBell className="w-5 h-5 text-primary" />
                    <h2 className="font-semibold">Notifications</h2>
                </div>
                <div className="p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Payment Notifications</p>
                            <p className="text-sm text-muted-foreground">Get notified when you receive money</p>
                        </div>
                        <button
                            onClick={() => setNotifications(!notifications)}
                            className={`w-12 h-7 rounded-full transition-colors relative ${notifications ? 'bg-primary' : 'bg-muted'
                                }`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${notifications ? 'right-1' : 'left-1'
                                }`}></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Security Section */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-border flex items-center gap-3">
                    <BiShield className="w-5 h-5 text-primary" />
                    <h2 className="font-semibold">Security</h2>
                </div>
                <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-muted rounded-lg text-muted-foreground">Coming Soon</span>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-border flex items-center gap-3">
                    <BiInfoCircle className="w-5 h-5 text-primary" />
                    <h2 className="font-semibold">About</h2>
                </div>
                <div className="p-5 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Version</span>
                        <span>1.0.0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Developer</span>
                        <span>PayApp Team</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
