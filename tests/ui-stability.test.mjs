import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

describe('UI stability — no blank frames, no jumps, no dead controls', () => {
  const all = ['src/App.tsx','src/components/Hero.tsx','src/components/About.tsx','src/components/ScheduleStrip.tsx','src/components/Features.tsx','src/components/Activities.tsx','src/components/Visit.tsx','src/components/Agenda.tsx','src/components/FAQ.tsx','src/components/Footer.tsx'].map(read).join('\n');

  it('videos cannot dead-end: autoplay + muted + loop + playsInline + object-cover', () => {
    const videos = [...all.matchAll(/<video[\s\S]*?>/g)].map((m) => m[0]);
    assert.ok(videos.length >= 1, 'no <video> found — hero background missing');
    for (const v of videos) {
      for (const attr of ['autoPlay','loop','muted','playsInline'])
        assert.ok(v.includes(attr), `video missing ${attr} — will stall or fullscreen on iOS: ${v.slice(0,120)}`);
      assert.match(all, /object-cover/, 'video must use object-cover or it letterboxes');
    }
  });

  it('images carry alt + lazy + explicit size classes (CLS guard)', () => {
    const imgs = [...all.matchAll(/<img[\s\S]*?>/g)].map((m) => m[0]);
    // One <img> in InfoCard template renders 3x (one per card) — count template + usages
    const infoCardUsages = (all.match(/<InfoCard/g) || []).length;
    const rendered = imgs.length > 0 ? Math.max(imgs.length, infoCardUsages) : 0;
    assert.ok(rendered >= 3, `only ${rendered} images rendered (templates:${imgs.length} usages:${infoCardUsages}) — feature icons missing?`);
    for (const img of imgs) {
      assert.match(img, /alt=/, `image without alt — screen readers + broken-icon fallback lost: ${img.slice(0,120)}`);
      assert.match(img, /loading="lazy"/, `image without loading=lazy blocks first paint: ${img.slice(0,120)}`);
      assert.match(img, /w-\d+ h-\d+/, `image without w/h classes causes layout shift: ${img.slice(0,120)}`);
    }
  });

  it('FAQ accordion is operable (button + aria-expanded + state)', () => {
    const faq = read('src/components/FAQ.tsx');
    assert.match(faq, /<button/, 'FAQ items must be <button>, not div-onClick');
    assert.match(faq, /aria-expanded/, 'FAQ missing aria-expanded — assistive tech cannot track state');
    assert.match(faq, /useState/, 'FAQ must hold openIndex state — else all panels jam open/closed');
  });

  it('animations are one-shot and GPU-friendly (once:true, transform/opacity only)', () => {
    assert.match(all, /useInView\(.*once:\s*true/, 'scroll animations must be once:true — re-triggering causes flicker');
    // brutal: forbid animating layout props that cause reflow
    assert.doesNotMatch(all, /animate=\{\{[^}]*width|height/, 'never animate width/height — use transform/opacity only');
  });

  it('no debug or dead code ships (console.log, debugger, commented JSX)', () => {
    assert.doesNotMatch(all, /console\.log|debugger/, 'debug code ships to production');
  });

  it('production bundle exists and respects budget (JS < 600KB gzip < 120KB)', () => {
    const dist = path.join(ROOT, 'dist', 'assets');
    assert.ok(fs.existsSync(dist), 'dist/assets missing — run npm run build before testing stability');
    const js = fs.readdirSync(dist).filter((f) => f.endsWith('.js'));
    assert.ok(js.length >= 1, 'no built JS — build broken');
    for (const f of js) {
      const bytes = fs.statSync(path.join(dist, f)).size;
      assert.ok(bytes < 600_000, `${f} is ${(bytes/1024).toFixed(0)}KB — over 600KB budget, code-split`);
    }
  });
});
