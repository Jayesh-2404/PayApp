import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/components/AuthProvider';
import Layout from '@/components/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Payment App',
  description: 'Simple payment application with user authentication',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <Layout>
            {children}
          </Layout>
        </AuthProvider>
      </body>
    </html>
  );
}