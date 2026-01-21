# n8n Workflow für KI-Kurier

## Übersicht
Der Workflow läuft täglich um 6:00 Uhr und generiert automatisch eine neue Ausgabe.

## Workflow-Ablauf

```
1. [Schedule Trigger] - Täglich 6:00 Uhr
        ↓
2. [Supabase] - RSS-Quellen aus DB laden
        ↓
3. [RSS Feed Read] - Alle Feeds abrufen (Loop)
        ↓
4. [Code] - Nur Artikel der letzten 24h filtern
        ↓
5. [OpenAI GPT-4] - Parallel:
   ├── Artikel kategorisieren & zusammenfassen
   ├── KI-Konzept des Tages generieren
   └── Prompt des Tages generieren
        ↓
6. [OpenAI DALL-E] - Titelbild für Top-Story
        ↓
7. [Supabase] - Edition erstellen
        ↓
8. [Supabase] - Parallel speichern:
   ├── Artikel
   ├── Konzept
   └── Prompt
        ↓
9. [Email] - Benachrichtigung an Eltern senden
```

## Benötigte Credentials in n8n

### 1. Supabase API
- **URL**: Deine Supabase Project URL
- **Service Role Key**: Aus Supabase Dashboard → Settings → API

### 2. OpenAI API
- **API Key**: Von platform.openai.com

### 3. SMTP (für E-Mail)
- **Host**: smtp.gmail.com (oder anderer Provider)
- **Port**: 587
- **User**: Deine E-Mail
- **Password**: App-Passwort

## Manueller Workflow-Import

Da der automatische Export kompliziert ist, hier die Schritte zum manuellen Aufbau:

### Nodes erstellen:

1. **Schedule Trigger**
   - Täglich um 6:00 Uhr

2. **Supabase - Select**
   - Table: `rss_sources`
   - Filter: `active = true`

3. **RSS Feed Read**
   - URL: `{{ $json.url }}`
   - Batch Mode aktivieren

4. **Code Node - Filter**
```javascript
const now = new Date();
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

const items = $input.all();
const recentItems = items.filter(item => {
  const pubDate = new Date(item.json.pubDate || item.json.isoDate);
  return pubDate > yesterday;
});

return recentItems.slice(0, 50);
```

5. **OpenAI - Chat (Kategorisierung)**
   - Model: gpt-4-turbo-preview
   - Temperature: 0.3
   - Prompt: Siehe unten

6. **OpenAI - Chat (Konzept)**
   - Model: gpt-4-turbo-preview
   - Temperature: 0.7

7. **OpenAI - Chat (Prompt des Tages)**
   - Model: gpt-4-turbo-preview
   - Temperature: 0.7

8. **OpenAI - Image**
   - Model: dall-e-3
   - Size: 1792x1024

9. **Supabase - Insert** (3x für Edition, Articles, Concepts, Prompts)

10. **Email Send**

## GPT-4 Prompts

### Kategorisierung & Zusammenfassung
```
Du bist ein KI-News-Kurator. Analysiere die folgenden Nachrichtenartikel und:

1. Filtere nur Artikel, die WIRKLICH mit Künstlicher Intelligenz zu tun haben
2. Ordne jeden relevanten Artikel einer Kategorie zu: politik, wissenschaft, biologie, medizin, krieg, china, roboter, allgemein
3. Erstelle eine deutsche Überschrift (prägnant und informativ)
4. Erstelle eine kurze Zusammenfassung (1-2 Sätze)
5. Erstelle einen ausführlichen Inhalt (4-6 Sätze mit Hintergrundinformationen, Kontext und Einordnung)
6. Extrahiere 2-3 Kernpunkte als Bullet-Points
7. Wähle den wichtigsten Artikel als Top-Story aus

Artikel:
{{ $json.articles }}

Antworte NUR mit einem JSON-Array in diesem Format:
[
  {
    "headline": "Deutsche Überschrift",
    "summary": "Kurze deutsche Zusammenfassung in 1-2 Sätzen.",
    "content": "Ausführlicher deutscher Text mit 4-6 Sätzen. Erkläre den Kontext, die Bedeutung und mögliche Auswirkungen.",
    "key_points": [
      "Wichtigster Punkt",
      "Zweiter wichtiger Punkt",
      "Dritter wichtiger Punkt"
    ],
    "category": "kategorie",
    "source_url": "Original-URL",
    "source_name": "Quellenname",
    "is_top_story": true/false
  }
]

Wähle 2-3 Artikel pro Kategorie. Genau EIN Artikel sollte is_top_story: true haben.
```

### KI-Konzept des Tages
```
Erstelle das KI-Konzept des Tages für den KI-Kurier.

Zielgruppe: Menschen Mitte/Ende 50, die KI verstehen wollen, aber keine Techniker sind.

Wähle ein interessantes KI-Konzept und erkläre es verständlich.

Antworte NUR mit JSON:
{
  "title": "Was ist [Konzept]?",
  "explanation": "Verständliche Erklärung in mehreren Absätzen. Nutze Analogien aus dem Alltag.",
  "practical_examples": [
    "Konkretes Beispiel 1",
    "Konkretes Beispiel 2",
    "Konkretes Beispiel 3"
  ]
}

Mögliche Konzepte: KI-Agent, Embeddings, Prompt Engineering, Fine-Tuning, Halluzinationen, RAG, Vector-Datenbanken, Transformer, Token, Context Window, Temperature, etc.
```

### Prompt des Tages
```
Erstelle den Prompt des Tages für den KI-Kurier.

Zielgruppe: Menschen Mitte/Ende 50, die ChatGPT und ähnliche Tools nutzen wollen.

Erstelle einen nützlichen, praktischen Prompt mit Erklärung.

Antworte NUR mit JSON:
{
  "prompt_text": "Der komplette Prompt zum Kopieren",
  "explanation": "Warum dieser Prompt funktioniert (1-2 Sätze)",
  "use_case": "Wann ist dieser Prompt nützlich? (1-2 Sätze)",
  "example_output": "Ein konkretes Beispiel der KI-Ausgabe"
}

Ideen: Erklärbär-Prompt, Zusammenfassungen, Briefe schreiben, Rezepte anpassen, Reiseplanung, Gesundheitsfragen, Technik-Hilfe, etc.
```

## Umgebungsvariablen

Setze in n8n unter Settings → Environment Variables:
- `PARENT_EMAIL`: E-Mail-Adresse deiner Eltern
- `APP_URL`: URL deiner Vercel-App

## Testen

1. Aktiviere den Workflow
2. Klicke auf "Execute Workflow" für manuellen Test
3. Prüfe ob Daten in Supabase erscheinen
4. Prüfe ob E-Mail ankommt
