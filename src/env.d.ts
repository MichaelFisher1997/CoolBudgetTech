/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SNIPCART_API_KEY: string;
  readonly SITE_NAME: string;
  readonly DEFAULT_LANG: string;
  readonly DEFAULT_CURRENCY: string;
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
  readonly SUPABASE_SERVICE_ROLE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
