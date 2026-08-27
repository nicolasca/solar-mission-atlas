import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef, type ComponentRef } from 'react';
import { getFocusCameraPosition } from '../../display/cameraView';
import type { ScenePosition } from '../../display/solarSystemDisplayModel';

interface CameraControllerProps {
  readonly focusPosition: ScenePosition | null;
  readonly focusRadius: number | null;
}

export function CameraController({
  focusPosition,
  focusRadius,
}: CameraControllerProps) {
  const controlsRef = useRef<ComponentRef<typeof OrbitControls>>(null);
  const { camera, invalidate } = useThree();

  useEffect(() => {
    const controls = controlsRef.current;

    if (!controls || !focusPosition || focusRadius === null) {
      return;
    }

    const target = focusPosition;
    const cameraPosition = getFocusCameraPosition(target, focusRadius);

    controls.target.set(...target);
    camera.position.set(...cameraPosition);
    camera.lookAt(...target);
    camera.updateProjectionMatrix();
    controls.update();
    invalidate();
  }, [camera, focusPosition, focusRadius, invalidate]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan
      enableZoom
      makeDefault
      maxDistance={145}
      minDistance={1.5}
    />
  );
}
