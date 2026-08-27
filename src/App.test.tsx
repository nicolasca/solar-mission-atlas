import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('./components/SolarSystemCanvas', () => ({
  SolarSystemCanvas: () => <div role="img" aria-label="Minimal 3D canvas" />,
}));

describe('App', () => {
  it('renders the 3D canvas surface', () => {
    render(<App />);

    expect(
      screen.getByRole('img', { name: 'Minimal 3D canvas' }),
    ).toBeInTheDocument();
  });
});
