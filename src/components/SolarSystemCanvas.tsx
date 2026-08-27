import { Canvas } from '@react-three/fiber';
import { GLOBAL_CAMERA_POSITION } from '../display/cameraView';
import type { PlanetId } from '../domain/celestialBody';
import type { MissionId } from '../domain/mission';
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
  return (
    <div
      className="canvas-container"
      role="img"
      aria-label="Interactive 3D overview of the Sun and eight planets"
    >
      <Canvas
        camera={{
          position: GLOBAL_CAMERA_POSITION,
          fov: 60,
          near: 0.1,
          far: 300,
        }}
        dpr={[1, 1.5]}
        frameloop="demand"
      >
        <SolarSystemScene
          selectedPlanetId={selectedPlanetId}
          selectedMissionId={selectedMissionId}
          onSelectPlanet={onSelectPlanet}
        />
      </Canvas>
    </div>
  );
}
