import { useEffect } from 'react';
import LoginForm from './LoginForm';
import { initializeAuth } from '../../lib/auth-store';

export default function LoginPage() {
  useEffect(() => {
    console.log('LoginPage: Initializing auth');
    initializeAuth();
  }, []);

  const handleSuccess = () => {
    console.log('LoginPage: Login successful, redirecting to /account');
    // Give auth state a moment to settle before redirecting
    setTimeout(() => {
      console.log('LoginPage: Executing redirect now');
      window.location.assign('/account');
    }, 500);
  };

  const handleSwitchToSignUp = () => {
    // Redirect to signup page
    window.location.href = '/auth/signup';
  };

  return (
    <LoginForm 
      onSuccess={handleSuccess}
      onSwitchToSignUp={handleSwitchToSignUp}
    />
  );
}