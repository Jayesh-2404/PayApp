'use client';

import { ReactNode } from 'react';
import Navbar from './Navbar';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from 'next-themes';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      <div style={{ flexGrow: 1, maxWidth: '1200px', margin: '0 auto', padding: '1rem', position: 'relative' }}>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            padding: '0.5rem',
            borderRadius: '9999px',
            backgroundColor: theme === 'dark' ? '#374151' : '#e5e7eb',
            color: theme === 'dark' ? '#e5e7eb' : '#1f2937',
            transition: 'background-color 0.2s, color 0.2s',
            border: 'none',
            cursor: 'pointer',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.5rem',
            height: '2.5rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <FiSun style={{ width: '1.25rem', height: '1.25rem' }} /> : <FiMoon style={{ width: '1.25rem', height: '1.25rem' }} />}
        </button>
        
        <main style={{ width: '100%' }}>
          {children}
        </main>
      </div>
      
      <footer style={{ 
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff', 
        boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.1)',
        marginTop: 'auto',
        padding: '1rem 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', textAlign: 'center', color: theme === 'dark' ? '#d1d5db' : '#4b5563' }}>
          <p>© {new Date().getFullYear()} PayApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 