'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { FiUser, FiCreditCard, FiDollarSign, FiSend, FiClock } from 'react-icons/fi';

export default function UserInfo() {
  const { data: session } = useSession();
  const router = useRouter();
  const [userAmount, setUserAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();

        if (data.success && data.data) {
          setUserAmount(data.data.amount);        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (session?.user) {
      fetchUserData();
    }
  }, [session]);

  if (!session?.user) {
    return (
      <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 p-8 text-center">
        <div className="text-gray-600 dark:text-gray-300">
          Please log in to view your dashboard.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
      <div className="p-8">
        <div className="space-y-6">
          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors group hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <FiUser className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4 flex-1">
              <div className="text-sm text-gray-500 dark:text-gray-400">Name</div>
              <div className="font-medium text-gray-900 dark:text-white">{session.user.name}</div>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors group hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <FiCreditCard className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4 flex-1">
              <div className="text-sm text-gray-500 dark:text-gray-400">Pay ID</div>
              <div className="font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600 px-3 py-1 rounded inline-block">
                {session.user.payId}
              </div>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors group hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <FiDollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4 flex-1">
              <div className="text-sm text-gray-500 dark:text-gray-400">Balance</div>
              <div className="font-bold text-green-600 dark:text-green-400 text-lg">
                {isLoading ? (
                  <div className="animate-pulse bg-gray-200 dark:bg-gray-600 h-6 w-24 rounded"></div>
                ) : (
                  userAmount !== null ? formatCurrency(userAmount) : 'N/A'
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <button
            onClick={() => router.push('/payment')}
            className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <FiSend className="w-5 h-5" />
            <span>Make Payment</span>
          </button>

          <button
            onClick={() => router.push('/transaction')}
            className="inline-flex items-center justify-center space-x-2 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <FiClock className="w-5 h-5" />
            <span>Transaction History</span>
          </button>
        </div>
      </div>
    </div>
  );
}
