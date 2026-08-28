import { Canvas } from '@react-three/fiber';
import { Suspense, useCallback, useState } from 'react';
import { GLOBAL_CAMERA_POSITION } from '../display/cameraView';
import type { PlanetId } from '../domain/celestialBody';
import type { MissionId } from '../domain/mission';
import { SceneErrorBoundary } from './SceneErrorBoundary';
import { SceneLoadingStatus } from './SceneLoadingStatus';
import { SolarSystemScene } from './scene/SolarSystemScene';

interface SolarSystemCanvasProps {
  readonly selectedPlanetId: PlanetId | null;
  readonly selectedMissionId: MissionId | null;
  readonly onSelectPlanet: (planetId: PlanetId) => void;
}

export function SolarSystemCanvas({
  selectedPlanetId,
  selectedMissionId,
  onSelectPlanet,
}: SolarSystemCanvasProps) {
  const [isSceneReady, setIsSceneReady] = useState(false);
  const [hasSceneError, setHasSceneError] = useState(false);
  const handleSceneReady = useCallback(() => setIsSceneReady(true), []);
  const handleSceneError = useCallback(() => setHasSceneError(true), []);

  return (
    <div
      className="canvas-container"
      role="img"
      aria-label="Interactive 3D overview of the Sun and eight planets"
    >
      <SceneErrorBoundary onError={handleSceneError}>
        <Canvas
          camera={{
            position: GLOBAL_CAMERA_POSITION,
            fov: 60,
            near: 0.1,
            far: 300,
          }}
          dpr={[1, 1.5]}
          fallback={
            <div className="scene-status scene-status--error" role="alert">
              WebGL is required to display the Solar System.
            </div>
          }
          frameloop="demand"
        >
          <Suspense fallback={null}>
            <SolarSystemScene
              onReady={handleSceneReady}
              selectedPlanetId={selectedPlanetId}
              selectedMissionId={selectedMissionId}
              onSelectPlanet={onSelectPlanet}
            />
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>

      <SceneLoadingStatus hasError={hasSceneError} isReady={isSceneReady} />
    </div>
  );
}
