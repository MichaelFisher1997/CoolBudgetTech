-- Supabase Database Schema for Ecommerce Store
-- Run this in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');

-- Categories table (hierarchical)
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image TEXT,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    image TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL, -- For compatibility with existing data
    inventory_count INTEGER DEFAULT 0 CHECK (inventory_count >= 0),
    sku VARCHAR(100) UNIQUE,
    weight DECIMAL(8,2), -- in grams
    dimensions JSONB, -- {width, height, depth} in cm
    tags TEXT[],
    featured BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User addresses table
CREATE TABLE user_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('shipping', 'billing')) DEFAULT 'shipping',
    name VARCHAR(255) NOT NULL,
    street TEXT NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(255) NOT NULL DEFAULT 'United Kingdom',
    phone VARCHAR(50),
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
    currency VARCHAR(3) NOT NULL DEFAULT 'GBP',
    status order_status DEFAULT 'pending',
    customer_email VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255),
    shipping_address JSONB,
    billing_address JSONB,
    payment_intent_id VARCHAR(255), -- For Stripe or other payment processors
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0), -- Price at time of order
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    verified_purchase BOOLEAN DEFAULT false,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_active ON products(active);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_user_addresses_user_id ON user_addresses(user_id);
CREATE INDEX idx_user_addresses_type ON user_addresses(type);
CREATE INDEX idx_user_addresses_is_default ON user_addresses(is_default);

-- Updated at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_addresses_updated_at BEFORE UPDATE ON user_addresses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) Policies
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Categories: Public read access
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (active = true);

-- Products: Public read access for active products
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (active = true);

-- Users: Users can read and update their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- User addresses: Users can manage their own addresses
CREATE POLICY "Users can view own addresses" ON user_addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own addresses" ON user_addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own addresses" ON user_addresses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own addresses" ON user_addresses FOR DELETE USING (auth.uid() = user_id);

-- Orders: Users can view their own orders
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Order items: Users can view items from their orders
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
    )
);

-- Reviews: Public read, authenticated users can create
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);

-- Insert sample categories
INSERT INTO categories (name, slug, description, sort_order) VALUES
('Headphones', 'headphones', 'High-quality audio headphones and earbuds', 1),
('Smart Tech', 'smart-tech', 'Smart home devices and wearables', 2),
('Speakers', 'speakers', 'Bluetooth and wireless speakers', 3),
('Accessories', 'accessories', 'Tech accessories and peripherals', 4),
('Gadgets', 'gadgets', 'Cool tech gadgets and tools', 5),
('Music', 'music', 'Music production and recording equipment', 6);

-- Insert sample products (migrating from existing data)
INSERT INTO products (name, description, price, image, slug, category, featured, sku) VALUES
('Wireless Bluetooth Headphones', 'High-quality wireless headphones with noise cancellation', 89.99, 'https://placehold.co/400x400/8B5CF6/FFFFFF?font=inter&text=Wireless+Headphones', 'wireless-headphones', 'Headphones', true, 'WBH-001'),
('Smart Fitness Tracker', 'Track your steps, heart rate, and sleep patterns', 49.99, '/images/products/smart-fitness-tracker.png', 'fitness-tracker', 'Smart Tech', false, 'SFT-002'),
('Portable Bluetooth Speaker', 'Compact speaker with 360-degree sound', 39.99, '/images/products/portable-bluetooth-speaker.png', 'bluetooth-speaker', 'Speakers', false, 'PBS-003'),
('Mechanical Gaming Keyboard', 'RGB backlit mechanical keyboard with blue switches', 79.99, '/images/products/mechanical-gaming-keyboard.png', 'gaming-keyboard', 'Accessories', true, 'MGK-004'),
('4K Action Camera', 'Waterproof action camera with image stabilization', 129.99, '/images/products/action-camera.png', 'action-camera', 'Gadgets', false, 'ACM-005'),
('Wireless Charging Pad', 'Fast wireless charging pad for all Qi-enabled devices', 24.99, '/images/products/wireless-charging-pad.png', 'wireless-charger', 'Accessories', false, 'WCP-006'),
('Smart Home Hub', 'Control all your smart devices from one hub', 99.99, '/images/products/smart-home-hub.png', 'smart-home-hub', 'Smart Tech', false, 'SHH-007'),
('Noise Cancelling Earbuds', 'True wireless earbuds with active noise cancellation', 119.99, '/images/products/noise-cancelling-earbuds.png', 'noise-cancelling-earbuds', 'Headphones', true, 'NCE-008'),
('Digital Audio Recorder', 'Professional grade recorder with high-quality microphones', 69.99, 'https://placehold.co/400x400/EC4899/FFFFFF?font=inter&text=Audio+Recorder', 'audio-recorder', 'Music', false, 'DAR-009'),
('USB-C Hub Adapter', 'Multi-port hub with HDMI, USB 3.0, and SD card reader', 34.99, '/images/products/usb-c-hub-adapter.png', 'usb-c-hub', 'Accessories', false, 'UCH-010');