-- Lead Hero Knowledge Base Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resources table
CREATE TABLE resources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('guide', 'sop', 'tutorial')),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  tags TEXT[] DEFAULT '{}',
  body_html TEXT NOT NULL,
  youtube_url VARCHAR(500),
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  author VARCHAR(255),
  description TEXT,
  og_image VARCHAR(500)
);

-- Create view_counts table
CREATE TABLE view_counts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  resource_id UUID NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(resource_id)
);

-- Create indexes for better performance
CREATE INDEX idx_resources_category_id ON resources(category_id);
CREATE INDEX idx_resources_published ON resources(published);
CREATE INDEX idx_resources_slug ON resources(slug);
CREATE INDEX idx_resources_type ON resources(type);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_view_counts_resource_id ON view_counts(resource_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_view_counts_updated_at BEFORE UPDATE ON view_counts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE view_counts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories
-- Public can read published categories
CREATE POLICY "Public can read categories" ON categories
  FOR SELECT USING (true);

-- Authenticated users can manage categories
CREATE POLICY "Authenticated users can manage categories" ON categories
  FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for resources
-- Public can read published resources
CREATE POLICY "Public can read published resources" ON resources
  FOR SELECT USING (published = true);

-- Authenticated users can manage all resources
CREATE POLICY "Authenticated users can manage resources" ON resources
  FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for view_counts
-- Public can read view counts
CREATE POLICY "Public can read view counts" ON view_counts
  FOR SELECT USING (true);

-- Public can insert/update view counts (for tracking views)
CREATE POLICY "Public can manage view counts" ON view_counts
  FOR ALL USING (true);

-- Insert initial categories
INSERT INTO categories (name, slug, "order") VALUES
  ('Guides', 'guides', 1),
  ('SOPs', 'sops', 2),
  ('Tutorials', 'tutorials', 3),
  ('Troubleshooting', 'troubleshooting', 4);

-- Insert sample resources
INSERT INTO resources (title, slug, type, category_id, tags, body_html, published, author, description) VALUES
  (
    'Getting Started with Lead Hero',
    'getting-started-with-lead-hero',
    'guide',
    (SELECT id FROM categories WHERE slug = 'guides'),
    ARRAY['setup', 'onboarding', 'basics'],
    '<h2>Welcome to Lead Hero</h2><p>This comprehensive guide will help you set up your Lead Hero account and understand the core features.</p><h3>Getting Started</h3><p>Follow these steps to get started with Lead Hero:</p><ol><li>Create your account</li><li>Set up your profile</li><li>Configure your first campaign</li></ol>',
    true,
    'Sarah Chen',
    'Complete guide to setting up your Lead Hero account and understanding the core features.'
  ),
  (
    'User Management SOP',
    'user-management-sop',
    'sop',
    (SELECT id FROM categories WHERE slug = 'sops'),
    ARRAY['users', 'permissions', 'admin'],
    '<h2>User Management Standard Operating Procedure</h2><p>This SOP outlines the standard procedures for managing user accounts, roles, and permissions.</p><h3>User Creation Process</h3><p>Follow these steps to create new user accounts:</p><ol><li>Verify user requirements</li><li>Assign appropriate role</li><li>Send welcome email</li></ol>',
    true,
    'Mike Johnson',
    'Standard operating procedure for managing user accounts, roles, and permissions.'
  ),
  (
    'Lead Generation Tutorial',
    'lead-generation-tutorial',
    'tutorial',
    (SELECT id FROM categories WHERE slug = 'tutorials'),
    ARRAY['leads', 'campaigns', 'marketing'],
    '<h2>Lead Generation Tutorial</h2><p>Learn how to create effective lead generation campaigns with this step-by-step tutorial.</p><h3>Campaign Setup</h3><p>Start by setting up your campaign parameters...</p>',
    true,
    'Emma Davis',
    'Step-by-step tutorial on creating effective lead generation campaigns.'
  );

-- Create a function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(resource_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  new_count INTEGER;
BEGIN
  INSERT INTO view_counts (resource_id, count)
  VALUES (resource_uuid, 1)
  ON CONFLICT (resource_id)
  DO UPDATE SET 
    count = view_counts.count + 1,
    updated_at = NOW()
  RETURNING count INTO new_count;
  
  RETURN new_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_view_count(UUID) TO anon, authenticated;

