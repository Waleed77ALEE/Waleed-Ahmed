-- ==========================================
-- PREMIUM ENTERPRISE E-COMMERCE SCHEMA
-- ==========================================

-- 1. PRODUCTS TABLE
-- Stores all digital services, software, and physical items
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  features JSONB DEFAULT '[]'::jsonb, -- Array of strings
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  license_type VARCHAR(100),
  badge VARCHAR(50),
  icon VARCHAR(50),
  platform VARCHAR(50), -- e.g., Windows, Mac, Multi-Platform
  download_size VARCHAR(50),
  instant_delivery BOOLEAN DEFAULT true,
  seo_title VARCHAR(255),
  seo_description TEXT,
  download_url TEXT,
  activation_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. VERIFIED CUSTOMER REVIEWS TABLE
-- Stores product reviews and ratings
CREATE TABLE product_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_title VARCHAR(255),
  review_body TEXT,
  is_verified_buyer BOOLEAN DEFAULT true,
  helpful_votes INTEGER DEFAULT 0,
  user_photos JSONB DEFAULT '[]'::jsonb, -- Array of image URLs
  status VARCHAR(50) DEFAULT 'published' CHECK (status IN ('pending', 'published', 'flagged')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. ORDERS TABLE
CREATE TABLE customer_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_number VARCHAR(100) UNIQUE NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
  order_status VARCHAR(50) DEFAULT 'processing' CHECK (order_status IN ('processing', 'fulfilled', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. ORDER ITEMS TABLE
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES customer_orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  delivery_key TEXT, -- Activation key if digital
  download_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_reviews_product_id ON product_reviews(product_id);
CREATE INDEX idx_orders_user_id ON customer_orders(user_id);

-- RLS (Row Level Security) Policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read published products
CREATE POLICY "Public read access for products" ON products FOR SELECT USING (true);

-- Allow anyone to read published reviews
CREATE POLICY "Public read access for published reviews" ON product_reviews FOR SELECT USING (status = 'published');

-- Allow verified users to insert reviews for products they bought (Logic handled in Edge Function / backend)
CREATE POLICY "Users can insert own reviews" ON product_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
