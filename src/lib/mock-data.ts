import { Edition, Article, ConceptOfTheDay, PromptOfTheDay, Category } from '../types';

// Mock-Daten für die Entwicklung (bevor Supabase eingerichtet ist)

const today = new Date().toISOString().split('T')[0];

export const mockArticles: Article[] = [
  // Top Story
  {
    id: '1',
    edition_id: 'edition-1',
    category: 'wissenschaft',
    headline: 'OpenAI stellt GPT-5 vor: Revolutionäre Sprünge in logischem Denken',
    summary: 'Das neue Sprachmodell zeigt erstmals echte Fähigkeiten zum mehrstufigen logischen Schlussfolgern.',
    content: 'OpenAI hat heute GPT-5 vorgestellt, das neueste Sprachmodell des Unternehmens. In internen Tests zeigte das Modell erstaunliche Fähigkeiten im mehrstufigen logischen Schlussfolgern - eine Schwäche früherer Generationen. Besonders beeindruckend: GPT-5 kann komplexe mathematische Beweise führen und Fehler in seiner eigenen Argumentation erkennen und korrigieren. Forscher sprechen von einem Paradigmenwechsel, da das Modell nicht nur Muster reproduziert, sondern echtes "Nachdenken" simuliert. Die Technologie basiert auf einer neuen Architektur namens "Chain-of-Thought-Reasoning", die menschliches Problemlösen nachahmt. OpenAI plant, GPT-5 zunächst ausgewählten Unternehmenskunden zur Verfügung zu stellen.',
    key_points: [
      'Mehrstufiges logisches Schlussfolgern erstmals möglich',
      'Neue "Chain-of-Thought-Reasoning" Architektur',
      'Zunächst nur für Unternehmenskunden verfügbar'
    ],
    source_url: 'https://example.com/gpt5',
    source_name: 'MIT Technology Review',
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    is_top_story: true,
    created_at: today,
  },
  // Politik
  {
    id: '2',
    edition_id: 'edition-1',
    category: 'politik',
    headline: 'EU verabschiedet strenge Regeln für KI-generierte Inhalte',
    summary: 'Neue Kennzeichnungspflichten für Deepfakes und automatisch erstellte Texte treten ab 2025 in Kraft.',
    content: 'Das Europäische Parlament hat heute mit großer Mehrheit neue Vorschriften für KI-generierte Inhalte beschlossen. Ab Januar 2025 müssen alle Deepfakes, KI-generierte Bilder und automatisch erstellte Texte klar gekennzeichnet werden. Verstöße können mit Geldstrafen von bis zu 6% des weltweiten Jahresumsatzes geahndet werden. Die Regelung gilt für alle Plattformen mit mehr als 45 Millionen Nutzern in der EU. Kritiker bemängeln die technische Umsetzbarkeit, während Befürworter einen wichtigen Schritt gegen Desinformation sehen. Social-Media-Plattformen haben bereits angekündigt, ihre Upload-Filter entsprechend anzupassen.',
    key_points: [
      'Pflicht zur Kennzeichnung aller KI-Inhalte ab 2025',
      'Bis zu 6% Strafe vom Jahresumsatz bei Verstößen',
      'Gilt für Plattformen mit 45+ Mio. EU-Nutzern'
    ],
    source_url: 'https://example.com/eu-ai',
    source_name: 'Heise Online',
    is_top_story: false,
    created_at: today,
  },
  {
    id: '3',
    edition_id: 'edition-1',
    category: 'politik',
    headline: 'USA und China einigen sich auf KI-Sicherheitsabkommen',
    summary: 'Historisches Abkommen regelt den Einsatz von KI in kritischer Infrastruktur und militärischen Anwendungen.',
    content: 'In einem überraschenden diplomatischen Durchbruch haben die USA und China ein bilaterales Abkommen zur KI-Sicherheit unterzeichnet. Das Abkommen verbietet den Einsatz autonomer KI-Systeme bei Entscheidungen über Nuklearwaffen und schreibt menschliche Kontrolle vor. Beide Länder verpflichten sich zudem, Informationen über KI-Sicherheitsforschung auszutauschen. Ein gemeinsames Gremium soll die Einhaltung überwachen. Experten bewerten das Abkommen als historisch, da es das erste seiner Art zwischen den beiden KI-Supermächten ist. Die Umsetzung bleibt jedoch eine Herausforderung angesichts der angespannten Beziehungen.',
    key_points: [
      'Verbot autonomer KI bei Nuklearwaffen-Entscheidungen',
      'Informationsaustausch über KI-Sicherheitsforschung',
      'Gemeinsames Überwachungsgremium geplant'
    ],
    source_url: 'https://example.com/usa-china',
    source_name: 'The Verge',
    is_top_story: false,
    created_at: today,
  },
  // Wissenschaft
  {
    id: '4',
    edition_id: 'edition-1',
    category: 'wissenschaft',
    headline: 'DeepMind löst 50 Jahre altes Mathematik-Problem',
    summary: 'AlphaProof findet Beweis für die Riemann-Vermutung - ein Meilenstein für KI in der reinen Mathematik.',
    content: 'DeepMinds neues System AlphaProof hat einen vollständigen Beweis für die berühmte Riemann-Vermutung gefunden - eines der sieben Millennium-Probleme der Mathematik. Der Beweis wurde von führenden Mathematikern überprüft und als korrekt bestätigt. AlphaProof kombiniert symbolisches Rechnen mit neuronalen Netzen und kann mathematische Zusammenhänge entdecken, die Menschen übersehen haben. Das System trainierte auf allen bekannten mathematischen Beweisen und entwickelte eigene Beweisstrategien. Der Durchbruch könnte weitreichende Folgen für Kryptographie und Primzahlentheorie haben. DeepMind erhält dafür den mit einer Million Dollar dotierten Millennium-Preis.',
    key_points: [
      'Riemann-Vermutung nach 160 Jahren bewiesen',
      'Kombination aus symbolischem Rechnen und KI',
      'Millennium-Preis von 1 Mio. Dollar für DeepMind'
    ],
    source_url: 'https://example.com/deepmind',
    source_name: 'Nature',
    is_top_story: false,
    created_at: today,
  },
  {
    id: '5',
    edition_id: 'edition-1',
    category: 'wissenschaft',
    headline: 'Neue KI-Architektur benötigt 90% weniger Energie',
    summary: 'Forscher der Stanford University entwickeln effiziente Alternative zu Transformer-Modellen.',
    content: 'Ein Team der Stanford University hat eine neue KI-Architektur namens "Mamba-2" vorgestellt, die bei gleicher Leistung 90% weniger Energie verbraucht als herkömmliche Transformer-Modelle. Die Innovation basiert auf sogenannten State Space Models, die Informationen effizienter verarbeiten. In Tests erreichte Mamba-2 vergleichbare Ergebnisse wie GPT-4, benötigte aber nur einen Bruchteil der Rechenleistung. Das könnte KI-Anwendungen auf Smartphones und anderen Geräten ohne Internetverbindung ermöglichen. Mehrere Tech-Unternehmen haben bereits Interesse an der Lizenzierung bekundet. Die Forscher veröffentlichen den Code als Open Source.',
    key_points: [
      '90% weniger Energieverbrauch bei gleicher Leistung',
      'Ermöglicht KI direkt auf Smartphones',
      'Code wird als Open Source veröffentlicht'
    ],
    source_url: 'https://example.com/stanford',
    source_name: 'Ars Technica',
    is_top_story: false,
    created_at: today,
  },
  // Biologie
  {
    id: '6',
    edition_id: 'edition-1',
    category: 'biologie',
    headline: 'KI entschlüsselt komplette Proteinstruktur des Menschen',
    summary: 'AlphaFold 3 kartiert alle 20.000 menschlichen Proteine mit atomarer Genauigkeit.',
    content: 'DeepMinds AlphaFold 3 hat die dreidimensionale Struktur aller 20.000 menschlichen Proteine mit atomarer Genauigkeit vorhergesagt. Das ist ein monumentaler Fortschritt für die Biologie und Medizin. Bisher konnten Wissenschaftler nur etwa 17% dieser Strukturen experimentell bestimmen - ein Prozess, der Jahrzehnte dauerte. AlphaFold 3 erledigte die Aufgabe in wenigen Wochen. Die Daten werden frei zugänglich in einer öffentlichen Datenbank bereitgestellt. Pharma-Unternehmen können nun gezielter Medikamente entwickeln, da sie verstehen, wie Proteine gefaltet sind und interagieren. Experten schätzen, dass dies die Medikamentenentwicklung um Jahre beschleunigen könnte.',
    key_points: [
      'Alle 20.000 menschlichen Proteine kartiert',
      'Datenbank ist frei zugänglich',
      'Könnte Medikamentenentwicklung um Jahre beschleunigen'
    ],
    source_url: 'https://example.com/alphafold',
    source_name: 'Science',
    is_top_story: false,
    created_at: today,
  },
  {
    id: '7',
    edition_id: 'edition-1',
    category: 'biologie',
    headline: 'Durchbruch: KI simuliert erstmals vollständige Zelle',
    summary: 'Wissenschaftler modellieren alle biochemischen Prozesse einer lebenden Zelle in Echtzeit.',
    content: 'Forscher des MIT haben erstmals eine vollständige lebende Zelle digital simuliert. Das Modell umfasst alle bekannten biochemischen Reaktionen, Proteininteraktionen und genetischen Prozesse. Die Simulation läuft auf einem Supercomputer und kann vorhersagen, wie die Zelle auf Medikamente, Umweltveränderungen oder genetische Mutationen reagiert. Das Projekt kombinierte Daten aus tausenden wissenschaftlichen Studien mit KI-Vorhersagen. Besonders wertvoll ist die Möglichkeit, Experimente virtuell durchzuführen, bevor sie im Labor getestet werden. Pharmaunternehmen könnten so die Wirkung neuer Wirkstoffe schneller und günstiger testen.',
    key_points: [
      'Erste vollständige digitale Zellsimulation',
      'Alle biochemischen Reaktionen in Echtzeit modelliert',
      'Ermöglicht virtuelle Medikamententests'
    ],
    source_url: 'https://example.com/cell',
    source_name: 'Cell Journal',
    is_top_story: false,
    created_at: today,
  },
  // Medizin
  {
    id: '8',
    edition_id: 'edition-1',
    category: 'medizin',
    headline: 'KI erkennt Krebs 5 Jahre vor Symptomen',
    summary: 'Neue Bluttest-Analyse mit Machine Learning erreicht 95% Genauigkeit bei der Früherkennung.',
    content: 'Ein von der Stanford School of Medicine entwickelter KI-Bluttest kann verschiedene Krebsarten bis zu fünf Jahre vor dem Auftreten von Symptomen erkennen. Das System analysiert winzige DNA-Fragmente im Blut (sogenannte cfDNA) und erkennt krebstypische Muster. In einer Studie mit 10.000 Teilnehmern erreichte der Test eine Genauigkeit von 95% bei einer Falsch-Positiv-Rate von unter 1%. Besonders vielversprechend sind die Ergebnisse bei Bauchspeicheldrüsenkrebs, der bisher kaum früh erkennbar war. Der Test könnte als jährliche Vorsorgeuntersuchung eingesetzt werden und soll ab 2026 verfügbar sein. Die Kosten werden auf etwa 500 Euro pro Test geschätzt.',
    key_points: [
      '95% Genauigkeit bei Krebsfrüherkennung',
      'Erkennt Krebs bis zu 5 Jahre vor Symptomen',
      'Verfügbar ab 2026 für ca. 500 Euro'
    ],
    source_url: 'https://example.com/cancer',
    source_name: 'JAMA',
    is_top_story: false,
    created_at: today,
  },
  {
    id: '9',
    edition_id: 'edition-1',
    category: 'medizin',
    headline: 'FDA genehmigt erstes vollständig KI-entwickeltes Medikament',
    summary: 'Das Antibiotikum wurde von der Entdeckung bis zur Zulassung komplett durch KI gesteuert.',
    content: 'Die US-Arzneimittelbehörde FDA hat erstmals ein Medikament zugelassen, das vollständig durch KI entwickelt wurde. Das Antibiotikum "Halicin-2" wirkt gegen multiresistente Bakterien, die gegen alle bisherigen Antibiotika immun sind. Eine KI durchsuchte Millionen chemischer Verbindungen und identifizierte den Wirkstoff in nur 30 Tagen - ein Prozess, der traditionell Jahre dauert. Auch die klinischen Studien wurden KI-optimiert geplant, was die Entwicklungszeit auf 18 Monate verkürzte. Das Medikament soll zunächst für lebensbedrohliche Infektionen in Krankenhäusern eingesetzt werden. Experten sehen darin den Beginn einer neuen Ära der Medikamentenentwicklung.',
    key_points: [
      'Erstes komplett KI-entwickeltes Medikament zugelassen',
      'Wirkt gegen multiresistente Bakterien',
      'Entwicklungszeit von Jahren auf 18 Monate verkürzt'
    ],
    source_url: 'https://example.com/fda',
    source_name: 'STAT News',
    is_top_story: false,
    created_at: today,
  },
  // KI im Krieg
  {
    id: '10',
    edition_id: 'edition-1',
    category: 'krieg',
    headline: 'UN fordert Verbot autonomer Waffensysteme',
    summary: 'Generalsekretär drängt auf internationale Regulierung von KI-gesteuerten Kampfdrohnen.',
    content: 'UN-Generalsekretär António Guterres hat die Mitgliedstaaten aufgefordert, ein verbindliches internationales Abkommen zum Verbot vollständig autonomer Waffensysteme zu verabschieden. In seiner Rede vor der Generalversammlung warnte er vor einer Zukunft, in der Maschinen über Leben und Tod entscheiden. Besondere Sorge bereiten sogenannte "Loitering Munitions" - Drohnen, die selbstständig Ziele identifizieren und angreifen können. Über 70 Länder unterstützen bereits ein Verbot, darunter Deutschland. Die USA, Russland und China lehnen verbindliche Regelungen bisher ab. Guterres schlug eine Übergangsfrist vor, in der bestehende Systeme überprüft werden.',
    key_points: [
      'UN fordert Verbot autonomer Kampfdrohnen',
      '70+ Länder unterstützen Verbot, aber nicht USA/China/Russland',
      'Warnung vor Maschinen, die über Leben und Tod entscheiden'
    ],
    source_url: 'https://example.com/un',
    source_name: 'Reuters',
    is_top_story: false,
    created_at: today,
  },
  {
    id: '11',
    edition_id: 'edition-1',
    category: 'krieg',
    headline: 'Cyberverteidigung setzt verstärkt auf KI-Systeme',
    summary: 'NATO-Länder investieren Milliarden in automatisierte Erkennung von Cyberangriffen.',
    content: 'Die NATO-Mitgliedstaaten haben ein gemeinsames Programm zur KI-gestützten Cyberverteidigung beschlossen. Das System mit dem Codenamen "Sentinel" soll Cyberangriffe in Echtzeit erkennen und automatisch Gegenmaßnahmen einleiten. Die Investition beläuft sich auf 4,5 Milliarden Euro über fünf Jahre. Sentinel analysiert den Netzwerkverkehr kritischer Infrastrukturen und erkennt Angriffsmuster innerhalb von Millisekunden. Bisher dauerte die Erkennung oft Tage oder Wochen. Das System wurde bereits in einer Übung getestet, bei der es 97% der simulierten Angriffe abwehrte. Kritiker warnen jedoch vor dem Risiko automatischer Eskalation bei Fehlalarmen.',
    key_points: [
      '4,5 Mrd. Euro NATO-Investition in KI-Cyberverteidigung',
      'System "Sentinel" erkennt Angriffe in Millisekunden',
      '97% Erfolgsquote bei simulierten Angriffen'
    ],
    source_url: 'https://example.com/nato',
    source_name: 'Defense One',
    is_top_story: false,
    created_at: today,
  },
  // China
  {
    id: '12',
    edition_id: 'edition-1',
    category: 'china',
    headline: 'Chinas neues KI-Modell übertrifft GPT-4 in Tests',
    summary: 'Baidu stellt Ernie 5.0 vor - besonders stark bei chinesischer Sprache und kulturellem Kontext.',
    content: 'Der chinesische Tech-Konzern Baidu hat sein neues Sprachmodell Ernie 5.0 präsentiert, das in mehreren Benchmarks bessere Ergebnisse als GPT-4 erzielt. Besonders stark schneidet das Modell bei Aufgaben ab, die kulturelles Verständnis und Wissen über China erfordern. Ernie 5.0 wurde auf einem eigens entwickelten Chip trainiert, der unabhängig von US-Technologie ist - ein wichtiger Faktor angesichts der Exportbeschränkungen. Das Modell ist in China bereits für Verbraucher verfügbar und hat über 100 Millionen Nutzer. International bleibt der Zugang eingeschränkt. Beobachter sehen darin ein Zeichen, dass China im KI-Wettrennen aufholt, obwohl es bei der Hardware noch zurückliegt.',
    key_points: [
      'Ernie 5.0 übertrifft GPT-4 in mehreren Tests',
      'Trainiert auf eigenen chinesischen Chips',
      '100+ Millionen Nutzer in China'
    ],
    source_url: 'https://example.com/baidu',
    source_name: 'South China Morning Post',
    is_top_story: false,
    created_at: today,
  },
  {
    id: '13',
    edition_id: 'edition-1',
    category: 'china',
    headline: 'China plant weltweit größtes KI-Rechenzentrum',
    summary: 'Investition von 50 Milliarden Dollar für Anlage mit 100.000 GPUs in der Wüste Gobi.',
    content: 'Die chinesische Regierung hat den Bau des weltweit größten KI-Rechenzentrums in der Wüste Gobi angekündigt. Das Projekt mit einem Budget von 50 Milliarden Dollar soll bis 2027 fertiggestellt werden und 100.000 GPUs beherbergen. Die abgelegene Lage ermöglicht die Nutzung von Solar- und Windenergie, während die trockene Luft ideale Kühlung bietet. Das Zentrum wird staatlichen Forschungseinrichtungen und ausgewählten Unternehmen zur Verfügung stehen. Experten sehen darin Chinas Antwort auf den amerikanischen Vorsprung bei KI-Infrastruktur. Die verwendeten Chips sollen komplett aus chinesischer Produktion stammen, um Sanktionen zu umgehen.',
    key_points: [
      '50 Mrd. Dollar für größtes KI-Rechenzentrum der Welt',
      '100.000 GPUs, Fertigstellung bis 2027',
      'Komplett chinesische Chips zur Umgehung von Sanktionen'
    ],
    source_url: 'https://example.com/china-dc',
    source_name: 'Nikkei Asia',
    is_top_story: false,
    created_at: today,
  },
  // Humanoide Roboter
  {
    id: '14',
    edition_id: 'edition-1',
    category: 'roboter',
    headline: 'Tesla Optimus arbeitet erstmals in echter Fabrik',
    summary: 'Humanoider Roboter übernimmt Montagearbeiten - Musk kündigt Massenproduktion für 2025 an.',
    content: 'Tesla hat bekannt gegeben, dass sein humanoider Roboter Optimus erstmals in einer echten Produktionsumgebung eingesetzt wird. In der Gigafactory Texas arbeiten 10 Optimus-Einheiten bei der Batteriemontage. Die Roboter können Objekte greifen, tragen und präzise platzieren. Laut CEO Elon Musk lernen sie neue Aufgaben durch Demonstration innerhalb weniger Stunden. Tesla plant, bis Ende 2025 mit der Massenproduktion zu beginnen, mit einem angestrebten Preis von 20.000 Dollar pro Einheit. Musk prognostiziert, dass humanoide Roboter langfristig Teslas größtes Geschäft werden könnten. Gewerkschaften äußern Bedenken hinsichtlich der Auswirkungen auf Arbeitsplätze in der Fertigung.',
    key_points: [
      '10 Optimus-Roboter arbeiten bereits in Tesla-Fabrik',
      'Massenproduktion ab 2025 für 20.000 Dollar',
      'Musk: Roboter könnten Teslas größtes Geschäft werden'
    ],
    source_url: 'https://example.com/optimus',
    source_name: 'Electrek',
    is_top_story: false,
    created_at: today,
  },
  {
    id: '15',
    edition_id: 'edition-1',
    category: 'roboter',
    headline: 'Figure 01 lernt Aufgaben durch Zuschauen',
    summary: 'Neues Trainingsverfahren ermöglicht Robotern, komplexe Handgriffe durch Videoanalyse zu erlernen.',
    content: 'Das Startup Figure hat ein bahnbrechendes Trainingsverfahren für seinen humanoiden Roboter Figure 01 vorgestellt. Statt aufwändiger Programmierung lernt der Roboter neue Aufgaben, indem er Menschen bei der Arbeit zusieht. Die zugrundeliegende KI analysiert Videos und übersetzt menschliche Bewegungen in Roboteraktionen. In einer Demonstration lernte Figure 01 innerhalb von 10 Minuten, Kaffee zu kochen - vom Öffnen der Verpackung bis zum Einschenken. Das Verfahren könnte die Einrichtungszeit für neue Aufgaben von Wochen auf Minuten reduzieren. Figure hat kürzlich 675 Millionen Dollar Investition erhalten, unter anderem von Microsoft und NVIDIA.',
    key_points: [
      'Roboter lernt durch Zuschauen statt Programmierung',
      'Kaffeekochen in 10 Minuten gelernt',
      '675 Mio. Dollar Investition von Microsoft und NVIDIA'
    ],
    source_url: 'https://example.com/figure',
    source_name: 'IEEE Spectrum',
    is_top_story: false,
    created_at: today,
  },
  // Allgemein
  {
    id: '16',
    edition_id: 'edition-1',
    category: 'allgemein',
    headline: 'Anthropic erhält 4 Milliarden Dollar von Amazon',
    summary: 'Größte Investition in ein KI-Startup verstärkt den Wettbewerb zwischen Tech-Giganten.',
    content: 'Amazon hat seine Investition in das KI-Unternehmen Anthropic auf insgesamt 4 Milliarden Dollar aufgestockt - die größte Investition in ein KI-Startup überhaupt. Anthropic, gegründet von ehemaligen OpenAI-Mitarbeitern, entwickelt das KI-System Claude, das als sicherer und verantwortungsvoller gilt als Konkurrenzprodukte. Im Gegenzug wird Anthropic Amazon Web Services als primären Cloud-Anbieter nutzen. Die Investition intensiviert den Wettbewerb: Microsoft hat über 13 Milliarden in OpenAI investiert, Google unterstützt sowohl Anthropic als auch eigene KI-Projekte. Experten sehen einen Trend zur Konsolidierung, bei dem unabhängige KI-Firmen zunehmend von Tech-Giganten abhängig werden.',
    key_points: [
      '4 Mrd. Dollar - größte KI-Startup-Investition',
      'Anthropic nutzt dafür AWS als Cloud-Anbieter',
      'Wettbewerb: Microsoft-OpenAI vs. Amazon-Anthropic vs. Google'
    ],
    source_url: 'https://example.com/anthropic',
    source_name: 'TechCrunch',
    is_top_story: false,
    created_at: today,
  },
  {
    id: '17',
    edition_id: 'edition-1',
    category: 'allgemein',
    headline: 'Studie: 40% der Jobs werden durch KI verändert',
    summary: 'McKinsey-Report analysiert Auswirkungen auf den Arbeitsmarkt bis 2030.',
    content: 'Eine umfassende Studie der Unternehmensberatung McKinsey prognostiziert, dass 40% aller Arbeitsplätze bis 2030 durch KI signifikant verändert werden. Das bedeutet nicht zwangsläufig Jobverlust - in vielen Fällen werden Tätigkeiten ergänzt oder transformiert. Besonders betroffen sind administrative Tätigkeiten, Kundenservice und bestimmte Bereiche der Wissensarbeit. Gleichzeitig entstehen neue Jobs: McKinsey schätzt 12 Millionen neue Stellen im KI-Bereich. Die Studie empfiehlt massive Investitionen in Weiterbildung, da 375 Millionen Arbeitnehmer weltweit neue Fähigkeiten erlernen müssen. Deutschland schneidet dabei im internationalen Vergleich unterdurchschnittlich ab.',
    key_points: [
      '40% der Jobs werden bis 2030 durch KI verändert',
      '12 Millionen neue Stellen im KI-Bereich erwartet',
      '375 Mio. Menschen müssen sich weiterbilden'
    ],
    source_url: 'https://example.com/mckinsey',
    source_name: 'Financial Times',
    is_top_story: false,
    created_at: today,
  },
];

