/* =====================================================================
   CREATIVE-GENERATOR · HOMAtech GmbH
   ---------------------------------------------------------------------
   Rendert alle Meta-Ads-Creatives und die Facebook-Bilder aus einer
   Config – im CI der Karriereseite (gleiche Farben, gleiche Schriften).

     node creatives/build.mjs

   Bildmaterial: ausschließlich aus bilder/
     - Foto:  bilder/cnc-einrichter@2x.jpg (aus bilder/cnc-einrichter.jpg)
     - Logo:  bilder/homatech-logo.png – unverändert, nur skaliert

   Neues Format: in FORMATE ergänzen.  Neues Motiv: in MOTIVE ergänzen.
   ===================================================================== */

import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');

/* ---------- CI (identisch mit dem :root-Block in index.html) ---------- */
const CI = {
  blue:    '#78a1bd',   // Logo-Blau ("HOMA"), aus dem Original-Logo ausgelesen
  blue700: '#3d6884',
  navy:    '#1c3344',
  red:     '#b62d3d',   // Logo-Rot ("tech"), aus dem Original-Logo ausgelesen
  redDark: '#98222f',
  soft:    '#e8f0f6',
  ink:     '#33475a'
};

const dataUri = (rel, mime) => `data:${mime};base64,${readFileSync(join(ROOT, rel)).toString('base64')}`;
const FONT_CSS = `
@font-face{font-family:Saira;font-weight:400 900;font-display:block;src:url(${dataUri('fonts/saira-latin-variable.woff2','font/woff2')}) format('woff2')}
@font-face{font-family:Carlito;font-weight:400;font-display:block;src:url(${dataUri('fonts/carlito-latin-400.woff2','font/woff2')}) format('woff2')}
@font-face{font-family:Carlito;font-weight:700;font-display:block;src:url(${dataUri('fonts/carlito-latin-700.woff2','font/woff2')}) format('woff2')}`;
const LOGO  = dataUri('bilder/homatech-logo.png', 'image/png');
const FOTO  = dataUri('bilder/cnc-einrichter@2x.jpg', 'image/jpeg');

/* ---------- Formate ---------- */
const FORMATE = {
  '4x5':  { w: 1080, h: 1350, scale: 1,   name: 'Instagram/Facebook-Beitrag 4:5' },
  '1x1':  { w: 1080, h: 1080, scale: 1,   name: 'Beitrag quadratisch 1:1' },
  '9x16': { w: 1080, h: 1920, scale: 1,   name: 'Story/Reels 9:16' },
  'quer': { w: 1200, h: 628,  scale: 1.6, name: 'Querformat 1,91:1' }
};

/* ---------- Motive ----------
   Jedes Motiv verfolgt einen eigenen Ansatz. Alle nennen die Stelle,
   alle filtern über die Fachlichkeit (Rüsten, Programmieren, Messen)
   auf Qualität statt Masse. */
const STELLE = 'CNC-Einrichter Drehen <span class="nt">(m/w/d)</span>';
const MOTIVE = {
  stelle: {
    kicker: 'Wir suchen dich',
    h1: [['CNC-Einrichter', ''], ['Drehen (m/w/d)', 'red small']],
    sub: 'Rüsten, programmieren, messen – an <b>Emco- und Spinner-Drehmaschinen</b> mit Siemens-Steuerung.',
    label: '',
    chips: ['30 Tage Urlaub', 'JobRad & bAV', 'Familiäres Team'],
    badge: ['+100 €', 'jeden Monat'],
    cta: 'In 60 Sek. bewerben'
  },
  geld: {
    kicker: STELLE,
    h1: [['100 € extra.', 'red'], ['Jeden Monat.', '']],
    sub: 'Weihnachts- und Urlaubsgeld gibt’s bei uns nicht einmal im Jahr – <b>sondern jeden Monat.</b>',
    label: '',
    chips: ['JobRad', 'Betriebliche Altersvorsorge', 'Tankgutschein bei Überstunden'],
    badge: ['30', 'Tage Urlaub'],
    cta: 'Jetzt bewerben'
  },
  check: {
    kicker: STELLE,
    h1: [['Rüsten.', ''], ['Programmieren.', ''], ['Messen.', 'red']],
    sub: 'Alles in deiner Hand – <b>Kleinserien statt Monotonie.</b>',
    label: 'Das bringst du mit:',
    chips: ['Ausbildung im Metallbereich', 'Berufserfahrung', 'Teamplayer'],
    badge: ['Familiär', '& vielseitig'],
    cta: 'Passt? Jetzt bewerben'
  }
};

