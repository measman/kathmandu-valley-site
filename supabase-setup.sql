-- Run this in Supabase → SQL Editor → New Query

-- 1. Create the places table
CREATE TABLE IF NOT EXISTS places (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  district    TEXT NOT NULL CHECK (district IN ('Kathmandu', 'Lalitpur', 'Bhaktapur')),
  CONSTRAINT places_name_unique UNIQUE (name),
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (recommended)
ALTER TABLE places ENABLE ROW LEVEL SECURITY;

-- 3. Allow public read-only access (anyone can read, nobody can write from browser)
CREATE POLICY "Allow public read" ON places
  FOR SELECT USING (true);

-- 4. Create an index for fast district filtering
CREATE INDEX IF NOT EXISTS idx_places_district ON places (district);
