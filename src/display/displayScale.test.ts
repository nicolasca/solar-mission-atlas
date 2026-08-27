import { describe, expect, it } from 'vitest';
import { celestialBodies } from '../data/celestialBodies';
import { toDisplayBodyRadius, toDisplayOrbitRadius } from './displayScale';

describe('toDisplayOrbitRadius', () => {
  it('keeps the Sun at the origin and compresses planetary distances', () => {
    expect(toDisplayOrbitRadius(0)).toBe(0);
    expect(toDisplayOrbitRadius(1)).toBeCloseTo(6.7);
    expect(toDisplayOrbitRadius(30.05)).toBeLessThan(26);
  });

  it('preserves the planetary order from the Sun', () => {
    const displayDistances = celestialBodies
      .filter((body) => body.kind === 'planet')
      .map((planet) => toDisplayOrbitRadius(planet.meanOrbitalDistanceAu));

    for (let index = 1; index < displayDistances.length; index += 1) {
      expect(displayDistances[index]).toBeGreaterThan(
        displayDistances[index - 1] ?? 0,
      );
    }
  });

  it('rejects invalid distances', () => {
    expect(() => toDisplayOrbitRadius(-1)).toThrow(RangeError);
    expect(() => toDisplayOrbitRadius(Number.NaN)).toThrow(RangeError);
  });
});

describe('toDisplayBodyRadius', () => {
  it('keeps small bodies visible and larger bodies visually larger', () => {
    const mercuryRadius = toDisplayBodyRadius(2_440);
    const earthRadius = toDisplayBodyRadius(6_371);
    const jupiterRadius = toDisplayBodyRadius(69_911);
    const sunRadius = toDisplayBodyRadius(695_700);

    expect(mercuryRadius).toBeGreaterThan(0.3);
    expect(earthRadius).toBeGreaterThan(mercuryRadius);
    expect(jupiterRadius).toBeGreaterThan(earthRadius);
    expect(sunRadius).toBeGreaterThan(jupiterRadius);
  });

  it('rejects invalid radii', () => {
    expect(() => toDisplayBodyRadius(0)).toThrow(RangeError);
    expect(() => toDisplayBodyRadius(Number.POSITIVE_INFINITY)).toThrow(
      RangeError,
    );
  });
});
