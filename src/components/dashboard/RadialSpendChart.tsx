"use client";

import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from 'next-themes';

const data = [
    { name: 'Shopping', uv: 31.47, fill: '#8884d8' },
    { name: 'Groceries', uv: 26.69, fill: '#83a6ed' },
    { name: 'Bills', uv: 15.69, fill: '#8dd1e1' },
    { name: 'Entertainment', uv: 8.22, fill: '#82ca9d' },
];

const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
};

export function RadialSpendChart() {
    const { theme } = useTheme();

    return (
        <div className="bg-card text-card-foreground p-6 rounded-2xl border border-border shadow-sm h-full flex flex-col justify-between">
            <div>
                <h3 className="text-sm font-medium text-muted-foreground">Spent this Month</h3>
                <p className="text-3xl font-bold mt-2">$682.5</p>
            </div>

            <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                    <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="30%"
                        outerRadius="100%"
                        barSize={10}
                        data={data}
                    >
                        <RadialBar
                            label={{ position: 'insideStart', fill: '#fff' }}
                            background
                            dataKey="uv"
                        />
                        {/* <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} /> */}
                        <Tooltip />
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-center gap-2 mt-4">
                <div className="h-1 w-8 bg-green-500 rounded-full"></div>
                <div className="h-1 w-8 bg-gray-700 rounded-full"></div>
            </div>
        </div>
    );
}
