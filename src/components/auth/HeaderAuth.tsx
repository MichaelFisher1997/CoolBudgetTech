import { useState } from 'react';
import UserMenu from './UserMenu';
import AuthModal from './AuthModal';
import AuthProvider from './AuthProvider';

export default function HeaderAuth() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <AuthProvider>
      <UserMenu onAuthClick={() => setShowAuthModal(true)} />
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </AuthProvider>
  );
}