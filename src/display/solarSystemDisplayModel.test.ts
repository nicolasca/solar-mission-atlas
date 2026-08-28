import { describe, expect, it } from 'vitest';
import { celestialBodies } from '../data/celestialBodies';
import { createSolarSystemDisplayModel } from './solarSystemDisplayModel';

describe('createSolarSystemDisplayModel', () => {
  it('creates one finite scene position for every scientific body record', () => {
    const displayBodies = createSolarSystemDisplayModel(celestialBodies);

    expect(displayBodies).toHaveLength(celestialBodies.length);

    for (const body of displayBodies) {
      expect(body.position.every(Number.isFinite)).toBe(true);
      expect(body.displayRadius).toBeGreaterThan(0);
    }
  });

  it('keeps Saturn axial presentation in the display model', () => {
    const displayBodies = createSolarSystemDisplayModel(celestialBodies);
    const saturn = displayBodies.find((body) => body.id === 'saturn');

    expect(saturn?.axialTiltRadians).toBeCloseTo((26.7 * Math.PI) / 180);
  });
});
