import { toDisplayOrbitRadius } from './displayScale';
import type { ScenePosition } from './solarSystemDisplayModel';

/** Same radial compression as the planets. J2000 ecliptic XYZ → Three.js X,Z,-Y. */
export function auToScene(positionAu: readonly number[]): ScenePosition {
  const [x, y, z] = positionAu;
  if (positionAu.length !== 3 || !positionAu.every(Number.isFinite))
    throw new RangeError('Expected a finite three-dimensional AU position.');
  const radius = Math.hypot(x, y, z);
  if (!radius) return [0, 0, 0];
  const scale = toDisplayOrbitRadius(radius) / radius;
  return [x * scale, z * scale, -y * scale];
}
