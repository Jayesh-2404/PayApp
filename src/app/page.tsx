import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to PayApp</h1>
      <p className="text-xl mb-8">
        A simple and secure way to send and receive payments.
      </p>
      
      <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto">
        <Link
          href="/auth/login"
          className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Login
        </Link>
        <Link
          href="/auth/register"
          className="bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors"
        >
          Register
        </Link>
      </div>
      
      <div className="mt-16 grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Easy Transfers</h2>
          <p>
            Transfer money instantly using unique 5-digit Pay IDs.
          </p>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Secure</h2>
          <p>
            Your transactions are secure and your data is protected.
          </p>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Track Payments</h2>
          <p>
            Keep track of all your transactions in one place.
          </p>
        </div>
      </div>
    </div>
  );
}