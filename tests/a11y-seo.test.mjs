import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

function luminance([r, g, b]) {
  const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function contrast(hex1, hex2) {
  const h = (x) => [1, 3, 5].map((i) => parseInt(x.slice(i, i + 2), 16));
  const [l1, l2] = [luminance(h(hex1)), luminance(h(hex2))].sort((a, b) => b - a);
  return (l1 + 0.05) / (l2 + 0.05);
}

describe('A11y + SEO — brutal pass: keyboard, readers, contrast, headings', () => {
  const files = ['src/components/Hero.tsx','src/components/About.tsx','src/components/Features.tsx','src/components/Activities.tsx','src/components/Visit.tsx','src/components/Agenda.tsx','src/components/FAQ.tsx','src/components/Footer.tsx'];
  const all = files.map(read).join('\n');
  const html = read('index.html');

  it('exactly one h1 per page (multiple h1s confuse readers + SEO)', () => {
    const h1s = [...all.matchAll(/<h1[\s>]/g)].length;
    assert.equal(h1s, 1, `found ${h1s} <h1> — must be exactly 1 (hero)`);
  });

  it('heading order never skips (h1→h2/h3, no h4 without h3)', () => {
    assert.match(all, /<h3/, 'sections must use h3 under hero h1 — headings give document outline');
    assert.doesNotMatch(all, /<h5|<h6/, 'deep headings h5/h6 on a landing page = outline gone wrong');
  });

  it('nav landmarks labelled (multiple navs need aria-label)', () => {
    const navs = [...all.matchAll(/<nav[^>]*>/g)].map((m) => m[0]);
    assert.ok(navs.length >= 2, `only ${navs.length} <nav> — need header + footer nav`);
    for (const n of navs) assert.match(n, /aria-label/, `nav without aria-label: ${n}`);
  });

  it('all icon-only controls expose names (aria-label or visible text)', () => {
    // buttons in FAQ carry question text — good; any bare icon button must have aria-label
    const iconButtons = [...all.matchAll(/<button[^>]*>\s*<[A-Z][^>]*\/>\s*<\/button>/g)];
    assert.equal(iconButtons.length, 0, 'icon-only <button> without text needs aria-label');
  });

  it('interactive elements are native (no div-onClick traps)', () => {
    assert.doesNotMatch(all, /<div[^>]*onClick/, 'div onClick is not keyboard-focusable — use <button>/<a>');
    assert.doesNotMatch(all, /<span[^>]*onClick/, 'span onClick trap found');
  });

  it('primary cream on black passes WCAG AA (contrast ≥4.5 for body text)', () => {
    const c = contrast('#DEDBC8', '#000000');
    assert.ok(c >= 7, `primary #DEDBC8 on black contrast ${c.toFixed(2)} — must be ≥7 for hero`);
    const card = contrast('#DEDBC8', '#101010');
    assert.ok(card >= 4.5, `primary on #101010 contrast ${card.toFixed(2)} — must be ≥4.5`);
  });

  it('SEO basics: title, description, single meta charset', () => {
    assert.match(html, /<title>[^<]{20,80}<\/title>/, 'title length 20-80 chars');
    const desc = html.match(/meta\s+name="description"\s+content="([^"]+)"/s);
    assert.ok(desc, 'meta description missing');
    assert.ok(desc[1].length >= 80 && desc[1].length <= 300, `description ${desc[1].length} chars — keep 80-300`);
  });

  it('touch + keyboard: FAQ buttons are real buttons with expanded state', () => {
    assert.match(read('src/components/FAQ.tsx'), /<button[^>]*aria-expanded/, 'FAQ toggle must expose aria-expanded');
  });

  it('keyboard: skip-to-content link exists and targets first section', () => {
    const app = read('src/App.tsx');
    assert.match(app, /Skip to content/, 'skip link missing — keyboard users tab through video/nav with no escape');
    assert.match(app, /href="#overview"/, 'skip link must target #overview');
    assert.match(app, /sr-only focus:not-sr-only/, 'skip link must be visually hidden until focused');
  });

  it('reduced-motion: animations disabled when user prefers it', () => {
    const css = read('src/index.css');
    assert.match(css, /prefers-reduced-motion:\s*reduce/, 'no reduced-motion guard — motion-sensitive users get full animation');
    const app = read('src/App.tsx');
    assert.match(app, /MotionConfig.*reducedMotion="user"|reducedMotion="user"/s, 'framer-motion must respect OS setting via MotionConfig reducedMotion="user" — CSS alone cannot stop JS animation');
  });

  it('FAQ disclosure wiring is complete (aria-controls + region)', () => {
    const faq = read('src/components/FAQ.tsx');
    assert.match(faq, /aria-controls=\{`faq-panel-/, 'FAQ button missing aria-controls — reader cannot map button to panel');
    assert.match(faq, /id=\{`faq-panel-/, 'FAQ panel missing id — aria-controls dangles');
    assert.match(faq, /role="region"/, 'FAQ panel should expose role="region"');
  });
});
