import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Create client with fallback for development
export const supabase = isSupabaseConfigured 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null; // Fallback when not configured

// Helper functions for common operations
export const auth = supabase?.auth;

// Database helpers
export async function getProducts() {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getProductBySlug(slug: string) {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getProductsByCategory(category: string) {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .eq('active', true)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function searchProducts(query: string) {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
    .eq('active', true)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function createOrder(orderData: {
  user_id?: string;
  total_amount: number;
  currency: string;
  status: string;
  customer_email: string;
  customer_name?: string;
  shipping_address?: any;
  billing_address?: any;
}) {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('orders')
    .insert(orderData)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function createOrderItems(orderItems: {
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
}[]) {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('order_items')
    .insert(orderItems)
    .select();
  
  if (error) throw error;
  return data;
}

export async function getUserOrders(userId: string) {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

// Address management functions
export async function getUserAddresses() {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('user_addresses')
    .select('*')
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

export async function createAddress(addressData: {
  type: 'shipping' | 'billing';
  name: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone?: string;
  is_default?: boolean;
}) {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No user logged in');

  // If this is being set as default, unset all other defaults of the same type
  if (addressData.is_default) {
    await supabase
      .from('user_addresses')
      .update({ is_default: false })
      .eq('user_id', user.id)
      .eq('type', addressData.type);
  }

  const { data, error } = await supabase
    .from('user_addresses')
    .insert({
      user_id: user.id,
      ...addressData,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateAddress(id: string, updates: {
  type?: 'shipping' | 'billing';
  name?: string;
  street?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  phone?: string;
  is_default?: boolean;
}) {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No user logged in');

  // If this is being set as default, unset all other defaults of the same type
  if (updates.is_default && updates.type) {
    await supabase
      .from('user_addresses')
      .update({ is_default: false })
      .eq('user_id', user.id)
      .eq('type', updates.type);
  }

  const { data, error } = await supabase
    .from('user_addresses')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteAddress(id: string) {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No user logged in');

  const { error } = await supabase
    .from('user_addresses')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;
}

export async function setDefaultAddress(id: string, type: 'shipping' | 'billing') {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No user logged in');

  // Unset all other defaults of this type
  await supabase
    .from('user_addresses')
    .update({ is_default: false })
    .eq('user_id', user.id)
    .eq('type', type);

  // Set this address as default
  const { data, error } = await supabase
    .from('user_addresses')
    .update({ is_default: true })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}