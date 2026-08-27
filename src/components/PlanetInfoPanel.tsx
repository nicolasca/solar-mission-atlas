import type { Planet } from '../domain/celestialBody';

interface PlanetInfoPanelProps {
  readonly planet: Planet;
  readonly onReset: () => void;
}

const numberFormatter = new Intl.NumberFormat('en-US');

function formatOrbitalPeriod(earthYears: number): string {
  if (earthYears < 2) {
    return `${numberFormatter.format(Math.round(earthYears * 365.25))} Earth days`;
  }

  return `${numberFormatter.format(earthYears)} Earth years`;
}

export function PlanetInfoPanel({ planet, onReset }: PlanetInfoPanelProps) {
  return (
    <aside
      className="planet-info"
      aria-labelledby="planet-info-title"
      aria-live="polite"
    >
      <button className="reset-view" type="button" onClick={onReset}>
        <span aria-hidden="true">←</span> Global view
      </button>

      <p className="planet-category">{planet.category}</p>
      <h2 id="planet-info-title">{planet.name}</h2>
      <p className="planet-description">{planet.description}</p>

      <dl className="planet-facts">
        <div>
          <dt>Physical mean radius</dt>
          <dd>{numberFormatter.format(planet.meanRadiusKm)} km</dd>
        </div>
        <div>
          <dt>Mean distance from Sun</dt>
          <dd>{planet.meanOrbitalDistanceAu} AU</dd>
        </div>
        <div>
          <dt>Orbital period</dt>
          <dd>{formatOrbitalPeriod(planet.orbitalPeriodEarthYears)}</dd>
        </div>
      </dl>

      <p className="scientific-note">
        <strong>Scientific values</strong>
        Radius, distance, and period are physical mean values. The 3D body size
        and position use the transformed display scale described below.
      </p>
    </aside>
  );
}
