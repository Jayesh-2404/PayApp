'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiDollarSign, FiList, FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow transition-colors duration-300">
      <div className="max-w-screen-xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center text-xl font-bold text-blue-600 dark:text-blue-400 transition-colors">
            <FiDollarSign className="w-6 h-6 mr-2" />
            <span>PayApp</span>
          </Link>
          <div className="flex items-center gap-6">
            {session?.user ? (
              <>
                <Link href="/dashboard" className={`flex items-center px-3 py-2 rounded-md transition-colors ${pathname === '/dashboard' ? 'bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                  <FiHome className="w-4 h-4 mr-2" />
                  <span>Dashboard</span>
                </Link>
                <Link href="/payment" className={`flex items-center px-3 py-2 rounded-md transition-colors ${pathname === '/payment' ? 'bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                  <FiDollarSign className="w-4 h-4 mr-2" />
                  <span>Payment</span>
                </Link>
                <Link href="/transaction" className={`flex items-center px-3 py-2 rounded-md transition-colors ${pathname === '/transaction' ? 'bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                  <FiList className="w-4 h-4 mr-2" />
                  <span>Transactions</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center px-4 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-md border-none cursor-pointer transition-colors hover:bg-red-200 dark:hover:bg-red-800"
                >
                  <FiLogOut className="w-4 h-4 mr-2" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className={`flex items-center px-3 py-2 rounded-md transition-colors ${pathname === '/auth/login' ? 'bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                  <FiLogIn className="w-4 h-4 mr-2" />
                  <span>Login</span>
                </Link>
                <Link href="/auth/register" className="flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md border-none cursor-pointer transition-colors hover:bg-blue-700 dark:hover:bg-blue-600">
                  <FiUserPlus className="w-4 h-4 mr-2" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}