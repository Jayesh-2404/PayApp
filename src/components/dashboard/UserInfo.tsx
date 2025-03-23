'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/utils';

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
          setUserAmount(data.data.user.amount);
        }
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
      <div className="text-center p-8">
        Please log in to view your dashboard.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">User Dashboard</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
          <span className="font-medium">Name:</span>
          <span>{session.user.name}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
          <span className="font-medium">Pay ID:</span>
          <span className="font-mono bg-gray-200 px-2 py-1 rounded">
            {session.user.payId}
          </span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
          <span className="font-medium">Balance:</span>
          <span className="font-bold text-green-600">
            {isLoading ? 'Loading...' : userAmount !== null ? formatCurrency(userAmount) : 'N/A'}
          </span>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-2 gap-4">
        <button
          onClick={() => router.push('/payment')}
          className="bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors text-center"
        >
          Make Payment
        </button>
        
        <button
          onClick={() => router.push('/transaction')}
          className="bg-gray-500 text-white py-3 px-4 rounded-md hover:bg-gray-600 transition-colors text-center"
        >
          Transaction History
        </button>
      </div>
    </div>
  );
}