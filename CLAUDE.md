# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `bun run dev` - Start development server at localhost:4321
- `bun run build` - Build production site to ./dist/
- `bun run preview` - Preview build locally before deploying
- `bun install` - Install dependencies
- `docker-compose up --build` - Run production build with Docker
- `docker-compose -f docker-compose.dev.yml up --build` - Run development server with Docker (hot reload)

## Architecture Overview

This is an Astro-based ecommerce boilerplate with the following key architectural components:

### Tech Stack
- **Astro 5.x** - Static site generator with component islands
- **TailwindCSS 4.x** - Utility-first styling (configured via Vite plugin)
- **Nanostores** - Lightweight state management for client-side interactions
- **Snipcart v3** - External shopping cart and payment processing
- **Supabase** - Backend-as-a-Service for database, authentication, and real-time features
- **TypeScript** - Type safety with strict configuration

### State Management
Global state is managed via nanostores in `src/lib/stores.ts`:
- `locale` - Current language (en/fr/de)
- `currency` - Current currency (USD/GBP/EUR) 
- `darkMode` - Theme preference with localStorage persistence
- Call `initializeStores()` on the client-side to set up localStorage integration

### Data Layer
- **Legacy**: Product data in `src/data/products.ts` (for static fallback)
- **Supabase**: Database schema defined in `src/lib/database.types.ts`
- **Client**: Supabase client configured in `src/lib/supabase.ts` with helper functions
- Localization files in `src/data/locales/` (en.json, fr.json, de.json)
- Currency conversion logic with GBP as base currency

### Database Schema (Supabase)
- `products` - Product catalog with inventory, metadata, and media
- `categories` - Hierarchical category structure
- `orders` - Order management with customer and payment details
- `order_items` - Individual items within orders
- `users` - User profiles linked to Supabase Auth
- `reviews` - Product reviews and ratings

### Multi-language Support
- Route-based internationalization with `/en/`, `/fr/`, `/de/` paths
- Default language and currency set via environment variables
- Language switching handled client-side via stores

### Component Structure
- Layout: `src/layouts/DefaultLayout.astro` - Main page wrapper
- Core components: `Header.astro`, `Footer.astro`, `ProductCard.astro`
- Pages use file-based routing with dynamic routes for products and categories
- Client-side functionality is handled via `<script>` tags in components for static site compatibility

### Environment Configuration
Required environment variables (see `.env.example`):
- `SNIPCART_API_KEY` - Snipcart public API key for cart functionality
- `PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (server-side only)
- `SITE_NAME` - Store name
- `DEFAULT_LANG` - Default language (en/fr/de)
- `DEFAULT_CURRENCY` - Default currency (USD/GBP/EUR)

### Deployment
Configured for Cloudflare Pages with static output. Build command: `bun run build`, output directory: `dist`.