import { describe, expect, it } from 'vitest';
import { celestialBodies } from './celestialBodies';
import { CATALOGUE_REVIEW_DATE, missions } from './missions';

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const primarySourceHosts = [
  'nasa.gov',
  'esa.int',
  'jaxa.jp',
  'isro.gov.in',
  'cnsa.gov.cn',
  'cas.cn',
  'space.gov.ae',
  'kari.re.kr',
  'kasa.go.kr',
  'noaa.gov',
  'berkeley.edu',
];

function isPrimarySource(value: string): boolean {
  const url = new URL(value);
  return (
    url.protocol === 'https:' &&
    primarySourceHosts.some(
      (host) => url.hostname === host || url.hostname.endsWith(`.${host}`),
    )
  );
}

describe('mission catalogue', () => {
  it('contains a broad, uniquely identified catalogue with resolvable body contexts', () => {
    const bodyIds = new Set(celestialBodies.map((body) => body.id));
    expect(missions.length).toBeGreaterThanOrEqual(40);
    expect(new Set(missions.map((mission) => mission.id)).size).toBe(
      missions.length,
    );
    for (const mission of missions) {
      expect(mission.id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(bodyIds.has(mission.targetBodyId)).toBe(true);
      expect(mission.science.length).toBeGreaterThan(30);
      expect(mission.instruments.length).toBeGreaterThan(0);
    }
  });

  it('dates the evidence and keeps future plans separate from achieved milestones', () => {
    expect(CATALOGUE_REVIEW_DATE).toMatch(datePattern);
    for (const mission of missions) {
      expect(mission.launchDate).toMatch(datePattern);
      expect(mission.statusDate).toMatch(datePattern);
      expect(mission.launchDate <= CATALOGUE_REVIEW_DATE).toBe(true);
      expect(mission.statusDate <= CATALOGUE_REVIEW_DATE).toBe(true);
      expect(mission.statusNote.length).toBeGreaterThan(40);
      for (const event of mission.events) {
        expect(event.date).toMatch(/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/);
        if (event.kind === 'achieved') {
          expect(event.date <= CATALOGUE_REVIEW_DATE).toBe(true);
        }
      }
    }
  });

  it('attaches primary HTTPS sources to every fact and milestone', () => {
    for (const mission of missions) {
      const urls = new Set(mission.sources.map((source) => source.url));
      expect(urls.has(mission.sourceUrl)).toBe(true);
      for (const url of urls) expect(isPrimarySource(url), url).toBe(true);
      for (const finding of mission.findings)
        expect(urls.has(finding.sourceUrl)).toBe(true);
      for (const event of mission.events)
        expect(urls.has(event.sourceUrl)).toBe(true);
      if (mission.expectedArrival)
        expect(urls.has(mission.expectedArrival.sourceUrl)).toBe(true);
    }
  });

  it('documents a sourced future scientific arrival for every mission in transit', () => {
    for (const mission of missions.filter((item) => item.status === 'cruise')) {
      const arrival = mission.expectedArrival;
      expect(arrival, mission.id).toBeDefined();
      expect(arrival!.date).toMatch(/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/);
      expect(
        arrival!.date >= CATALOGUE_REVIEW_DATE.slice(0, arrival!.date.length),
      ).toBe(true);
      expect(arrival!.description.length).toBeGreaterThan(10);
      expect(isPrimarySource(arrival!.sourceUrl)).toBe(true);
    }
  });

  it('does not count known ended missions or uncertain vehicles as operating', () => {
    for (const id of [
      'maven',
      'akatsuki',
      'insight',
      'dart',
      'slim',
      'chandrayaan-3',
      'blue-ghost-1',
    ]) {
      expect(missions.find((mission) => mission.id === id)?.status).toBe(
        'analysis',
      );
    }
    for (const id of ['change-4', 'queqiao-2']) {
      expect(missions.find((mission) => mission.id === id)?.status).toBe(
        'uncertain',
      );
    }
    expect(missions.find((mission) => mission.id === 'tianwen-2')?.status).toBe(
      'operating',
    );
    expect(
      missions.find((mission) => mission.id === 'escapade-blue')?.status,
    ).toBe('cruise');
  });
});
