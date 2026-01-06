"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import { Sidebar } from './Sidebar';
import { NotificationDropdown } from './NotificationDropdown';
import { ThemeToggle } from './ThemeToggle';
import { FiSearch } from 'react-icons/fi';

type LayoutProps = {
  children: React.ReactNode;
};

// Pages that should NOT have any layout wrapper (they have their own)
const noLayoutPages = ['/', '/auth/login', '/auth/register'];

export default function Layout({ children }: LayoutProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="min-h-screen bg-background" />;

  // Check if we should skip layout
  if (noLayoutPages.includes(pathname)) {
    return <>{children}</>;
  }

  const isAuth = status === "authenticated";

  if (isAuth) {
    return (
      <div className="flex min-h-screen bg-background text-foreground font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col md:ml-72 transition-all duration-300">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Welcome back!</h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-muted rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-56 transition-all"
                />
              </div>

              <NotificationDropdown />

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-muted rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </header>

          <main className="flex-1 p-8 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    );
  }

  // Public Layout (for pages other than landing/auth)
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <div className="flex-grow w-full max-w-screen-xl mx-auto p-4 relative">
        <main className="w-full">{children}</main>
      </div>
      <footer className="bg-card border-t border-border mt-auto py-6">
        <div className="max-w-screen-xl mx-auto px-4 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} PayApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}