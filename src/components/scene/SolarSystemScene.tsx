import {
  solarSystemDisplayBodies,
  solarSystemDisplayPlanets,
} from '../../display/solarSystemDisplayModel';
import type { PlanetId } from '../../domain/celestialBody';
import { CameraController } from './CameraController';
import { CelestialBodyMesh } from './CelestialBodyMesh';
import { OrbitPath } from './OrbitPath';

interface SolarSystemSceneProps {
  readonly selectedPlanetId: PlanetId | null;
  readonly onSelectPlanet: (planetId: PlanetId) => void;
}

export function SolarSystemScene({
  selectedPlanetId,
  onSelectPlanet,
}: SolarSystemSceneProps) {
  const selectedPlanet =
    solarSystemDisplayPlanets.find(
      (planet) => planet.id === selectedPlanetId,
    ) ?? null;

  return (
    <>
      <color attach="background" args={['#02050b']} />
      <ambientLight intensity={0.82} />
      <pointLight color="#fff1ca" intensity={95} position={[0, 0, 0]} />

      {solarSystemDisplayPlanets.map((planet) => (
        <OrbitPath key={`${planet.id}-orbit`} radius={planet.orbitRadius} />
      ))}

      {solarSystemDisplayBodies.map((body) => (
        <CelestialBodyMesh
          body={body}
          isSelected={body.id === selectedPlanetId}
          key={body.id}
          onSelectPlanet={onSelectPlanet}
        />
      ))}

      <CameraController focusBody={selectedPlanet} />
    </>
  );
}
