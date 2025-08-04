import SignUpFormEnhanced from './SignUpFormEnhanced';

export default function SignUpPage() {
  const handleSuccess = () => {
    // For signup, we'll stay on the success page to show email verification message
    // User will manually navigate to login after email verification
    console.log('SignUpPage: Registration successful, showing verification message');
  };

  const handleSwitchToSignIn = () => {
    // Redirect to login page
    window.location.href = '/auth/login';
  };

  return (
    <SignUpFormEnhanced 
      onSuccess={handleSuccess}
      onSwitchToLogin={handleSwitchToSignIn}
    />
  );
}