-- Hero layout positions table
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS hero_positions (
  id INTEGER PRIMARY KEY DEFAULT 1,
  positions JSONB NOT NULL DEFAULT '{
    "davetlisiniz": { "x": 50, "y": 10 },
    "hazal": { "x": 5, "y": 25 },
    "ampersand": { "x": 50, "y": 42 },
    "oguz": { "x": 65, "y": 55 },
    "message": { "x": 50, "y": 72 },
    "date": { "x": 50, "y": 82 },
    "countdown": { "x": 50, "y": 88 }
  }',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS: everyone can read, only authenticated can write
ALTER TABLE hero_positions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read hero positions"
  ON hero_positions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update hero positions"
  ON hero_positions FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can insert hero positions"
  ON hero_positions FOR INSERT
  WITH CHECK (true);
