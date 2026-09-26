import { useEffect, useMemo, useState } from 'react';
import { AtlasMethod } from './components/AtlasMethod';
import { MissionInfoPanel } from './components/MissionInfoPanel';
import { MissionNavigation } from './components/MissionNavigation';
import { SolarSystemCanvas } from './components/SolarSystemCanvas';
import { VisualAssetCredits } from './components/VisualAssetCredits';
import { PlanetInfoPanel } from './components/PlanetInfoPanel';
import { PlanetNavigation } from './components/PlanetNavigation';
import { planets } from './data/celestialBodies';
import { missions, CATALOGUE_REVIEW_DATE } from './data/missions';
import { ephemerisEpoch, getEphemeris, epochToJd } from './domain/ephemeris';
import { TrajectoryControls } from './components/TrajectoryControls';
import { createAtlasSceneModel } from './display/trajectoryDisplay';
import { isFrameAvailable, type TrajectoryFrame } from './domain/trajectory';
import {
  adjacentMissionId,
  filterMissions,
  type MissionFilters,
} from './domain/missionCatalogue';
import type { PlanetId } from './domain/celestialBody';
import type { MissionId } from './domain/mission';

type SelectedEntity =
  | { readonly kind: 'planet'; readonly id: PlanetId }
  | { readonly kind: 'mission'; readonly id: MissionId }
  | null;
function initialSelection(): SelectedEntity {
  const id = new URLSearchParams(window.location.hash.slice(1)).get('mission');
  return missions.some((mission) => mission.id === id) && id
    ? { kind: 'mission', id }
    : null;
}

