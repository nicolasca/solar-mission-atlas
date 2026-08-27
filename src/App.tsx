import { useEffect, useState } from 'react';
import { SolarSystemCanvas } from './components/SolarSystemCanvas';
import { PlanetInfoPanel } from './components/PlanetInfoPanel';
import { PlanetNavigation } from './components/PlanetNavigation';
import { planets } from './data/celestialBodies';
import type { PlanetId } from './domain/celestialBody';

function App() {
  const [selectedPlanetId, setSelectedPlanetId] = useState<PlanetId | null>(
    null,
  );
  const selectedPlanet =
    planets.find((planet) => planet.id === selectedPlanetId) ?? null;

  useEffect(() => {
    if (!selectedPlanetId) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedPlanetId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPlanetId]);

  return (
    <main className="app">
      <header className="app-header">
        <p className="app-kicker">Visual Solar System</p>
        <h1>Solar Mission Atlas</h1>
        <p className="control-hint">
          Click a planet · Drag to orbit · Scroll to zoom · Right-drag to pan
        </p>
      </header>

      <PlanetNavigation
        planets={planets}
        selectedPlanetId={selectedPlanetId}
        onSelectPlanet={setSelectedPlanetId}
      />

      <SolarSystemCanvas
        selectedPlanetId={selectedPlanetId}
        onSelectPlanet={setSelectedPlanetId}
      />

      {selectedPlanet ? (
        <PlanetInfoPanel
          planet={selectedPlanet}
          onReset={() => setSelectedPlanetId(null)}
        />
      ) : null}

      <aside className="scale-note">
        <strong>Display scale</strong>
        <span>
          Planetary radii are exaggerated and orbital distances are compressed
          for readability. This overview is not uniformly to scale.
        </span>
      </aside>
    </main>
  );
}

export default App;
