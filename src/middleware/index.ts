import { defineMiddleware } from 'astro:middleware';
// import { authMiddleware } from './auth';

export const onRequest = defineMiddleware(async (context, next) => {
  // Auth middleware disabled for static site generation
  // Authentication is handled client-side via React components and nanostores
  console.log('Middleware: Allowing access to', context.url.pathname);
  return next();
});