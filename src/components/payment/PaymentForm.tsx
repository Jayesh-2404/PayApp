'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

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
      <div className="text-center p-8">
        Please log in to make payments.
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Make Payment</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-600 rounded-md">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="receiverPayId" className="block text-sm font-medium mb-1">
            Receiver's Pay ID
          </label>
          <input
            id="receiverPayId"
            type="text"
            value={receiverPayId}
            onChange={(e) => setReceiverPayId(e.target.value.toUpperCase())}
            className="w-full p-2 border rounded-md"
            placeholder="Enter 5-character Pay ID"
            maxLength={5}
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="amount" className="block text-sm font-medium mb-1">
            Amount (₹)
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter amount"
            min="1"
            step="any"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Make Payment'}
        </button>
      </form>
      
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => router.push('/dashboard')}
          className="text-blue-500 hover:underline"
        >
          Back to Dashboard
        </button>
        
        <button
          onClick={() => router.push('/transaction')}
          className="text-blue-500 hover:underline"
        >
          View Transactions
        </button>
      </div>
    </div>
  );
}