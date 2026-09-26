import type { Mission, MissionRegion, MissionStatus } from './mission';

export interface MissionFilters {
  readonly query: string;
  readonly status: MissionStatus | 'active' | 'all';
  readonly region: MissionRegion | 'all';
}

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function filterMissions(
  missions: readonly Mission[],
  filters: MissionFilters,
): readonly Mission[] {
  const terms = normalize(filters.query.trim()).split(/\s+/).filter(Boolean);
  return missions.filter((mission) => {
    const statusMatches =
      filters.status === 'all' ||
      (filters.status === 'active'
        ? mission.status === 'operating' || mission.status === 'cruise'
        : mission.status === filters.status);
    const text = normalize(
      [
        mission.name,
        ...mission.agencies,
        mission.primaryTarget,
        mission.description,
        mission.science,
        ...mission.instruments,
      ].join(' '),
    );
    return (
      statusMatches &&
      (filters.region === 'all' || mission.region === filters.region) &&
      terms.every((term) => text.includes(term))
    );
  });
}

export function adjacentMissionId(
  missions: readonly Mission[],
  selectedId: string,
  direction: -1 | 1,
): string | null {
  if (!missions.length) return null;
  const index = missions.findIndex((mission) => mission.id === selectedId);
  if (index < 0) return missions[0].id;
  return missions[(index + direction + missions.length) % missions.length].id;
}
