import { useTexture } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import { SRGBColorSpace } from 'three';
import { visualAssets } from '../../data/visualAssets';
import {
  solarSystemDisplayBodies,
  solarSystemDisplayPlanets,
} from '../../display/solarSystemDisplayModel';
import { displayMissions } from '../../display/missionDisplay';
import type { PlanetId } from '../../domain/celestialBody';
import type { MissionId } from '../../domain/mission';
import { CameraController } from './CameraController';
import { CelestialBodyMesh } from './CelestialBodyMesh';
import { OrbitPath } from './OrbitPath';
import { MissionRoute } from './MissionRoute';

interface SolarSystemSceneProps {
  readonly onReady: () => void;
  readonly selectedPlanetId: PlanetId | null;
  readonly selectedMissionId: MissionId | null;
  readonly onSelectPlanet: (planetId: PlanetId) => void;
}

export function SolarSystemScene({
  onReady,
  selectedPlanetId,
  selectedMissionId,
  onSelectPlanet,
}: SolarSystemSceneProps) {
  const textureUrls = [
    ...solarSystemDisplayBodies.map((body) => visualAssets[body.id].textureUrl),
    visualAssets['saturn-rings'].textureUrl,
  ];
  const loadedTextures = useTexture(textureUrls);
  const textures = useMemo(
    () =>
      loadedTextures.map((texture) => {
        const colorTexture = texture.clone();
        colorTexture.colorSpace = SRGBColorSpace;
        colorTexture.needsUpdate = true;

        return colorTexture;
      }),
    [loadedTextures],
  );
  const ringTexture = textures[solarSystemDisplayBodies.length];

  useEffect(() => onReady(), [onReady]);
  useEffect(
    () => () => {
      for (const texture of textures) {
        texture.dispose();
      }
    },
    [textures],
  );

  const selectedPlanet =
    solarSystemDisplayPlanets.find(
      (planet) => planet.id === selectedPlanetId,
    ) ?? null;
  const selectedMission =
    displayMissions.find((mission) => mission.id === selectedMissionId) ?? null;

  return (
    <>
      <color attach="background" args={['#02050b']} />
      <ambientLight intensity={0.82} />
      <pointLight color="#fff1ca" intensity={95} position={[0, 0, 0]} />

      {solarSystemDisplayPlanets.map((planet) => (
        <OrbitPath key={`${planet.id}-orbit`} radius={planet.orbitRadius} />
      ))}

      {selectedMission ? <MissionRoute mission={selectedMission} /> : null}

      {solarSystemDisplayBodies.map((body, index) => (
        <CelestialBodyMesh
          body={body}
          highlightColor={
            body.id === selectedMission?.targetBodyId
              ? selectedMission.color
              : undefined
          }
          isHighlighted={
            body.id === selectedPlanetId ||
            body.id === selectedMission?.targetBodyId
          }
          key={body.id}
          onSelectPlanet={onSelectPlanet}
          ringTexture={body.id === 'saturn' ? ringTexture : undefined}
          showWireframe={body.id === selectedMission?.targetBodyId}
          texture={textures[index]}
        />
      ))}

      <CameraController
        focusPosition={
          selectedPlanet?.position ?? selectedMission?.markerPosition ?? null
        }
        focusRadius={
          selectedPlanet?.displayRadius ?? selectedMission?.markerRadius ?? null
        }
      />
    </>
  );
}
