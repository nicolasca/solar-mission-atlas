import type { CelestialBody, Planet } from '../domain/celestialBody';

const NASA_PLANET_SIZE_SOURCE =
  'https://science.nasa.gov/resource/solar-system-sizes/';
const NASA_PLANET_DISTANCE_SOURCE =
  'https://science.nasa.gov/learn/basics-of-space-flight/chapter1-2/';
const NASA_SOLAR_RADIUS_SOURCE =
  'https://science.nasa.gov/universe/glossary/#solar-radius';
const NASA_PLANET_OVERVIEW_SOURCE =
  'https://science.nasa.gov/solar-system/planets/';

export const celestialBodies: readonly CelestialBody[] = [
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
    category: 'Terrestrial planet',
    orbitalPeriodEarthYears: 0.241,
    description:
      'The smallest planet and the closest to the Sun, with a heavily cratered surface and extreme temperature changes.',
    sourceUrls: [
      NASA_PLANET_SIZE_SOURCE,
      NASA_PLANET_DISTANCE_SOURCE,
      NASA_PLANET_OVERVIEW_SOURCE,
    ],
  },
  {
    id: 'venus',
    name: 'Venus',
    kind: 'planet',
    meanRadiusKm: 6_052,
    meanOrbitalDistanceAu: 0.723,
    category: 'Terrestrial planet',
    orbitalPeriodEarthYears: 0.615,
    description:
      'A cloud-covered rocky planet with a dense carbon-dioxide atmosphere and the hottest surface in the Solar System.',
    sourceUrls: [
      NASA_PLANET_SIZE_SOURCE,
      NASA_PLANET_DISTANCE_SOURCE,
      NASA_PLANET_OVERVIEW_SOURCE,
    ],
  },
  {
    id: 'earth',
    name: 'Earth',
    kind: 'planet',
    meanRadiusKm: 6_371,
    meanOrbitalDistanceAu: 1,
    category: 'Terrestrial planet',
    orbitalPeriodEarthYears: 1,
    description:
      'Our home world, distinguished by liquid surface oceans and the only life currently known in the universe.',
    sourceUrls: [
      NASA_PLANET_SIZE_SOURCE,
      NASA_PLANET_DISTANCE_SOURCE,
      NASA_PLANET_OVERVIEW_SOURCE,
    ],
  },
  {
    id: 'mars',
    name: 'Mars',
    kind: 'planet',
    meanRadiusKm: 3_390,
    meanOrbitalDistanceAu: 1.524,
    category: 'Terrestrial planet',
    orbitalPeriodEarthYears: 1.881,
    description:
      'A cold, dusty world whose iron-rich surface gives it a reddish appearance and preserves evidence of ancient water.',
    sourceUrls: [
      NASA_PLANET_SIZE_SOURCE,
      NASA_PLANET_DISTANCE_SOURCE,
      NASA_PLANET_OVERVIEW_SOURCE,
    ],
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    kind: 'planet',
    meanRadiusKm: 69_911,
    meanOrbitalDistanceAu: 5.2,
    category: 'Gas giant',
    orbitalPeriodEarthYears: 11.9,
    description:
      'The largest planet, composed mostly of hydrogen and helium and marked by powerful storms including the Great Red Spot.',
    sourceUrls: [
      NASA_PLANET_SIZE_SOURCE,
      NASA_PLANET_DISTANCE_SOURCE,
      NASA_PLANET_OVERVIEW_SOURCE,
    ],
  },
  {
    id: 'saturn',
    name: 'Saturn',
    kind: 'planet',
    meanRadiusKm: 58_232,
    meanOrbitalDistanceAu: 9.58,
    category: 'Gas giant',
    orbitalPeriodEarthYears: 29.4,
    description:
      'A hydrogen-and-helium giant surrounded by the Solar System’s most extensive and visually prominent ring system.',
    sourceUrls: [
      NASA_PLANET_SIZE_SOURCE,
      NASA_PLANET_DISTANCE_SOURCE,
      NASA_PLANET_OVERVIEW_SOURCE,
    ],
  },
  {
    id: 'uranus',
    name: 'Uranus',
    kind: 'planet',
    meanRadiusKm: 25_362,
    meanOrbitalDistanceAu: 19.2,
    category: 'Ice giant',
    orbitalPeriodEarthYears: 83.7,
    description:
      'A pale ice giant that rotates on its side, likely after a major collision early in Solar System history.',
    sourceUrls: [
      NASA_PLANET_SIZE_SOURCE,
      NASA_PLANET_DISTANCE_SOURCE,
      NASA_PLANET_OVERVIEW_SOURCE,
    ],
  },
  {
    id: 'neptune',
    name: 'Neptune',
    kind: 'planet',
    meanRadiusKm: 24_622,
    meanOrbitalDistanceAu: 30.05,
    category: 'Ice giant',
    orbitalPeriodEarthYears: 163.7,
    description:
      'The outermost planet, a cold and windy ice giant with a deep blue appearance in visible-light imagery.',
    sourceUrls: [
      NASA_PLANET_SIZE_SOURCE,
      NASA_PLANET_DISTANCE_SOURCE,
      NASA_PLANET_OVERVIEW_SOURCE,
    ],
  },
] as const;

export const planets: readonly Planet[] = celestialBodies.filter(
  (body): body is Planet => body.kind === 'planet',
);
