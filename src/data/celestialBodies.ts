import type { CelestialBody } from '../domain/celestialBody';

const NASA_PLANET_SIZE_SOURCE =
  'https://science.nasa.gov/resource/solar-system-sizes/';
const NASA_PLANET_DISTANCE_SOURCE =
  'https://science.nasa.gov/learn/basics-of-space-flight/chapter1-2/';
const NASA_SOLAR_RADIUS_SOURCE =
  'https://science.nasa.gov/universe/glossary/#solar-radius';

export const celestialBodies = [
  {
    id: 'sun',
    name: 'Sun',
    kind: 'star',
    meanRadiusKm: 695_700,
    meanOrbitalDistanceAu: 0,
    sourceUrls: [NASA_SOLAR_RADIUS_SOURCE],
  },
  {
    id: 'mercury',
    name: 'Mercury',
    kind: 'planet',
    meanRadiusKm: 2_440,
    meanOrbitalDistanceAu: 0.387,
    sourceUrls: [NASA_PLANET_SIZE_SOURCE, NASA_PLANET_DISTANCE_SOURCE],
  },
  {
    id: 'venus',
    name: 'Venus',
    kind: 'planet',
    meanRadiusKm: 6_052,
    meanOrbitalDistanceAu: 0.723,
    sourceUrls: [NASA_PLANET_SIZE_SOURCE, NASA_PLANET_DISTANCE_SOURCE],
  },
  {
    id: 'earth',
    name: 'Earth',
    kind: 'planet',
    meanRadiusKm: 6_371,
    meanOrbitalDistanceAu: 1,
    sourceUrls: [NASA_PLANET_SIZE_SOURCE, NASA_PLANET_DISTANCE_SOURCE],
  },
  {
    id: 'mars',
    name: 'Mars',
    kind: 'planet',
    meanRadiusKm: 3_390,
    meanOrbitalDistanceAu: 1.524,
    sourceUrls: [NASA_PLANET_SIZE_SOURCE, NASA_PLANET_DISTANCE_SOURCE],
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    kind: 'planet',
    meanRadiusKm: 69_911,
    meanOrbitalDistanceAu: 5.2,
    sourceUrls: [NASA_PLANET_SIZE_SOURCE, NASA_PLANET_DISTANCE_SOURCE],
  },
  {
    id: 'saturn',
    name: 'Saturn',
    kind: 'planet',
    meanRadiusKm: 58_232,
    meanOrbitalDistanceAu: 9.58,
    sourceUrls: [NASA_PLANET_SIZE_SOURCE, NASA_PLANET_DISTANCE_SOURCE],
  },
  {
    id: 'uranus',
    name: 'Uranus',
    kind: 'planet',
    meanRadiusKm: 25_362,
    meanOrbitalDistanceAu: 19.2,
    sourceUrls: [NASA_PLANET_SIZE_SOURCE, NASA_PLANET_DISTANCE_SOURCE],
  },
  {
    id: 'neptune',
    name: 'Neptune',
    kind: 'planet',
    meanRadiusKm: 24_622,
    meanOrbitalDistanceAu: 30.05,
    sourceUrls: [NASA_PLANET_SIZE_SOURCE, NASA_PLANET_DISTANCE_SOURCE],
  },
] as const satisfies readonly CelestialBody[];
