import { describe, expect, it } from 'vitest';
import {
  ASTRONOMICAL_UNIT_KM,
  calculateMissionMetrics,
  distanceAu,
  ephemerides,
  ephemerisEpoch,
  getEphemeris,
  getMissionMetrics,
  getSnapshotPosition,
} from './ephemeris';

describe('physical distances', () => {
  it('uses three-dimensional geometric distance before display compression', () => {
    expect(distanceAu([3, 4, 12])).toBe(13);
    expect(distanceAu([2, 4, 6], [1, 2, 3])).toBeCloseTo(Math.sqrt(14));
    expect(() => distanceAu([NaN, 0, 0])).toThrow(RangeError);
  });

  it('converts AU to kilometres and one-way light time independently of the Sun distance', () => {
    const result = calculateMissionMetrics(
      [2, 0, 0],
      [1, 0, 0],
      ephemerisEpoch,
    );
    expect(result.sunDistanceAu).toBe(2);
    expect(result.earthDistanceAu).toBe(1);
    expect(result.earthDistanceKm).toBe(ASTRONOMICAL_UNIT_KM);
    expect(result.oneWayLightMinutes).toBeCloseTo(8.316746397);
    expect(result.timeScale).toBe('TDB');
  });
});

describe('dated Horizons dataset', () => {
  it('has a common reference epoch and valid, ordered, bounded samples', () => {
    expect(ephemerisEpoch).toBe('2026-09-26T00:00:00');
    for (const entry of Object.values(ephemerides)) {
      expect(entry.snapshotSourceUrl).toMatch(
        /^https:\/\/ssd\.jpl\.nasa\.gov\/api\/horizons\.api\?/,
      );
      if (entry.snapshot) {
        expect(entry.snapshot.epoch).toBe(ephemerisEpoch);
        expect(entry.snapshot.positionAu).toHaveLength(3);
        expect(entry.snapshot.positionAu.every(Number.isFinite)).toBe(true);
      }
      // Validate every sample without creating hundreds of thousands of matcher objects.
      expect(
        entry.trajectory.every(
          (point, index) =>
            point.positionAu.length === 3 &&
            point.positionAu.every(Number.isFinite) &&
            Number.isFinite(point.jdTdb) &&
            (index === 0 || point.jdTdb > entry.trajectory[index - 1].jdTdb),
        ),
        entry.targetName,
      ).toBe(true);
      expect(entry.sampledStart).toBe(entry.trajectory[0]?.epoch ?? null);
      expect(entry.sampledEnd).toBe(entry.trajectory.at(-1)?.epoch ?? null);
    }
  });

  it('preserves scientifically plausible Earth and distant spacecraft distances', () => {
    expect(getMissionMetrics('earth')?.sunDistanceAu).toBeGreaterThan(0.98);
    expect(getMissionMetrics('earth')?.sunDistanceAu).toBeLessThan(1.02);
    expect(getMissionMetrics('earth')?.earthDistanceKm).toBe(0);
    expect(getMissionMetrics('voyager-1')?.sunDistanceAu).toBeGreaterThan(160);
    expect(getMissionMetrics('voyager-1')?.oneWayLightMinutes).toBeGreaterThan(
      1_300,
    );
  });

  it('does not fabricate positions outside coverage or for unknown probes', () => {
    expect(getSnapshotPosition('juice', '1900-01-01T00:00:00')).toBeNull();
    expect(getSnapshotPosition('juice', '2099-01-01T00:00:00')).toBeNull();
    expect(getSnapshotPosition('unknown-probe')).toBeNull();
    expect(getEphemeris('toString')).toBeNull();
    expect(getMissionMetrics('unknown-probe')).toBeNull();
    for (const [id, entry] of Object.entries(ephemerides)) {
      if (!entry.snapshot) expect(getMissionMetrics(id)).toBeNull();
    }
  });
});
