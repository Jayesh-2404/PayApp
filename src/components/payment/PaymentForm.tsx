'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FiUser, FiDollarSign, FiArrowLeft, FiClock } from 'react-icons/fi';

export default function PaymentForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [receiverPayId, setReceiverPayId] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (!receiverPayId || receiverPayId.length !== 5) {
      setError('Please enter a valid 5-character Pay ID');
      setIsLoading(false);
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid amount');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiverPayId,
          amount: amountNum,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment failed');
      }

      setSuccess('Payment successful!');
      
      // Clear form
      setReceiverPayId('');
      setAmount('');
      
      // Redirect to transaction history after a brief delay
      setTimeout(() => {
        router.push('/transaction');
      }, 1500);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session?.user) {
    return (
      <div className="w-full max-w-md mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50 text-center">
        <div className="text-gray-600 dark:text-gray-300">
          Please log in to make payments.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-sm rounded-lg border border-red-200 dark:border-red-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300 text-sm rounded-lg border border-green-200 dark:border-green-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{success}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="receiverPayId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Receiver's Pay ID
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              id="receiverPayId"
              type="text"
              value={receiverPayId}
              onChange={(e) => setReceiverPayId(e.target.value.toUpperCase())}
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700/50 dark:text-white transition-colors"
              placeholder="Enter 5-character Pay ID"
              maxLength={5}
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Amount (₹)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiDollarSign className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700/50 dark:text-white transition-colors"
              placeholder="Enter amount"
              min="1"
              step="any"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {isLoading ? 'Processing...' : 'Make Payment'}
        </button>
      </form>
      
      <div className="mt-4 flex justify-between text-sm">
        <button
          onClick={() => router.push('/dashboard')}
          className="inline-flex items-center text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4 mr-1.5" />
          <span>Back to Dashboard</span>
        </button>
        
        <button
          onClick={() => router.push('/transaction')}
          className="inline-flex items-center text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          <FiClock className="w-4 h-4 mr-1.5" />
          <span>View Transactions</span>
        </button>
      </div>
    </div>
  );
}