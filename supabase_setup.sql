-- BRITO MOTORS - SUPABASE SCHEMA SETUP

-- 1. VEHICLES TABLE
CREATE TABLE IF NOT EXISTS vehicles (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    year TEXT,
    price DECIMAL(12, 2),
    km TEXT,
    img TEXT,
    trans TEXT,
    fuel TEXT,
    tags TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BRANDS TABLE
CREATE TABLE IF NOT EXISTS brands (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SETTINGS TABLE
CREATE TABLE IF NOT EXISTS settings (
    id TEXT PRIMARY KEY, -- Use 'global' as the id
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS testimonials (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    role TEXT,
    msg TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. BANNERS TABLE
CREATE TABLE IF NOT EXISTS banners (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    url TEXT NOT NULL,
    link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

-- Simple Policies: Everyone can read everything
CREATE POLICY "Allow public read on vehicles" ON vehicles FOR SELECT USING (true);
CREATE POLICY "Allow public read on brands" ON brands FOR SELECT USING (true);
CREATE POLICY "Allow public read on settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Allow public read on testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read on banners" ON banners FOR SELECT USING (true);

-- Admin Policies: For now, allowing all actions for development. 
-- In production, you'd use authentication.
CREATE POLICY "Allow all on vehicles" ON vehicles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on brands" ON brands FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on settings" ON settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on testimonials" ON testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on banners" ON banners FOR ALL USING (true) WITH CHECK (true);
