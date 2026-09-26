import {
  getEphemeris,
  getPositionAtJd,
  type AuVector,
  type EphemerisPoint,
} from './ephemeris';

export type TrajectoryFrame = 'sun' | 'earth' | 'target';
export interface NavigationTarget {
  readonly id: string;
  readonly name: string;
}

/** Physical rendezvous targets, distinct from the catalogue's broad science regions. */
const targets: Readonly<Record<string, NavigationTarget>> = {
  bepicolombo: { id: 'mercury', name: 'Mercury' },
  juice: { id: 'jupiter', name: 'Jupiter' },
  'europa-clipper': { id: 'jupiter', name: 'Jupiter' },
  psyche: { id: 'target-psyche', name: '(16) Psyche' },
  lucy: { id: 'target-eurybates', name: 'Eurybates (first Trojan encounter)' },
  hera: { id: 'target-didymos', name: 'Didymos' },
  'osiris-apex': { id: 'target-apophis', name: 'Apophis' },
  hayabusa2: { id: 'target-1998-ky26', name: '1998 KY26' },
  'escapade-blue': { id: 'mars', name: 'Mars' },
  'escapade-gold': { id: 'mars', name: 'Mars' },
};

export function getNavigationTarget(
  missionId: string,
): NavigationTarget | null {
  return Object.hasOwn(targets, missionId) ? targets[missionId] : null;
}

export function getTrajectoryRange(
  missionId: string,
): readonly [number, number] | null {
  const points = getEphemeris(missionId)?.trajectory;
  return points && points.length > 1
    ? [points[0].jdTdb, points[points.length - 1].jdTdb]
    : null;
}

export function relativePosition(
  position: AuVector,
  origin: AuVector,
): AuVector {
  return [
    position[0] - origin[0],
    position[1] - origin[1],
    position[2] - origin[2],
  ];
}

/** Subtract the moving origin at EACH sample's date, not its position today. */
export function relativeTrajectory(
  points: readonly EphemerisPoint[],
  originAt: (jdTdb: number) => AuVector | null,
): readonly EphemerisPoint[] {
  return points.flatMap((point) => {
    const origin = originAt(point.jdTdb);
    return origin
      ? [{ ...point, positionAu: relativePosition(point.positionAu, origin) }]
      : [];
  });
}

export const LOCAL_WINDOW_DAYS = 120;

export function getFrameOrigin(
  missionId: string,
  frame: TrajectoryFrame,
): NavigationTarget {
  if (frame === 'earth') return { id: 'earth', name: 'Earth' };
  if (frame === 'target')
    return getNavigationTarget(missionId) ?? { id: 'sun', name: 'Sun' };
  return { id: 'sun', name: 'Sun' };
}

export function isFrameAvailable(
  missionId: string,
  frame: TrajectoryFrame,
  jd: number,
): boolean {
  if (frame === 'sun') return true;
  if (frame === 'target' && !getNavigationTarget(missionId)) return false;
  return (
    getPositionAtJd(missionId, jd) !== null &&
    getPositionAtJd(getFrameOrigin(missionId, frame).id, jd) !== null
  );
}
