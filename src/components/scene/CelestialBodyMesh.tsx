import { Html } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import type { Texture } from 'three';
import type { DisplayBody } from '../../display/solarSystemDisplayModel';
import type { PlanetId } from '../../domain/celestialBody';
import { SaturnRings } from './SaturnRings';

interface CelestialBodyMeshProps {
  readonly body: DisplayBody;
  readonly isHighlighted: boolean;
  readonly highlightColor?: string;
  readonly showWireframe: boolean;
  readonly texture: Texture;
  readonly ringTexture?: Texture;
  readonly onSelectPlanet: (planetId: PlanetId) => void;
}

export function CelestialBodyMesh({
  body,
  isHighlighted,
  highlightColor = '#8bc3ff',
  showWireframe,
  texture,
  ringTexture,
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

      <group rotation={[0, 0, body.axialTiltRadians]}>
        <mesh>
          <sphereGeometry args={[body.displayRadius, 48, 48]} />
          {body.kind === 'star' ? (
            <meshBasicMaterial color={body.color} map={texture} />
          ) : (
            <meshStandardMaterial
              color="#ffffff"
              emissive={body.color}
              emissiveIntensity={isHighlighted ? 0.12 : 0}
              map={texture}
              roughness={0.78}
            />
          )}
        </mesh>

        {body.ring && ringTexture ? (
          <SaturnRings body={body} texture={ringTexture} />
        ) : null}
      </group>

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
