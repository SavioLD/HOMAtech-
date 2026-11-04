# HOMAtech – Karriereseite

Recruiting-Landingpage der **HOMAtech GmbH**, Oberndorf-Hochmössingen.
Ausgeschriebene Stelle: **CNC-Einrichter Drehen (m/w/d)** in Vollzeit,
und nur diese eine.

Aufbau und Sektionen folgen 1:1 der ALWA-Karriereseite
(`saviold.github.io/alwa-gmbh`): Topbar, Hero, Trust-Band, Stelle, Benefits,
Ablauf, Mid-CTA, Bewerbung, FAQ und Footer, dazu der Sticky-CTA auf dem Handy.
Auf Wunsch ergänzt: die Bildsektion „Einblicke“ nach der Stelle.

## Inhalt

- `index.html`: die komplette Seite (self-contained, kein Build-Schritt nötig)
- `bilder/`: Logo, Favicon und Foto (siehe „Bildmaterial“)
- `creatives/`: Meta-Ads-Creatives, Facebook-Bilder, Werbetexte und der Generator `build.mjs`
- `fonts/`: Schriften als woff2, lokal eingebunden (kein Abruf bei Google, DSGVO)
- `.nojekyll`: sorgt dafür, dass GitHub Pages die Dateien 1:1 ausliefert

## Live schalten (GitHub Pages)

1. Repo-Settings → **Pages** → Source: **Deploy from a branch**, Branch wählen, Ordner `/ (root)`
2. Nach ein paar Minuten unter `https://saviold.github.io/HOMAtech-/` erreichbar

## CI

Farben und Schriften stecken **ausschließlich** im `:root`-Block oben in
`index.html`.

```css
--brand:#78a1bd;      /* Logo-Blau ("HOMA"), aus dem Original-Logo ausgelesen */
--cta:#b62d3d;        /* Logo-Rot ("tech"), aus dem Original-Logo ausgelesen  */
--brand-700:#3d6884;  /* dunkleres Logo-Blau, auf Weiß als Text lesbar        */
--brand-900:#1c3344;  /* Navy, aus dem Logo-Blau abgeleitet                  */
--f-display: Saira    /* Überschriften, Buttons                              */
--f-body:    Carlito  /* Fließtext                                           */
```

- **Farben**: per Pixelanalyse direkt aus dem Original-Logo ausgelesen
  (Median aller Logo-Pixel). Rot ist die Aktionsfarbe (Buttons, Fortschritt),
  Blau trägt die Struktur (Icons, Auswahl, Flächen).
- **Schriften**: homatech.de war aus der Arbeitsumgebung nicht erreichbar,
  deshalb konnten die Web-Schriften nicht direkt ausgelesen werden.
  Fließtext ist **Carlito**, der metrisch identische, freie Zwilling von
  **Calibri**, in der der Briefkopf aus dem Auftrag gesetzt ist. Überschriften
  sind **Saira**, deren eckig-technische Formen zum Logo-Schriftzug passen.
  Liegt ein Styleguide vor, sind das zwei Zeilen (`--f-display` / `--f-body`).
- **Logo**: unverändert aus dem mitgelieferten Briefkopf freigestellt
  (`bilder/homatech-logo.png`): nur zugeschnitten und mit weißem Rand
  versehen, nicht nachgebaut, nicht eingefärbt, Seitenverhältnis erhalten.
  Weil es nur eine Variante auf Weiß gibt, sitzt es auf dunklem Grund (Hero,
  Footer) auf einer weißen Plakette statt eingefärbt zu werden. Die Topbar ist
  deshalb voll weiß. Das Favicon ist das Bildzeichen aus demselben Logo.
  Der weiße Grund war im JPEG minimal grau verrauscht (254 statt 255) und ist
  auf reines Weiß gesetzt; die Logofarben selbst sind unverändert.

## Die Stelle

Steht statisch im HTML (Sektion `#stelle`) und in der JobPosting-Structured-Data
im `<head>`:

- **Aufgaben**: die sechs Punkte aus dem Briefing, wörtlich
- **Das setzen wir voraus**: exakt die K.-o.-Kriterien, die das Formular
  prüft. Die Anzeige verlangt also nichts anderes als das Screening.
