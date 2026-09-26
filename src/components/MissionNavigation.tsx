import { useEffect, useRef } from 'react';
import type { Mission, MissionId } from '../domain/mission';
import { missionRegionLabels, missionStatusLabels } from '../domain/mission';
import type { MissionFilters } from '../domain/missionCatalogue';

interface MissionNavigationProps {
  readonly missions: readonly Mission[];
  readonly totalCount: number;
  readonly selectedMissionId: MissionId | null;
  readonly filters: MissionFilters;
  readonly onFilterChange: (filters: MissionFilters) => void;
  readonly onSelectMission: (missionId: MissionId) => void;
}

export function MissionNavigation({
  missions,
  totalCount,
  selectedMissionId,
  filters,
  onFilterChange,
  onSelectMission,
}: MissionNavigationProps) {
  const listRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const list = listRef.current;
    const selected = list?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!list || !selected) return;
    const top = selected.offsetTop;
    const bottom = top + selected.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight)
      list.scrollTop = bottom - list.clientHeight;
  }, [selectedMissionId, missions]);

  return (
    <nav className="mission-navigation" aria-label="Browse missions">
      <div className="catalogue-heading">
        <h2>Missions</h2>
        <span>
          {missions.length}
          <small> / {totalCount}</small>
        </span>
      </div>
      <label className="search-field">
        <span className="sr-only">Search missions</span>
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          aria-label="Search missions"
          placeholder="Spacecraft, agency, science…"
          value={filters.query}
          onChange={(event) =>
            onFilterChange({ ...filters, query: event.target.value })
          }
        />
      </label>
      <div className="catalogue-filters">
        <label>
          <span>Mission status</span>
          <select
            value={filters.status}
            onChange={(event) =>
              onFilterChange({
                ...filters,
                status: event.target.value as MissionFilters['status'],
              })
            }
          >
            <option value="all">All missions</option>
            <option value="active">Operating or in transit</option>
            {Object.entries(missionStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Scientific destination</span>
          <select
            value={filters.region}
            onChange={(event) =>
              onFilterChange({
                ...filters,
                region: event.target.value as MissionFilters['region'],
              })
            }
          >
            <option value="all">All Solar System regions</option>
            {Object.entries(missionRegionLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="catalogue-results" aria-live="polite">
        <span>
          {missions.length} mission{missions.length === 1 ? '' : 's'}
        </span>
      </div>
      <ul ref={listRef} className="mission-list">
        {missions.map((mission) => (
          <li key={mission.id}>
            <button
              type="button"
              aria-label={mission.name}
              aria-pressed={mission.id === selectedMissionId}
              className={
                mission.id === selectedMissionId ? 'is-selected' : undefined
              }
              onClick={() => onSelectMission(mission.id)}
            >
              <span
                className={`status-dot status-dot--${mission.status}`}
                aria-hidden="true"
              />
              <span className="mission-list-text">
                <strong>{mission.name}</strong>
                <span>
                  {mission.agencies[0]} · {missionRegionLabels[mission.region]}
                </span>
                <small>{missionStatusLabels[mission.status]}</small>
              </span>
              <span className="mission-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          </li>
        ))}
      </ul>
      {!missions.length && (
        <div className="empty-results">
          <p>No missions match these filters.</p>
          <button
            type="button"
            onClick={() =>
              onFilterChange({ query: '', region: 'all', status: 'all' })
            }
          >
            Clear filters
          </button>
        </div>
      )}
    </nav>
  );
}
