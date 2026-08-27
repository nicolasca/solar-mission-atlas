import { describe, expect, it } from 'vitest';
import { solarSystemDisplayPlanets } from './solarSystemDisplayModel';
import { getFocusCameraPosition } from './cameraView';

describe('getFocusCameraPosition', () => {
  it('places the camera at a readable offset from a planet display position', () => {
    const earth = solarSystemDisplayPlanets.find(
      (planet) => planet.id === 'earth',
    );

    expect(earth).toBeDefined();

    if (!earth) {
      return;
    }

    const cameraPosition = getFocusCameraPosition(earth);
    const offset = cameraPosition.map(
      (coordinate, index) => coordinate - (earth.position[index] ?? 0),
    );

    expect(Math.hypot(...offset)).toBeCloseTo(
      Math.max(earth.displayRadius * 8, 4),
    );
  });
});
