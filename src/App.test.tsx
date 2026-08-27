import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';
import { planets } from './data/celestialBodies';
import { missions } from './data/missions';

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

  it('provides exactly the three featured missions through DOM controls', () => {
    render(<App />);

    const navigation = screen.getByRole('navigation', {
      name: 'Explore missions',
    });
    const buttons = within(navigation).getAllByRole('button');

    expect(buttons).toHaveLength(3);
    expect(buttons.map((button) => button.textContent)).toEqual(
      missions.map((mission) => mission.name),
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

  it('unselects a planet when its selected table button is clicked again', () => {
    render(<App />);

    const earthButton = screen.getByRole('button', { name: 'Earth' });

    fireEvent.click(earthButton);
    fireEvent.click(earthButton);

    expect(earthButton).toHaveAttribute('aria-pressed', 'false');
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Earth' }),
    ).not.toBeInTheDocument();
  });

  it('selects a mission and displays the correct mission information', () => {
    render(<App />);

    const parkerButton = screen.getByRole('button', {
      name: 'Parker Solar Probe',
    });
    fireEvent.click(parkerButton);

    expect(parkerButton).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.getByRole('heading', { level: 2, name: 'Parker Solar Probe' }),
    ).toBeInTheDocument();
    expect(screen.getByText('NASA')).toBeInTheDocument();
    expect(screen.getByText('August 12, 2018')).toBeInTheDocument();
    expect(screen.getByText('Primary mission in progress')).toBeInTheDocument();
    expect(
      screen.getByText("The Sun's corona and solar wind"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /official mission source/i }),
    ).toHaveAttribute(
      'href',
      'https://science.nasa.gov/mission/parker-solar-probe/',
    );
    expect(
      screen.getByText(/not the mission’s real trajectory/i),
    ).toBeInTheDocument();
  });

  it('switches from one selected mission to another', () => {
    render(<App />);

    const juiceButton = screen.getByRole('button', { name: 'JUICE' });
    const clipperButton = screen.getByRole('button', {
      name: 'Europa Clipper',
    });

    fireEvent.click(juiceButton);
    fireEvent.click(clipperButton);

    expect(juiceButton).toHaveAttribute('aria-pressed', 'false');
    expect(clipperButton).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.queryByRole('heading', { level: 2, name: 'JUICE' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Europa Clipper' }),
    ).toBeInTheDocument();
    expect(screen.getByText('October 14, 2024')).toBeInTheDocument();
    expect(screen.getByText('Europa, a moon of Jupiter')).toBeInTheDocument();
  });

  it('unselects a mission when its selected button is clicked again', () => {
    render(<App />);

    const juiceButton = screen.getByRole('button', { name: 'JUICE' });

    fireEvent.click(juiceButton);
    fireEvent.click(juiceButton);

    expect(juiceButton).toHaveAttribute('aria-pressed', 'false');
    expect(
      screen.queryByRole('heading', { level: 2, name: 'JUICE' }),
    ).not.toBeInTheDocument();
  });

  it('keeps planet and mission selection mutually exclusive', () => {
    render(<App />);

    const earthButton = screen.getByRole('button', { name: 'Earth' });
    const juiceButton = screen.getByRole('button', { name: 'JUICE' });

    fireEvent.click(earthButton);
    fireEvent.click(juiceButton);

    expect(earthButton).toHaveAttribute('aria-pressed', 'false');
    expect(juiceButton).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Earth' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'JUICE' }),
    ).toBeInTheDocument();

    fireEvent.click(earthButton);

    expect(earthButton).toHaveAttribute('aria-pressed', 'true');
    expect(juiceButton).toHaveAttribute('aria-pressed', 'false');
    expect(
      screen.getByRole('heading', { level: 2, name: 'Earth' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 2, name: 'JUICE' }),
    ).not.toBeInTheDocument();
  });

  it('clears a planet selection through the close control', () => {
    render(<App />);

    const marsButton = screen.getByRole('button', { name: 'Mars' });
    fireEvent.click(marsButton);
    fireEvent.click(
      screen.getByRole('button', { name: 'Close planet details' }),
    );

    expect(marsButton).toHaveAttribute('aria-pressed', 'false');
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Mars' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Close planet details' }),
    ).not.toBeInTheDocument();
  });

  it('clears a mission selection through the close control', () => {
    render(<App />);

    const clipperButton = screen.getByRole('button', {
      name: 'Europa Clipper',
    });
    fireEvent.click(clipperButton);
    fireEvent.click(
      screen.getByRole('button', { name: 'Close mission details' }),
    );

    expect(clipperButton).toHaveAttribute('aria-pressed', 'false');
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Europa Clipper' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Close mission details' }),
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
