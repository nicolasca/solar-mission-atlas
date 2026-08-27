import type { Planet, PlanetId } from '../domain/celestialBody';

interface PlanetNavigationProps {
  readonly planets: readonly Planet[];
  readonly selectedPlanetId: PlanetId | null;
  readonly onSelectPlanet: (planetId: PlanetId) => void;
}

export function PlanetNavigation({
  planets,
  selectedPlanetId,
  onSelectPlanet,
}: PlanetNavigationProps) {
  return (
    <nav className="planet-navigation" aria-label="Explore planets">
      <p className="panel-label">Planets</p>
      <ul>
        {planets.map((planet) => {
          const isSelected = planet.id === selectedPlanetId;

          return (
            <li key={planet.id}>
              <button
                type="button"
                aria-pressed={isSelected}
                className={isSelected ? 'is-selected' : undefined}
                onClick={() => onSelectPlanet(planet.id)}
              >
                {planet.name}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
