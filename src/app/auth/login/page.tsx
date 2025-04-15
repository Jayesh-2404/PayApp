import { Metadata } from 'next';
import LoginForm from '@/components/auth/LoginForm';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Login | Payment App',
  description: 'Log in to your account',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400 dark:bg-blue-800 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-400 dark:bg-indigo-800 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-5">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Welcome Back</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Sign in to your account to continue</p>
        </div>
        <LoginForm />
        
        <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>By signing in, you agree to our <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">Privacy Policy</a></p>
        </div>
      </div>
    </div>
  );
}