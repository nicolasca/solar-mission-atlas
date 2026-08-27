import { describe, expect, it } from 'vitest';
import { PLANET_IDS } from '../domain/celestialBody';
import { celestialBodies, planets } from './celestialBodies';

describe('celestialBodies', () => {
  it('contains the Sun and all eight unique planets', () => {
    const planetIds = planets.map((planet) => planet.id);

    expect(celestialBodies[0]?.id).toBe('sun');
    expect(planetIds).toEqual(PLANET_IDS);
    expect(new Set(planetIds).size).toBe(8);
    expect(new Set(planets.map((planet) => planet.name)).size).toBe(8);
  });

  it('provides the scientific and descriptive facts required by the panel', () => {
    for (const planet of planets) {
      expect(planet.meanRadiusKm).toBeGreaterThan(0);
      expect(planet.meanOrbitalDistanceAu).toBeGreaterThan(0);
      expect(planet.orbitalPeriodEarthYears).toBeGreaterThan(0);
      expect(planet.description.length).toBeGreaterThan(40);
    }
  });
});
