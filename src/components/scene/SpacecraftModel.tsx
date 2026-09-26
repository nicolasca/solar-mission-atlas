import { useGLTF } from '@react-three/drei';
import { Component, Suspense, useMemo, type ReactNode } from 'react';
import { Box3, Vector3 } from 'three';
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js';
import {
  spacecraftModels,
  spacecraftModelDecoderPath,
} from '../../data/spacecraftModels';

class ModelBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function OfficialModel({ url }: { readonly url: string }) {
  const { scene } = useGLTF(url, spacecraftModelDecoderPath);
  const model = useMemo(() => {
    const clone = cloneSkeleton(scene);
    const box = new Box3().setFromObject(clone);
    const size = box.getSize(new Vector3());
    const scale = 1.45 / Math.max(size.x, size.y, size.z, 0.001);
    const center = box.getCenter(new Vector3());
    clone.position.copy(center.multiplyScalar(-scale));
    clone.scale.setScalar(scale);
    return clone;
  }, [scene]);
  return <primitive object={model} />;
}

export function SpacecraftModel({
  missionId,
  fallback,
}: {
  readonly missionId: string;
  readonly fallback: ReactNode;
}) {
  const asset = spacecraftModels[missionId];
  if (!asset) return fallback;
  return (
    <ModelBoundary key={missionId} fallback={fallback}>
      <Suspense fallback={fallback}>
        <OfficialModel url={asset.url} />
      </Suspense>
    </ModelBoundary>
  );
}
