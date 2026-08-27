import { useMemo } from 'react';
import { createCircularOrbitPoints } from '../../display/orbitPath';

interface OrbitPathProps {
  readonly radius: number;
}

export function OrbitPath({ radius }: OrbitPathProps) {
  const positions = useMemo(() => {
    const points = createCircularOrbitPoints(radius);

    return new Float32Array(points.flatMap((point) => point));
  }, [radius]);

  return (
    <lineLoop>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#506078" opacity={0.42} transparent />
    </lineLoop>
  );
}
