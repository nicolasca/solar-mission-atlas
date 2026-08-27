import { describe, expect, it } from 'vitest';
import { celestialBodies } from './celestialBodies';
import { missions } from './missions';
import { MISSION_IDS } from '../domain/mission';

describe('missions', () => {
  it('contains exactly the three expected uniquely identified missions', () => {
    const missionIds = missions.map((mission) => mission.id);

    expect(missionIds).toEqual(MISSION_IDS);
    expect(new Set(missionIds).size).toBe(3);
  });

  it('references only celestial bodies that exist in the local dataset', () => {
    const celestialBodyIds = new Set(celestialBodies.map((body) => body.id));

    for (const mission of missions) {
      expect(celestialBodyIds.has(mission.targetBodyId)).toBe(true);
    }
  });

  it('records one official HTTPS source URL for every mission', () => {
    const officialHosts = new Set(['science.nasa.gov', 'www.esa.int']);

    for (const mission of missions) {
      const sourceUrl = new URL(mission.sourceUrl);

      expect(sourceUrl.protocol).toBe('https:');
      expect(officialHosts.has(sourceUrl.hostname)).toBe(true);
    }
  });
});
