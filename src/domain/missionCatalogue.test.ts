import { describe, expect, it } from 'vitest';
import { missions } from '../data/missions';
import { adjacentMissionId, filterMissions } from './missionCatalogue';

const all = { query: '', region: 'all', status: 'all' } as const;
describe('mission catalogue filters and navigation', () => {
  it('matches words across name, agency and science without case or accents', () => {
    expect(
      filterMissions(missions, { ...all, query: 'nasa PARKER' }).map(
        (mission) => mission.id,
      ),
    ).toEqual(['parker-solar-probe']);
    const accented = filterMissions(missions, { ...all, query: 'héliosphère' });
    expect(accented.length).toBeGreaterThan(0);
    expect(filterMissions(missions, { ...all, query: 'heliosphere' })).toEqual(
      accented,
    );
  });
  it('never includes archives or uncertain statuses in the active filter', () => {
    const active = filterMissions(missions, { ...all, status: 'active' });
    expect(active.length).toBeGreaterThan(20);
    expect(
      active.every((mission) =>
        ['operating', 'cruise'].includes(mission.status),
      ),
    ).toBe(true);
    expect(active.some((mission) => mission.id === 'maven')).toBe(false);
  });
  it('combines filters and handles no results', () => {
    const mars = filterMissions(missions, {
      query: '',
      region: 'mars',
      status: 'operating',
    });
    expect(mars.some((mission) => mission.id === 'curiosity')).toBe(true);
    expect(
      mars.every(
        (mission) =>
          mission.status === 'operating' && mission.region === 'mars',
      ),
    ).toBe(true);
    expect(
      filterMissions(missions, { ...all, query: 'no-such-spacecraft' }),
    ).toEqual([]);
  });
  it('wraps navigation within the filtered list and handles empty or single results', () => {
    const subset = missions.slice(0, 3);
    expect(adjacentMissionId(subset, subset[0].id, -1)).toBe(subset[2].id);
    expect(adjacentMissionId(subset, subset[2].id, 1)).toBe(subset[0].id);
    expect(adjacentMissionId(subset, 'missing', 1)).toBe(subset[0].id);
    expect(adjacentMissionId([subset[0]], subset[0].id, -1)).toBe(subset[0].id);
    expect(adjacentMissionId([], 'missing', 1)).toBeNull();
  });
});
