import { Html } from '@react-three/drei';
import { DoubleSide } from 'three';
import type { DisplayBody } from '../../display/solarSystemDisplayModel';

interface CelestialBodyMeshProps {
  readonly body: DisplayBody;
}

export function CelestialBodyMesh({ body }: CelestialBodyMeshProps) {
  return (
    <group position={body.position}>
      <mesh>
        <sphereGeometry args={[body.displayRadius, 32, 32]} />
        <meshStandardMaterial
          color={body.color}
          emissive={body.color}
          emissiveIntensity={body.emissiveIntensity}
          roughness={0.72}
        />
      </mesh>

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
      >
        <span className={`body-label body-label--${body.kind}`}>
          {body.name}
        </span>
      </Html>
    </group>
  );
}
