import { Html, Stars, useTexture } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import { SRGBColorSpace } from 'three';
import { visualAssets } from '../../data/visualAssets';
import { solarSystemDisplayBodies } from '../../display/solarSystemDisplayModel';
import { getRouteView } from '../../display/missionDisplay';
import type { AtlasSceneModel } from '../../display/trajectoryDisplay';
import type { PlanetId } from '../../domain/celestialBody';
import type { MissionId } from '../../domain/mission';
import { CameraController } from './CameraController';
import { CelestialBodyMesh } from './CelestialBodyMesh';
import { OrbitPath } from './OrbitPath';
import { MissionRoute } from './MissionRoute';

interface SolarSystemSceneProps {
  readonly model: AtlasSceneModel;
  readonly onReady: () => void;
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

export function SolarSystemScene({
  model,
  onReady,
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
    model.bodies.find((planet) => planet.id === selectedPlanetId) ?? null;
  const selectedMission =
    model.missions.find((mission) => mission.id === selectedMissionId) ?? null;

  const routeView = useMemo(
    () =>
      selectedMission
        ? getRouteView([
            ...selectedMission.routePoints,
            ...selectedMission.futureRoutePoints,
            ...(model.origin ? [[0, 0, 0] as const] : []),
          ])
        : null,
    [selectedMission, model.origin],
  );

  return (
    <>
      <color attach="background" args={['#02050b']} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[15, 30, 20]} intensity={2} />
      <Stars
        radius={160}
        depth={50}
        count={1200}
        factor={2}
        saturation={0}
        fade
        speed={0}
      />
      <pointLight color="#fff1ca" intensity={95} position={[0, 0, 0]} />

      {!model.origin &&
        model.bodies
          .filter((body) => body.kind === 'planet')
          .map((planet) => (
            <OrbitPath key={`${planet.id}-orbit`} radius={planet.orbitRadius} />
          ))}

      {model.missions
        .filter((mission) => visibleMissionIds.includes(mission.id))
        .map((mission) => (
          <MissionRoute
            key={mission.id}
            mission={mission}
            isSelected={mission.id === selectedMissionId}
            showLabel={showLabels}
            showRoute={showRoutes && mission.id === selectedMissionId}
            onSelectMission={onSelectMission}
          />
        ))}

      {model.bodies.map((body) => (
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
          texture={
            textures[
              solarSystemDisplayBodies.findIndex((item) => item.id === body.id)
            ]
          }
        />
      ))}

      {model.targetPosition && model.origin && (
        <group position={model.targetPosition}>
          <mesh>
            <icosahedronGeometry args={[0.25, 1]} />
            <meshStandardMaterial color="#b4afa6" roughness={1} />
          </mesh>
          <Html center position={[0, 0.65, 0]} zIndexRange={[1, 0]}>
            <span className="body-label">{model.origin.name} · schematic</span>
          </Html>
        </group>
      )}
      <CameraController
        focusPosition={
          focusRoute && routeView
            ? routeView.position
            : (selectedPlanet?.position ??
              selectedMission?.markerPosition ??
              null)
        }
        resetKey={resetKey}
        wideView={wideView}
        focusRadius={
          focusRoute && routeView
            ? routeView.radius
            : (selectedPlanet?.displayRadius ??
              selectedMission?.markerRadius ??
              null)
        }
      />
    </>
  );
}
