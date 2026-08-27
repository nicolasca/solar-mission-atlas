import { useEffect, useState } from 'react';
import { MissionInfoPanel } from './components/MissionInfoPanel';
import { MissionNavigation } from './components/MissionNavigation';
import { SolarSystemCanvas } from './components/SolarSystemCanvas';
import { PlanetInfoPanel } from './components/PlanetInfoPanel';
import { PlanetNavigation } from './components/PlanetNavigation';
import { planets } from './data/celestialBodies';
import { missions } from './data/missions';
import type { PlanetId } from './domain/celestialBody';
import type { MissionId } from './domain/mission';

type SelectedEntity =
  | { readonly kind: 'planet'; readonly id: PlanetId }
  | { readonly kind: 'mission'; readonly id: MissionId }
  | null;

function App() {
  const [selectedEntity, setSelectedEntity] = useState<SelectedEntity>(null);
  const selectedPlanetId =
    selectedEntity?.kind === 'planet' ? selectedEntity.id : null;
  const selectedMissionId =
    selectedEntity?.kind === 'mission' ? selectedEntity.id : null;
  const selectedPlanet =
    planets.find((planet) => planet.id === selectedPlanetId) ?? null;
  const selectedMission =
    missions.find((mission) => mission.id === selectedMissionId) ?? null;

  const handleSelectPlanet = (planetId: PlanetId) => {
    setSelectedEntity((currentSelection) =>
      currentSelection?.kind === 'planet' && currentSelection.id === planetId
        ? null
        : { kind: 'planet', id: planetId },
    );
  };

  const handleSelectMission = (missionId: MissionId) => {
    setSelectedEntity((currentSelection) =>
      currentSelection?.kind === 'mission' && currentSelection.id === missionId
        ? null
        : { kind: 'mission', id: missionId },
    );
  };

  const clearSelection = () => setSelectedEntity(null);

  useEffect(() => {
    if (!selectedEntity) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedEntity(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEntity]);

  return (
    <main className="app">
      <header className="app-header">
        <p className="app-kicker">Visual Solar System</p>
        <h1>Solar Mission Atlas</h1>
        <p className="control-hint">
          Click a planet · Drag to orbit · Scroll to zoom · Right-drag to pan
        </p>
      </header>

      <div className="entity-navigation">
        <PlanetNavigation
          planets={planets}
          selectedPlanetId={selectedPlanetId}
          onSelectPlanet={handleSelectPlanet}
        />

        <MissionNavigation
          missions={missions}
          selectedMissionId={selectedMissionId}
          onSelectMission={handleSelectMission}
        />
      </div>

      <SolarSystemCanvas
        selectedPlanetId={selectedPlanetId}
        selectedMissionId={selectedMissionId}
        onSelectPlanet={handleSelectPlanet}
      />

      {selectedPlanet ? (
        <PlanetInfoPanel planet={selectedPlanet} onClose={clearSelection} />
      ) : null}

      {selectedMission ? (
        <MissionInfoPanel mission={selectedMission} onClose={clearSelection} />
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
