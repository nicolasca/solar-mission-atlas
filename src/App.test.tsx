import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('./components/SolarSystemCanvas', () => ({
  SolarSystemCanvas: () => (
    <div
      role="img"
      aria-label="Static 3D overview of the Sun and eight planets"
    />
  ),
}));

describe('App', () => {
  it('renders the 3D overview and its scale explanation', () => {
    render(<App />);

    expect(
      screen.getByRole('img', {
        name: 'Static 3D overview of the Sun and eight planets',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/not uniformly to scale/i)).toBeInTheDocument();
  });
});
