'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiDollarSign, FiList, FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const textColor = isDark ? '#e5e7eb' : '#1f2937';
  const bgColor = isDark ? '#1f2937' : '#ffffff';
  const hoverBgColor = isDark ? '#374151' : '#f3f4f6';
  const activeBgColor = isDark ? '#374151' : '#f3f4f6';
  const activeTextColor = isDark ? '#60a5fa' : '#3b82f6';
  const borderColor = isDark ? '#374151' : '#e5e7eb';

  return (
    <nav style={{ 
      backgroundColor: bgColor, 
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s, color 0.3s'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0.75rem 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link 
            href="/" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              color: isDark ? '#60a5fa' : '#3b82f6',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
          >
            <FiDollarSign style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} />
            <span>PayApp</span>
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {session?.user ? (
              <>
                <Link 
                  href="/dashboard" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '0.5rem 0.75rem', 
                    borderRadius: '0.375rem', 
                    transition: 'background-color 0.2s, color 0.2s',
                    backgroundColor: pathname === '/dashboard' ? activeBgColor : 'transparent',
                    color: pathname === '/dashboard' ? activeTextColor : textColor,
                    textDecoration: 'none'
                  }}
                >
                  <FiHome style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  href="/payment" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '0.5rem 0.75rem', 
                    borderRadius: '0.375rem', 
                    transition: 'background-color 0.2s, color 0.2s',
                    backgroundColor: pathname === '/payment' ? activeBgColor : 'transparent',
                    color: pathname === '/payment' ? activeTextColor : textColor,
                    textDecoration: 'none'
                  }}
                >
                  <FiDollarSign style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                  <span>Payment</span>
                </Link>
                <Link 
                  href="/transaction" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '0.5rem 0.75rem', 
                    borderRadius: '0.375rem', 
                    transition: 'background-color 0.2s, color 0.2s',
                    backgroundColor: pathname === '/transaction' ? activeBgColor : 'transparent',
                    color: pathname === '/transaction' ? activeTextColor : textColor,
                    textDecoration: 'none'
                  }}
                >
                  <FiList style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                  <span>Transactions</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '0.5rem 1rem', 
                    backgroundColor: isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(254, 202, 202, 0.5)', 
                    color: isDark ? '#f87171' : '#dc2626', 
                    borderRadius: '0.375rem', 
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                >
                  <FiLogOut style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/login" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '0.5rem 0.75rem', 
                    borderRadius: '0.375rem', 
                    transition: 'background-color 0.2s, color 0.2s',
                    backgroundColor: pathname === '/auth/login' ? activeBgColor : 'transparent',
                    color: pathname === '/auth/login' ? activeTextColor : textColor,
                    textDecoration: 'none'
                  }}
                >
                  <FiLogIn style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                  <span>Login</span>
                </Link>
                <Link 
                  href="/auth/register" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '0.5rem 1rem', 
                    backgroundColor: isDark ? '#3b82f6' : '#3b82f6', 
                    color: '#ffffff', 
                    borderRadius: '0.375rem', 
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    textDecoration: 'none'
                  }}
                >
                  <FiUserPlus style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}