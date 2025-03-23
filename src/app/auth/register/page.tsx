import { Metadata } from 'next';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Register | Payment App',
  description: 'Create a new account',
};

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto">
      <RegisterForm />
    </div>
  );
}