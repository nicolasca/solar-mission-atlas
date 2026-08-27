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

interface CelestialBodyBase {
  readonly name: string;
  readonly meanRadiusKm: number;
  readonly meanOrbitalDistanceAu: number;
  readonly sourceUrls: readonly string[];
}

export interface Star extends CelestialBodyBase {
  readonly id: 'sun';
  readonly kind: 'star';
}

export type PlanetCategory = 'Terrestrial planet' | 'Gas giant' | 'Ice giant';

export interface Planet extends CelestialBodyBase {
  readonly id: PlanetId;
  readonly kind: 'planet';
  readonly category: PlanetCategory;
  readonly orbitalPeriodEarthYears: number;
  readonly description: string;
}

export type CelestialBody = Star | Planet;
