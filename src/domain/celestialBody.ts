export const PLANET_IDS = [
  'mercury',
  'venus',
  'earth',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
] as const;

export type PlanetId = (typeof PLANET_IDS)[number];
export type CelestialBodyId = 'sun' | PlanetId;

export interface CelestialBody {
  readonly id: CelestialBodyId;
  readonly name: string;
  readonly kind: 'star' | 'planet';
  readonly meanRadiusKm: number;
  readonly meanOrbitalDistanceAu: number;
  readonly sourceUrls: readonly string[];
}
