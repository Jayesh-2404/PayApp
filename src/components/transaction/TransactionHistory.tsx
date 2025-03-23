'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { formatCurrency } from '@/lib/utils';

type Transaction = {
  id: string;
  senderId: string;
  receiverId: string;
  amount: number;
  transactionId: string;
  createdAt: string;
  sender: {
    name: string;
    payId: string;
  };
  receiver: {
    name: string;
    payId: string;
  };
};

export default function TransactionHistory() {
  const { data: session } = useSession();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch('/api/payment');
        const data = await response.json();

        if (data.success && data.data) {
          setTransactions(data.data.transactions);
        } else {
          throw new Error(data.error || 'Failed to fetch transactions');
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    }

    if (session?.user) {
      fetchTransactions();
    }
  }, [session]);

  if (!session?.user) {
    return (
      <div className="text-center p-8">
        Please log in to view your transactions.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center p-8">
        Loading transaction history...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-md">
          {error}
        </div>
        <button
          onClick={() => router.push('/dashboard')}
          className="text-blue-500 hover:underline"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Transaction History</h2>
      
      {transactions.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-md">
          No transactions found. Make your first payment!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Transaction ID</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">From/To</th>
                <th className="px-4 py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                const isSender = transaction.sender.payId === session.user.payId;
                return (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">
                      {new Date(transaction.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {transaction.transactionId}
                    </td>
                    <td className={`px-4 py-3 ${isSender ? 'text-red-600' : 'text-green-600'}`}>
                      {isSender ? 'Sent' : 'Received'}
                    </td>
                    <td className="px-4 py-3">
                      {isSender
                        ? `To: ${transaction.receiver.name} (${transaction.receiver.payId})`
                        : `From: ${transaction.sender.name} (${transaction.sender.payId})`}
                    </td>
                    <td className={`px-4 py-3 text-right font-medium ${isSender ? 'text-red-600' : 'text-green-600'}`}>
                      {isSender ? '-' : '+'}{formatCurrency(transaction.amount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}