import { OrbitControls } from '@react-three/drei';
import { solarSystemDisplayBodies } from '../../display/solarSystemDisplayModel';
import { CelestialBodyMesh } from './CelestialBodyMesh';
import { OrbitPath } from './OrbitPath';

export function SolarSystemScene() {
  const planets = solarSystemDisplayBodies.filter(
    (body) => body.kind === 'planet',
  );

  return (
    <>
      <color attach="background" args={['#02050b']} />
      <ambientLight intensity={0.82} />
      <pointLight color="#fff1ca" intensity={95} position={[0, 0, 0]} />

      {planets.map((planet) => (
        <OrbitPath key={`${planet.id}-orbit`} radius={planet.orbitRadius} />
      ))}

      {solarSystemDisplayBodies.map((body) => (
        <CelestialBodyMesh body={body} key={body.id} />
      ))}

      <OrbitControls
        enablePan
        enableZoom
        makeDefault
        maxDistance={145}
        minDistance={7}
        target={[0, 0, 0]}
      />
    </>
  );
}
