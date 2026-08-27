import { describe, expect, it } from 'vitest';
import { createCircularOrbitPoints } from './orbitPath';

describe('createCircularOrbitPoints', () => {
  it('creates a closed path at the requested display radius', () => {
    const points = createCircularOrbitPoints(10, 8);

    expect(points).toHaveLength(9);
    expect(points[0]).toEqual(points.at(-1));

    for (const [x, , z] of points) {
      expect(Math.hypot(x, z)).toBeCloseTo(10);
    }
  });
});
