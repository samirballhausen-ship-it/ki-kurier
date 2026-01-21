-- KI-Kurier Database Schema
-- Ausführen in Supabase SQL Editor

-- Kategorien-Enum erstellen
CREATE TYPE category_type AS ENUM (
  'politik',
  'wissenschaft', 
  'biologie',
  'medizin',
  'krieg',
  'china',
  'roboter',
  'allgemein'
);

-- Tägliche Ausgaben
CREATE TABLE editions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  top_story_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Artikel
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  edition_id UUID NOT NULL REFERENCES editions(id) ON DELETE CASCADE,
  category category_type NOT NULL,
  headline TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  key_points TEXT[],
  source_url TEXT NOT NULL,
  source_name TEXT NOT NULL,
  image_url TEXT,
  is_top_story BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- KI-Konzepte des Tages
CREATE TABLE concepts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  edition_id UUID NOT NULL REFERENCES editions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  explanation TEXT NOT NULL,
  practical_examples TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(edition_id)
);

-- Prompts des Tages
CREATE TABLE daily_prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  edition_id UUID NOT NULL REFERENCES editions(id) ON DELETE CASCADE,
  prompt_text TEXT NOT NULL,
  explanation TEXT NOT NULL,
  use_case TEXT NOT NULL,
  example_output TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(edition_id)
);

-- RSS-Quellen
CREATE TABLE rss_sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  category category_type NOT NULL,
  language VARCHAR(2) NOT NULL DEFAULT 'de',
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indizes für Performance
CREATE INDEX idx_articles_edition ON articles(edition_id);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_editions_date ON editions(date DESC);

-- Foreign Key für top_story
ALTER TABLE editions 
  ADD CONSTRAINT fk_top_story 
  FOREIGN KEY (top_story_id) 
  REFERENCES articles(id) 
  ON DELETE SET NULL;

-- Row Level Security aktivieren
ALTER TABLE editions ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE rss_sources ENABLE ROW LEVEL SECURITY;

-- Public Read Access (jeder kann lesen)
CREATE POLICY "Public read access" ON editions FOR SELECT USING (true);
CREATE POLICY "Public read access" ON articles FOR SELECT USING (true);
CREATE POLICY "Public read access" ON concepts FOR SELECT USING (true);
CREATE POLICY "Public read access" ON daily_prompts FOR SELECT USING (true);
CREATE POLICY "Public read access" ON rss_sources FOR SELECT USING (true);

-- Service Role kann alles (für n8n Workflow)
CREATE POLICY "Service role full access" ON editions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON articles FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON concepts FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON daily_prompts FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON rss_sources FOR ALL USING (auth.role() = 'service_role');
