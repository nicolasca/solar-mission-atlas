import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SceneLoadingStatus } from './SceneLoadingStatus';

vi.mock('@react-three/drei', () => ({
  useProgress: () => ({ progress: 42.4 }),
}));

describe('SceneLoadingStatus', () => {
  it('announces loading progress until the scene is ready', () => {
    const { rerender } = render(
      <SceneLoadingStatus hasError={false} isReady={false} />,
    );

    expect(screen.getByRole('status')).toHaveTextContent('42%');
    expect(screen.getByRole('progressbar')).toHaveAttribute('value', '42');

    rerender(<SceneLoadingStatus hasError={false} isReady />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('shows an explicit error instead of an empty scene', () => {
    render(<SceneLoadingStatus hasError isReady={false} />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Solar System textures could not be loaded.',
    );
  });
});
