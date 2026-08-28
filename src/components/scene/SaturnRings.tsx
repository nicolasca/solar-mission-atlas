import { useEffect, useMemo } from 'react';
import { DoubleSide, RingGeometry, type Texture } from 'three';
import type { DisplayBody } from '../../display/solarSystemDisplayModel';

interface SaturnRingsProps {
  readonly body: DisplayBody;
  readonly texture: Texture;
}

export function SaturnRings({ body, texture }: SaturnRingsProps) {
  const innerRadius =
    body.displayRadius * (body.ring?.innerRadiusMultiplier ?? 1);
  const outerRadius =
    body.displayRadius * (body.ring?.outerRadiusMultiplier ?? 1);
  const geometry = useMemo(() => {
    const ringGeometry = new RingGeometry(innerRadius, outerRadius, 96);
    const positions = ringGeometry.getAttribute('position');
    const uvs = ringGeometry.getAttribute('uv');

    for (let index = 0; index < positions.count; index += 1) {
      const radius = Math.hypot(positions.getX(index), positions.getY(index));
      const radialPosition =
        (radius - innerRadius) / (outerRadius - innerRadius);

      uvs.setXY(index, radialPosition, 0.5);
    }

    return ringGeometry;
  }, [innerRadius, outerRadius]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh geometry={geometry} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        alphaTest={0.015}
        depthWrite={false}
        map={texture}
        roughness={0.82}
        side={DoubleSide}
        transparent
      />
    </mesh>
  );
}
