const INNER_ORBIT_PADDING = 2.5;
const ORBIT_SQUARE_ROOT_SCALE = 4.2;

const REFERENCE_RADIUS_KM = 2_440;
const MINIMUM_DISPLAY_RADIUS = 0.18;
const RADIUS_LOG_SCALE = 0.45;

/**
 * Converts a mean orbital distance in AU to scene units.
 *
 * The square-root compression separates the inner planets while keeping
 * Neptune inside a readable global view. A zero distance remains at the scene
 * origin. These scene units are not a uniform scientific scale.
 */
export function toDisplayOrbitRadius(meanOrbitalDistanceAu: number): number {
  if (!Number.isFinite(meanOrbitalDistanceAu) || meanOrbitalDistanceAu < 0) {
    throw new RangeError(
      'Orbital distance must be a finite non-negative value.',
    );
  }

  if (meanOrbitalDistanceAu === 0) {
    return 0;
  }

  return (
    INNER_ORBIT_PADDING +
    ORBIT_SQUARE_ROOT_SCALE * Math.sqrt(meanOrbitalDistanceAu)
  );
}

/**
 * Converts a physical mean radius in kilometres to scene units.
 *
 * Logarithmic compression keeps small planets visible while retaining the
 * physical ordering of body sizes. Display radii are intentionally exaggerated
 * relative to the transformed orbital distances.
 */
export function toDisplayBodyRadius(meanRadiusKm: number): number {
  if (!Number.isFinite(meanRadiusKm) || meanRadiusKm <= 0) {
    throw new RangeError('Body radius must be a finite positive value.');
  }

  return (
    MINIMUM_DISPLAY_RADIUS +
    RADIUS_LOG_SCALE * Math.log10(1 + meanRadiusKm / REFERENCE_RADIUS_KM)
  );
}
