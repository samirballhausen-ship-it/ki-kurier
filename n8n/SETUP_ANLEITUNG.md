# n8n Workflow Setup - KI-Kurier

## Credentials einrichten

Du brauchst folgende Credentials (hole sie aus deinen jeweiligen Accounts):

- **Supabase URL**: Aus Supabase Dashboard → Settings → API
- **Supabase Secret Key**: Aus Supabase Dashboard → Settings → API Keys
- **OpenAI API Key**: Von platform.openai.com
- **App URL**: Deine Vercel URL (z.B. `https://ki-kurier.vercel.app`)

---

## Schritt 1: OpenAI Credential in n8n einrichten

1. Gehe in n8n zu **Settings** > **Credentials**
2. Klicke **Add Credential**
3. Suche nach **OpenAI**
4. Trage deinen **API Key** ein
5. Speichern

---

## Schritt 2: Workflow importieren

1. In n8n klicke oben rechts auf **...** Menu
2. Waehle **Import from File**
3. Waehle die Datei: `ki-kurier-simple-workflow.json`
4. Workflow wird geladen

---

## Schritt 3: OpenAI Nodes verbinden

Nach dem Import musst du die 3 GPT-Nodes mit deinem OpenAI Credential verbinden:

1. Klicke auf **GPT Artikel erstellen** Node
2. Bei "Credential to connect with" waehle dein OpenAI Credential
3. Wiederhole fuer:
   - **GPT Konzept erstellen**
   - **GPT Prompt erstellen**

---

## Schritt 4: Testen!

1. Klicke oben auf **Execute Workflow**
2. Warte ca. 1-2 Minuten
3. Wenn alles gruen wird: Erfolg!
4. Pruefe https://ki-kurier.vercel.app - es sollten neue Artikel erscheinen

---

## Schritt 5: Aktivieren

1. Oben rechts den **Active** Toggle einschalten
2. Workflow laeuft jetzt jeden Tag um 6:00 Uhr automatisch

---

## Was der Workflow macht

```
06:00 Uhr Trigger
      |
      v
Heise RSS + Golem RSS abrufen (parallel)
      |
      v
RSS XML zu JSON parsen
Nur Artikel der letzten 48h
      |
      v
GPT-4o-mini (parallel):
- Artikel filtern & zusammenfassen
- KI-Konzept des Tages
- Prompt des Tages
      |
      v
Daten in Supabase speichern:
- Edition (Ausgabe)
- Articles
- Concept
- Prompt
      |
      v
FERTIG - App zeigt automatisch die neuen Daten!
```

---

## Troubleshooting

### "Unauthorized" Fehler bei Supabase
- Secret Key ist richtig im Workflow
- Pruefe ob RLS (Row Level Security) in Supabase deaktiviert ist fuer die Tabellen

### GPT antwortet mit Fehler
- Pruefe dein OpenAI Guthaben auf platform.openai.com
- API Key korrekt?

### Keine neuen Artikel in der App
- Pruefe in Supabase ob Daten ankommen (Table Editor)
- Browser Cache leeren (Ctrl+F5)

---

## Kosten pro Tag

- GPT-4o-mini: ca. $0.01-0.03 pro Ausfuehrung
- Supabase: Kostenlos (Free Tier)
- **Total: ca. $1-2 pro Monat**

---

## Erweitern

Du kannst spaeter weitere RSS-Feeds hinzufuegen:
1. HTTP Request Node duplizieren
2. Neue URL eintragen
3. Mit "RSS Parsen" Node verbinden

Empfohlene Feeds:
- `https://www.technologyreview.com/feed/`
- `https://openai.com/blog/rss.xml`
- `https://www.theverge.com/rss/ai-artificial-intelligence/index.xml`
