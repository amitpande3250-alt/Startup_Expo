import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

describe('Cross-browser — must work in Chrome, Firefox, Safari, Edge without polyfill drama', () => {
  const all = ['src/App.tsx','src/components/Hero.tsx','src/components/About.tsx','src/components/ScheduleStrip.tsx','src/components/Features.tsx','src/components/Activities.tsx','src/components/Visit.tsx','src/components/Agenda.tsx','src/components/FAQ.tsx','src/components/Footer.tsx','src/index.css','src/main.tsx'].map(read).join('\n');
  const pkg = JSON.parse(read('package.json'));

  it('autoprefixer pipeline present (Tailwind alone does not prefix backdrop/sticky)', () => {
    assert.ok(pkg.devDependencies.autoprefixer, 'autoprefixer missing from devDeps — Safari needs -webkit- prefixes');
    assert.ok(pkg.devDependencies.postcss, 'postcss missing — autoprefixer cannot run');
    assert.ok(fs.existsSync(path.join(ROOT, 'postcss.config.js')), 'postcss.config.js missing');
  });

  it('video uses universal MP4 (not WebM-only) + object-cover fallback', () => {
    assert.match(all, /\.mp4/, 'hero must use .mp4 — WebM-only breaks Safari');
    assert.doesNotMatch(all, /\.webm['"]\s*$/, 'bare .webm source without mp4 fallback breaks Safari');
  });

  it('fonts load with display=swap (no FOIT blank text in slow networks)', () => {
    const html = read('index.html');
    assert.match(html, /display=swap/, 'Google Fonts must use display=swap — else invisible text during load');
    assert.match(html, /preconnect.*fonts\.gstatic/, 'missing preconnect to fonts.gstatic — slow first paint');
  });

  it('backdrop-blur always paired with solid fallback (older browsers ignore blur)', () => {
    const blurs = [...all.matchAll(/backdrop-blur[^\n]*/g)].map((m) => m[0]);
    assert.ok(blurs.length >= 2, 'expected backdrop-blur pills in hero');
    // every backdrop-blur element must also carry bg-black/70 so text stays readable with no blur support
    const hero = read('src/components/Hero.tsx');
    assert.match(hero, /bg-black\/70.*backdrop-blur|backdrop-blur.*bg-black\/70/s, 'blur pill without bg-black/70 fallback — unreadable in Firefox ESR');
  });

  it('no exotic JS APIs that need polyfills (flatMap ok, structuredClone/Temporal not)', () => {
    assert.doesNotMatch(all, /structuredClone|Temporal\.|Array\.prototype\.at\.call/, 'exotic API needs polyfill matrix — avoid');
  });

  it('smooth scroll degrades gracefully (CSS only, no JS scroll hijack)', () => {
    assert.match(read('src/index.css'), /scroll-behavior:\s*smooth/, 'index.css must keep scroll-behavior:smooth for anchor nav');
    assert.doesNotMatch(all, /scrollIntoView\(\{[^}]*behavior:\s*'smooth'/, 'JS smooth-scroll hijack conflicts with CSS — pick one');
  });

  it('mix-blend-overlay is decorative-only (content readable if ignored)', () => {
    // noise overlays must be pointer-events-none + low stacking so ignoring blend never hides CTA
    assert.match(all, /pointer-events-none/, 'decorative overlays must be pointer-events-none — else they eat taps in touch browsers');
  });

  it('viewport + charset + lang set (mobile Safari + i18n baseline)', () => {
    const html = read('index.html');
    assert.match(html, /<html lang="en">/, 'html lang missing — screen readers + translators misbehave');
    assert.match(html, /name="viewport"/, 'viewport meta missing — mobile Safari zooms out');
    assert.match(html, /charset="UTF-8"/, 'charset missing');
  });
});
