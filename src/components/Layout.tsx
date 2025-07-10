'use client';

import { ReactNode } from 'react';
import Navbar from './Navbar';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from 'next-themes';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  // const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <div className="flex-grow max-w-screen-xl mx-auto p-4 relative">
        {/* Theme toggle button removed as requested */}
        <main className="w-full">{children}</main>
      </div>
      <footer className="bg-white dark:bg-gray-900 shadow-inner mt-auto py-4">
        <div className="max-w-screen-xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} PayApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 