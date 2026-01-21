-- Standard RSS-Quellen für KI-News
-- Ausführen nach dem initialen Schema

-- Deutsche Quellen
INSERT INTO rss_sources (name, url, category, language) VALUES
  ('Heise - KI', 'https://www.heise.de/rss/heise-atom.xml', 'allgemein', 'de'),
  ('Golem - KI', 'https://rss.golem.de/rss.php?feed=RSS2.0', 'allgemein', 'de'),
  ('t3n - KI & Tech', 'https://t3n.de/rss.xml', 'allgemein', 'de'),
  ('The Decoder', 'https://the-decoder.de/feed/', 'allgemein', 'de');

-- Englische Quellen - Allgemein
INSERT INTO rss_sources (name, url, category, language) VALUES
  ('MIT Technology Review - AI', 'https://www.technologyreview.com/feed/', 'wissenschaft', 'en'),
  ('The Verge - AI', 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', 'allgemein', 'en'),
  ('Ars Technica - AI', 'https://feeds.arstechnica.com/arstechnica/technology-lab', 'wissenschaft', 'en'),
  ('TechCrunch - AI', 'https://techcrunch.com/category/artificial-intelligence/feed/', 'allgemein', 'en'),
  ('VentureBeat - AI', 'https://venturebeat.com/category/ai/feed/', 'allgemein', 'en'),
  ('Wired - AI', 'https://www.wired.com/feed/tag/ai/latest/rss', 'allgemein', 'en');

-- Spezialisierte Quellen
INSERT INTO rss_sources (name, url, category, language) VALUES
  ('Google AI Blog', 'https://blog.google/technology/ai/rss/', 'wissenschaft', 'en'),
  ('OpenAI Blog', 'https://openai.com/blog/rss/', 'wissenschaft', 'en'),
  ('Anthropic Blog', 'https://www.anthropic.com/index/rss.xml', 'wissenschaft', 'en'),
  ('DeepMind Blog', 'https://deepmind.google/blog/rss.xml', 'wissenschaft', 'en'),
  ('Hugging Face Blog', 'https://huggingface.co/blog/feed.xml', 'wissenschaft', 'en');

-- Medizin & Biologie
INSERT INTO rss_sources (name, url, category, language) VALUES
  ('Nature - AI', 'https://www.nature.com/subjects/machine-learning.rss', 'wissenschaft', 'en'),
  ('Science - AI', 'https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=science', 'wissenschaft', 'en');

-- Robotik
INSERT INTO rss_sources (name, url, category, language) VALUES
  ('IEEE Spectrum - Robotics', 'https://spectrum.ieee.org/feeds/topic/robotics.rss', 'roboter', 'en'),
  ('Electrek - Tesla', 'https://electrek.co/feed/', 'roboter', 'en');

-- China
INSERT INTO rss_sources (name, url, category, language) VALUES
  ('South China Morning Post - Tech', 'https://www.scmp.com/rss/91/feed', 'china', 'en'),
  ('Nikkei Asia - Tech', 'https://asia.nikkei.com/rss/feed/nar', 'china', 'en');

-- Politik & Regulierung
INSERT INTO rss_sources (name, url, category, language) VALUES
  ('Reuters - Technology', 'https://www.reutersagency.com/feed/?taxonomy=best-sectors&post_type=best', 'politik', 'en'),
  ('Brookings - AI', 'https://www.brookings.edu/topic/artificial-intelligence/feed/', 'politik', 'en');
