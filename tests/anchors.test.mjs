import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

function collectIds(code) {
  return new Set([...code.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));
}
function collectHashHrefs(code) {
  const a = [...code.matchAll(/href="(#[^"]+)"/g)].map((m) => m[1]);
  const b = [...code.matchAll(/href:\s*'(#[^']+)'/g)].map((m) => m[1]);
  return [...a, ...b];
}

describe('Anchors & links — every click must land somewhere real', () => {
  const files = ['src/App.tsx','src/components/Hero.tsx','src/components/About.tsx','src/components/ScheduleStrip.tsx','src/components/Features.tsx','src/components/Activities.tsx','src/components/Visit.tsx','src/components/Agenda.tsx','src/components/FAQ.tsx','src/components/Footer.tsx'];
  const code = files.map(read).join('\n');

  it('every internal #href resolves to an existing id (zero dead anchors)', () => {
    const ids = collectIds(code);
    const hrefs = collectHashHrefs(code);
    assert.ok(hrefs.length >= 10, `only ${hrefs.length} internal links — nav is under-linked`);
    const dead = hrefs.filter((h) => !ids.has(h.slice(1)));
    assert.deepEqual(dead, [], `dead anchors: ${dead.join(', ')}`);
  });

  it('core sections expose stable ids for nav + footer', () => {
    const ids = collectIds(code);
    for (const need of ['top','overview','stalls','activities','visit','agenda','faq','contact','idea-box','rapid-fire'])
      assert.ok(ids.has(need), `missing section id="${need}"`);
  });

  it('no duplicate ids (would break fragment navigation)', () => {
    const all = [...code.matchAll(/id="([^"]+)"/g)].map((m) => m[1]);
    assert.equal(new Set(all).size, all.length, `duplicate ids: ${all.filter((x,i)=>all.indexOf(x)!==i)}`);
  });

  it('no placeholder / dead links (#, javascript:, lorem, TODO)', () => {
    assert.doesNotMatch(code, /href="#"/, 'bare href="#" found — dead link');
    assert.doesNotMatch(code, /javascript:/i, 'javascript: link found');
    assert.doesNotMatch(code, /lorem ipsum|TODO|FIXME|coming soon/i, 'placeholder text in links/content');
  });

  it('LearnMore cards never self-link (a card linking to its own section is a no-op)', () => {
    // Features card 01 used to href="#stalls" while living inside #stalls — caught in review
    const features = read('src/components/Features.tsx');
    const selfLink = /id="stalls"[\s\S]*href="#stalls"/;
    // InfoCard lives inside section#stalls; its own LearnMore must NOT point at #stalls
    const cardHrefs = [...features.matchAll(/href="(#[^"]+)"/g)].map((m) => m[1]);
    assert.ok(!cardHrefs.includes('#stalls'), `Features card self-links to #stalls: ${cardHrefs}`);
  });

  it('external links open safely (target=_blank + rel=noopener)', () => {
    // Literal https hrefs + MAPS_URL constant indirection (href={MAPS_URL}) both count
    const literalTags = [...code.matchAll(/<a[^>]*href="https?:[^"]*"[^>]*>/g)].map((m) => m[0]);
    const mapsUsages = (code.match(/href=\{MAPS_URL\}/g) || []).length;
    const total = literalTags.length + mapsUsages;
    assert.ok(total >= 2, `expected ≥2 external links (maps), found ${total} (literal:${literalTags.length} const:${mapsUsages})`);
    for (const tag of literalTags) {
      assert.match(tag, /target="_blank"/, `external link missing target=_blank: ${tag.slice(0,100)}`);
      assert.match(tag, /rel="[^"]*noopener[^"]*"/, `external link missing rel=noopener: ${tag.slice(0,100)}`);
    }
    // Constant-driven links must still carry safe attributes at usage site
    const mapsBlocks = [...code.matchAll(/href=\{MAPS_URL\}[\s\S]{0,120}/g)].map((m) => m[0]);
    for (const b of mapsBlocks) {
      assert.match(b, /target="_blank"/, `MAPS_URL usage missing target=_blank: ${b.slice(0,120)}`);
      assert.match(b, /rel="[^"]*noopener/, `MAPS_URL usage missing rel=noopener: ${b.slice(0,120)}`);
    }
  });

  it('footer Explore list covers every major section (no orphan pages)', () => {
    const footer = read('src/components/Footer.tsx');
    for (const h of ['#overview','#stalls','#idea-box','#rapid-fire','#visit','#agenda','#faq'])
      assert.ok(footer.includes(h), `footer missing link ${h} — orphan section`);
  });

  it('shared constants are actually shared (no MAPS_URL / SECTORS duplication)', () => {
    assert.ok(fs.existsSync(path.join(ROOT, 'src/constants.ts')), 'src/constants.ts missing');
    for (const f of ['src/components/Visit.tsx', 'src/components/Footer.tsx']) {
      const c = read(f);
      assert.match(c, /from '.*constants'/, `${f} must import from constants — duplication risk`);
      assert.doesNotMatch(c, /google\.com\/maps\/search\/\?api=1&query=MET/, `${f} hardcodes MAPS_URL — import it instead`);
    }
    assert.doesNotMatch(read('src/components/Footer.tsx'), /const SECTORS = \[/, 'Footer redefines SECTORS — import from constants');
  });

  it('media URLs are well-formed (no truncated cloudfront/higgs links)', () => {
    const urls = [...code.matchAll(/https?:\/\/[^\s"'`]+/g)].map((m) => m[0].replace(/['";,]+$/, ''));
    // Direct CloudFront assets (video) must be .mp4; higgs.ai proxy URLs wrap a cloudfront URL in query — exempt
    for (const u of urls) {
      const isDirectCloudfront = u.startsWith('https://d8j0ntlcm91z4.cloudfront.net');
      if (isDirectCloudfront) assert.match(u, /\.mp4/, `cloudfront URL must end .mp4: ${u.slice(0,80)}`);
    }
    assert.ok(urls.some((u) => u.includes('cloudfront')), 'hero video URL missing');
    assert.ok(urls.some((u) => u.includes('higgs.ai')), 'feature icon URLs missing');
  });
});
