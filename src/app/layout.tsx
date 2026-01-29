import './globals.css';
import { Geist_Mono } from 'next/font/google';
import { AuthProvider } from '@/components/AuthProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import Layout from '@/components/Layout';

const geistMono = Geist_Mono({
  subsets: ['latin'],
});

export const metadata = {
  title: 'PayApp | Make Payment',
  description: 'Simple payment application with user authentication',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geistMono.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Layout>
              {children}
            </Layout>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
