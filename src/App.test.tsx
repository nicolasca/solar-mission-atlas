import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { missions } from './data/missions';
import type { AtlasSceneModel } from './display/trajectoryDisplay';
import { ephemerisEpoch, getMissionMetrics } from './domain/ephemeris';
import { formatDistance } from './display/missionFormatting';

vi.mock('./components/SolarSystemCanvas', () => ({
  SolarSystemCanvas: ({
    onSelectMission,
    resetKey,
    visibleMissionIds,
    model,
  }: {
    onSelectMission: (id: string) => void;
    resetKey: number;
    visibleMissionIds: string[];
    model: AtlasSceneModel;
  }) => (
    <div
      data-testid="scene"
      data-reset-key={resetKey}
      data-visible-count={visibleMissionIds.length}
      data-earth-position={model.bodies
        .find((body) => body.id === 'earth')
        ?.position.join(',')}
      data-frame-origin={model.origin?.id ?? 'sun'}
      data-juice-position={model.missions
        .find((mission) => mission.id === 'juice')
        ?.physicalPosition?.join(',')}
    >
      <button onClick={() => onSelectMission('juice')}>
        JUICE spacecraft in scene
      </button>
    </div>
  ),
}));
beforeEach(() => {
  window.history.replaceState(null, '', '/');
});
const selectMission = (name: string) =>
  fireEvent.click(
    within(
      screen.getByRole('navigation', { name: 'Browse missions' }),
    ).getByRole('button', { name }),
  );

