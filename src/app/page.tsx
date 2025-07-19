import Link from 'next/link';
import { FaLock, FaMoneyBill, FaHistory } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-[#1a1f2b] dark:via-[#1e2330] dark:to-[#1a1f2b] flex flex-col justify-center py-16 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-indigo-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400">
            <span className="text-blue-600 dark:text-blue-400">₹</span>PayApp
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300/90 max-w-md mx-auto leading-relaxed">
            A simple and secure way to send and receive payments.
          </p>
        </div>

        <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/50 dark:bg-white/5 backdrop-blur-xl py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-gray-200 dark:border-white/10">
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/auth/login"
                className="group relative w-full flex items-center justify-center px-6 py-3.5 text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity"></span>
                <span className="relative">Login</span>
              </Link>
              <Link
                href="/auth/register"
                className="w-full flex items-center justify-center px-6 py-3.5 border border-gray-300 dark:border-white/20 text-base font-medium rounded-xl text-gray-700 dark:text-gray-200 bg-white/30 dark:bg-white/5 hover:bg-white/70 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 backdrop-blur-sm"
              >
                Register
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 px-4 sm:px-0">
            <div className="group bg-white/30 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center text-center hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-300 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transform hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center text-blue-500 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaMoneyBill className="text-2xl group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors" />
              </div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">Easy Transfers</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Transfer money instantly using unique 5-digit Pay IDs.
              </p>
            </div>

            <div className="group bg-white/30 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center text-center hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-300 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transform hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center text-green-500 dark:text-green-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaLock className="text-2xl group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors" />
              </div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors">Secure</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Your transactions are secure and your data is protected.
              </p>
            </div>

            <div className="group bg-white/30 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center text-center hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-300 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transform hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 flex items-center justify-center text-indigo-500 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaHistory className="text-2xl group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors" />
              </div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">Track Payments</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Keep track of all your transactions in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
