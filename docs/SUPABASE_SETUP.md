# Supabase Setup - Schritt für Schritt

Diese Anleitung erklärt, wie du Supabase für tagesaktuelle News einrichtest.

## 1. Supabase Projekt erstellen

1. Gehe zu [supabase.com](https://supabase.com)
2. Klicke auf "Start your project" (kostenlos)
3. Melde dich mit GitHub an
4. Klicke auf "New Project"
5. Wähle:
   - **Name**: `ki-kurier`
   - **Database Password**: Ein sicheres Passwort (merken!)
   - **Region**: Frankfurt (am nächsten)
6. Warte ca. 2 Minuten bis das Projekt erstellt ist

## 2. Datenbank-Schema anlegen

1. Im Supabase Dashboard: Klicke links auf **SQL Editor**
2. Klicke auf **New Query**
3. Kopiere den gesamten Inhalt von `supabase/migrations/001_initial_schema.sql`
4. Klicke auf **Run** (Strg+Enter)
5. Du solltest "Success. No rows returned" sehen

Wiederhole für:
- `supabase/migrations/002_seed_rss_sources.sql`

## 3. API-Schlüssel holen

1. Gehe zu **Settings** (Zahnrad links unten)
2. Klicke auf **API**
3. Notiere dir:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public**: Der öffentliche API-Key (für Frontend)
   - **service_role**: Der geheime Key (NUR für n8n!)

## 4. Umgebungsvariablen in der App setzen

Erstelle eine Datei `.env.local` im Projektroot:

```bash
VITE_SUPABASE_URL=https://deine-projekt-id.supabase.co
VITE_SUPABASE_ANON_KEY=dein-anon-key
```

**Wichtig**: `.env.local` niemals committen! (Ist bereits in .gitignore)

## 5. App mit Supabase verbinden

Die App ist bereits vorbereitet. Sobald die Umgebungsvariablen gesetzt sind, wird sie automatisch echte Daten aus Supabase laden statt Mock-Daten.

## 6. n8n für tägliche News einrichten

Für automatische tägliche News brauchst du n8n:

### Option A: n8n Cloud (Empfohlen für Anfänger)
1. Gehe zu [n8n.io](https://n8n.io)
2. Erstelle einen kostenlosen Account
3. Folge der Anleitung in `n8n/WORKFLOW_ANLEITUNG.md`

### Option B: Lokales n8n (Für Fortgeschrittene)
```bash
npx n8n
```

### Benötigte API-Keys für n8n
- **OpenAI API Key**: Von [platform.openai.com](https://platform.openai.com)
- **Supabase Service Role Key**: Aus dem Dashboard (Settings → API)

## 7. Erste manuelle Edition erstellen (Test)

Um zu testen, ob alles funktioniert:

1. Gehe im n8n Workflow auf "Execute Workflow"
2. Prüfe in Supabase unter **Table Editor** ob Daten erscheinen
3. Lade die App neu - du solltest echte News sehen

## Kosten

| Service | Kostenlos bis | Danach |
|---------|---------------|--------|
| Supabase | 500MB DB, 1GB Speicher | ~25€/Monat |
| OpenAI | ~5€ Guthaben | ~0,01€ pro Ausgabe |
| n8n Cloud | 20 Workflows | ~20€/Monat |

**Typische monatliche Kosten**: ~5-10€ (fast alles für OpenAI)

## Troubleshooting

### "No data" in der App
- Prüfe ob `.env.local` korrekt gesetzt ist
- Prüfe ob Daten in Supabase existieren (Table Editor)
- Prüfe die Browser-Konsole auf Fehler

### n8n Workflow schlägt fehl
- Prüfe ob alle Credentials korrekt sind
- Prüfe ob die RSS-Feeds erreichbar sind
- Schau in die n8n Execution Logs

### RSS-Feeds laden keine Artikel
- Manche Feeds blocken Anfragen ohne User-Agent
- Prüfe ob die Feed-URLs noch aktuell sind
