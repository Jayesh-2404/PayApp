'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          PayApp
        </Link>
        
        <div className="flex items-center space-x-4">
          {session?.user ? (
            <>
              <Link 
                href="/dashboard" 
                className={`hover:text-blue-200 ${pathname === '/dashboard' ? 'text-blue-300' : ''}`}
              >
                Dashboard
              </Link>
              <Link 
                href="/payment" 
                className={`hover:text-blue-200 ${pathname === '/payment' ? 'text-blue-300' : ''}`}
              >
                Payment
              </Link>
              <Link 
                href="/transaction" 
                className={`hover:text-blue-200 ${pathname === '/transaction' ? 'text-blue-300' : ''}`}
              >
                Transactions
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/auth/login" 
                className={`hover:text-blue-200 ${pathname === '/auth/login' ? 'text-blue-300' : ''}`}
              >
                Login
              </Link>
              <Link 
                href="/auth/register" 
                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}