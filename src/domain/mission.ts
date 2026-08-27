import type { CelestialBodyId } from './celestialBody';

export const MISSION_IDS = [
  'parker-solar-probe',
  'juice',
  'europa-clipper',
] as const;

export type MissionId = (typeof MISSION_IDS)[number];

export interface Mission {
  readonly id: MissionId;
  readonly name: string;
  readonly agencies: readonly string[];
  readonly launchDate: string;
  readonly phase: string;
  readonly targetBodyId: CelestialBodyId;
  readonly primaryTarget: string;
  readonly description: string;
  readonly sourceUrl: string;
}
