import { useStore } from '@nanostores/react';
import { darkMode } from '../lib/stores';
import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const isDarkMode = useStore(darkMode);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before showing to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Subscribe to dark mode changes and apply to DOM
  useEffect(() => {
    if (mounted) {
      console.log('Applying dark mode:', isDarkMode);
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        console.log('Added dark class to html element');
      } else {
        document.documentElement.classList.remove('dark');
        console.log('Removed dark class from html element');
      }
      localStorage.setItem('darkMode', String(isDarkMode));
      console.log('HTML classes:', document.documentElement.className);
    }
  }, [isDarkMode, mounted]);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    console.log('Toggling dark mode from', isDarkMode, 'to', newDarkMode);
    darkMode.set(newDarkMode);
  };

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <button className="rounded-full p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </button>
    );
  }

  return (
    <button 
      onClick={toggleDarkMode}
      className="rounded-full p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        // Moon icon (dark mode is active)
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        // Sun icon (light mode is active)
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  );
}