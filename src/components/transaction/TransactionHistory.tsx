'use client';

import React, { useState, useEffect } from 'react';
import styles from './TransactionHistory.module.css';
import { FiArrowLeft, FiClock, FiUser, FiDollarSign, FiCheck, FiX, FiPlus, FiDownload, FiEye, FiFilter, FiSearch, FiCalendar, FiRefreshCw, FiCreditCard } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { TransactionResponse } from '@/types';

type Transaction = {
  id: string;
  transactionId: string;
  amount: number;
  createdAt: string;
  sender: {
    payId: string;
    name: string;
  };
  receiver: {
    payId: string;
    name: string;
  };
};

const TransactionHistory: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch transactions from API
  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/payment');
      
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      
      const data = await response.json();
      
      if (data.success && data.data.transactions) {
        setTransactions(data.data.transactions);
      } else {
        throw new Error(data.error || 'Failed to fetch transactions');
      }
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch transactions on component mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(transaction => 
    transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.receiver.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div className="flex items-center">
            <div className="mr-4 p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
              <FiCreditCard className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transaction History</h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                View and manage your payment transactions
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={fetchTransactions}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              disabled={isLoading}
            >
              <FiRefreshCw className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={() => router.push('/payment')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <FiPlus className="mr-2" />
              New Transaction
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search transactions..."
              className={`block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors ${styles.searchInput}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden ${styles.transactionCard}`}>
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
                <FiRefreshCw className="w-8 h-8 text-indigo-500 dark:text-indigo-400 animate-spin" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Loading transactions...</h3>
              <p className="text-gray-500 dark:text-gray-400">Please wait while we fetch your transaction history</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                <FiX className="w-8 h-8 text-red-500 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Error loading transactions</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
              <button
                onClick={fetchTransactions}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <FiRefreshCw className="mr-2" />
                Try Again
              </button>
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
                <FiClock className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {searchTerm ? 'No matching transactions found' : 'No transactions yet'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchTerm ? 'Try a different search term' : 'Start by making your first payment'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => router.push('/payment')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  <FiPlus className="mr-2" />
                  Make Payment
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FiCalendar className="mr-1 h-4 w-4" />
                        Date
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      From/To
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center justify-end">
                        <span className="mr-1">₹</span>
                        Amount
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredTransactions.map((transaction) => {
                    const isSender = transaction.sender.payId === session?.user?.payId;
                    return (
                      <tr key={transaction.id} className={styles.transactionRow}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500 dark:text-gray-400">
                          {transaction.transactionId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            isSender 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          } ${styles.statusBadge}`}>
                            {isSender ? 'Sent' : 'Received'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                          <div className="flex items-center">
                            <FiUser className="mr-2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                            <span>
                              {isSender
                                ? `To: ${transaction.receiver.name} (${transaction.receiver.payId})`
                                : `From: ${transaction.sender.name} (${transaction.sender.payId})`}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                          <span className={`${
                            isSender ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                          }`}>
                            {isSender ? '-' : '+'}{formatCurrency(transaction.amount)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                          <div className="flex justify-center space-x-3">
                            <button
                              onClick={() => {/* View transaction details */}}
                              className={`text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors ${styles.actionButton}`}
                              title="View Details"
                            >
                              <FiEye className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => {/* Download receipt */}}
                              className={`text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 transition-colors ${styles.actionButton}`}
                              title="Download Receipt"
                            >
                              <FiDownload className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
          >
            <FiArrowLeft className="mr-2 h-5 w-5" />
            Back to Dashboard
          </button>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
            {searchTerm && ` matching "${searchTerm}"`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;