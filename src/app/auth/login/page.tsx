import { Metadata } from 'next';
import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';
import { BiLock } from 'react-icons/bi';

export const metadata: Metadata = {
  title: 'Login | PayApp',
  description: 'Log in to your account',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left - Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">₹</span>
            </div>
            <span className="text-xl font-bold">PayApp</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>

          <LoginForm />

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-primary hover:underline font-medium">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right - Feature Showcase */}
      <div className="hidden lg:flex flex-1 bg-card items-center justify-center p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-md text-center">
          <div className="w-20 h-20 rounded-2xl bg-primary mx-auto mb-8 flex items-center justify-center">
            <BiLock className="w-10 h-10 text-primary-foreground" />
          </div>

          <h2 className="text-2xl font-bold mb-4">Secure Payments</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            "The best way to predict the future is to create it. Start building your financial freedom today."
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <div className="w-3 h-3 rounded-full bg-muted"></div>
            <div className="w-3 h-3 rounded-full bg-muted"></div>
          </div>
        </div>
      </div>
    </div>
  );
}