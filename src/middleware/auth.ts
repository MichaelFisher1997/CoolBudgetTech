import type { MiddlewareResponseHandler } from 'astro';
import { supabase } from '../lib/supabase';

// Routes that require authentication
const protectedRoutes = [
  '/account',
  '/account/',
  '/account/orders',
  '/account/profile'
];

// Routes that should redirect authenticated users
const authRoutes = [
  '/auth/login',
  '/auth/signup'
];

export const authMiddleware: MiddlewareResponseHandler = async (context, next) => {
  const { request, url } = context;
  const pathname = url.pathname;

  // Check if the route needs protection
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );
  
  const isAuthRoute = authRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // Get session from request headers (if available)
  const authHeader = request.headers.get('Authorization');
  let session = null;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    try {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (!error && user) {
        session = { user };
      }
    } catch (err) {
      console.error('Auth middleware error:', err);
    }
  }

  // Redirect logic
  if (isProtectedRoute && !session) {
    // Redirect to login if trying to access protected route without auth
    return Response.redirect(new URL('/auth/login', url.origin));
  }
  
  if (isAuthRoute && session) {
    // Redirect to account if trying to access auth routes while logged in
    return Response.redirect(new URL('/account', url.origin));
  }

  // Continue to the next middleware or route handler
  return next();
};

// Helper function to check if user is authenticated on client-side
export function requireAuth() {
  if (typeof window !== 'undefined') {
    import('../lib/auth-store').then(({ userAtom, loadingAtom }) => {
      const checkAuth = () => {
        if (!loadingAtom.get() && !userAtom.get()) {
          window.location.href = '/auth/login';
        }
      };
      
      // Check immediately
      checkAuth();
      
      // Check again after a short delay to allow auth to initialize
      setTimeout(checkAuth, 1000);
    });
  }
}