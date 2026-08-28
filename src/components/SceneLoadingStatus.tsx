import { useProgress } from '@react-three/drei';

interface SceneLoadingStatusProps {
  readonly hasError: boolean;
  readonly isReady: boolean;
}

export function SceneLoadingStatus({
  hasError,
  isReady,
}: SceneLoadingStatusProps) {
  const { progress } = useProgress();
  const percentage = Math.round(Math.max(0, Math.min(100, progress)));

  if (hasError) {
    return (
      <div className="scene-status scene-status--error" role="alert">
        <strong>Solar System textures could not be loaded.</strong>
        <span>Refresh the page to try again.</span>
      </div>
    );
  }

  if (isReady) {
    return null;
  }

  return (
    <div className="scene-status" role="status" aria-live="polite">
      <span>Loading Solar System textures… {percentage}%</span>
      <progress
        aria-label="Solar System texture loading progress"
        max={100}
        value={percentage}
      />
    </div>
  );
}
