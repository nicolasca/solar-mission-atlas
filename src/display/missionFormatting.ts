const decimal = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 });
const integer = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 });
const fullDate = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});
const monthDate = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'long',
  timeZone: 'UTC',
});

export function formatMissionDate(value: string): string {
  const calendarDate = value.slice(0, 10);
  if (/^\d{4}$/.test(calendarDate)) return calendarDate;
  const monthOnly = /^\d{4}-\d{2}$/.test(calendarDate);
  const date = new Date(`${calendarDate}${monthOnly ? '-01' : ''}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return (monthOnly ? monthDate : fullDate).format(date);
}

export function formatDistance(km: number): string {
  if (km >= 1e9) return `${decimal.format(km / 1e9)} bn km`;
  if (km >= 1e6) return `${decimal.format(km / 1e6)} M km`;
  return `${integer.format(km)} km`;
}

export function formatLightTime(minutes: number): string {
  if (minutes < 1) return `${decimal.format(minutes * 60)} s`;
  if (minutes < 60) return `${decimal.format(minutes)} min`;
  const totalMinutes = Math.round(minutes);
  return `${Math.floor(totalMinutes / 60)} h ${totalMinutes % 60} min`;
}
