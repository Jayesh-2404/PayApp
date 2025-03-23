import { Metadata } from 'next';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login | Payment App',
  description: 'Log in to your account',
};

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto">
      <LoginForm />
    </div>
  );
}