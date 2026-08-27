import type { CelestialBody } from '../domain/celestialBody';
import { celestialBodies } from '../data/celestialBodies';
import { bodyAppearance, type RingAppearance } from './bodyAppearance';
import { toDisplayBodyRadius, toDisplayOrbitRadius } from './displayScale';

export type ScenePosition = readonly [number, number, number];

export interface DisplayBody {
  readonly id: CelestialBody['id'];
  readonly name: string;
  readonly kind: CelestialBody['kind'];
  readonly color: string;
  readonly displayRadius: number;
  readonly orbitRadius: number;
  readonly position: ScenePosition;
  readonly emissiveIntensity: number;
  readonly ring?: RingAppearance;
}

export function createSolarSystemDisplayModel(
  bodies: readonly CelestialBody[],
): readonly DisplayBody[] {
  return bodies.map((body) => {
    const appearance = bodyAppearance[body.id];
    const orbitRadius = toDisplayOrbitRadius(body.meanOrbitalDistanceAu);
    const orbitalAngleRadians =
      (appearance.orbitalAngleDegrees * Math.PI) / 180;

    return {
      id: body.id,
      name: body.name,
      kind: body.kind,
      color: appearance.color,
      displayRadius: toDisplayBodyRadius(body.meanRadiusKm),
      orbitRadius,
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
    } satisfies DisplayBody;
  });
}

export const solarSystemDisplayBodies =
  createSolarSystemDisplayModel(celestialBodies);
