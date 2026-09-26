import { describe, expect, it, vi } from 'vitest';
import {
  epochToJd,
  interpolatePosition,
  jdToEpoch,
  type AuVector,
  type EphemerisPoint,
} from './ephemeris';
import {
  getFrameOrigin,
  getNavigationTarget,
  relativePosition,
  relativeTrajectory,
} from './trajectory';

const startJd = 2_451_545;
function sample(offsetDays: number, positionAu: AuVector): EphemerisPoint {
  const jdTdb = startJd + offsetDays;
  return { epoch: jdToEpoch(jdTdb), jdTdb, positionAu };
}

describe('sampled ephemeris interpolation', () => {
  const samples = [
    sample(0, [1, -2, 3]),
    sample(2, [5, 2, -1]),
    sample(10, [13, 10, 7]),
  ];

  it('weights all three coordinates by elapsed time between neighbouring samples', () => {
    // The unequal two-day and eight-day intervals rule out index-based weighting.
    expect(interpolatePosition(samples, startJd + 1)).toEqual([3, 0, 1]);
    expect(interpolatePosition(samples, startJd + 4)).toEqual([7, 4, 1]);
    expect(interpolatePosition(samples, startJd + 9)).toEqual([12, 9, 6]);
  });

  it('preserves exact endpoint and interior samples without mutating the input', () => {
    const before = structuredClone(samples);
    for (const point of samples) {
      expect(interpolatePosition(samples, point.jdTdb)).toEqual(
        point.positionAu,
      );
    }
    interpolatePosition(samples, startJd + 3);
    expect(samples).toEqual(before);
  });

  it('does not extrapolate or fabricate movement from a single position', () => {
    expect(interpolatePosition(samples, startJd - 0.001)).toBeNull();
    expect(interpolatePosition(samples, startJd + 10.001)).toBeNull();
    expect(interpolatePosition([], startJd)).toBeNull();
    expect(interpolatePosition(samples, Number.NaN)).toBeNull();
    expect(interpolatePosition(samples, Number.POSITIVE_INFINITY)).toBeNull();
    expect(interpolatePosition([samples[1]], samples[1].jdTdb)).toEqual([
      5, 2, -1,
    ]);
    expect(interpolatePosition([samples[1]], samples[1].jdTdb + 1)).toBeNull();
  });

  it('uses the TDB calendar without applying a UTC offset or a local timezone', () => {
    expect(epochToJd('2000-01-01T12:00:00')).toBe(2_451_545);
    expect(epochToJd('2000-01-01')).toBe(2_451_544.5);
    expect(
      epochToJd('2024-03-01T00:00:00') - epochToJd('2024-02-28T00:00:00'),
    ).toBe(2);
    expect(jdToEpoch(epochToJd('2031-07-20T18:30:00'))).toBe(
      '2031-07-20T18:30:00',
    );
    expect(() => epochToJd('invalid-date')).toThrow(RangeError);
    expect(() => jdToEpoch(Number.NaN)).toThrow(RangeError);
  });
});

describe('relative trajectories', () => {
  it('subtracts the physical origin vector in all three dimensions', () => {
    expect(relativePosition([4, -5, 8], [1, -2, 3])).toEqual([3, -3, 5]);
    expect(relativePosition([1, -2, 3], [1, -2, 3])).toEqual([0, 0, 0]);
  });

  it('removes common motion using the origin at each point’s date', () => {
    const points = [sample(0, [2, 3, 4]), sample(2, [12, -7, 6])];
    const before = structuredClone(points);
    const originAt = vi.fn((jd: number): AuVector | null => {
      if (jd === startJd) return [1, 2, 3];
      if (jd === startJd + 2) return [11, -8, 5];
      return null;
    });

    const relative = relativeTrajectory(points, originAt);

    expect(originAt.mock.calls).toEqual([[startJd], [startJd + 2]]);
    expect(relative.map((point) => point.positionAu)).toEqual([
      [1, 1, 1],
      [1, 1, 1],
    ]);
    expect(relative.map(({ epoch, jdTdb }) => ({ epoch, jdTdb }))).toEqual(
      points.map(({ epoch, jdTdb }) => ({ epoch, jdTdb })),
    );
    expect(points).toEqual(before);
  });

  it('uses overlapping origin coverage instead of a fallback or extrapolation', () => {
    const originSamples = [sample(2, [1, 0, 0]), sample(4, [3, 0, 0])];
    const points = [
      sample(0, [1, 0, 0]),
      sample(3, [4, 2, 1]),
      sample(6, [9, 0, 0]),
    ];
    const relative = relativeTrajectory(points, (jd) =>
      interpolatePosition(originSamples, jd),
    );

    expect(relative).toEqual([sample(3, [2, 2, 1])]);
  });
});

describe('physical mission destinations', () => {
  it('selects real rendezvous targets independently of broad catalogue regions', () => {
    const expected = {
      bepicolombo: 'mercury',
      juice: 'jupiter',
      'europa-clipper': 'jupiter',
      psyche: 'target-psyche',
      lucy: 'target-eurybates',
      hera: 'target-didymos',
      'osiris-apex': 'target-apophis',
      hayabusa2: 'target-1998-ky26',
      'escapade-blue': 'mars',
      'escapade-gold': 'mars',
    };
    for (const [id, targetId] of Object.entries(expected)) {
      expect(getNavigationTarget(id)?.id).toBe(targetId);
      expect(getFrameOrigin(id, 'target').id).toBe(targetId);
    }
    expect(getNavigationTarget('lucy')?.name).toContain(
      'first Trojan encounter',
    );
  });

  it('keeps Earth and Sun frames distinct and does not invent unknown destinations', () => {
    expect(getFrameOrigin('juice', 'earth')).toEqual({
      id: 'earth',
      name: 'Earth',
    });
    expect(getFrameOrigin('juice', 'sun')).toEqual({ id: 'sun', name: 'Sun' });
    expect(getNavigationTarget('cassini')).toBeNull();
    expect(getNavigationTarget('unknown-mission')).toBeNull();
    expect(getNavigationTarget('toString')).toBeNull();
  });
});
