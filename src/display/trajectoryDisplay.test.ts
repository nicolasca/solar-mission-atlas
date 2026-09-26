import { describe, expect, it } from 'vitest';
import {
  ephemerisEpoch,
  epochToJd,
  getPositionAtEpoch,
} from '../domain/ephemeris';
import { isFrameAvailable } from '../domain/trajectory';
import { auToScene } from './ephemerisDisplay';
import { createAtlasSceneModel, linearAuToScene } from './trajectoryDisplay';

describe('dated atlas scene', () => {
  it('moves planets and spacecraft to the same date without retaining undated archive markers', () => {
    const epoch = '2027-01-01T00:00:00';
    const model = createAtlasSceneModel(epoch, 'juice', 'sun');
    expect(model.bodies.find((body) => body.id === 'earth')?.position).toEqual(
      auToScene(getPositionAtEpoch('earth', epoch)!),
    );
    const probe = model.missions.find((mission) => mission.id === 'juice')!;
    expect(probe.physicalPosition).toEqual(
      auToScene(getPositionAtEpoch('juice', epoch)!),
    );
    expect(probe.routePoints.at(-1)).toEqual(probe.physicalPosition);
    expect(probe.futureRoutePoints[0]).toEqual(probe.physicalPosition);
    expect(model.missions.some((mission) => mission.id === 'maven')).toBe(
      false,
    );
  });

  it('uses a uniform relative scale, with Earth fixed at the origin and a bounded path', () => {
    const model = createAtlasSceneModel(ephemerisEpoch, 'juice', 'earth');
    expect(model.bodies).toHaveLength(1);
    expect(model.bodies[0].id).toBe('earth');
    expect(model.bodies[0].position).toEqual([0, 0, 0]);
    const probe = model.missions[0];
    const ship = getPositionAtEpoch('juice')!;
    const earth = getPositionAtEpoch('earth')!;
    const separation = Math.hypot(
      ship[0] - earth[0],
      ship[1] - earth[1],
      ship[2] - earth[2],
    );
    expect(
      Math.hypot(...probe.physicalPosition!) * model.auPerUnit!,
    ).toBeCloseTo(separation, 10);
    expect(probe.routePoints.length).toBeLessThanOrEqual(62);
    expect(probe.futureRoutePoints.length).toBeLessThanOrEqual(62);
    expect(probe.routePoints.at(-1)).toEqual(probe.physicalPosition);
  });

  it('centres asteroid approaches on the asteroid rather than the Sun context', () => {
    const model = createAtlasSceneModel(ephemerisEpoch, 'psyche', 'target');
    expect(model.origin?.id).toBe('target-psyche');
    expect(model.targetPosition).toEqual([0, 0, 0]);
    expect(model.bodies).toEqual([]);
    expect(model.missions).toHaveLength(1);
    expect(model.missions[0].physicalPosition?.every(Number.isFinite)).toBe(
      true,
    );
  });

  it('preserves lengths and angles in local coordinates and rejects unavailable frames', () => {
    expect(Math.hypot(...linearAuToScene([3, 4, 12], 2))).toBe(26);
    expect(linearAuToScene([1, 2, 3], 2)).toEqual([2, 6, -4]);
    expect(isFrameAvailable('juice', 'target', epochToJd('1900-01-01'))).toBe(
      false,
    );
    expect(
      isFrameAvailable('unknown', 'earth', epochToJd(ephemerisEpoch)),
    ).toBe(false);
    expect(
      isFrameAvailable('voyager-1', 'target', epochToJd(ephemerisEpoch)),
    ).toBe(false);
  });
});
