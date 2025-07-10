'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        {/* Remove the background classes here */}
        <div className="min-h-screen">{children}</div>
      </SessionProvider>
    </ThemeProvider>
  );
}