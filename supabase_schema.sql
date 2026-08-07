-- =========================================================================
-- SOR CONNECT — SUPABASE DATABASE SETUP SCHEMA
-- Paste this script inside your Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- =========================================================================

-- 1. Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE
);

-- 2. Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    client VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    capacity VARCHAR(100) NOT NULL,
    sector_or_type VARCHAR(100) NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 4. Enable public read access policies
CREATE POLICY "Allow public select on categories" ON categories 
    FOR SELECT TO anon USING (true);

CREATE POLICY "Allow public select on projects" ON projects 
    FOR SELECT TO anon USING (true);

-- =========================================================================
-- SEED DATA — POPULATING DEFAULT PORTFOLIO ITEMS
-- =========================================================================

-- Insert Categories
INSERT INTO categories (name, slug) VALUES 
('EPC Portfolio', 'epc'),
('I&C / O&M Portfolio', 'ic_om')
ON CONFLICT (slug) DO NOTHING;

-- Insert EPC Projects (Category: epc)
INSERT INTO projects (client, location, capacity, sector_or_type, category_id) VALUES
('Vishwaraj Environment Ltd', 'Agra', '2315 KW', 'STP', (SELECT id FROM categories WHERE slug = 'epc')),
('Rana Bai Marble & Granite', 'Kishangarh, Ajmer', '324 KW', 'Marble', (SELECT id FROM categories WHERE slug = 'epc')),
('KGK Dia Processing', 'Jasdan, Rajkot', '250 KW', 'Diamond', (SELECT id FROM categories WHERE slug = 'epc')),
('Arihant Oil & Mills Ltd', 'Sri Ganganagar', '240 KW', 'Oil', (SELECT id FROM categories WHERE slug = 'epc')),
('Quality Marble Export', 'Jalore', '200 KW', 'Marble', (SELECT id FROM categories WHERE slug = 'epc'))
ON CONFLICT DO NOTHING;

-- Insert I&C / O&M Projects (Category: ic_om)
INSERT INTO projects (client, location, capacity, sector_or_type, category_id) VALUES
('Shreej Solar Solution', 'Surat', '1300 KW', 'I&C', (SELECT id FROM categories WHERE slug = 'ic_om')),
('Yutaka Autoparts Pvt Ltd', 'Bhiwadi', '736 KW', 'I&C', (SELECT id FROM categories WHERE slug = 'ic_om')),
('Krishna Ishizaki Auto Ltd', 'Binola', '514 KW', 'I&C', (SELECT id FROM categories WHERE slug = 'ic_om')),
('Fine Vibes Pvt Ltd', 'Raipur, C.G.', '500 KW', 'I&C', (SELECT id FROM categories WHERE slug = 'ic_om')),
('Green Energy', 'Kishangarh, Ajmer', '420 KW', 'O&M', (SELECT id FROM categories WHERE slug = 'ic_om'))
ON CONFLICT DO NOTHING;
