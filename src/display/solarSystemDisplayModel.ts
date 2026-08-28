import type { CelestialBody, PlanetId } from '../domain/celestialBody';
import { celestialBodies } from '../data/celestialBodies';
import { bodyAppearance, type RingAppearance } from './bodyAppearance';
import { toDisplayBodyRadius, toDisplayOrbitRadius } from './displayScale';

export type ScenePosition = readonly [number, number, number];

interface DisplayBodyBase {
  readonly name: string;
  readonly color: string;
  readonly displayRadius: number;
  readonly orbitRadius: number;
  readonly position: ScenePosition;
  readonly axialTiltRadians: number;
  readonly emissiveIntensity: number;
  readonly ring?: RingAppearance;
}

export type DisplayBody = DisplayBodyBase &
  (
    | { readonly id: 'sun'; readonly kind: 'star' }
    | { readonly id: PlanetId; readonly kind: 'planet' }
  );

export type DisplayPlanet = DisplayBody & {
  readonly id: PlanetId;
  readonly kind: 'planet';
};

export function createSolarSystemDisplayModel(
  bodies: readonly CelestialBody[],
): readonly DisplayBody[] {
  return bodies.map((body) => {
    const appearance = bodyAppearance[body.id];
    const orbitRadius = toDisplayOrbitRadius(body.meanOrbitalDistanceAu);
    const orbitalAngleRadians =
      (appearance.orbitalAngleDegrees * Math.PI) / 180;

    const displayValues: DisplayBodyBase = {
      name: body.name,
      color: appearance.color,
      displayRadius: toDisplayBodyRadius(body.meanRadiusKm),
      orbitRadius,
      axialTiltRadians: ((appearance.axialTiltDegrees ?? 0) * Math.PI) / 180,
      position:
        body.kind === 'star'
          ? [0, 0, 0]
          : [
              Math.cos(orbitalAngleRadians) * orbitRadius,
              0,
              Math.sin(orbitalAngleRadians) * orbitRadius,
            ],
      emissiveIntensity: appearance.emissiveIntensity ?? 0,
      ...(appearance.ring ? { ring: appearance.ring } : {}),
    };

    if (body.kind === 'star') {
      return {
        ...displayValues,
        id: body.id,
        kind: body.kind,
      } satisfies DisplayBody;
    }

    return {
      ...displayValues,
      id: body.id,
      kind: body.kind,
    } satisfies DisplayBody;
  });
}

export const solarSystemDisplayBodies =
  createSolarSystemDisplayModel(celestialBodies);

export const solarSystemDisplayPlanets: readonly DisplayPlanet[] =
  solarSystemDisplayBodies.filter(
    (body): body is DisplayPlanet => body.kind === 'planet',
  );