export const mockConcept: ConceptOfTheDay = {
  id: 'concept-1',
  edition_id: 'edition-1',
  title: 'Was ist ein KI-Agent?',
  explanation: `Ein KI-Agent ist ein Computerprogramm, das eigenständig Aufgaben erledigen kann - ähnlich wie ein digitaler Assistent, der selbst denkt und handelt.

Im Gegensatz zu normalen Chatbots, die nur auf einzelne Fragen antworten, kann ein Agent:
• Mehrere Schritte planen und ausführen
• Werkzeuge benutzen (z.B. im Internet suchen, E-Mails schreiben)
• Aus Fehlern lernen und sich anpassen
• Selbstständig Entscheidungen treffen

Stellt euch vor, ihr bittet einen normalen Chatbot: "Buche mir einen Flug nach Berlin." Er würde euch vielleicht Tipps geben. Ein Agent hingegen könnte tatsächlich Flugseiten durchsuchen, Preise vergleichen und die Buchung vornehmen.`,
  practical_examples: [
    'Auto-GPT: Kann selbstständig im Internet recherchieren und Berichte erstellen',
    'Devin: Ein KI-Agent, der eigenständig programmieren kann',
    'Claude mit Computer Use: Kann euren Computer bedienen wie ein Mensch',
    'Persönliche Assistenten: Verwalten E-Mails, Kalender und Aufgaben automatisch',
  ],
  created_at: today,
};

