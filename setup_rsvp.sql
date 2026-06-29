-- rsvps tablosu
CREATE TABLE IF NOT EXISTS rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('katilacagim', 'net-degil', 'katilamayacagim')),
  guests INTEGER NOT NULL DEFAULT 1 CHECK (guests >= 1 AND guests <= 10),
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS (herkes okuyabilsin, herkes yazabilsin)
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert rsvps" ON rsvps FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read rsvps" ON rsvps FOR SELECT USING (true);
