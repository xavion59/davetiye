-- Site settings table for showing/hiding sections
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  settings JSONB NOT NULL DEFAULT '{"showNikah": true}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO site_settings (id, settings)
VALUES (1, '{"showNikah": true}')
ON CONFLICT (id) DO NOTHING;

-- RLS: everyone can read, anyone can update
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update site settings"
  ON site_settings FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can insert site settings"
  ON site_settings FOR INSERT
  WITH CHECK (true);