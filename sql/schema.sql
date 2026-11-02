-- ==============================================================================
-- RISSS.CLOBBER — POSTGRESQL DATABASE SCHEMA
-- E-Commerce Curated Casual & Streetwear
-- Kompatibel dengan pgAdmin 4 & PostgreSQL 12+
-- ==============================================================================

-- 1. TABEL BRANDS (Stone Island, C.P. Company, Adidas, Ellesse)
CREATE TABLE IF NOT EXISTS brands (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    country VARCHAR(64) DEFAULT 'Europe',
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABEL CATEGORIES (Jacket, T-Shirt, Polo, Hoodie, Pants, Sneakers)
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABEL USERS (Customer & Admin)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(180) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(32),
    role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. TABEL USER_ADDRESSES (Buku Alamat Pengiriman Pelanggan)
CREATE TABLE IF NOT EXISTS user_addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipient_name VARCHAR(150) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    address_line TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(16) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. TABEL PRODUCTS (Master Produk Fashion)
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(64) PRIMARY KEY, -- SKU / ID Unik contoh: 'si-jacket'
    name VARCHAR(255) NOT NULL,
    brand_id INTEGER NOT NULL REFERENCES brands(id) ON DELETE RESTRICT,
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    price NUMERIC(14, 2) NOT NULL CHECK (price >= 0),
    discount_price NUMERIC(14, 2) DEFAULT 0 CHECK (discount_price >= 0),
    primary_color VARCHAR(64) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    is_new_arrival BOOLEAN DEFAULT FALSE,
    is_best_seller BOOLEAN DEFAULT FALSE,
    total_stock INTEGER NOT NULL DEFAULT 0 CHECK (total_stock >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. TABEL PRODUCT_SIZES (Ketersediaan Ukuran & Stok per Varian)
CREATE TABLE IF NOT EXISTS product_sizes (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(64) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size_label VARCHAR(16) NOT NULL, -- S, M, L, XL, 30, 32, 42, dsb.
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    UNIQUE(product_id, size_label)
);

-- 7. TABEL ORDERS (Header Transaksi Pesanan)
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(64) UNIQUE NOT NULL, -- Format: RC-YYYYMMDD-XXXX
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(180) NOT NULL,
    customer_phone VARCHAR(32) NOT NULL,
    shipping_address TEXT NOT NULL,
    shipping_city VARCHAR(100) NOT NULL,
    shipping_postal_code VARCHAR(16) NOT NULL,
    courier VARCHAR(64) NOT NULL, -- JNE Regular, SiCepat Best, dsb.
    payment_method VARCHAR(64) NOT NULL, -- Bank Transfer, Virtual Account, E-Wallet, COD
    subtotal NUMERIC(14, 2) NOT NULL CHECK (subtotal >= 0),
    shipping_cost NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (shipping_cost >= 0),
    discount_amount NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
    total_amount NUMERIC(14, 2) NOT NULL CHECK (total_amount >= 0),
    order_status VARCHAR(32) NOT NULL DEFAULT 'Pending' 
        CHECK (order_status IN ('Pending', 'Paid', 'Processing', 'Shipped', 'Delivered', 'Cancelled')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. TABEL ORDER_ITEMS (Detail Baris Item Pesanan)
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(64) REFERENCES products(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,
    brand_name VARCHAR(128) NOT NULL,
    size VARCHAR(16) NOT NULL,
    color VARCHAR(64) NOT NULL,
    unit_price NUMERIC(14, 2) NOT NULL CHECK (unit_price >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    line_total NUMERIC(14, 2) NOT NULL CHECK (line_total >= 0)
);

-- 9. TABEL NEWSLETTER_SUBSCRIBERS
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(180) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. TABEL CONTACT_INQUIRIES (Pesan dari Formulir Kontak)
CREATE TABLE IF NOT EXISTS contact_inquiries (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(180) NOT NULL,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. TABEL CART_ITEMS (Keranjang Persisten per User)
CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id VARCHAR(64) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size VARCHAR(16) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id, size)
);

-- 12. TABEL WISHLIST_ITEMS (Wishlist Persisten per User)
CREATE TABLE IF NOT EXISTS wishlist_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id VARCHAR(64) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- INDEX UNTUK PERFORMA QUERY
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
