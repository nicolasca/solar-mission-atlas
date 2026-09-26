import { missions } from '../data/missions';
import {
  getEphemeris,
  getPositionAtEpoch,
  ephemerisEpoch,
} from '../domain/ephemeris';
import type { Mission, MissionId } from '../domain/mission';
import { auToScene } from './ephemerisDisplay';
import {
  solarSystemDisplayBodies,
  type ScenePosition,
  type DisplayBody,
} from './solarSystemDisplayModel';

export interface DisplayMission {
  readonly id: MissionId;
  readonly name: string;
  readonly targetBodyId: Mission['targetBodyId'];
  readonly color: string;
  readonly markerRadius: number;
  readonly routePoints: readonly ScenePosition[];
  readonly futureRoutePoints: readonly ScenePosition[];
  readonly markerPosition: ScenePosition;
  readonly physicalPosition: ScenePosition | null;
  readonly positionKind: 'ephemeris' | 'context';
  readonly displaced: boolean;
}

export const statusColors = {
  operating: '#85d9c1',
  cruise: '#f2c57c',
  analysis: '#a5a9df',
  uncertain: '#9ba8bb',
} as const;

export function createDisplayMissions(
  epoch = ephemerisEpoch,
  bodies: readonly DisplayBody[] = solarSystemDisplayBodies,
): readonly DisplayMission[] {
  const bodyById = new Map(bodies.map((body) => [body.id, body]));
  const missionPositions = missions.map((mission) => {
    // Archives are catalogued at their science destination, never as operating spacecraft.
    const position =
      mission.status === 'analysis'
        ? null
        : getPositionAtEpoch(mission.id, epoch);
    const physicalPosition = position ? auToScene(position) : null;
    const nearBody = physicalPosition
      ? bodies.find(
          (body) =>
            Math.hypot(
              ...physicalPosition.map(
                (value, axis) => value - body.position[axis],
              ),
            ) <
            body.displayRadius + 1.3,
        )
      : undefined;
    return {
      mission,
      physicalPosition,
      anchor:
        nearBody ??
        (!physicalPosition ? bodyById.get(mission.targetBodyId) : undefined),
    };
  });

  return missionPositions.map(({ mission, physicalPosition, anchor }) => {
    let markerPosition: ScenePosition = physicalPosition ?? [0, 0, 0];
    if (anchor) {
      const neighbours = missionPositions.filter(
        (item) => item.anchor?.id === anchor.id,
      );
      const index = neighbours.findIndex(
        (item) => item.mission.id === mission.id,
      );
      const angle = (index / neighbours.length) * Math.PI * 2;
      const ring = anchor.displayRadius + 0.95 + (index % 2) * 0.5;
      markerPosition = [
        anchor.position[0] + Math.cos(angle) * ring,
        anchor.position[1] + 0.65 + (index % 3) * 0.35,
        anchor.position[2] + Math.sin(angle) * ring,
      ];
    }
    const ephemeris = getEphemeris(mission.id);
    const samples = physicalPosition ? (ephemeris?.trajectory ?? []) : [];
    const past = samples
      .filter((sample) => sample.epoch < epoch)
      .map((sample) => auToScene(sample.positionAu));
    const future = samples
      .filter((sample) => sample.epoch > epoch)
      .map((sample) => auToScene(sample.positionAu));
    // Join at the selected date, using the exact snapshot when available.
    if (physicalPosition && past.length) past.push(physicalPosition);
    if (physicalPosition && future.length) future.unshift(physicalPosition);
    return {
      id: mission.id,
      name: mission.name,
      targetBodyId: mission.targetBodyId,
      color: statusColors[mission.status],
      markerRadius: 0.16,
      routePoints: past,
      futureRoutePoints: future,
      markerPosition,
      physicalPosition,
      positionKind: physicalPosition ? 'ephemeris' : 'context',
      displaced: Boolean(anchor),
    };
  });
}

export const displayMissions = createDisplayMissions();

/** Fit a trajectory without clearing the selected mission and its science panel. */
export function getRouteView(
  points: readonly ScenePosition[],
): { position: ScenePosition; radius: number } | null {
  if (points.length < 2) return null;
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (const point of points)
    for (let axis = 0; axis < 3; axis++) {
      min[axis] = Math.min(min[axis], point[axis]);
      max[axis] = Math.max(max[axis], point[axis]);
    }
  const position: ScenePosition = [
    (min[0] + max[0]) / 2,
    (min[1] + max[1]) / 2,
    (min[2] + max[2]) / 2,
  ];
  const extent = Math.max(
    ...points.map((point) =>
      Math.hypot(
        point[0] - position[0],
        point[1] - position[1],
        point[2] - position[2],
      ),
    ),
  );
  // getFocusCameraPosition uses radius * 8; this gives ~2.67 × bounding radius.
  return { position, radius: Math.max(extent / 3, 0.5) };
}
