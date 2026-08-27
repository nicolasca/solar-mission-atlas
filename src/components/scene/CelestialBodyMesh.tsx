import { Html } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import { DoubleSide } from 'three';
import type { DisplayBody } from '../../display/solarSystemDisplayModel';
import type { PlanetId } from '../../domain/celestialBody';

interface CelestialBodyMeshProps {
  readonly body: DisplayBody;
  readonly isHighlighted: boolean;
  readonly highlightColor?: string;
  readonly showWireframe: boolean;
  readonly onSelectPlanet: (planetId: PlanetId) => void;
}

export function CelestialBodyMesh({
  body,
  isHighlighted,
  highlightColor = '#8bc3ff',
  showWireframe,
  onSelectPlanet,
}: CelestialBodyMeshProps) {
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    if (body.kind !== 'planet') {
      return;
    }

    event.stopPropagation();
    onSelectPlanet(body.id);
  };

  return (
    <group
      position={body.position}
      onClick={body.kind === 'planet' ? handleClick : undefined}
    >
      {body.kind === 'planet' ? (
        <mesh>
          <sphereGeometry
            args={[Math.max(body.displayRadius * 1.4, 0.65), 16, 16]}
          />
          <meshBasicMaterial depthWrite={false} opacity={0} transparent />
        </mesh>
      ) : null}

      <mesh>
        <sphereGeometry args={[body.displayRadius, 32, 32]} />
        <meshStandardMaterial
          color={body.color}
          emissive={body.color}
          emissiveIntensity={
            isHighlighted
              ? Math.max(body.emissiveIntensity, 0.4)
              : body.emissiveIntensity
          }
          roughness={0.72}
        />
      </mesh>

      {showWireframe ? (
        <mesh scale={1.35}>
          <sphereGeometry args={[body.displayRadius, 20, 20]} />
          <meshBasicMaterial
            color={highlightColor}
            opacity={0.75}
            transparent
            wireframe
          />
        </mesh>
      ) : null}

      {body.ring ? (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry
            args={[
              body.displayRadius * body.ring.innerRadiusMultiplier,
              body.displayRadius * body.ring.outerRadiusMultiplier,
              64,
            ]}
          />
          <meshBasicMaterial
            color={body.ring.color}
            opacity={0.72}
            side={DoubleSide}
            transparent
          />
        </mesh>
      ) : null}

      <Html
        center
        position={[0, body.displayRadius + 0.48, 0]}
        style={{ pointerEvents: 'none' }}
        zIndexRange={[1, 0]}
      >
        <span
          className={`body-label body-label--${body.kind}${isHighlighted ? ' body-label--selected' : ''}`}
          style={isHighlighted ? { borderColor: highlightColor } : undefined}
        >
          {body.name}
        </span>
      </Html>
    </group>
  );
}