const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';

/* ---------- Grund-CSS (alle Formate) ---------- */
const BASE_CSS = `
${FONT_CSS}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:#fff}
.cv{position:relative;overflow:hidden;background:#fff;font-family:Saira,sans-serif;color:${CI.navy};-webkit-font-smoothing:antialiased}
/* Deko: helle Fläche + zwei Diagonalen im 45°-Winkel des Logo-Bildzeichens */
.deco{position:absolute;inset:0;pointer-events:none}
.deco .tint{position:absolute;background:${CI.soft};transform:rotate(-45deg);transform-origin:center}
.deco .s{position:absolute;transform:rotate(-45deg);transform-origin:center}
.deco .s.red{background:${CI.red}}
.deco .s.blue{background:${CI.blue}}
.content{position:absolute;display:flex;flex-direction:column}
.top{display:flex;align-items:center;justify-content:space-between}
.logo{display:block;width:auto}
.loc{font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:${CI.blue700}}
.kicker{display:inline-block;align-self:flex-start;background:${CI.navy};color:#fff;font-weight:800;text-transform:uppercase;letter-spacing:.07em;padding:.38em .8em .34em;border-radius:.35em;transform:rotate(-2deg);transform-origin:left center}
.kicker .nt{text-transform:none;letter-spacing:.02em}
.kicker::before{content:"";display:inline-block;width:.55em;height:.55em;border-radius:50%;background:${CI.red};margin-right:.55em;vertical-align:.08em;box-shadow:0 0 0 .18em rgba(182,45,61,.35)}
h1{font-weight:900;line-height:.93;letter-spacing:-.025em;color:${CI.navy}}
h1 .l{display:block;width:max-content;white-space:nowrap}
h1 .red{color:${CI.red}}
h1 .small{font-size:.7em;letter-spacing:-.015em;margin-top:.08em}
.body{position:relative;flex:1}
.col{position:absolute;left:0;top:0;bottom:0;display:flex;flex-direction:column;z-index:3}
.sub{font-family:Carlito,sans-serif;line-height:1.22;color:${CI.ink}}
.sub b{color:${CI.navy}}
.label{align-self:flex-start;background:#fff;border-radius:.3em;padding:.2em .5em .15em 0;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:${CI.red}}
.chips{list-style:none;display:flex;flex-direction:column;align-items:flex-start}
.chip{display:flex;align-items:center;gap:.5em;background:#fff;border:.12em solid ${CI.navy};border-radius:.42em;padding:.38em .75em .38em .45em;font-weight:800;line-height:1.1;box-shadow:0 .5em 1.1em rgba(28,51,68,.2);white-space:nowrap}
.chip i{flex:0 0 1.25em;height:1.25em;border-radius:50%;background:${CI.red};display:grid;place-items:center}
.chip i svg{width:.78em;height:.78em}
.photo-wrap{position:absolute;z-index:2}
.frame{position:absolute;inset:0;filter:drop-shadow(0 26px 40px rgba(28,51,68,.38))}
.frame .rim{position:absolute;inset:0;background:#fff;clip-path:polygon(var(--ch) 0,100% 0,100% calc(100% - var(--ch)),calc(100% - var(--ch)) 100%,0 100%,0 var(--ch))}
.frame .img{position:absolute;inset:var(--rim);background:url(${FOTO}) var(--pos,center 30%)/cover no-repeat;clip-path:polygon(calc(var(--ch) - var(--rim)*.6) 0,100% 0,100% calc(100% - var(--ch) + var(--rim)*.6),calc(100% - var(--ch) + var(--rim)*.6) 100%,0 100%,0 calc(var(--ch) - var(--rim)*.6))}
.badge{position:absolute;z-index:4;border-radius:50%;background:${CI.red};color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border:8px solid #fff;box-shadow:0 14px 34px rgba(152,34,47,.45);transform:rotate(-10deg)}
.badge b{display:block;font-weight:900;line-height:.9;letter-spacing:-.03em;white-space:nowrap}
.badge span{display:block;font-weight:800;text-transform:uppercase;letter-spacing:.05em;margin-top:.3em;white-space:nowrap}
.cta{display:flex;align-items:center;justify-content:center;gap:.5em;background:${CI.red};color:#fff;font-weight:800;border-radius:.42em;box-shadow:0 .45em 1em rgba(182,45,61,.42);white-space:nowrap;letter-spacing:.005em}
.cta svg{width:1em;height:1em}
`;

