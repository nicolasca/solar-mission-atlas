import { describe, expect, it } from 'vitest';
import { solarSystemDisplayPlanets } from './solarSystemDisplayModel';
import { getFocusCameraPosition, fitCameraToAspect } from './cameraView';

describe('getFocusCameraPosition', () => {
  it('places the camera at a readable offset from a planet display position', () => {
    const earth = solarSystemDisplayPlanets.find(
      (planet) => planet.id === 'earth',
    );

    expect(earth).toBeDefined();

    if (!earth) {
      return;
    }

    const cameraPosition = getFocusCameraPosition(
      earth.position,
      earth.displayRadius,
    );
    const offset = cameraPosition.map(
      (coordinate, index) => coordinate - (earth.position[index] ?? 0),
    );

    expect(Math.hypot(...offset)).toBeCloseTo(
      Math.max(earth.displayRadius * 8, 4),
    );
  });

  it('uses the same readable minimum offset for a mission marker', () => {
    const markerPosition = [2, 1, -3] as const;
    const cameraPosition = getFocusCameraPosition(markerPosition, 0.28);
    const offset = cameraPosition.map(
      (coordinate, index) => coordinate - (markerPosition[index] ?? 0),
    );

    expect(Math.hypot(...offset)).toBeCloseTo(4);
  });
});

describe('fitCameraToAspect', () => {
  it('backs away from the target for narrow panels without changing viewing direction', () => {
    const target = [10, 2, 3] as const;
    expect(fitCameraToAspect([14, 4, 7], target, 0.5)).toEqual([18, 6, 11]);
    expect(fitCameraToAspect([14, 4, 7], target, 2)).toEqual([14, 4, 7]);
    expect(() => fitCameraToAspect([14, 4, 7], target, 0)).toThrow(RangeError);
  });
});
