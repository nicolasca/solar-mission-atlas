import { Html, Line } from '@react-three/drei';
import { useState } from 'react';
import type { DisplayMission } from '../../display/missionDisplay';
import { SpacecraftModel } from './SpacecraftModel';

interface MissionRouteProps {
  readonly mission: DisplayMission;
  readonly isSelected: boolean;
  readonly showLabel: boolean;
  readonly showRoute: boolean;
  readonly onSelectMission: (id: string) => void;
}

export function MissionRoute({
  mission,
  isSelected,
  showLabel,
  showRoute,
  onSelectMission,
}: MissionRouteProps) {
  const [hovered, setHovered] = useState(false);
  const marker = (
    <mesh>
      <octahedronGeometry
        args={[isSelected ? 0.24 : mission.markerRadius, 0]}
      />
      <meshBasicMaterial
        color={mission.color}
        wireframe={mission.positionKind === 'context'}
      />
    </mesh>
  );
  return (
    <>
      {showRoute && mission.routePoints.length > 1 && (
        <Line
          points={[...mission.routePoints]}
          color={mission.color}
          transparent
          opacity={0.85}
          lineWidth={1.5}
          toneMapped={false}
        />
      )}
      {showRoute && mission.futureRoutePoints.length > 1 && (
        <Line
          points={[...mission.futureRoutePoints]}
          color={mission.color}
          transparent
          opacity={0.55}
          lineWidth={1.2}
          dashed
          dashSize={0.25}
          gapSize={0.18}
          toneMapped={false}
        />
      )}
      {isSelected && mission.displaced && mission.physicalPosition && (
        <Line
          points={[mission.physicalPosition, mission.markerPosition]}
          color={mission.color}
          transparent
          opacity={0.5}
          dashed
          dashSize={0.06}
          gapSize={0.07}
        />
      )}
      <group
        position={mission.markerPosition}
        onClick={(event) => {
          event.stopPropagation();
          onSelectMission(mission.id);
        }}
      >
        {isSelected ? (
          <SpacecraftModel missionId={mission.id} fallback={marker} />
        ) : null}
        <mesh visible={false}>
          <sphereGeometry args={[0.35, 8, 8]} />
          <meshBasicMaterial />
        </mesh>
        <Html
          center
          position={[0, isSelected ? 1.05 : 0, 0]}
          zIndexRange={[3, 0]}
        >
          {showLabel || isSelected || hovered ? (
            <button
              type="button"
              className={`mission-route-label ${isSelected ? 'mission-route-label--selected' : ''}`}
              style={{ borderColor: mission.color }}
              aria-label={`Select ${mission.name}`}
              onMouseLeave={() => setHovered(false)}
              onClick={(event) => {
                event.stopPropagation();
                onSelectMission(mission.id);
              }}
            >
              {mission.name}
              {mission.positionKind === 'context' ? ' ◇' : ''}
            </button>
          ) : (
            <button
              type="button"
              className={`mission-map-point ${mission.positionKind === 'context' ? 'mission-map-point--context' : ''}`}
              style={{ color: mission.color }}
              aria-label={`Select ${mission.name}`}
              title={mission.name}
              onMouseEnter={() => setHovered(true)}
              onFocus={() => setHovered(true)}
              onBlur={() => setHovered(false)}
              onClick={(event) => {
                event.stopPropagation();
                onSelectMission(mission.id);
              }}
            >
              <span />
            </button>
          )}
        </Html>
      </group>
    </>
  );
}