/* ---------- Layout je Format ---------- */
const LAYOUT_CSS = {
  /* --h1max: Obergrenze der Headline. Die Headline wird per JS so groß
     gesetzt, dass ihre längste Zeile die volle Breite füllt (max. --h1max). */
  '4x5': `
  .cv{width:1080px;height:1350px}
  .deco .tint{width:1500px;height:900px;left:-560px;top:860px}
  .deco .s.red{width:1800px;height:74px;left:-160px;top:1010px}
  .deco .s.blue{width:1800px;height:26px;left:-120px;top:1124px}
  .content{inset:58px 64px 64px}
  .logo{height:66px}
  .loc{font-size:22px}
  .head{margin-top:46px}
  .kicker{font-size:28px}
  h1{--h1max:150px;margin-top:22px}
  .body{margin-top:38px}
  .col{width:410px;gap:24px}
  .sub{font-size:33px}
  .label{font-size:24px;margin-bottom:-10px}
  .chips{gap:16px}
  .chip{font-size:29px}
  .photo-wrap{right:0;top:0;bottom:0;width:560px;--ch:70px;--rim:12px;--pos:center 32%}
  .badge{width:240px;height:240px;right:-34px;top:-14px}
  .cta{margin-top:34px;height:112px;font-size:44px}
  .m-geld .chip{font-size:27px}
  .m-check h1{--h1max:112px}
  `,
  '1x1': `
  .cv{width:1080px;height:1080px}
  .deco .tint{width:1400px;height:800px;left:-560px;top:700px}
  .deco .s.red{width:1600px;height:64px;left:-200px;top:800px}
  .deco .s.blue{width:1600px;height:22px;left:-160px;top:902px}
  .content{inset:52px 60px 56px}
  .logo{height:58px}
  .loc{font-size:20px}
  .head{margin-top:30px}
  .kicker{font-size:24px}
  h1{--h1max:132px;margin-top:16px}
  .body{margin-top:28px}
  .col{width:450px;gap:16px}
  .sub{font-size:28px}
  .label{font-size:21px;margin-bottom:-4px}
  .chips{gap:12px}
  .chip{font-size:26px}
  .photo-wrap{right:0;top:0;bottom:0;width:470px;--ch:56px;--rim:11px;--pos:center 30%}
  .badge{width:200px;height:200px;right:-30px;top:-16px}
  .cta{margin-top:26px;height:96px;font-size:40px}
  .m-geld .chip{font-size:24px}
  .m-check h1{--h1max:84px}
  .m-check .sub{display:none}
  `,
  '9x16': `
  .cv{width:1080px;height:1920px}
  .deco .tint{width:2000px;height:1100px;left:-700px;top:1520px}
  .deco .s.red{width:2200px;height:92px;left:-300px;top:1660px}
  .deco .s.blue{width:2200px;height:32px;left:-250px;top:1800px}
  /* Safe Zones Stories/Reels: oben ~270 px und unten ~380 px frei von
     Kerninhalten. Das Foto läuft oben randlos durch – dort liegt ohnehin
     die Profilzeile von Instagram/Facebook. */
  .content{inset:270px 70px 380px}
  .top{position:absolute;top:24px;left:0;z-index:5}
  .logo{height:98px;padding:14px 18px;background:#fff;border-radius:14px;box-shadow:0 12px 30px rgba(28,51,68,.28)}
  .loc{display:none}
  .head{margin-top:650px}
  .kicker{font-size:30px}
  h1{--h1max:150px;margin-top:22px}
  .body{position:static;flex:0 0 auto;margin-top:22px}
  .col{position:static}
  .sub{font-size:38px;max-width:920px}
  .label{display:none}
  .chips{position:absolute;z-index:5;left:-12px;bottom:706px;gap:14px}
  .chip{font-size:31px}
  .photo-wrap{left:-70px;right:-70px;top:-270px;height:880px;--pos:center 30%}
  .frame{filter:none}
  .frame .rim{inset:0 0 -26px 0;background:${CI.red};clip-path:polygon(0 0,100% 0,100% 84.4%,0 100%)}
  .frame .img{inset:0;clip-path:polygon(0 0,100% 0,100% 84%,0 100%)}
  .badge{width:270px;height:270px;right:50px;bottom:-40px}
  .cta{margin-top:auto;height:124px;font-size:50px}
  .m-geld h1{--h1max:132px}
  .m-geld .chip{font-size:29px}
  .m-check h1{--h1max:104px}
  `,
  'quer': `
  .cv{width:1200px;height:628px}
  .deco .tint{width:1300px;height:520px;left:-520px;top:430px}
  .deco .s.red{width:700px;height:40px;left:380px;top:520px}
  .deco .s.blue{width:700px;height:14px;left:430px;top:570px}
  .content{inset:0;padding:38px 44px 40px}
  .top{width:640px}
  .logo{height:44px}
  .loc{display:none}
  .head{margin-top:24px;width:640px}
  .kicker{font-size:17px}
  h1{--h1max:84px;margin-top:14px}
  .body{position:static;margin-top:18px}
  .col{position:static;width:640px;gap:12px}
  .sub{font-size:22px;max-width:600px}
  .label{display:none}
  .chips{flex-direction:row;flex-wrap:wrap;gap:10px;max-width:640px}
  .chip{font-size:18px}
  .photo-wrap{right:0;top:0;bottom:0;width:480px;--ch:0px;--rim:0px;--pos:center 30%}
  .frame{filter:none}
  .frame .rim{display:none}
  .frame .img{inset:0;clip-path:polygon(120px 0,100% 0,100% 100%,0 100%)}
  .badge{width:176px;height:176px;left:-40px;bottom:36px}
  .cta{position:absolute;left:44px;bottom:40px;height:64px;padding:0 30px;font-size:25px}
  .m-check h1{--h1max:60px}
  .m-check .sub,.m-geld .sub{display:none}
  `
};

