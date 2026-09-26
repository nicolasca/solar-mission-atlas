import { describe, expect, it } from 'vitest';
import {
  formatDistance,
  formatLightTime,
  formatMissionDate,
} from './missionFormatting';

describe('mission physical-value formatting', () => {
  it('preserves year, month and day precision without inventing an arrival day', () => {
    expect(formatMissionDate('2031')).toBe('2031');
    expect(formatMissionDate('2031-07')).toBe('July 2031');
    expect(formatMissionDate('2026-11-21')).toBe('21 November 2026');
    expect(formatMissionDate('2026-09-26T00:00:00')).toBe('26 September 2026');
  });
  it('keeps lunar and interstellar distances readable with explicit units', () => {
    expect(formatDistance(384400)).toBe('384,400 km');
    expect(formatDistance(149597870.7)).toBe('149.6 M km');
    expect(formatDistance(25744930000)).toBe('25.74 bn km');
  });
  it('uses seconds for the Moon and correctly carries rounded hour boundaries', () => {
    expect(formatLightTime(1.28 / 60)).toBe('1.28 s');
    expect(formatLightTime(8.32)).toBe('8.32 min');
    expect(formatLightTime(1431.26)).toBe('23 h 51 min');
    expect(formatLightTime(119.9)).toBe('2 h 0 min');
  });
});