export const mockPrompt: PromptOfTheDay = {
  id: 'prompt-1',
  edition_id: 'edition-1',
  prompt_text: `Du bist mein persönlicher Erklärbär für komplexe Themen.

Wenn ich dir ein Thema nenne, erkläre es mir so:
1. In einem Satz für ein Kind
2. In einem Absatz für einen Teenager
3. In einem Absatz für einen Erwachsenen ohne Vorwissen
4. Mit einer alltäglichen Analogie

Thema: [HIER THEMA EINFÜGEN]`,
  explanation: 'Dieser Prompt nutzt die "Abstraktionsleiter"-Technik: Das gleiche Konzept wird auf verschiedenen Komplexitätsstufen erklärt. So findet ihr garantiert die Erklärung, die für euch am verständlichsten ist.',
  use_case: 'Perfekt wenn ihr ein neues Thema verstehen wollt - sei es Quantencomputer, Blockchain, oder warum der Himmel blau ist. Besonders hilfreich, wenn Wikipedia-Artikel zu kompliziert sind.',
  example_output: `**Thema: Künstliche Intelligenz**

🧒 **Für ein Kind:** KI ist wie ein sehr schlaues Computerprogramm, das lernen und Aufgaben lösen kann, fast wie ein Mensch.

👦 **Für einen Teenager:** Künstliche Intelligenz sind Computersysteme, die aus Daten lernen und Muster erkennen können. Sie können Bilder erkennen, Sprache verstehen und sogar kreativ sein - ohne dass ein Mensch jeden Schritt programmiert hat.

👨 **Für einen Erwachsenen:** KI umfasst verschiedene Technologien, bei denen Computer Aufgaben ausführen, die normalerweise menschliche Intelligenz erfordern. Moderne KI basiert meist auf "maschinellem Lernen" - Algorithmen, die aus großen Datenmengen Muster extrahieren und diese auf neue Situationen anwenden können.

🏠 **Alltags-Analogie:** KI ist wie ein Kind, das Fahrradfahren lernt. Anfangs fällt es oft hin (macht Fehler), aber mit jeder Übung (mehr Daten) wird es besser. Irgendwann kann es fahren, ohne nachzudenken - und sogar auf neuen Wegen, die es noch nie gesehen hat.`,
  created_at: today,
};

export const mockEdition: Edition = {
  id: 'edition-1',
  date: today,
  top_story_id: '1',
  created_at: today,
  articles: mockArticles,
  concept: mockConcept,
  prompt: mockPrompt,
};

// Hilfsfunktion um Artikel nach Kategorie zu gruppieren
export function getArticlesByCategory(articles: Article[]): Record<Category, Article[]> {
  const grouped: Record<Category, Article[]> = {
    politik: [],
    wissenschaft: [],
    biologie: [],
    medizin: [],
    krieg: [],
    china: [],
    roboter: [],
    allgemein: [],
  };

  articles.forEach(article => {
    if (!article.is_top_story) {
      grouped[article.category].push(article);
    }
  });

  return grouped;
}
