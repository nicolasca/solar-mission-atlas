import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, type ComponentRef } from 'react';
import { Vector3 } from 'three';
import {
  getFocusCameraPosition,
  fitCameraToAspect,
  GLOBAL_CAMERA_POSITION,
} from '../../display/cameraView';
import type { ScenePosition } from '../../display/solarSystemDisplayModel';

interface CameraControllerProps {
  readonly focusPosition: ScenePosition | null;
  readonly focusRadius: number | null;
  readonly resetKey: number;
  readonly wideView: boolean;
}

export function CameraController({
  focusPosition,
  focusRadius,
  resetKey,
  wideView,
}: CameraControllerProps) {
  const controlsRef = useRef<ComponentRef<typeof OrbitControls>>(null);
  const transition = useRef<{ position: Vector3; target: Vector3 } | null>(
    null,
  );
  const { camera, invalidate, size } = useThree();

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    const target = new Vector3(...(focusPosition ?? [0, 0, 0]));
    const position = new Vector3(
      ...(focusPosition && focusRadius !== null
        ? getFocusCameraPosition(focusPosition, focusRadius)
        : wideView
          ? ([0, 62, 80] as const)
          : GLOBAL_CAMERA_POSITION),
    );
    position.set(
      ...fitCameraToAspect(
        [position.x, position.y, position.z],
        [target.x, target.y, target.z],
        size.width / Math.max(size.height, 1),
      ),
    );
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      camera.position.copy(position);
      controls.target.copy(target);
      controls.update();
      transition.current = null;
    } else {
      transition.current = { position, target };
    }
    invalidate();
  }, [
    camera,
    focusPosition,
    focusRadius,
    resetKey,
    wideView,
    invalidate,
    size.width,
    size.height,
  ]);

  useFrame((_, delta) => {
    const destination = transition.current;
    const controls = controlsRef.current;
    if (!destination || !controls) return;
    const progress = 1 - Math.exp(-5 * Math.min(delta, 0.1));
    camera.position.lerp(destination.position, progress);
    controls.target.lerp(destination.target, progress);
    controls.update();
    if (
      camera.position.distanceTo(destination.position) < 0.005 &&
      controls.target.distanceTo(destination.target) < 0.005
    ) {
      camera.position.copy(destination.position);
      controls.target.copy(destination.target);
      controls.update();
      transition.current = null;
    }
    invalidate();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan
      enableZoom
      makeDefault
      maxDistance={600}
      minDistance={1.5}
      onStart={() => {
        transition.current = null;
      }}
    />
  );
}