/* Wird im Browser vor dem Screenshot ausgeführt:
   - Headline auf volle Breite (max. --h1max)
   - Text im Störer-Kreis so groß wie möglich, ohne den Kreis zu sprengen */
const FIT_JS = () => {
  document.querySelectorAll('h1').forEach(h1 => {
    const max = parseFloat(getComputedStyle(h1).getPropertyValue('--h1max')) || 0;
    if (!max) return;
    h1.style.fontSize = '100px';
    const target = h1.parentElement.getBoundingClientRect().width;
    const widest = Math.max(...[...h1.querySelectorAll('.l')].map(l => l.scrollWidth));
    h1.style.fontSize = Math.min(max, 100 * target / widest).toFixed(1) + 'px';
  });
  document.querySelectorAll('.badge').forEach(bd => {
    const d = bd.getBoundingClientRect().width;
    const fit = (el, maxW, maxF) => {
      el.style.fontSize = '100px';
      el.style.fontSize = Math.min(maxF, 100 * maxW / el.scrollWidth).toFixed(1) + 'px';
    };
    fit(bd.querySelector('b'), d * 0.74, d * 0.42);
    fit(bd.querySelector('span'), d * 0.66, d * 0.11);
  });
};

function creativeHtml(motivKey, formatKey) {
  const m = MOTIVE[motivKey];
  const h1 = m.h1.map(([t, cls]) => `<span class="l ${cls}">${t}</span>`).join('');
  const chips = m.chips.map(c => `<li class="chip"><i>${CHECK}</i>${c}</li>`).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}${LAYOUT_CSS[formatKey]}</style></head>
