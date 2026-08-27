import type { ScenePosition } from './solarSystemDisplayModel';

export function createCircularOrbitPoints(
  orbitRadius: number,
  segmentCount = 128,
): readonly ScenePosition[] {
  if (!Number.isFinite(orbitRadius) || orbitRadius <= 0) {
    throw new RangeError('Orbit radius must be a finite positive value.');
  }

  if (!Number.isInteger(segmentCount) || segmentCount < 3) {
    throw new RangeError('An orbit path requires at least three segments.');
  }

  return Array.from({ length: segmentCount + 1 }, (_, index) => {
    if (index === segmentCount) {
      return [orbitRadius, 0, 0] as const;
    }

    const angle = (index / segmentCount) * Math.PI * 2;

    return [
      Math.cos(angle) * orbitRadius,
      0,
      Math.sin(angle) * orbitRadius,
    ] as const;
  });
}
