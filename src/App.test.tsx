import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';
import { planets } from './data/celestialBodies';

vi.mock('./components/SolarSystemCanvas', () => ({
  SolarSystemCanvas: () => (
    <div
      role="img"
      aria-label="Interactive 3D overview of the Sun and eight planets"
    />
  ),
}));

describe('App', () => {
  it('provides every planet through accessible DOM controls', () => {
    render(<App />);

    const navigation = screen.getByRole('navigation', {
      name: 'Explore planets',
    });
    const buttons = within(navigation).getAllByRole('button');

    expect(buttons).toHaveLength(8);
    expect(buttons.map((button) => button.textContent)).toEqual(
      planets.map((planet) => planet.name),
    );
  });

  it('selects a planet and displays the correct scientific information', () => {
    render(<App />);

    const earthButton = screen.getByRole('button', { name: 'Earth' });
    fireEvent.click(earthButton);

    expect(earthButton).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.getByRole('heading', { level: 2, name: 'Earth' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Terrestrial planet')).toBeInTheDocument();
    expect(screen.getByText('6,371 km')).toBeInTheDocument();
    expect(screen.getByText('1 AU')).toBeInTheDocument();
    expect(screen.getByText('365 Earth days')).toBeInTheDocument();
    expect(screen.getByText(/transformed display scale/i)).toBeInTheDocument();
  });

  it('switches from one selected planet to another', () => {
    render(<App />);

    const earthButton = screen.getByRole('button', { name: 'Earth' });
    const neptuneButton = screen.getByRole('button', { name: 'Neptune' });

    fireEvent.click(earthButton);
    fireEvent.click(neptuneButton);

    expect(earthButton).toHaveAttribute('aria-pressed', 'false');
    expect(neptuneButton).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Earth' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Neptune' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Ice giant')).toBeInTheDocument();
    expect(screen.getByText('30.05 AU')).toBeInTheDocument();
  });

  it('clears the selection and panel when returning to the global view', () => {
    render(<App />);

    const marsButton = screen.getByRole('button', { name: 'Mars' });
    fireEvent.click(marsButton);
    fireEvent.click(screen.getByRole('button', { name: 'Global view' }));

    expect(marsButton).toHaveAttribute('aria-pressed', 'false');
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Mars' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Global view' }),
    ).not.toBeInTheDocument();
  });

  it('clears the selection when Escape is pressed', () => {
    render(<App />);

    const venusButton = screen.getByRole('button', { name: 'Venus' });
    fireEvent.click(venusButton);
    fireEvent.keyDown(window, { key: 'Escape' });

    expect(venusButton).toHaveAttribute('aria-pressed', 'false');
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Venus' }),
    ).not.toBeInTheDocument();
  });

  it('preserves the 3D overview and its scale explanation', () => {
    render(<App />);

    expect(
      screen.getByRole('img', {
        name: 'Interactive 3D overview of the Sun and eight planets',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/not uniformly to scale/i)).toBeInTheDocument();
  });
});
