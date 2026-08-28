import type { CelestialBodyId } from '../domain/celestialBody';

export interface RingAppearance {
  readonly color: string;
  readonly innerRadiusMultiplier: number;
  readonly outerRadiusMultiplier: number;
}

export interface BodyAppearance {
  readonly color: string;
  readonly orbitalAngleDegrees: number;
  readonly axialTiltDegrees?: number;
  readonly emissiveIntensity?: number;
  readonly ring?: RingAppearance;
}

export const bodyAppearance: Record<CelestialBodyId, BodyAppearance> = {
  sun: {
    color: '#ffc85a',
    orbitalAngleDegrees: 0,
    emissiveIntensity: 1.5,
  },
  mercury: { color: '#a8a49c', orbitalAngleDegrees: 18 },
  venus: { color: '#d9ad68', orbitalAngleDegrees: 82 },
  earth: { color: '#3f82db', orbitalAngleDegrees: 142 },
  mars: { color: '#c65d3f', orbitalAngleDegrees: 205 },
  jupiter: { color: '#d3a276', orbitalAngleDegrees: 238 },
  saturn: {
    color: '#dfc78f',
    orbitalAngleDegrees: 296,
    axialTiltDegrees: 26.7,
    ring: {
      color: '#bda879',
      innerRadiusMultiplier: 1.35,
      outerRadiusMultiplier: 2.15,
    },
  },
  uranus: { color: '#80d2dc', orbitalAngleDegrees: 332 },
  neptune: { color: '#456bd6', orbitalAngleDegrees: 48 },
};
