import { Metadata } from 'next';
import UserInfo from '@/components/dashboard/UserInfo';

export const metadata: Metadata = {
  title: 'Dashboard | Payment App',
  description: 'View your account information and balance',
};

export default function DashboardPage() {
  return (
    <div className="max-w-md mx-auto">
      <UserInfo />
    </div>
  );
}