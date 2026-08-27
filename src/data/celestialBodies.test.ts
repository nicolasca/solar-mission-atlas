import { describe, expect, it } from 'vitest';
import { PLANET_IDS } from '../domain/celestialBody';
import { celestialBodies } from './celestialBodies';

describe('celestialBodies', () => {
  it('contains the Sun and all eight unique planets', () => {
    const planets = celestialBodies.filter((body) => body.kind === 'planet');
    const planetIds = planets.map((planet) => planet.id);

    expect(celestialBodies[0]?.id).toBe('sun');
    expect(planetIds).toEqual(PLANET_IDS);
    expect(new Set(planetIds).size).toBe(8);
    expect(new Set(planets.map((planet) => planet.name)).size).toBe(8);
  });
});
