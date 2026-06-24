-- 1. Fotograf bilgilerini tutan tablo
CREATE TABLE IF NOT EXISTS uploads (
  id BIGSERIAL PRIMARY KEY,
  uploader_name TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Herkes fotograf yukleyebilsin (RLS)
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Herkes okuyabilir"
  ON uploads FOR SELECT
  USING (true);

CREATE POLICY "Herkes yukleyebilir"
  ON uploads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Herkes silebilir"
  ON uploads FOR DELETE
  USING (true);

-- 3. Storage bucket politikalari
CREATE POLICY "Herkes fotograf yukleyebilir"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'guest-photos');

CREATE POLICY "Herkes fotograf gorebilir"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'guest-photos');

CREATE POLICY "Herkes fotograf silebilir"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'guest-photos');
