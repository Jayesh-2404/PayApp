import { Metadata } from 'next';
import PaymentForm from '@/components/payment/PaymentForm';

export const metadata: Metadata = {
  title: 'Make Payment | Payment App',
  description: 'Send money to another user',
};

export default function PaymentPage() {
  return (
    <div className="max-w-md mx-auto">
      <PaymentForm />
    </div>
  );
}