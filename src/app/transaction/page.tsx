import { Metadata } from 'next';
import TransactionHistory from '@/components/transaction/TransactionHistory';

export const metadata: Metadata = {
  title: 'Transaction History | Payment App',
  description: 'View your transaction history',
};

export default function TransactionPage() {
  return (
    <div className="w-full">
      <TransactionHistory />
    </div>
  );
}