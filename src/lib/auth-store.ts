import { atom } from 'nanostores';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from './supabase';

// Auth state atoms
export const userAtom = atom<User | null>(null);
export const sessionAtom = atom<Session | null>(null);
export const loadingAtom = atom<boolean>(true);

// Initialize auth state and listen for changes
export function initializeAuth() {
  console.log('auth-store.initializeAuth: Starting initialization');
  console.log('auth-store.initializeAuth: isSupabaseConfigured =', isSupabaseConfigured);
  console.log('auth-store.initializeAuth: supabase =', !!supabase);
  
  if (!isSupabaseConfigured || !supabase) {
    console.warn('Supabase not configured - auth features disabled');
    loadingAtom.set(false);
    return;
  }

  console.log('auth-store.initializeAuth: Getting initial session');
  // Get initial session
  supabase.auth.getSession().then(({ data: { session }, error }) => {
    console.log('auth-store.initializeAuth: Initial session result:', { session, error });
    if (error) {
      console.error('Error getting session:', error);
    }
    sessionAtom.set(session);
    userAtom.set(session?.user ?? null);
    loadingAtom.set(false);
  });

  console.log('auth-store.initializeAuth: Setting up auth state change listener');
  // Listen for auth changes
  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('auth-store.onAuthStateChange: Event =', event, 'Session =', session);
    sessionAtom.set(session);
    userAtom.set(session?.user ?? null);
    loadingAtom.set(false);
    
    // Handle specific auth events
    if (event === 'SIGNED_IN') {
      console.log('User signed in:', session?.user?.email);
      
      // Check if this is a new user with address data in metadata
      if (session?.user) {
        await handleFirstTimeLogin(session.user);
      }
    } else if (event === 'SIGNED_OUT') {
      console.log('User signed out');
      
      // Clear cart when user logs out
      if (typeof window !== 'undefined' && (window as any).Snipcart) {
        try {
          (window as any).Snipcart.api.cart.clear();
          console.log('Cart cleared on logout');
        } catch (error) {
          console.error('Error clearing cart on logout:', error);
        }
      }
      
      // Clear session storage
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('cartData');
      }
    }
  });
}

// Handle first-time login setup
async function handleFirstTimeLogin(user: any) {
  if (!supabase) return;
  
  try {
    console.log('handleFirstTimeLogin: Checking for address setup needs');
    
    // Check if address data exists in metadata and no addresses exist yet
    if (user.user_metadata?.address) {
      console.log('handleFirstTimeLogin: Found address data in metadata:', user.user_metadata.address);
      
      // Check if user already has addresses
      const { data: existingAddresses } = await supabase
        .from('user_addresses')
        .select('id')
        .eq('user_id', user.id);

      if (!existingAddresses || existingAddresses.length === 0) {
        console.log('handleFirstTimeLogin: Creating address from signup data');
        
        // Create the address from signup data
        const { data, error } = await supabase
          .from('user_addresses')
          .insert({
            user_id: user.id,
            type: 'shipping',
            name: 'Home',
            street: user.user_metadata.address.street,
            city: user.user_metadata.address.city,
            state: user.user_metadata.address.state,
            postal_code: user.user_metadata.address.postal_code,
            country: user.user_metadata.address.country,
            phone: user.user_metadata.address.phone || null,
            is_default: true,
          });
        
        if (error) {
          console.error('handleFirstTimeLogin: Error creating address:', error);
        } else {
          console.log('handleFirstTimeLogin: Address created successfully:', data);
        }
      }
    }
  } catch (error) {
    console.error('handleFirstTimeLogin: Error during setup:', error);
  }
}

// Auth helper functions
export async function signUp(email: string, password: string, name?: string, additionalData?: any) {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name || '',
        ...additionalData,
      },
    },
  });

  if (error) throw error;

  // Store address data in user metadata for now - we'll create it after email verification
  // The address will be created when the user first logs in
  console.log('SignUp: User created, address data stored in metadata:', additionalData?.address);

  return data;
}

export async function signIn(email: string, password: string) {
  console.log('auth-store.signIn: Starting login process');
  if (!supabase) {
    console.error('auth-store.signIn: Supabase not configured');
    throw new Error('Supabase not configured');
  }
  
  console.log('auth-store.signIn: Calling supabase.auth.signInWithPassword');
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log('auth-store.signIn: Response received:', { data, error });
  
  if (error) {
    console.error('auth-store.signIn: Error occurred:', error);
    throw error;
  }
  
  console.log('auth-store.signIn: Login successful, returning data');
  return data;
}

export async function signInWithGoogle() {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/account`,
    },
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });

  if (error) throw error;
}

export async function updatePassword(password: string) {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw error;
}

export async function updateProfile(updates: {
  name?: string;
  avatar_url?: string;
}) {
  if (!supabase) throw new Error('Supabase not configured');
  
  const user = userAtom.get();
  if (!user) throw new Error('No user logged in');

  // Update auth metadata - this is stored in auth.users
  const { error: authError } = await supabase.auth.updateUser({
    data: updates,
  });

  if (authError) throw authError;
  
  // No need to update a separate users table - auth.users handles this
}

// Helper to check if user is authenticated
export function isAuthenticated(): boolean {
  return !!userAtom.get();
}

// Helper to get current user
export function getCurrentUser(): User | null {
  return userAtom.get();
}