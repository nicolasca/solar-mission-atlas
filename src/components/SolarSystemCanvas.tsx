import { Canvas } from '@react-three/fiber';
import { GLOBAL_CAMERA_POSITION } from '../display/cameraView';
import type { PlanetId } from '../domain/celestialBody';
import { SolarSystemScene } from './scene/SolarSystemScene';

interface SolarSystemCanvasProps {
  readonly selectedPlanetId: PlanetId | null;
  readonly onSelectPlanet: (planetId: PlanetId) => void;
}

export function SolarSystemCanvas({
  selectedPlanetId,
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
          onSelectPlanet={onSelectPlanet}
        />
      </Canvas>
    </div>
  );
}
