import type { AtlasSceneModel } from '../display/trajectoryDisplay';
import { Canvas } from '@react-three/fiber';
import { Suspense, useCallback, useState } from 'react';
import { GLOBAL_CAMERA_POSITION } from '../display/cameraView';
import type { PlanetId } from '../domain/celestialBody';
import type { MissionId } from '../domain/mission';
import { SceneErrorBoundary } from './SceneErrorBoundary';
import { SceneLoadingStatus } from './SceneLoadingStatus';
import { SolarSystemScene } from './scene/SolarSystemScene';

interface SolarSystemCanvasProps {
  readonly model: AtlasSceneModel;
  readonly selectedPlanetId: PlanetId | null;
  readonly selectedMissionId: MissionId | null;
  readonly onSelectPlanet: (planetId: PlanetId) => void;
  readonly onSelectMission: (missionId: MissionId) => void;
  readonly visibleMissionIds: readonly MissionId[];
  readonly showLabels: boolean;
  readonly showRoutes: boolean;
  readonly resetKey: number;
  readonly focusRoute: boolean;
  readonly wideView: boolean;
}

export function SolarSystemCanvas({
  model,
  selectedPlanetId,
  selectedMissionId,
  onSelectPlanet,
  onSelectMission,
  visibleMissionIds,
  showLabels,
  showRoutes,
  resetKey,
  focusRoute,
  wideView,
}: SolarSystemCanvasProps) {
  const [isSceneReady, setIsSceneReady] = useState(false);
  const [hasSceneError, setHasSceneError] = useState(false);
  const handleSceneReady = useCallback(() => setIsSceneReady(true), []);
  const handleSceneError = useCallback(() => setHasSceneError(true), []);

  return (
    <div
      className="canvas-container"
      role="region"
      aria-label="Interactive 3D map of Solar System missions"
    >
      <SceneErrorBoundary onError={handleSceneError}>
        <Canvas
          camera={{
            position: GLOBAL_CAMERA_POSITION,
            fov: 60,
            near: 0.1,
            far: 1200,
          }}
          dpr={[1, 1.5]}
          fallback={
            <div className="scene-status scene-status--error" role="alert">
              WebGL is required to display the 3D map. Mission records remain
              available in the catalogue.
            </div>
          }
          frameloop="demand"
        >
          <Suspense fallback={null}>
            <SolarSystemScene
              model={model}
              onReady={handleSceneReady}
              selectedPlanetId={selectedPlanetId}
              selectedMissionId={selectedMissionId}
              onSelectPlanet={onSelectPlanet}
              onSelectMission={onSelectMission}
              visibleMissionIds={visibleMissionIds}
              showLabels={showLabels}
              showRoutes={showRoutes}
              resetKey={resetKey}
              focusRoute={focusRoute}
              wideView={wideView}
            />
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>

      <SceneLoadingStatus hasError={hasSceneError} isReady={isSceneReady} />
    </div>
  );
}
