import { Html, Line } from '@react-three/drei';
import type { DisplayMission } from '../../display/missionDisplay';

interface MissionRouteProps {
  readonly mission: DisplayMission;
}

export function MissionRoute({ mission }: MissionRouteProps) {
  return (
    <>
      <Line
        points={[...mission.routePoints]}
        color={mission.color}
        depthTest={false}
        lineWidth={4}
        renderOrder={5}
        toneMapped={false}
      />

      <group position={mission.markerPosition}>
        <mesh>
          <octahedronGeometry args={[mission.markerRadius, 0]} />
          <meshBasicMaterial color={mission.color} />
        </mesh>
        <Html
          center
          position={[0, 0.62, 0]}
          style={{ pointerEvents: 'none' }}
          zIndexRange={[1, 0]}
        >
          <span
            className="mission-route-label"
            style={{ borderColor: mission.color }}
          >
            {mission.name}
          </span>
        </Html>
      </group>
    </>
  );
}
