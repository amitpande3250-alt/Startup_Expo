import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

describe('Responsive — must survive 320px to 1440px without breakage', () => {
  const files = ['src/components/Hero.tsx','src/components/About.tsx','src/components/ScheduleStrip.tsx','src/components/Features.tsx','src/components/Activities.tsx','src/components/Visit.tsx','src/components/Agenda.tsx','src/components/FAQ.tsx','src/components/Footer.tsx'];
  const code = files.map(read).join('\n');

  it('uses mobile-first grids everywhere (grid-cols-1 base, never desktop-only)', () => {
    for (const f of files) {
      const c = read(f);
      if (c.includes('grid ')) {
        assert.match(c, /grid-cols-1|grid-cols-12|grid-cols-2/, `${f}: grid without mobile base — add grid-cols-1/12 for 320px`);
      }
    }
    // spot-check critical sections
    assert.match(read('src/components/Features.tsx'), /grid-cols-1.*md:grid-cols-2.*lg:grid-cols-3/s, 'Features cards must be 1→2→3 cols');
    assert.match(read('src/components/Activities.tsx'), /grid-cols-1.*lg:grid-cols-2/s, 'Activities must be 1→2 cols');
  });

  it('typography scales at ≥3 breakpoints (no fixed giant text on mobile)', () => {
    assert.match(code, /text-\[10px\].*sm:text-xs/s, 'micro-labels must scale 10px→xs');
    // hero must shrink on small screens, not overflow
    assert.match(read('src/components/Hero.tsx'), /text-\[14vw\].*sm:text-\[13vw\]/s, 'hero must scale down via vw steps');
    // section headings must have sm/md/lg steps
    assert.match(code, /text-xl sm:text-2xl md:text-3xl lg:text-4xl/, 'section headings must step xl→4xl');
  });

  it('no fixed pixel widths that overflow 320px viewports', () => {
    const fixedPx = [...code.matchAll(/w-\[(\d+)px\]/g)].map((m) => Number(m[1]));
    for (const w of fixedPx) assert.ok(w <= 320, `fixed w-[${w}px] overflows 320px phones — use max-w-full or responsive`);
    assert.doesNotMatch(code, /min-w-\[\d+px\]/, 'min-w fixed px breaks small screens');
  });

  it('navbar survives 6 items on mobile (compressed gaps + tiny text)', () => {
    const hero = read('src/components/Hero.tsx');
    assert.match(hero, /text-\[10px\] sm:text-xs/, 'nav must start at 10px on phones');
    assert.match(hero, /gap-2\.5 sm:gap-5/, 'nav gaps must compress on mobile for 6 items');
    assert.match(hero, /whitespace-nowrap/, 'nav must not wrap mid-label');
    assert.match(hero, /max-w-\[calc\(100%-/, 'nav must constrain width on 320px — absolute centered pill clips without max-w');
    assert.match(hero, /overflow-x-auto/, 'nav must allow horizontal scroll on narrow screens instead of clipping');
    assert.match(hero, /w-max/, 'nav inner must be w-max so scroll width is intrinsic, not squished');
  });

  it('padding and radius use responsive steps (inset hero must not clip)', () => {
    assert.match(code, /p-4 md:p-6/, 'page inset padding must step 4→6');
    assert.match(code, /rounded-2xl md:rounded-\[2rem\]/, 'cards must step radius on desktop');
  });

  it('touch targets are ≥36px on mobile (w-9 h-9 minimum for CTA circles)', () => {
    // CTA circles + icon buttons
    assert.match(code, /w-9 h-9 sm:w-10 sm:h-10/, 'CTA circle too small — keep ≥36px');
    assert.match(code, /w-11 h-11/, 'feature icon tiles must be ≥44px touch-friendly');
  });

  it('timeline and footer collapse to single column on phones', () => {
    assert.match(read('src/components/Agenda.tsx'), /col-span-12 sm:col-span-3/, 'agenda must stack time above title on mobile');
    assert.match(read('src/components/Footer.tsx'), /col-span-12 md:col-span-5/, 'footer brand must be full-width on mobile');
    assert.match(read('src/components/Footer.tsx'), /col-span-6 md:col-span-3/, 'footer link cols must be 2-up on phones');
  });
});