- **Wünschenswert**: Siemens-Steuerung
- **Das bieten wir dir**: Weihnachts- und Urlaubsgeld (monatlich 100 €),
  30 Tage Urlaub, bAV, JobRad, Tankgutschein bei Überstunden, kostenloser
  Kaffee, familiäre Atmosphäre und vielseitiger Job

Die beiden Prioritäten **familiäre Atmosphäre** und **vielseitiger Job**
stehen im Trust-Band ganz oben, als Überschrift der Benefit-Sektion und als
zwei hervorgehobene Karten vor den übrigen Benefits.

Es gibt **keine** Stellenauswahl, keine weiteren Positionen, keine
Initiativbewerbung und keinen Verweis auf andere Vakanzen.

## Vorfilterung (Screening)

Fünf Fragen, **eine pro Schritt**, danach die Kontaktdaten (6 Schritte).

| # | Feld | Frage | Kategorie | Erfüllt bei |
|---|------|-------|-----------|-------------|
| 1 | `ausbildung` | Ausbildung | **Pflicht** | Zerspanungsmechaniker/-in **oder** andere abgeschlossene Ausbildung im Metallbereich |
| 2 | `berufserfahrung` | Berufserfahrung | **Pflicht** | Berufserfahrung vorhanden (> 3 J., 1–3 J. oder < 1 J.); K.-o. nur bei „noch keine" |
| 3 | `siemens_steuerung` | Siemens-Steuerung | optional | Selbstständig oder Grundkenntnisse |
| 4 | `teamarbeit` | Teamplayer (Situationsfrage) | **Pflicht** | Hilft dem Kollegen (sofort oder sobald die eigene Maschine läuft) |
| 5 | `deutschkenntnisse` | Deutschkenntnisse | **Pflicht** | Mindestens B2 |

**Logik**

- **Pflichtfrage nicht erfüllt** → Bewerbung endet sofort. Freundlicher
  Abschlusshinweis, keine weiteren Schritte, **kein Lead an die Lead Table**.
  Es werden keine anderen Stellen angeboten.
- **Optionale Frage nicht erfüllt** → Bewerber kommt normal weiter. Die
  Antwort wird übertragen, mit `(nicht erfüllt)` markiert und zusätzlich im
  Feld `nicht_erfuellt` aufgeführt.

**Konfiguration** im `<script>` am Seitenende:

```js
var QUESTIONS = [
  { field:"ausbildung",        label:"Ausbildung im Metallbereich", pflicht:true  },
  { field:"berufserfahrung",   label:"Berufserfahrung",             pflicht:true  },
  { field:"siemens_steuerung", label:"Siemens-Steuerung",           pflicht:false },
  { field:"teamarbeit",        label:"Teamplayer",                  pflicht:true  },
  { field:"deutschkenntnisse", label:"Deutschkenntnisse",           pflicht:true  }
];
```

Welche Antwort als „erfüllt" gilt, steht direkt am Radio als `data-ok="1"`.
Soll z. B. „Weniger als 1 Jahr" Berufserfahrung künftig ausscheiden, einfach
dort `data-ok="1"` entfernen.

Abgefragt werden ausschließlich berufsbezogene Kriterien, keine Fragen zu
Alter, Herkunft, Gesundheit, Religion oder Familienstand (AGG).
**Kein Lebenslauf-Upload, keine Dateianhänge.**

## Mobile Laufruhe

Beim Schrittwechsel passiert ausschließlich ein Klassenwechsel. Es gibt
**kein** `window.scrollTo`, **kein** `scrollIntoView`, **kein** `focus()`,
keinen Reload und keinen Hash-Sprung. Der Formularcontainer hat eine feste
Mindesthöhe (`--form-min` 520 px, `--form-min-mobile` 496 px; ≤ 340 px
kompakter Modus mit 430 px). Sie liegt über dem höchsten Schritt, damit alle
Schritte exakt gleich hoch sind und der Weiter-Button immer an derselben
Stelle steht.

Nachgemessen im Browser (Chromium, Touch-Emulation, echte Taps), kompletter
Durchlauf von Frage 1 bis zur Bestätigung:

