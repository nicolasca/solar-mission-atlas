import { describe, expect, it } from 'vitest';
import { displayMissions } from './missionDisplay';
import { solarSystemDisplayBodies } from './solarSystemDisplayModel';

describe('displayMissions', () => {
  it('creates an Earth-to-target schematic route for every mission', () => {
    const earth = solarSystemDisplayBodies.find((body) => body.id === 'earth');

    expect(earth).toBeDefined();

    for (const mission of displayMissions) {
      const target = solarSystemDisplayBodies.find(
        (body) => body.id === mission.targetBodyId,
      );

      expect(target).toBeDefined();
      expect(mission.routePoints[0]).toEqual(earth?.position);
      expect(mission.routePoints.at(-1)).toEqual(target?.position);
    }
  });

  it('uses distinct deterministic routes for the two Jupiter missions', () => {
    const juice = displayMissions.find((mission) => mission.id === 'juice');
    const europaClipper = displayMissions.find(
      (mission) => mission.id === 'europa-clipper',
    );

    expect(juice?.routePoints).not.toEqual(europaClipper?.routePoints);
    expect(juice?.color).not.toBe(europaClipper?.color);
  });
});
