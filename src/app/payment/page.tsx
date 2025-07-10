import { Metadata } from 'next';
import PaymentClient from './PaymentClient';

export const metadata: Metadata = {
  title: 'Make Payment | Payment App',
  description: 'Send money to another user',
};

export default function PaymentPage() {
  return <PaymentClient />;
}