| Viewport | scrollY | Höhe Formular | Weiter-Button | Schritt komplett sichtbar | Scroll-/Fokus-Aufrufe |
|----------|---------|---------------|---------------|---------------------------|-----------------------|
| 320 × 568 | konstant | 430 px, konstant | fix | ja | 0 |
| 360 × 640 | konstant | 496 px, konstant | fix | ja | 0 |
| 375 × 667 | konstant | 496 px, konstant | fix | ja | 0 |
| 390 × 844 | konstant | 496 px, konstant | fix | ja | 0 |
| 414 × 896 | konstant | 496 px, konstant | fix | ja | 0 |

Zusätzlich geprüft: alle vier K.-o.-Pfade (Abbruch an der richtigen Frage,
keine weiteren Schritte, kein Request, kein Sprung) und der Zurück-Button.

## Lead Table

Webhook der Kachel steht in `index.html` unter `WEBHOOK_URL`
(`tableID 6ae1ec9012e21e3356d3b1c6`, `customerID 6ae1ec7af08c82e69a1ad89b`).

Gesendet wird **nur** bei vollständiger, qualifizierter Bewerbung, als
`POST` mit `Content-Type: application/json`. K.-o.-Abbrüche verlassen die
Seite nie.

Payload, **jedes Feld genau einmal**, Vor- und Nachname getrennt, **kein**
kombiniertes `name`/`fullname`/`vollstaendiger_name`:

```json
{
  "vorname": "Max",
  "nachname": "Mustermann",
  "telefon": "0151 23456789",
  "email": "max.mustermann@beispiel.de",
  "stelle": "CNC-Einrichter Drehen (m/w/d)",
  "ausbildung": "Abgeschlossene Ausbildung als Zerspanungsmechaniker/-in",
  "berufserfahrung": "1 bis 3 Jahre Berufserfahrung",
  "siemens_steuerung": "Nein, bisher mit anderen Steuerungen gearbeitet (nicht erfüllt)",
  "teamarbeit": "Schaut mit drauf – wir lösen es zusammen",
  "deutschkenntnisse": "Gut, ich verstehe und spreche sicher (B2)",
  "nicht_erfuellt": "Siemens-Steuerung",
  "datum": "28.10.2026",
  "datenschutz": "Ja (Einwilligung mit Absenden, Art. 6 Abs. 1 lit. a DSGVO)",
  "quelle": "Karriere-Landingpage HOMAtech",
  "seite": "https://…"
}
```

Die Feldnamen folgen den bestehenden Lead-Table-Anbindungen derselben Agentur
(ALWA, Schanbacher): `vorname`, `nachname`, `telefon`, `email` als
Standardfelder, alles Weitere als Zusatzfelder.

**Fehlerverhalten:** Antwortet die Lead Table mit einem Fehlercode, sieht der
Bewerber eine Fehlermeldung und kann erneut absenden. Es gibt bewusst keinen
automatischen zweiten Versuch, damit kein doppelter Lead entsteht. Nur wenn
die Anfrage gar nicht durchkommt (Netzwerk/CORS), wird sie einmal als
`text/plain` (`no-cors`) nachgesendet.

## Noch zu prüfen

- **Echter Testeintrag in der Lead Table**: aus der Arbeitsumgebung war
  `api-v2.lead-table.com` gesperrt. Payload und Feldzuordnung sind im Browser
  geprüft, der echte Eintrag steht noch aus.
- **Schriften der Website**: homatech.de war nicht erreichbar (siehe CI).
- **Impressum/Datenschutz-Links** (aktuell `homatech.de/impressum/` und
  `homatech.de/datenschutz/`): Pfade bitte gegen die echte Website prüfen.
- **Analytics-Snippet** am Seitenende (`analytics.laendle-digital.com`,
  `data-website-id="homatech_gmbh"`) ist wie bei der Referenzseite gesetzt,
  bei Bedarf entfernen oder die ID anpassen.
- **E-Mail-Benachrichtigung**: anders als bei ALWA ist keine eingebaut, weil
  für HOMAtech kein eigener Web3Forms-Key vorliegt. Mit Key ist das eine
  kleine Ergänzung.
- **Vorschaubild beim Teilen** (`og:image`) zeigt auf
  `https://saviold.github.io/HOMAtech-/creatives/og-image.jpg`. Zieht die Seite
  auf eine andere Adresse um, diese URL im `<head>` anpassen.
