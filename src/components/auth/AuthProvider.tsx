import { useEffect } from 'react';
import { initializeAuth } from '../../lib/auth-store';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  useEffect(() => {
    initializeAuth();
  }, []);

  return <>{children}</>;
}