function App() {
  const [selectedEntity, setSelectedEntity] =
    useState<SelectedEntity>(initialSelection);
  const [filters, setFilters] = useState<MissionFilters>({
    query: '',
    status: 'all',
    region: 'all',
  });
  const [showLabels, setShowLabels] = useState(false);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showMethod, setShowMethod] = useState(false);
  const [catalogueOpen, setCatalogueOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [focusRoute, setFocusRoute] = useState(true);
  const [wideView, setWideView] = useState(false);
  const [viewEpoch, setViewEpoch] = useState(ephemerisEpoch);
  const [frame, setFrame] = useState<TrajectoryFrame>('sun');
  const visibleMissions = useMemo(
    () => filterMissions(missions, filters),
    [filters],
  );
  const visibleMissionIds = useMemo(
    () => visibleMissions.map((mission) => mission.id),
    [visibleMissions],
  );
  const selectedPlanetId =
    selectedEntity?.kind === 'planet' ? selectedEntity.id : null;
  const selectedMissionId =
    selectedEntity?.kind === 'mission' ? selectedEntity.id : null;
  const selectedPlanet =
    planets.find((planet) => planet.id === selectedPlanetId) ?? null;
  const selectedMission =
    missions.find((mission) => mission.id === selectedMissionId) ?? null;
  const sceneModel = useMemo(
    () => createAtlasSceneModel(viewEpoch, selectedMissionId, frame),
    [viewEpoch, selectedMissionId, frame],
  );
  const resetTime = () => {
    setViewEpoch(ephemerisEpoch);
    setFrame('sun');
  };
  const changeEpoch = (epoch: string) => {
    setViewEpoch(epoch);
    if (
      selectedMissionId &&
      !isFrameAvailable(selectedMissionId, frame, epochToJd(epoch))
    )
      setFrame('sun');
  };
  const activeCount = missions.filter(
    (mission) => mission.status === 'operating' || mission.status === 'cruise',
  ).length;

  const handleSelectPlanet = (id: PlanetId) => {
    resetTime();
    setFocusRoute(false);
    setSelectedEntity((current) =>
      current?.kind === 'planet' && current.id === id
        ? null
        : { kind: 'planet', id },
    );
    setShowMethod(false);
    setCatalogueOpen(false);
  };
  const handleSelectMission = (id: MissionId) => {
    resetTime();
    setFocusRoute((getEphemeris(id)?.trajectory.length ?? 0) > 1);
    setResetKey((key) => key + 1);
    setSelectedEntity({ kind: 'mission', id });
    setShowMethod(false);
    setCatalogueOpen(false);
  };
  const clearSelection = () => {
    setSelectedEntity(null);
    resetTime();
  };
  const resetView = () => {
    setWideView(false);
    setFocusRoute(false);
    clearSelection();
    setShowMethod(false);
    setResetKey((key) => key + 1);
  };
  const navigateMission = (direction: -1 | 1) => {
    if (!selectedMission) return;
    const id = adjacentMissionId(
      visibleMissions,
      selectedMission.id,
      direction,
    );
    if (id) handleSelectMission(id);
  };
  const updateFilters = (next: MissionFilters) => {
    setFilters(next);
    if (
      selectedMissionId &&
      !filterMissions(missions, next).some(
        (mission) => mission.id === selectedMissionId,
      )
    )
      clearSelection();
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    url.hash = selectedMissionId
      ? new URLSearchParams({ mission: selectedMissionId }).toString()
      : '';
    window.history.replaceState(null, '', url);
  }, [selectedMissionId]);
  useEffect(() => {
    const onHashChange = () => {
      setSelectedEntity(initialSelection());
      setViewEpoch(ephemerisEpoch);
      setFrame('sun');
      setFocusRoute(true);
      setFilters({ query: '', status: 'all', region: 'all' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedEntity(null);
        setViewEpoch(ephemerisEpoch);
        setFrame('sun');
        setShowMethod(false);
        setCatalogueOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const hasDetail = Boolean(selectedEntity || showMethod);
  const hasTimeline = Boolean(
    selectedMission &&
    (getEphemeris(selectedMission.id)?.trajectory.length ?? 0) > 1,
  );
  return (
    <main
      className={`app ${hasDetail ? 'has-detail' : ''} ${catalogueOpen ? 'catalogue-open' : ''} ${hasTimeline ? 'has-timeline' : ''}`}
    >
      <header className="app-header">
        <div className="brand-mark" aria-hidden="true">
          ◎
        </div>
        <h1>Solar Mission Atlas</h1>
        <div className="header-summary">
          <strong>{activeCount}</strong>
          <span>
            operating or in-transit
            <br />
            missions documented
          </span>
        </div>
        <button
          className="method-toggle"
          type="button"
          onClick={() => {
            clearSelection();
            setShowMethod((value) => !value);
            setCatalogueOpen(false);
          }}
        >
          Sources & methods ↗
        </button>
      </header>
      <div className="atlas-workspace">
        <aside className="entity-navigation" aria-label="Mission catalogue">
          <MissionNavigation
            missions={visibleMissions}
            totalCount={missions.length}
            selectedMissionId={selectedMissionId}
            filters={filters}
            onFilterChange={updateFilters}
            onSelectMission={handleSelectMission}
          />
          <details className="planet-shortcuts">
            <summary>Planets</summary>
            <PlanetNavigation
              planets={planets}
              selectedPlanetId={selectedPlanetId}
              onSelectPlanet={handleSelectPlanet}
            />
          </details>
          <div className="catalogue-footer">
            Catalogue review · {CATALOGUE_REVIEW_DATE}
            <span>Dated status in each mission record</span>
          </div>
        </aside>
        <section className="atlas-stage" aria-label="Solar System view">
          <SolarSystemCanvas
            model={sceneModel}
            selectedPlanetId={selectedPlanetId}
            selectedMissionId={selectedMissionId}
            onSelectPlanet={handleSelectPlanet}
            onSelectMission={handleSelectMission}
            visibleMissionIds={visibleMissionIds}
            showLabels={showLabels}
            showRoutes={showRoutes}
            resetKey={resetKey}
            focusRoute={focusRoute}
            wideView={wideView}
          />
          <div className="scene-toolbar">
            <button
              type="button"
              className="catalogue-toggle"
              aria-expanded={catalogueOpen}
              onClick={() => {
                setCatalogueOpen((value) => !value);
                clearSelection();
                setShowMethod(false);
              }}
            >
              ☷ Missions ({visibleMissions.length})
            </button>
            <button type="button" onClick={resetView}>
              ◎ Overview
            </button>
            {selectedMission &&
              (getEphemeris(selectedMission.id)?.trajectory.length ?? 0) >
                1 && (
                <button
                  type="button"
                  onClick={() => setFocusRoute((value) => !value)}
                >
                  {focusRoute ? '⌖ Spacecraft' : '↝ Full path'}
                </button>
              )}
            {!selectedMission && (
              <button
                type="button"
                aria-pressed={wideView}
                onClick={() => {
                  clearSelection();
                  setWideView((value) => !value);
                  setResetKey((value) => value + 1);
                }}
              >
                {wideView ? 'Solar System' : 'Outer reaches'}
              </button>
            )}
            <label>
              <input
                type="checkbox"
                checked={showLabels}
                onChange={(event) => setShowLabels(event.target.checked)}
              />{' '}
              Labels
            </label>
            <label>
              <input
                type="checkbox"
                checked={showRoutes}
                onChange={(event) => setShowRoutes(event.target.checked)}
              />{' '}
              Trajectory
            </label>
          </div>
          {selectedMission && hasTimeline && (
            <TrajectoryControls
              mission={selectedMission}
              epoch={viewEpoch}
              frame={frame}
              onEpochChange={changeEpoch}
              onFrameChange={(next) => {
                setFrame(next);
                setFocusRoute(true);
                setResetKey((key) => key + 1);
              }}
            />
          )}
          <div className="map-date">
            <span className="live-dot" />
            {viewEpoch === ephemerisEpoch
              ? 'REFERENCE'
              : 'SELECTED DATE'} · {viewEpoch.slice(0, 10)} ·{' '}
            {viewEpoch.slice(11, 16)} TDB
            <small>Calculated positions</small>
          </div>
          <div className="map-bottom">
            <div className="map-legend">
              <span>
                <i className="status-dot status-dot--operating" />
                Operating
              </span>
              <span>
                <i className="status-dot status-dot--cruise" />
                In transit
              </span>
              <span>
                <i className="status-dot status-dot--analysis" />
                Data analysis
              </span>
              <span>
                <i className="status-dot status-dot--uncertain" /> Unconfirmed
              </span>
            </div>
            <p className="control-hint">
              Drag to rotate · Scroll to zoom · Right-drag to pan
            </p>
            <p className="scale-note">
              {frame === 'sun'
                ? 'Compressed distances · Exaggerated sizes · ◇ Science region only'
                : 'Uniform distance scale · Exaggerated sizes'}
            </p>
          </div>
        </section>
        {selectedPlanet && (
          <PlanetInfoPanel planet={selectedPlanet} onClose={clearSelection} />
        )}
        {selectedMission && (
          <MissionInfoPanel
            mission={selectedMission}
            epoch={viewEpoch}
            display={sceneModel.missions.find(
              (item) => item.id === selectedMission.id,
            )}
            onClose={clearSelection}
            onPrevious={() => navigateMission(-1)}
            onNext={() => navigateMission(1)}
            position={visibleMissionIds.indexOf(selectedMission.id) + 1}
            count={visibleMissions.length}
          />
        )}
        {showMethod && <AtlasMethod onClose={() => setShowMethod(false)} />}
      </div>
      <VisualAssetCredits />
    </main>
  );
}
export default App;
