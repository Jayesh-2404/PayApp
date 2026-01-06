import { Metadata } from 'next';
import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';
import { BiRocket } from 'react-icons/bi';

export const metadata: Metadata = {
  title: 'Register | PayApp',
  description: 'Create a new account',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left - Feature Showcase */}
      <div className="hidden lg:flex flex-1 bg-card items-center justify-center p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-md text-center">
          <div className="w-20 h-20 rounded-2xl bg-primary mx-auto mb-8 flex items-center justify-center">
            <BiRocket className="w-10 h-10 text-primary-foreground" />
          </div>

          <h2 className="text-2xl font-bold mb-4">Start Your Journey</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            "Every expert was once a beginner. Join thousands of users who trust PayApp for their daily transactions."
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">₹1000</div>
              <div className="text-xs text-muted-foreground">Welcome Bonus</div>
            </div>
            <div>
              <div className="text-2xl font-bold">0%</div>
              <div className="text-xs text-muted-foreground">Transfer Fee</div>
            </div>
            <div>
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-xs text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">₹</span>
            </div>
            <span className="text-xl font-bold">PayApp</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create account</h1>
            <p className="text-muted-foreground">Get ₹1000 free on signup!</p>
          </div>

          <RegisterForm />

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}