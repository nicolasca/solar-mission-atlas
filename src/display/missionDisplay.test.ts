import { describe, expect, it } from 'vitest';
import { missions } from '../data/missions';
import { getEphemeris } from '../domain/ephemeris';
import { displayMissions, getRouteView } from './missionDisplay';
import { auToScene } from './ephemerisDisplay';
import { toDisplayOrbitRadius } from './displayScale';
import { solarSystemDisplayBodies } from './solarSystemDisplayModel';

describe('scientific coordinates and display scale', () => {
  it('preserves direction and inclination while explicitly compressing radius', () => {
    expect(auToScene([0, 0, 0])).toEqual([0, 0, 0]);
    expect(auToScene([1, 0, 0])).toEqual([toDisplayOrbitRadius(1), 0, -0]);
    const position = auToScene([1, 2, 3]);
    expect(Math.hypot(...position)).toBeCloseTo(
      toDisplayOrbitRadius(Math.sqrt(14)),
    );
    expect(position[1] / position[0]).toBeCloseTo(3);
    expect(position[2] / position[0]).toBeCloseTo(-2);
    expect(() => auToScene([NaN, 1, 2])).toThrow(RangeError);
    expect(() => auToScene([1, 2])).toThrow(RangeError);
  });
  it('uses the same ephemeris transformation for planets and probes', () => {
    const earth = solarSystemDisplayBodies.find((body) => body.id === 'earth')!;
    expect(earth.position).toEqual(
      auToScene(getEphemeris('earth')!.snapshot!.positionAu),
    );
    const juice = displayMissions.find((mission) => mission.id === 'juice')!;
    expect(juice.physicalPosition).toEqual(
      auToScene(getEphemeris('juice')!.snapshot!.positionAu),
    );
  });
});
describe('displayMissions', () => {
  it('keeps finite and uniquely separated markers for the entire catalogue', () => {
    expect(displayMissions).toHaveLength(missions.length);
    for (const mission of displayMissions)
      expect(mission.markerPosition.every(Number.isFinite)).toBe(true);
    expect(
      new Set(
        displayMissions.map((mission) => mission.markerPosition.join(',')),
      ).size,
    ).toBe(displayMissions.length);
  });
  it('never fabricates a trajectory or physical position for missing snapshots and archives', () => {
    for (const display of displayMissions) {
      const mission = missions.find(
        (candidate) => candidate.id === display.id,
      )!;
      if (
        mission.status === 'analysis' ||
        !getEphemeris(mission.id)?.snapshot
      ) {
        expect(display.positionKind).toBe('context');
        expect(display.physicalPosition).toBeNull();
        expect(display.routePoints).toEqual([]);
        expect(display.futureRoutePoints).toEqual([]);
      }
    }
  });
  it('joins historical and predicted paths at the exact snapshot', () => {
    const juice = displayMissions.find((mission) => mission.id === 'juice')!;
    expect(juice.routePoints.length).toBeGreaterThan(30);
    expect(juice.futureRoutePoints.length).toBeGreaterThan(1);
    expect(juice.routePoints.at(-1)).toEqual(juice.physicalPosition);
    expect(juice.futureRoutePoints[0]).toEqual(juice.physicalPosition);
  });
});

describe('trajectory framing', () => {
  it('centers the bounds and leaves enough room for the complete path', () => {
    expect(getRouteView([])).toBeNull();
    const view = getRouteView([
      [-6, -3, 0],
      [6, 3, 0],
    ])!;
    expect(view.position).toEqual([0, 0, 0]);
    expect(view.radius * 8).toBeGreaterThan(2 * Math.hypot(6, 3));
  });
});
