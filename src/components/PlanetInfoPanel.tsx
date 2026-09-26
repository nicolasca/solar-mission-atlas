import type { Planet } from '../domain/celestialBody';

interface PlanetInfoPanelProps {
  readonly planet: Planet;
  readonly onClose: () => void;
}

const numberFormatter = new Intl.NumberFormat('en-GB');
const sourceLabels: Record<string, string> = {
  'https://science.nasa.gov/resource/solar-system-sizes/':
    'Planet sizes — NASA',
  'https://science.nasa.gov/learn/basics-of-space-flight/chapter1-2/':
    'Distances and orbits — NASA',
  'https://science.nasa.gov/solar-system/planets/':
    'Solar System planets — NASA',
};

function formatOrbitalPeriod(earthYears: number): string {
  if (earthYears < 2) {
    return `${numberFormatter.format(Math.round(earthYears * 365.25))} Earth days`;
  }

  return `${numberFormatter.format(earthYears)} Earth years`;
}

export function PlanetInfoPanel({ planet, onClose }: PlanetInfoPanelProps) {
  return (
    <aside
      className="planet-info detail-panel"
      aria-labelledby="planet-info-title"
      aria-live="polite"
    >
      <button
        className="close-panel"
        type="button"
        aria-label="Close planet details"
        onClick={onClose}
      >
        <span aria-hidden="true">×</span>
      </button>

      <p className="planet-category">{planet.category}</p>
      <h2 id="planet-info-title">{planet.name}</h2>
      <p className="planet-description">{planet.description}</p>

      <dl className="planet-facts">
        <div>
          <dt>Mean radius</dt>
          <dd>{numberFormatter.format(planet.meanRadiusKm)} km</dd>
        </div>
        <div>
          <dt>Mean distance from Sun</dt>
          <dd>{numberFormatter.format(planet.meanOrbitalDistanceAu)} AU</dd>
        </div>
        <div>
          <dt>Orbital period</dt>
          <dd>{formatOrbitalPeriod(planet.orbitalPeriodEarthYears)}</dd>
        </div>
      </dl>

      <p className="scientific-note">
        <strong>Physical values</strong>
        Radius, distance and period are mean values. The global map compresses
        distances and enlarges bodies for visibility. 1 AU is approximately
        149.6 million kilometres.
      </p>

      <section className="mission-sources">
        <h3>Data sources</h3>
        <ul>
          {planet.sourceUrls.map((url) => (
            <li key={url}>
              <a href={url} rel="noreferrer noopener" target="_blank">
                {sourceLabels[url] ?? 'Scientific source'} ↗
              </a>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
