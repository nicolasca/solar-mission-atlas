import type { ScenePosition } from './solarSystemDisplayModel';

export const GLOBAL_CAMERA_POSITION: ScenePosition = [0, 32, 40];

const FOCUS_DIRECTION: ScenePosition = [1, 0.65, 1];
const FOCUS_DIRECTION_LENGTH = Math.hypot(...FOCUS_DIRECTION);

export function getFocusCameraPosition(
  target: ScenePosition,
  displayRadius: number,
): ScenePosition {
  const distance = Math.max(displayRadius * 8, 4);
  const [targetX, targetY, targetZ] = target;

  return [
    targetX + (FOCUS_DIRECTION[0] / FOCUS_DIRECTION_LENGTH) * distance,
    targetY + (FOCUS_DIRECTION[1] / FOCUS_DIRECTION_LENGTH) * distance,
    targetZ + (FOCUS_DIRECTION[2] / FOCUS_DIRECTION_LENGTH) * distance,
  ];
}

/** Preserve the vertical framing when a narrow canvas reduces horizontal FOV. */
export function fitCameraToAspect(
  position: ScenePosition,
  target: ScenePosition,
  aspect: number,
): ScenePosition {
  if (!Number.isFinite(aspect) || aspect <= 0)
    throw new RangeError('Camera aspect must be finite and positive.');
  const factor = 1 / Math.min(aspect, 1);
  return [
    target[0] + (position[0] - target[0]) * factor,
    target[1] + (position[1] - target[1]) * factor,
    target[2] + (position[2] - target[2]) * factor,
  ];
}
