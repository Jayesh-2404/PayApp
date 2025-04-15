import { Metadata } from 'next';
import RegisterForm from '@/components/auth/RegisterForm';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Register | Payment App',
  description: 'Create a new account',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 dark:bg-blue-800 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 dark:bg-indigo-800 rounded-full opacity-10 blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Create an Account</h1>
          <p className="text-gray-600 dark:text-gray-300">Join us to start managing your payments</p>
        </div>
        <RegisterForm />
        
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>By registering, you agree to our <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">Privacy Policy</a></p>
        </div>
      </div>
    </div>
  );
}