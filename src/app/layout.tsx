import './globals.css';
import { Roboto } from 'next/font/google';
import { AuthProvider } from '@/components/AuthProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import Layout from '@/components/Layout';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900']
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
      <body className={roboto.className}>
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
