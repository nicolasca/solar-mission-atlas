import type { CelestialBodyId } from './celestialBody';

export type MissionId = string;
export type MissionStatus = 'operating' | 'cruise' | 'analysis' | 'uncertain';
export type MissionRegion =
  | 'sun'
  | 'moon'
  | 'mercury'
  | 'venus'
  | 'mars'
  | 'jupiter'
  | 'small-bodies'
  | 'outer';

export interface MissionSource {
  readonly label: string;
  readonly url: string;
}
export interface ScientificFinding {
  readonly text: string;
  readonly sourceUrl: string;
}
export interface MissionEvent {
  readonly date: string;
  readonly title: string;
  readonly kind: 'achieved' | 'planned';
  readonly sourceUrl: string;
}
export interface ExpectedArrival {
  /** YYYY, YYYY-MM or YYYY-MM-DD, preserving the source's date precision. */
  readonly date: string;
  /** Scientific destination and encounter type, not an intermediate gravity assist. */
  readonly description: string;
  readonly sourceUrl: string;
}
export interface Mission {
  readonly id: MissionId;
  readonly name: string;
  readonly agencies: readonly string[];
  readonly launchDate: string;
  readonly expectedArrival?: ExpectedArrival;
  readonly status: MissionStatus;
  readonly statusDate: string;
  readonly statusNote: string;
  readonly phase: string;
  readonly region: MissionRegion;
  /** Context body, never interpreted as the spacecraft's measured position. */
  readonly targetBodyId: CelestialBodyId;
  readonly primaryTarget: string;
  readonly description: string;
  readonly science: string;
  readonly instruments: readonly string[];
  readonly findings: readonly ScientificFinding[];
  readonly events: readonly MissionEvent[];
  readonly sourceUrl: string;
  readonly sources: readonly MissionSource[];
}
export const missionStatusLabels: Record<MissionStatus, string> = {
  operating: 'Operating',
  cruise: 'In transit',
  analysis: 'Data analysis',
  uncertain: 'Status unconfirmed',
};
export const missionRegionLabels: Record<MissionRegion, string> = {
  sun: 'Sun & heliosphere',
  moon: 'Moon',
  mercury: 'Mercury',
  venus: 'Venus',
  mars: 'Mars',
  jupiter: 'Jupiter & moons',
  'small-bodies': 'Asteroids & comets',
  outer: 'Outer Solar System',
};
