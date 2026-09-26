import { celestialBodies } from '../data/celestialBodies';
import {
  ephemerisEpoch,
  epochToJd,
  getEphemeris,
  getPositionAtJd,
  type AuVector,
  type EphemerisPoint,
} from '../domain/ephemeris';
import {
  getFrameOrigin,
  LOCAL_WINDOW_DAYS,
  relativePosition,
  relativeTrajectory,
  type NavigationTarget,
  type TrajectoryFrame,
} from '../domain/trajectory';
import { createDisplayMissions, type DisplayMission } from './missionDisplay';
import {
  createSolarSystemDisplayModel,
  type DisplayBody,
  type ScenePosition,
} from './solarSystemDisplayModel';

export interface AtlasSceneModel {
  readonly bodies: readonly DisplayBody[];
  readonly missions: readonly DisplayMission[];
  readonly origin: NavigationTarget | null;
  readonly targetPosition: ScenePosition | null;
  /** AU per displayed scene unit; only the relative view uses a uniform distance scale. */
  readonly auPerUnit: number | null;
}

export function linearAuToScene(
  position: AuVector,
  unitsPerAu: number,
): ScenePosition {
  return [
    position[0] * unitsPerAu,
    position[2] * unitsPerAu,
    -position[1] * unitsPerAu,
  ];
}

export function createAtlasSceneModel(
  epoch: string,
  selectedMissionId: string | null,
  frame: TrajectoryFrame,
): AtlasSceneModel {
  const jd = epochToJd(epoch);
  const bodies = createSolarSystemDisplayModel(celestialBodies, epoch);
  const missions = createDisplayMissions(epoch, bodies);
  if (frame === 'sun' || !selectedMissionId) {
    return {
      bodies,
      missions:
        epoch === ephemerisEpoch
          ? missions
          : missions.filter((mission) => mission.positionKind === 'ephemeris'),
      origin: null,
      targetPosition: null,
      auPerUnit: null,
    };
  }
  const origin = getFrameOrigin(selectedMissionId, frame);
  const originPosition = getPositionAtJd(origin.id, jd);
  const probePosition = getPositionAtJd(selectedMissionId, jd);
  const probe = missions.find((mission) => mission.id === selectedMissionId);
  if (!originPosition || !probePosition || !probe) {
    return {
      bodies: [],
      missions: [],
      origin,
      targetPosition: null,
      auPerUnit: null,
    };
  }
  const entry = getEphemeris(selectedMissionId)!;
  const lower = jd - LOCAL_WINDOW_DAYS / 2;
  const upper = jd + LOCAL_WINDOW_DAYS / 2;
  const samples: EphemerisPoint[] = entry.trajectory.filter(
    (point) =>
      point.jdTdb >= lower && point.jdTdb <= upper && point.jdTdb !== jd,
  );
  samples.push({ epoch, jdTdb: jd, positionAu: probePosition });
  samples.sort((a, b) => a.jdTdb - b.jdTdb);
  const relative = relativeTrajectory(samples, (date) =>
    getPositionAtJd(origin.id, date),
  );
  const current = relativePosition(probePosition, originPosition);
  // One uniform scale for the entire local window. Recomputed as the window changes.
  const radius = Math.max(
    0.00001,
    Math.hypot(...current),
    ...relative.map((point) => Math.hypot(...point.positionAu)),
  );
  const unitsPerAu = 8 / radius;
  const physicalPosition = linearAuToScene(current, unitsPerAu);
  const past = relative
    .filter((point) => point.jdTdb < jd)
    .map((point) => linearAuToScene(point.positionAu, unitsPerAu));
  const future = relative
    .filter((point) => point.jdTdb > jd)
    .map((point) => linearAuToScene(point.positionAu, unitsPerAu));
  if (past.length) past.push(physicalPosition);
  if (future.length) future.unshift(physicalPosition);
  const originBody = bodies.find((body) => body.id === origin.id);
  // The centre remains a schematic marker: neither planets nor probes are to size scale.
  const localBody = originBody
    ? {
        ...originBody,
        position: [0, 0, 0] as ScenePosition,
        displayRadius: 0.3,
        ring: undefined,
      }
    : null;
  const displaced = Math.hypot(...physicalPosition) < 0.7;
  const markerPosition: ScenePosition = displaced
    ? [0.8, 0.6, 0]
    : physicalPosition;
  return {
    bodies: localBody ? [localBody] : [],
    missions: [
      {
        ...probe,
        physicalPosition,
        markerPosition,
        displaced,
        routePoints: past,
        futureRoutePoints: future,
      },
    ],
    origin,
    targetPosition: localBody ? null : [0, 0, 0],
    auPerUnit: 1 / unitsPerAu,
  };
}