<body><div class="cv f-${formatKey} m-${motivKey}">
  <div class="deco"><div class="tint"></div><div class="s red"></div><div class="s blue"></div></div>
  <div class="content">
    <div class="top"><img class="logo" src="${LOGO}" alt=""><span class="loc">Oberndorf-Hochmössingen</span></div>
    <div class="head"><span class="kicker">${m.kicker}</span><h1>${h1}</h1></div>
    <div class="body">
      <div class="col">
        <p class="sub">${m.sub}</p>
        ${m.label ? `<div class="label">${m.label}</div>` : ''}
        <ul class="chips">${chips}</ul>
      </div>
      <div class="photo-wrap">
        <div class="frame"><div class="rim"></div><div class="img"></div></div>
        <div class="badge"><b>${m.badge[0]}</b><span>${m.badge[1]}</span></div>
      </div>
    </div>
    <div class="cta">${m.cta}${ARROW}</div>
  </div>
</div></body></html>`;
}

/* ---------- Facebook: Profilbild + Titelbild ---------- */
function profilHtml() {
  /* 1080 × 1080, Facebook schneidet rund zu: Logo mittig, großzügiger Rand,
     nichts Wichtiges in den Ecken. */
  return `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}
  .cv{width:1080px;height:1080px;display:grid;place-items:center;background:#fff}
  .logo{width:820px;height:auto}
  </style></head><body><div class="cv"><img class="logo" src="${LOGO}" alt=""></div></body></html>`;
}

function titelHtml() {
  /* 1640 × 856. Sicherheitszone 1092 × 616 mittig (x 274–1366, y 120–736):
     Logo und Claim liegen komplett darin. Unten rechts bleibt frei (Button). */
  return `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}
  .cv{width:1640px;height:856px}
  .deco .tint{width:900px;height:520px;left:1240px;top:-330px}
  .deco .s.red{width:620px;height:46px;left:1260px;top:60px}
  .deco .s.blue{width:620px;height:16px;left:1320px;top:150px}
  .photo{position:absolute;left:0;top:0;bottom:0;width:640px;background:url(${FOTO}) center 30%/cover no-repeat;clip-path:polygon(0 0,100% 0,78% 100%,0 100%)}
  .photo-edge{position:absolute;left:0;top:0;bottom:0;width:660px;background:${CI.red};clip-path:polygon(97% 0,100% 0,78.6% 100%,75.6% 100%)}
  .claim{position:absolute;left:700px;top:190px;width:640px}
  .claim .logo{height:96px}
  .claim h1{font-size:76px;margin-top:40px;line-height:.98}
  .claim p{font-family:Carlito,sans-serif;font-size:30px;color:${CI.ink};margin-top:24px}
  </style></head><body><div class="cv">
    <div class="deco"><div class="tint"></div><div class="s red"></div><div class="s blue"></div></div>
    <div class="photo-edge"></div><div class="photo"></div>
    <div class="claim">
      <img class="logo" src="${LOGO}" alt="">
      <h1><span class="l">Präzise Drehteile.</span><span class="l red">Familiäres Team.</span></h1>
      <p>HOMAtech GmbH · Oberndorf-Hochmössingen</p>
    </div>
  </div></body></html>`;
}

/* ---------- Rendern ---------- */
async function render(browser, html, w, h, scale, file, type = 'png') {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(FIT_JS);
  // Kontrolle: nichts darf über den Rand laufen oder abgeschnitten sein
  const overflow = await page.evaluate(() => {
    const cv = document.querySelector('.cv').getBoundingClientRect();
    const bad = [];
    document.querySelectorAll('.content > *, .chip, h1 .l, .cta, .badge, .claim, .logo').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width && (r.left < cv.left - 1 || r.right > cv.right + 1 || r.top < cv.top - 1 || r.bottom > cv.bottom + 1)) bad.push(el.className || el.tagName);
    });
    return bad;
  });
  const overlap = await page.evaluate(() => {
    /* Echte Textflächen statt Container: jede Headline-Zeile, jeder Chip … */
    const groups = { logo: '.top .logo', kicker: '.kicker', h1: 'h1 .l', sub: '.sub', chip: '.chip', cta: '.cta' };
    const boxes = [];
    for (const [g, sel] of Object.entries(groups)) document.querySelectorAll(sel).forEach(el => {
      if (getComputedStyle(el).display === 'none') return;
      const r = el.getBoundingClientRect(); if (r.width) boxes.push({ g, r });
    });
    const hit = (A, B) => A.left < B.right && B.left < A.right && A.top < B.bottom && B.top < A.bottom;
    const out = new Set();
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++)
      if (boxes[i].g !== boxes[j].g && hit(boxes[i].r, boxes[j].r)) out.add(boxes[i].g + '/' + boxes[j].g);
    /* … und der Störer als Kreis */
    const bd = document.querySelector('.badge');
    if (bd) {
      const c = bd.getBoundingClientRect(), cx = c.left + c.width / 2, cy = c.top + c.height / 2, rad = bd.offsetWidth / 2;
      boxes.forEach(({ g, r }) => {
        const dx = Math.max(r.left - cx, 0, cx - r.right), dy = Math.max(r.top - cy, 0, cy - r.bottom);
        if (dx * dx + dy * dy < rad * rad) out.add('badge/' + g);
      });
    }
    return [...out];
  });
  overflow.push(...overlap.map(o => 'überlappt ' + o));
  await page.screenshot({ path: join(HERE, file), type, ...(type === 'jpeg' ? { quality: 88 } : {}), clip: { x: 0, y: 0, width: w, height: h } });
  await page.close();
  console.log(`  ${file.padEnd(32)} ${Math.round(w * scale)} × ${Math.round(h * scale)}${overflow.length ? '  ⚠ ragt über den Rand: ' + overflow.join(', ') : ''}`);
  return overflow.length === 0;
}

const browser = await chromium.launch();
let ok = true;
console.log('Creatives:');
for (const motiv of Object.keys(MOTIVE)) {
  for (const [fk, f] of Object.entries(FORMATE)) {
    ok = await render(browser, creativeHtml(motiv, fk), f.w, f.h, f.scale, `homatech-${motiv}-${fk}.png`) && ok;
  }
}
console.log('Vorschaubild für Link-Teilen (og:image):');
ok = await render(browser, creativeHtml('stelle', 'quer').replace('height:628px', 'height:630px'), 1200, 630, 1, 'og-image.jpg', 'jpeg') && ok;
console.log('Facebook:');
ok = await render(browser, profilHtml(), 1080, 1080, 1, 'facebook-profilbild.png') && ok;
ok = await render(browser, titelHtml(), 1640, 856, 1, 'facebook-titelbild.png') && ok;
await browser.close();
if (!ok) { console.error('\nMindestens ein Element ragt über den Rand – Layout prüfen.'); process.exit(1); }
