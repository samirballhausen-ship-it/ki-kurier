# KI-Kurier

Eine taegliche KI-Zeitung fuer deine Eltern - automatisch generiert mit GPT-4 und DALL-E.

## Features

- Taegliche KI-News in 8 Kategorien (Politik, Wissenschaft, Biologie, Medizin, KI im Krieg, China, Humanoide Roboter, Allgemein)
- Top-Thema des Tages mit DALL-E-generiertem Titelbild
- KI-Konzept des Tages - verstaendliche Erklaerungen fuer Nicht-Techniker
- Prompt des Tages - praktische ChatGPT-Tipps zum Kopieren
- PDF-Download fuer Offline-Lesen
- E-Mail-Benachrichtigung jeden Morgen
- Klassisches Zeitungs-Layout

## Tech Stack

- Frontend: React + Vite + TypeScript + Tailwind CSS
- Backend: Supabase (PostgreSQL + Auth)
- KI: OpenAI GPT-4 + DALL-E 3
- Automatisierung: n8n Workflow
- Hosting: Vercel

## Schnellstart

### 1. Dependencies installieren
npm install

### 2. Entwicklungsserver starten
npm run dev

Die App laeuft auf http://localhost:5173 mit Mock-Daten.

## Produktions-Setup

### Supabase einrichten
1. Erstelle Projekt auf supabase.com
2. Fuehre SQL-Migrations aus (supabase/migrations/)
3. Kopiere Project URL + anon Key

### Environment Variables (.env.local)
VITE_SUPABASE_URL=https://dein-projekt.supabase.co
VITE_SUPABASE_ANON_KEY=dein-anon-key

### Vercel Deployment
npm run build
vercel --prod

### n8n Workflow
Siehe n8n/WORKFLOW_ANLEITUNG.md

## Kosten (geschaetzt pro Monat)

- Supabase: Kostenlos (Free Tier)
- Vercel: Kostenlos (Hobby)
- OpenAI GPT-4: ca. 5-10 Euro
- OpenAI DALL-E: ca. 3-5 Euro
- n8n: Kostenlos (Self-hosted)

Gesamt: ca. 10-20 Euro/Monat
