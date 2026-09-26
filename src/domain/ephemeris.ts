import dataset from '../data/ephemerides.json';

/** Geometric heliocentric ecliptic J2000 coordinates, in astronomical units. */
export type AuVector = readonly [number, number, number];

export interface EphemerisPoint {
  /** Calendar in TDB, deliberately without a misleading UTC "Z" suffix. */
  readonly epoch: string;
  readonly jdTdb: number;
  readonly positionAu: AuVector;
}

export interface Ephemeris {
  readonly horizonsId: number | string;
  readonly targetName: string;
  readonly kernelSource: string | null;
  readonly snapshot: EphemerisPoint | null;
  readonly trajectory: readonly EphemerisPoint[];
  readonly sourceUrl: string;
  readonly snapshotSourceUrl: string;
  readonly fetchedAt: string;
  readonly sampledStart: string | null;
  readonly sampledEnd: string | null;
  readonly sampleStep: string | null;
  readonly warnings: readonly string[];
  readonly qualityNote?: string;
  readonly qualitySourceUrl?: string;
}

// The generator validates all position rows before replacing this static file.
export const ephemerides = dataset.entries as unknown as Readonly<
  Record<string, Ephemeris>
>;
export const ephemerisEpoch = dataset.epoch;
export const ephemerisTimeScale = dataset.timeScale;
export const ephemerisFetchedAt = dataset.fetchedAt;
export const ephemerisReferenceFrame = dataset.frame;
export const ephemerisDocumentationUrl = dataset.documentationUrl;

/** IAU astronomical unit and SI speed of light, exact definitions. */
export const ASTRONOMICAL_UNIT_KM = 149_597_870.7;
export const SPEED_OF_LIGHT_KM_PER_SECOND = 299_792.458;

export function distanceAu(
  position: AuVector,
  origin: AuVector = [0, 0, 0],
): number {
  if (![...position, ...origin].every(Number.isFinite)) {
    throw new RangeError('Positions must contain finite coordinates.');
  }
  return Math.hypot(
    position[0] - origin[0],
    position[1] - origin[1],
    position[2] - origin[2],
  );
}

export function getEphemeris(id: string): Ephemeris | null {
  // Object.hasOwn avoids treating inherited names as entries.
  return Object.hasOwn(ephemerides, id) ? ephemerides[id] : null;
}

/** Return only the requested, exact snapshot: never interpolate or extrapolate. */
export function getSnapshotPosition(
  id: string,
  epoch = ephemerisEpoch,
): AuVector | null {
  const snapshot = getEphemeris(id)?.snapshot;
  return snapshot?.epoch === epoch ? snapshot.positionAu : null;
}

/** Calendar arithmetic in TDB; Date is used only as a Gregorian calendar parser. */
export function epochToJd(epoch: string): number {
  const value = Date.parse(
    `${epoch.slice(0, 19)}${epoch.length === 10 ? 'T00:00:00' : ''}Z`,
  );
  if (!Number.isFinite(value))
    throw new RangeError('Invalid TDB calendar date.');
  return value / 86_400_000 + 2_440_587.5;
}

export function jdToEpoch(jdTdb: number): string {
  if (!Number.isFinite(jdTdb)) throw new RangeError('Invalid Julian date.');
  return new Date(Math.round((jdTdb - 2_440_587.5) * 86_400_000))
    .toISOString()
    .slice(0, 19);
}

/** Linear interpolation of geometric vectors inside coverage, never extrapolation. */
export function interpolatePosition(
  samples: readonly EphemerisPoint[],
  jdTdb: number,
): AuVector | null {
  if (
    !Number.isFinite(jdTdb) ||
    !samples.length ||
    jdTdb < samples[0].jdTdb ||
    jdTdb > samples[samples.length - 1].jdTdb
  )
    return null;
  let low = 0;
  let high = samples.length - 1;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (samples[mid].jdTdb < jdTdb) low = mid + 1;
    else high = mid;
  }
  const after = samples[low];
  if (after.jdTdb === jdTdb) return after.positionAu;
  const before = samples[low - 1];
  const fraction = (jdTdb - before.jdTdb) / (after.jdTdb - before.jdTdb);
  return [
    before.positionAu[0] +
      fraction * (after.positionAu[0] - before.positionAu[0]),
    before.positionAu[1] +
      fraction * (after.positionAu[1] - before.positionAu[1]),
    before.positionAu[2] +
      fraction * (after.positionAu[2] - before.positionAu[2]),
  ];
}

export function getPositionAtJd(id: string, jdTdb: number): AuVector | null {
  if (id === 'sun') return [0, 0, 0];
  const entry = getEphemeris(id);
  if (!entry) return null;
  if (entry.snapshot?.jdTdb === jdTdb) return entry.snapshot.positionAu;
  return interpolatePosition(entry.trajectory, jdTdb);
}

export function getPositionAtEpoch(
  id: string,
  epoch = ephemerisEpoch,
): AuVector | null {
  return getPositionAtJd(id, epochToJd(epoch));
}

export interface MissionMetrics {
  readonly epoch: string;
  readonly timeScale: string;
  readonly sunDistanceAu: number;
  readonly sunDistanceKm: number;
  readonly earthDistanceAu: number;
  readonly earthDistanceKm: number;
  /** Approximate one-way delay: instantaneous geometric distance / c. */
  readonly oneWayLightMinutes: number;
}

export function calculateMissionMetrics(
  position: AuVector,
  earthPosition: AuVector,
  epoch: string,
): MissionMetrics {
  const sunDistanceAu = distanceAu(position);
  const earthDistanceAu = distanceAu(position, earthPosition);
  const earthDistanceKm = earthDistanceAu * ASTRONOMICAL_UNIT_KM;
  return {
    epoch,
    timeScale: ephemerisTimeScale,
    sunDistanceAu,
    sunDistanceKm: sunDistanceAu * ASTRONOMICAL_UNIT_KM,
    earthDistanceAu,
    earthDistanceKm,
    oneWayLightMinutes: earthDistanceKm / SPEED_OF_LIGHT_KM_PER_SECOND / 60,
  };
}

/** Missing spacecraft data never silently falls back to its target planet. */
export function getMissionMetrics(
  id: string,
  epoch = ephemerisEpoch,
): MissionMetrics | null {
  const position = getPositionAtEpoch(id, epoch);
  const earthPosition = getPositionAtEpoch('earth', epoch);
  return position && earthPosition
    ? calculateMissionMetrics(position, earthPosition, epoch)
    : null;
}
