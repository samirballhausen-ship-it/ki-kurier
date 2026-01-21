# KI-Kurier n8n Workflow

## Übersicht

Der n8n Workflow automatisiert die tägliche Generierung der KI-Kurier Zeitung.

## Workflow-Schritte

1. **Cron Trigger** - Startet täglich um 06:00 Uhr
2. **RSS Feeds abrufen** - Holt News aus allen konfigurierten Quellen
3. **KI-Filter** - GPT-4 filtert relevante KI-News
4. **Kategorisierung** - GPT-4 ordnet Artikel den 8 Kategorien zu
5. **Zusammenfassung** - GPT-4 erstellt deutsche Zusammenfassungen (2-3 Sätze)
6. **Top-Story Auswahl** - GPT-4 wählt die wichtigste News
7. **Titelbild** - DALL-E generiert Bild für Top-Story
8. **Konzept generieren** - GPT-4 erstellt KI-Konzept des Tages
9. **Prompt generieren** - GPT-4 erstellt Prompt des Tages
10. **Supabase speichern** - Alle Daten werden in der Datenbank gespeichert
11. **E-Mail senden** - Benachrichtigung an Empfänger

## Installation

1. **n8n installieren** (falls nicht vorhanden):
   ```bash
   npm install -g n8n
   ```

2. **Workflow importieren**:
   - Öffne n8n (http://localhost:5678)
   - Gehe zu "Workflows" → "Import from File"
   - Wähle `ki-kurier-workflow.json`

3. **Credentials einrichten**:
   - OpenAI API Key
   - Supabase URL und Service Role Key
   - SMTP für E-Mail-Versand

## Credentials

### OpenAI
- API Key von https://platform.openai.com/api-keys

### Supabase
- URL: Deine Supabase Projekt-URL
- Service Role Key: Settings → API → service_role key (NICHT anon key!)

### E-Mail (SMTP)
- Host: smtp.gmail.com (für Gmail)
- Port: 465
- User: Deine E-Mail
- Password: App-Passwort (bei Gmail: 2FA aktivieren → App-Passwörter)

## Anpassungen

### Andere Uhrzeit
Ändere den Cron-Ausdruck im Schedule Trigger Node:
- `0 6 * * *` = 06:00 Uhr täglich
- `0 7 * * *` = 07:00 Uhr täglich

### Mehr/weniger Artikel pro Kategorie
Passe die Logik im "Filter & Limit" Node an.

### Andere Sprache
Passe die GPT-4 Prompts im "Summarize" Node an.

## Manuelle Ausführung

Zum Testen kannst du den Workflow manuell starten:
1. Öffne den Workflow in n8n
2. Klicke auf "Execute Workflow"

## Fehlerbehebung

### Keine Artikel gefunden
- Prüfe ob RSS-Feeds erreichbar sind
- Prüfe die KI-Filter-Logik

### OpenAI Fehler
- API Key gültig?
- Guthaben vorhanden?
- Rate Limits beachten

### Supabase Fehler
- Service Role Key (nicht Anon Key) verwenden
- Tabellen existieren? (SQL Schema ausführen)

### E-Mail nicht gesendet
- SMTP Credentials korrekt?
- Bei Gmail: App-Passwort nutzen
