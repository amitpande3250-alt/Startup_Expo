import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const src = (p) => fs.readFileSync(path.join(ROOT, 'src', p), 'utf8');
const allSrc = () =>
  ['App.tsx', 'constants.ts', 'components/Hero.tsx', 'components/About.tsx', 'components/ScheduleStrip.tsx',
   'components/Features.tsx', 'components/Activities.tsx', 'components/Visit.tsx',
   'components/Agenda.tsx', 'components/FAQ.tsx', 'components/Footer.tsx']
    .map(src).join('\n');

describe('Visitor understanding — can a first-time visitor grasp the event?', () => {
  const code = allSrc();
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

  it('states WHAT the event is (name + organizer + NEC context)', () => {
    assert.match(code, /Founder Expo 2026/, 'event name missing');
    assert.match(code, /E-Cell/, 'organizer E-Cell missing');
    assert.match(code, /National Entrepreneurship Challenge|NEC 2026/, 'NEC context missing');
  });

  it('states WHEN with zero ambiguity (date + hours in ≥3 places)', () => {
    const dateHits = (code.match(/12 October 2026/g) || []).length;
    const timeHits = (code.match(/10 AM.*5 PM/g) || []).length;
    assert.ok(dateHits >= 3, `date "12 October 2026" appears ${dateHits}x, need ≥3 (hero/meta/schedule/footer)`);
    assert.ok(timeHits >= 3, `time "10 AM – 5 PM" appears ${timeHits}x, need ≥3`);
  });

  it('states WHERE with hall + institute + working maps link', () => {
    assert.match(code, /Meena Bhujbal College Hall/, 'hall name missing');
    assert.match(code, /MET Institute of Technology/, 'institute missing');
    assert.match(code, /google\.com\/maps\/search/, 'Google Maps directions link missing — visitor cannot navigate');
  });

  it('quantifies scale: 13 stalls + 9 sectors, no vague "many startups"', () => {
    assert.match(code, /13 startup/i, 'must state 13 stalls/startups explicitly');
    const sectors = ['Fire Safety','Heaters','Organic Food','Automotive Parts','Artificial Intelligence','Agriculture Drones','Consumer Electronics','Fashion','Kitchenware'];
    for (const s of sectors) assert.ok(code.includes(s), `sector missing: ${s}`);
  });

  it('explains HOW to attend (entry + check-in + ID, not just "come")', () => {
    assert.match(code, /check-in/i, 'check-in instruction missing');
    assert.match(code, /student ID/i, 'must tell visitor to bring student ID');
    assert.match(code, /Gates open/i, 'must state gates open time');
  });

  it('details BOTH activities with concrete steps (not marketing fluff)', () => {
    assert.match(code, /Idea Box Booth/, 'Idea Box missing');
    assert.match(code, /Rapid-Fire Round/, 'Rapid-Fire missing');
    // each activity must list ≥3 steps
    const stepMarkers = (code.match(/Write your raw|Pin it on|Get live reactions|Draw a problem|Brainstorm a solution|Present your fix/gi) || []).length;
    assert.ok(stepMarkers >= 6, `expected ≥6 concrete activity steps, found ${stepMarkers}`);
  });

  it('publishes a timed agenda covering the full day (≥5 slots)', () => {
    const times = ['10:00 AM','10:30 AM','12:00 PM','2:00 PM','3:30 PM','5:00 PM'];
    for (const t of times) assert.ok(code.includes(t), `agenda slot missing: ${t}`);
  });

  it('answers first-timer questions in FAQ (≥5 entries)', () => {
    const faq = src('components/FAQ.tsx');
    const qCount = (faq.match(/q:\s*'/g) || []).length;
    assert.ok(qCount >= 5, `FAQ has ${qCount} questions, need ≥5`);
  });

  it('does not hallucinate stall names or fake contact details', () => {
    // Brutal honesty check: no invented phone/email
    assert.doesNotMatch(code, /\+91[0-9]{10}/, 'invented phone number — remove or use real');
    assert.doesNotMatch(code, /[a-z]+@[a-z]+\.com/i, 'invented .com email — use real organizer address or none');
  });

  it('uses consistent tense and naming (no past/future mix, no Founders/Founder mix)', () => {
    assert.doesNotMatch(code, /was organized|showcased products/, 'past tense in pre-event site — use present/future');
    assert.doesNotMatch(code, /Founders Expo/, 'inconsistent naming: "Founders Expo" vs "Founder Expo"');
  });

  it('title + meta description sell the event in search results', () => {
    assert.match(html, /<title>.{20,80}<\/title>/, 'title must be 20-80 chars');
    assert.match(html, /meta\s+name="description"/, 'meta description missing');
  });
});
