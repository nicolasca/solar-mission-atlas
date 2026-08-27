import { Canvas } from '@react-three/fiber';

export function SolarSystemCanvas() {
  return (
    <div className="canvas-container" role="img" aria-label="Minimal 3D canvas">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <color attach="background" args={['#02050b']} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 3, 3]} intensity={2} />
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#f4c95d" roughness={0.65} />
        </mesh>
      </Canvas>
    </div>
  );
}