- **Stellentitel**: aktuell „CNC-Einrichter Drehen (m/w/d)“. Bei einer anderen
  Variante: `index.html`, `creatives/build.mjs` (`STELLE`, Motive) und
  `creatives/werbetexte.md` anpassen, dann `node creatives/build.mjs`.

## Bildmaterial

| Datei | verwendet für |
|-------|---------------|
| `bilder/cnc-einrichter.jpg` | Original-Foto (Einrichter an der Drehmaschine), 640 × 960 |
| `bilder/cnc-einrichter@2x.jpg` | daraus: 2× hochgerechnet (Lanczos) und leicht nachgeschärft – Hero und Creatives |
| `bilder/fertigung.jpg` (+ `@2x`) | Foto Drehzentrum mit Bedienpult – Sektion „Einblicke“ |
| `bilder/werkstatt.jpg` | Foto aus der Werkstatt – Sektion „Einblicke“ |
| `bilder/homatech-logo.png` | Original-Logo – Creatives, Facebook |
| `bilder/homatech-logo-web.png` | Original-Logo, verkleinert – Topbar, Hero, Footer |

Die Sektion **„Einblicke“** (zwischen Stelle und „Warum HOMAtech“) zeigt alle
drei Fotos als Bildraster mit kurzen Bildunterschriften; die Creatives
verwenden weiterhin nur das Einrichter-Foto.

Im **Hero** steht das Foto auf dem Desktop rechts neben dem Text und läuft
weich in den Verlauf aus; mobil liegt es abgedunkelt hinter dem Text. Das
Hochformat passt so ohne starkes Hochskalieren.

Das Foto ist mit 640 × 960 px eher klein. Für noch schärfere Creatives
einfach eine größere Version derselben Aufnahme (oder weitere Fotos) in
`bilder/` legen und neu rendern.

## Creatives (Meta Ads) + Facebook-Seite

Alles in `creatives/`, gerendert mit **einem** Befehl:

```bash
node creatives/build.mjs
```

Das Skript baut jede Datei aus HTML/CSS im CI der Karriereseite: gleiche
Farben, gleiche Schriften (aus `fonts/`, eingebettet), Original-Logo
unverändert. Hell, mit roten Akzenten und Diagonalen im 45°-Winkel des
Logo-Bildzeichens.

**3 Motive × 4 Formate = 12 Creatives**

| Motiv | Ansatz | Störer | CTA |
|-------|--------|--------|-----|
| `stelle` | Stelle direkt ansprechen: „CNC-Einrichter Drehen (m/w/d)“ | +100 € jeden Monat | In 60 Sek. bewerben |
| `geld` | Benefit voran: „100 € extra. Jeden Monat.“ | 30 Tage Urlaub | Jetzt bewerben |
| `check` | Qualifizierer: „Rüsten. Programmieren. Messen.“ + K.-o.-Kriterien | Familiär & vielseitig | Passt? Jetzt bewerben |

| Suffix | Format | Größe |
|--------|--------|-------|
| `-4x5` | Instagram/Facebook-Beitrag | 1080 × 1350 |
| `-1x1` | Beitrag quadratisch | 1080 × 1080 |
| `-9x16` | Story/Reels (Safe Zones oben 270 px, unten 380 px frei) | 1080 × 1920 |
| `-quer` | Querformat 1,91 : 1 | 1920 × 1005 |

Dazu:

| Datei | Größe | Hinweis |
|-------|-------|---------|
| `facebook-profilbild.png` | 1080 × 1080 | Logo mittig, großer Rand – rund beschnitten bleibt alles sichtbar |
| `facebook-titelbild.png` | 1640 × 856 | Logo + Claim in der Sicherheitszone 1092 × 616, unten rechts frei |
| `og-image.jpg` | 1200 × 630 | Vorschaubild beim Teilen des Links |
| `werbetexte.md` | – | 3 Textvarianten, mit jedem Creative kombinierbar |

Der Generator prüft bei jedem Lauf, dass nichts über den Rand ragt und
sich keine Texte, Chips, Störer oder Buttons überlappen; sonst bricht er
mit Meldung ab. Die Headline wird automatisch auf volle Breite gesetzt, der
Text im Störer-Kreis automatisch eingepasst. Neues Motiv: Eintrag in
`MOTIVE`. Neues Format: Eintrag in `FORMATE` und `LAYOUT_CSS`.
