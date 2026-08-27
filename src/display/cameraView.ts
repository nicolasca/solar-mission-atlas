import type { ScenePosition } from './solarSystemDisplayModel';

export const GLOBAL_CAMERA_POSITION: ScenePosition = [0, 42, 48];

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
