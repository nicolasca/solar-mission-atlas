import type { MissionId } from '../domain/mission';
import { missions } from '../data/missions';
import type { ScenePosition } from './solarSystemDisplayModel';
import { solarSystemDisplayBodies } from './solarSystemDisplayModel';

interface MissionAppearance {
  readonly color: string;
  readonly routeBend: ScenePosition;
}

const missionAppearance: Record<MissionId, MissionAppearance> = {
  'parker-solar-probe': {
    color: '#ffb44a',
    routeBend: [4, 2.5, 0],
  },
  juice: {
    color: '#70dcc7',
    routeBend: [-5, 2.5, 0],
  },
  'europa-clipper': {
    color: '#c49bff',
    routeBend: [5, -2.5, 0],
  },
};

export interface DisplayMission {
  readonly id: MissionId;
  readonly name: string;
  readonly targetBodyId: (typeof missions)[number]['targetBodyId'];
  readonly color: string;
  readonly markerRadius: number;
  readonly routePoints: readonly ScenePosition[];
  readonly markerPosition: ScenePosition;
}

function quadraticPoint(
  start: ScenePosition,
  control: ScenePosition,
  end: ScenePosition,
  progress: number,
): ScenePosition {
  const inverseProgress = 1 - progress;

  return start.map(
    (coordinate, index) =>
      inverseProgress * inverseProgress * coordinate +
      2 * inverseProgress * progress * (control[index] ?? 0) +
      progress * progress * (end[index] ?? 0),
  ) as unknown as ScenePosition;
}

export function createSchematicRoute(
  start: ScenePosition,
  end: ScenePosition,
  routeBend: ScenePosition,
  segmentCount = 48,
): readonly ScenePosition[] {
  const control = start.map(
    (coordinate, index) =>
      (coordinate + (end[index] ?? 0)) / 2 + (routeBend[index] ?? 0),
  ) as unknown as ScenePosition;

  return Array.from({ length: segmentCount + 1 }, (_, index) =>
    quadraticPoint(start, control, end, index / segmentCount),
  );
}

function getDisplayBodyPosition(bodyId: DisplayMission['targetBodyId']) {
  const body = solarSystemDisplayBodies.find(
    (candidate) => candidate.id === bodyId,
  );

  if (!body) {
    throw new Error(`Missing display body for mission target: ${bodyId}`);
  }

  return body.position;
}

const earthPosition = getDisplayBodyPosition('earth');

export const displayMissions: readonly DisplayMission[] = missions.map(
  (mission) => {
    const appearance = missionAppearance[mission.id];
    const routePoints = createSchematicRoute(
      earthPosition,
      getDisplayBodyPosition(mission.targetBodyId),
      appearance.routeBend,
    );

    return {
      id: mission.id,
      name: mission.name,
      targetBodyId: mission.targetBodyId,
      color: appearance.color,
      markerRadius: 0.28,
      routePoints,
      markerPosition: routePoints[Math.round((routePoints.length - 1) * 0.68)]!,
    };
  },
);