describe('mission atlas', () => {
  it('exposes the full catalogue and meaningful filter controls', () => {
    render(<App />);
    const navigation = screen.getByRole('navigation', {
      name: 'Browse missions',
    });
    expect(within(navigation).getAllByRole('button')).toHaveLength(
      missions.length,
    );
    expect(screen.getByLabelText('Search missions')).toBeInTheDocument();
    expect(screen.getByTestId('scene')).toHaveAttribute(
      'data-visible-count',
      String(missions.length),
    );
  });
  it('shows sourced scientific details and distances when a mission is selected', () => {
    render(<App />);
    selectMission('Parker Solar Probe');
    const panel = screen.getByRole('complementary', {
      name: 'Parker Solar Probe',
    });
    expect(within(panel).getByText('12 August 2018')).toBeInTheDocument();
    expect(within(panel).getByText('Distance from Earth')).toBeInTheDocument();
    expect(
      within(panel).getByRole('heading', { name: 'Scientific findings' }),
    ).toBeInTheDocument();
    expect(
      within(panel).getByRole('link', { name: 'Original model & credits ↗' }),
    ).toHaveAttribute(
      'href',
      'https://science.nasa.gov/3d-resources/parker-solar-probe/',
    );
    expect(window.location.hash).toBe('#mission=parker-solar-probe');
    expect(
      within(panel).queryByText('Expected arrival'),
    ).not.toBeInTheDocument();
  });
  it('places the scientific arrival directly after launch, rather than the next gravity assist', () => {
    render(<App />);
    selectMission('JUICE');
    const panel = screen.getByRole('complementary', { name: 'JUICE' });
    const launchRow = within(panel).getByText('Launch').parentElement!;
    const arrivalRow =
      within(panel).getByText('Expected arrival').parentElement!;
    expect(launchRow.nextElementSibling).toBe(arrivalRow);
    expect(within(arrivalRow).getByText('July 2031')).toHaveAttribute(
      'datetime',
      '2031-07',
    );
    expect(within(arrivalRow).getByRole('link')).toHaveAttribute(
      'href',
      'https://www.esa.int/Science_Exploration/Space_Science/Juice/Juice_factsheet',
    );
    expect(
      within(arrivalRow).getByText('Jupiter · orbit insertion'),
    ).toBeInTheDocument();
  });

  it('synchronises the time slider, planets, spacecraft and physical distances', () => {
    render(<App />);
    selectMission('JUICE');
    const scene = screen.getByTestId('scene');
    const previousEarth = scene.getAttribute('data-earth-position');
    const previousProbe = scene.getAttribute('data-juice-position');
    fireEvent.change(screen.getByLabelText('Trajectory date'), {
      target: { value: '2027-01-01' },
    });
    expect(scene.getAttribute('data-earth-position')).not.toBe(previousEarth);
    expect(scene.getAttribute('data-juice-position')).not.toBe(previousProbe);
    const panel = screen.getByRole('complementary', { name: 'JUICE' });
    const distance = getMissionMetrics(
      'juice',
      '2027-01-01T00:00:00',
    )!.earthDistanceKm;
    expect(
      within(panel).getByText(formatDistance(distance)),
    ).toBeInTheDocument();
    expect(
      within(panel).getByText(/Interpolated within the sampled JPL ephemeris/),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Reference date' }));
    expect(screen.getByLabelText('Trajectory date')).toHaveValue(
      ephemerisEpoch.slice(0, 10),
    );
    expect(scene.getAttribute('data-earth-position')).toBe(previousEarth);
  });

  it('switches physical frames and resets time and frame when selecting another mission', () => {
    render(<App />);
    selectMission('JUICE');
    fireEvent.change(screen.getByLabelText('Trajectory reference frame'), {
      target: { value: 'earth' },
    });
    expect(screen.getByTestId('scene')).toHaveAttribute(
      'data-frame-origin',
      'earth',
    );
    fireEvent.change(screen.getByLabelText('Trajectory reference frame'), {
      target: { value: 'target' },
    });
    expect(screen.getByTestId('scene')).toHaveAttribute(
      'data-frame-origin',
      'jupiter',
    );
    fireEvent.change(screen.getByLabelText('Trajectory date'), {
      target: { value: '2027-01-01' },
    });
    selectMission('Psyche');
    expect(screen.getByTestId('scene')).toHaveAttribute(
      'data-frame-origin',
      'sun',
    );
    expect(screen.getByLabelText('Trajectory date')).toHaveValue(
      ephemerisEpoch.slice(0, 10),
    );
    expect(screen.getByText(/Partial coverage:/)).toBeInTheDocument();
  });
  it('connects direct scene clicks to the same mission panel', () => {
    render(<App />);
    fireEvent.click(
      screen.getByRole('button', { name: 'JUICE spacecraft in scene' }),
    );
    expect(
      screen.getByRole('heading', { name: 'JUICE', level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'JUICE' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });
  it('requests a new camera focus when reselecting the same probe and resets overview', () => {
    render(<App />);
    selectMission('JUICE');
    const key = Number(
      screen.getByTestId('scene').getAttribute('data-reset-key'),
    );
    selectMission('JUICE');
    expect(screen.getByTestId('scene')).toHaveAttribute(
      'data-reset-key',
      String(key + 1),
    );
    fireEvent.click(screen.getByRole('button', { name: /Overview/ }));
    expect(
      screen.queryByRole('heading', { name: 'JUICE', level: 2 }),
    ).not.toBeInTheDocument();
    expect(window.location.hash).toBe('');
  });
  it('filters both list and scene, clearing a selected mission hidden by the filter', () => {
    render(<App />);
    selectMission('JUICE');
    fireEvent.change(screen.getByLabelText('Search missions'), {
      target: { value: 'parker' },
    });
    expect(screen.getByTestId('scene')).toHaveAttribute(
      'data-visible-count',
      '1',
    );
    expect(
      screen.queryByRole('heading', { name: 'JUICE', level: 2 }),
    ).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search missions'), {
      target: { value: 'nonexistent' },
    });
    expect(
      screen.getByText('No missions match these filters.'),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(screen.getByTestId('scene')).toHaveAttribute(
      'data-visible-count',
      String(missions.length),
    );
  });
  it('navigates previous/next within filtered missions', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Search missions'), {
      target: { value: 'voyager' },
    });
    selectMission('Voyager 1');
    fireEvent.click(screen.getByRole('button', { name: 'Next mission' }));
    expect(
      screen.getByRole('heading', { name: 'Voyager 2', level: 2 }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Previous mission' }));
    expect(
      screen.getByRole('heading', { name: 'Voyager 1', level: 2 }),
    ).toBeInTheDocument();
  });
  it('does not show a fabricated distance for an archival mission', () => {
    render(<App />);
    selectMission(missions.find((mission) => mission.id === 'maven')!.name);
    const panel = screen.getByRole('complementary', {
      name: missions.find((mission) => mission.id === 'maven')!.name,
    });
    expect(
      within(panel).queryByText('Distance from Earth'),
    ).not.toBeInTheDocument();
    expect(
      within(panel).getByText(/Mission complete: the map/),
    ).toBeInTheDocument();
  });
  it('supports deep links and Escape dismissal', () => {
    window.history.replaceState(null, '', '/#mission=europa-clipper');
    render(<App />);
    expect(
      screen.getByRole('heading', { name: 'Europa Clipper', level: 2 }),
    ).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(
      screen.queryByRole('heading', { name: 'Europa Clipper', level: 2 }),
    ).not.toBeInTheDocument();
  });
  it('opens an explicit method and data limits panel', () => {
    render(<App />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Sources & methods ↗' }),
    );
    expect(
      screen.getByRole('heading', { name: 'Sources and methods' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'NASA/JPL Horizons' }),
    ).toHaveAttribute('href', 'https://ssd.jpl.nasa.gov/horizons/');
  });
});
