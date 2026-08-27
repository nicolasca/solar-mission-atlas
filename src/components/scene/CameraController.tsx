import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef, type ComponentRef } from 'react';
import {
  getFocusCameraPosition,
  GLOBAL_CAMERA_POSITION,
} from '../../display/cameraView';
import type { DisplayPlanet } from '../../display/solarSystemDisplayModel';
import type { ScenePosition } from '../../display/solarSystemDisplayModel';

const GLOBAL_TARGET: ScenePosition = [0, 0, 0];

interface CameraControllerProps {
  readonly focusBody: DisplayPlanet | null;
}

export function CameraController({ focusBody }: CameraControllerProps) {
  const controlsRef = useRef<ComponentRef<typeof OrbitControls>>(null);
  const { camera, invalidate } = useThree();

  useEffect(() => {
    const controls = controlsRef.current;

    if (!controls) {
      return;
    }

    const target = focusBody?.position ?? GLOBAL_TARGET;
    const cameraPosition = focusBody
      ? getFocusCameraPosition(focusBody)
      : GLOBAL_CAMERA_POSITION;

    controls.target.set(...target);
    camera.position.set(...cameraPosition);
    camera.lookAt(...target);
    camera.updateProjectionMatrix();
    controls.update();
    invalidate();
  }, [camera, focusBody, invalidate]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan
      enableZoom
      makeDefault
      maxDistance={145}
      minDistance={1.5}
      target={GLOBAL_TARGET}
    />
  );
}
