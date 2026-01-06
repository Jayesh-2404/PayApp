"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { BiLineChart, BiTrendingUp, BiTrendingDown, BiWallet, BiChevronDown } from "react-icons/bi";

type AnalysisData = {
    balance: number;
    totalSent: number;
    totalReceived: number;
    monthlyData: { month: string; sent: number; received: number }[];
};

const months = ['All Time', 'Last 3 Months', 'Last 6 Months', 'This Year'];

export default function AnalysisPage() {
    const [data, setData] = useState<AnalysisData | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState('Last 6 Months');
    const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);

    useEffect(() => {
        fetch("/api/wallet")
            .then(res => res.json())
            .then(setData)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (!data) {
        return <div className="text-center text-muted-foreground">Failed to load data</div>;
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Analysis</h1>
                    <p className="text-muted-foreground text-sm">Track your spending patterns</p>
                </div>

                {/* Period Filter */}
                <div className="relative">
                    <button
                        onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl text-sm font-medium hover:bg-accent transition-colors"
                    >
                        {selectedPeriod}
                        <BiChevronDown className={`w-4 h-4 transition-transform ${showPeriodDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showPeriodDropdown && (
                        <div className="absolute right-0 top-12 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-20 min-w-[160px]">
                            {months.map(month => (
                                <button
                                    key={month}
                                    onClick={() => {
                                        setSelectedPeriod(month);
                                        setShowPeriodDropdown(false);
                                    }}
                                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-accent transition-colors ${selectedPeriod === month ? 'bg-primary text-primary-foreground' : ''
                                        }`}
                                >
                                    {month}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <BiWallet className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">Current Balance</span>
                    </div>
                    <p className="text-3xl font-bold">₹{data.balance.toLocaleString('en-IN')}</p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
                            <BiTrendingUp className="w-6 h-6 text-destructive" />
                        </div>
                        <span className="text-sm text-muted-foreground">Total Spent</span>
                    </div>
                    <p className="text-3xl font-bold text-destructive">₹{data.totalSent.toLocaleString('en-IN')}</p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <BiTrendingDown className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">Total Received</span>
                    </div>
                    <p className="text-3xl font-bold text-primary">₹{data.totalReceived.toLocaleString('en-IN')}</p>
                </div>
            </div>

            {/* Main Chart */}
            <div className="bg-card border border-border rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-6">
                    <BiLineChart className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold">Transaction Overview</h2>
                </div>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <AreaChart data={data.monthlyData}>
                            <defs>
                                <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ff4444" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ff4444" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#d4f639" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#d4f639" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a2a2a" />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#a0a0a0', fontSize: 12 }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#a0a0a0', fontSize: 12 }}
                                tickFormatter={(v) => `₹${v}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1a1a1a',
                                    border: '1px solid #2a2a2a',
                                    borderRadius: '12px',
                                }}
                                formatter={(value) => [`₹${(value as number).toLocaleString()}`, '']}
                            />
                            <Area type="monotone" dataKey="sent" stroke="#ff4444" fillOpacity={1} fill="url(#colorSent)" strokeWidth={2} name="Sent" />
                            <Area type="monotone" dataKey="received" stroke="#d4f639" fillOpacity={1} fill="url(#colorReceived)" strokeWidth={2} name="Received" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-8 mt-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-destructive rounded-full"></div>
                        <span className="text-sm text-muted-foreground">Sent</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="text-sm text-muted-foreground">Received</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
