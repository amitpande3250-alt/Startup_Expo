import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

describe('Layout — sections in the order a visitor thinks', () => {
  it('App renders the full journey in order (no missing / misordered sections)', () => {
    const app = read('src/App.tsx');
    const order = ['<Hero', '<About', '<ScheduleStrip', '<Features', '<Activities', '<Visit', '<Agenda', '<FAQ', '<Footer'];
    let last = -1;
    for (const tag of order) {
      const i = app.indexOf(tag);
      assert.ok(i > last, `${tag} missing or out of order — visitor journey breaks`);
      last = i;
    }
  });

  it('every section fills width correctly (bg-black + px-4 md:px-6 rhythm)', () => {
    for (const f of ['components/About.tsx','components/ScheduleStrip.tsx','components/Features.tsx','components/Activities.tsx','components/Visit.tsx','components/Agenda.tsx']) {
      const c = read('src/' + f);
      assert.match(c, /bg-black/, `${f}: section must sit on bg-black`);
      assert.match(c, /px-4 md:px-6/, `${f}: horizontal rhythm must be px-4→6`);
    }
  });

  it('cards share one visual language (rounded-2xl + border-white/5)', () => {
    for (const f of ['components/ScheduleStrip.tsx','components/Activities.tsx','components/Visit.tsx','components/Agenda.tsx']) {
      const c = read('src/' + f);
      assert.match(c, /rounded-2xl/, `${f}: cards must use rounded-2xl`);
      assert.match(c, /border-white\/5|border-white\/10/, `${f}: cards need hairline border for separation on black`);
    }
  });

  it('hero is true full-viewport with inset frame (h-screen + rounded container)', () => {
    const hero = read('src/components/Hero.tsx');
    assert.match(hero, /h-screen/, 'hero must be h-screen');
    assert.match(hero, /rounded-2xl md:rounded-\[2rem\] overflow-hidden/, 'hero frame must be rounded + clipped');
    assert.match(hero, /absolute bottom-0 left-0 right-0/, 'hero content must pin to bottom over video');
  });

  it('scroll-margin prevents anchor hiding under content (scroll-mt on every target)', () => {
    for (const f of ['components/About.tsx','components/Features.tsx','components/Activities.tsx','components/Visit.tsx','components/Agenda.tsx','components/Footer.tsx']) {
      assert.match(read('src/' + f), /scroll-mt-/, `${f}: anchored section needs scroll-mt — else nav jumps hide headings`);
    }
  });

  it('footer closes the page (brand + explore + sectors + bottom bar)', () => {
    const f = read('src/components/Footer.tsx');
    assert.match(f, /Founder Expo/, 'footer brand missing');
    assert.match(f, /Explore/, 'footer Explore heading missing');
    assert.match(f, /Sectors on the floor/, 'footer sectors missing');
    assert.match(f, /All rights reserved/, 'footer copyright missing');
    assert.match(f, /Back to top/, 'footer needs back-to-top — long page');
  });
});
