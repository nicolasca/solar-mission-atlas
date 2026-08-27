import { Canvas } from '@react-three/fiber';
import { SolarSystemScene } from './scene/SolarSystemScene';

export function SolarSystemCanvas() {
  return (
    <div
      className="canvas-container"
      role="img"
      aria-label="Static 3D overview of the Sun and eight planets"
    >
      <Canvas
        camera={{ position: [0, 65, 75], fov: 60, near: 0.1, far: 300 }}
        dpr={[1, 1.5]}
        frameloop="demand"
      >
        <SolarSystemScene />
      </Canvas>
    </div>
  );
}
