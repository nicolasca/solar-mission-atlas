/**
 * Refresh the checked-in, static JPL Horizons extract. No runtime API is needed.
 * Run: node scripts/fetch-ephemerides.mjs
 * Requests are deliberately sequential, as required by the JPL API policy.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const EPOCH = '2026-09-26T00:00:00';
const API = 'https://ssd.jpl.nasa.gov/api/horizons.api';
const targets = [
  ['mercury', 199, '2010-01-01', '2034-01-01', '1 d'],
  ['venus', 299, '2010-01-01', '2034-01-01', '1 d'],
  ['earth', 399, '2010-01-01', '2034-01-01', '1 d'],
  ['moon', 301],
  ['mars', 499, '2010-01-01', '2034-01-01', '1 d'],
  ['jupiter', 599, '2010-01-01', '2034-01-01', '5 d'],
  ['saturn', 699, '2010-01-01', '2034-01-01', '5 d'],
  ['uranus', 799, '2010-01-01', '2034-01-01', '5 d'],
  ['neptune', 899, '2010-01-01', '2034-01-01', '5 d'],
  ['parker-solar-probe', -96, '2026-06-17', '2027-01-01', '6 h'],
  ['solar-orbiter', -144, '2025-01-01', '2027-01-01', '1 d'],
  ['juice', -28, '2023-04-15', '2031-07-20', '1 d'],
  ['europa-clipper', -159, '2024-10-15', '2030-05-01', '1 d'],
  ['bepicolombo', -121, '2018-10-21', '2026-12-01', '1 d'],
  ['lucy', -49, '2021-10-17', '2033-04-01', '1 d'],
  // The public Psyche kernel ends before its planned August 2029 arrival.
  ['psyche', -255, '2023-10-14', '2029-02-10', '1 d'],
  ['osiris-apex', -64, '2023-09-25', '2029-07-01', '1 d'],
  // These windows stop within the public kernels' coverage, not at arrival.
  ['hayabusa2', -37, '2020-12-07', '2026-11-26', '1 d'],
  ['hera', -91, '2024-10-08', '2026-11-04', '1 d'],
  ['new-horizons', -98, '2010-01-01', '2028-01-01', '30 d'],
  ['voyager-1', -31, '2010-01-01', '2028-01-01', '30 d'],
  ['voyager-2', -32, '2010-01-01', '2028-01-01', '30 d'],
  ['juno', -61],
  ['mars-express', -41],
  ['mars-odyssey', -53],
  ['hope', -62],
  ['mars-reconnaissance-orbiter', -74],
  ['trace-gas-orbiter', -143],
  ['maven', -202],
  ['tianwen-1', -9901491],
  ['curiosity', -76],
  ['perseverance', -168],
  ['lro', -85],
  ['chandrayaan-2', -152],
  ['danuri', -155],
  ['capstone', -1176],
  ['soho', -21],
  ['stereo-a', -234],
  ['ace', -92],
  ['wind', -8],
  ['dscovr', -78],
  ['aditya-l1', -156],
  ['imap', -43],
  ['swfo-l1', -231],
  ['escapade-blue', -9, '2025-11-14', '2026-11-15', '1 d'],
  ['escapade-gold', -10, '2025-11-14', '2026-11-17', '1 d'],
  // A trailing semicolon selects the small body rather than a major-body ID.
  ['target-psyche', '16;', '2023-10-14', '2029-09-01', '1 d'],
  ['target-didymos', '65803;', '2024-10-08', '2026-12-01', '1 d'],
  ['target-apophis', '99942;', '2023-09-25', '2029-07-01', '1 d'],
  ['target-1998-ky26', '1998 KY26;', '2020-12-07', '2031-08-01', '1 d'],
  ['target-eurybates', '3548;', '2021-10-17', '2033-04-01', '1 d'],
];

function queryUrl(horizonsId, times) {
  const url = new URL(API);
  const params = {
    COMMAND: horizonsId,
    OBJ_DATA: 'YES',
    MAKE_EPHEM: 'YES',
    EPHEM_TYPE: 'VECTORS',
    CENTER: '500@10',
    REF_PLANE: 'ECLIPTIC',
    REF_SYSTEM: 'ICRF',
    TIME_TYPE: 'TDB',
    OUT_UNITS: 'AU-D',
    VEC_TABLE: '1',
    VEC_CORR: 'NONE',
    CSV_FORMAT: 'YES',
    CAL_TYPE: 'GREGORIAN',
    ...times,
  };
  url.searchParams.set('format', 'json');
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, `'${value}'`);
  }
  return url.toString();
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
function calendarEpoch(calendar) {
  const match = calendar.match(
    /A\.D\. (\d{4})-([A-Za-z]{3})-(\d{2}) (\d{2}:\d{2}:\d{2})/,
  );
  if (!match || !months.includes(match[2]))
    throw new Error(`Unexpected calendar: ${calendar}`);
  return `${match[1]}-${String(months.indexOf(match[2]) + 1).padStart(2, '0')}-${match[3]}T${match[4]}`;
}

function parsePoints(result) {
  const table = result.split('$$SOE')[1]?.split('$$EOE')[0];
  if (!table) return [];
  return table
    .trim()
    .split('\n')
    .map((row) => {
      const columns = row.split(',').map((column) => column.trim());
      const positionAu = columns.slice(2, 5).map(Number);
      const jdTdb = Number(columns[0]);
      if (
        positionAu.length !== 3 ||
        !positionAu.every(Number.isFinite) ||
        !Number.isFinite(jdTdb)
      ) {
        throw new Error(
          'Invalid Horizons position row. Existing dataset was not replaced.',
        );
      }
      return { epoch: calendarEpoch(columns[1]), jdTdb, positionAu };
    });
}

async function query(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(60_000) });
  if (!response.ok)
    throw new Error(
      `Horizons HTTP ${response.status}; existing dataset preserved.`,
    );
  const json = await response.json();
  if (!json.result)
    throw new Error(
      `Invalid Horizons response: ${json.error ?? 'missing result'}`,
    );
  return {
    result: json.result,
    error: json.error,
    points: parsePoints(json.result),
  };
}

function failureReason(response) {
  return (
    response.error ??
    (response.result
      .split('\n')
      .filter((line) =>
        /No ephemeris|Cannot|not available|No matches|disallowed|insufficient|error/i.test(
          line,
        ),
      )
      .join(' ')
      .trim() ||
      'No vector returned for this interval.')
  );
}

const outputUrl = new URL('../src/data/ephemerides.json', import.meta.url);
let previousEntries = {};
try {
  const previous = JSON.parse(await readFile(outputUrl, 'utf8'));
  // An extract from a different reference epoch cannot supply a fallback.
  if (previous.epoch === EPOCH) previousEntries = previous.entries ?? {};
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
const entries = {};
const fetchedAt = new Date().toISOString();
for (const [id, horizonsId, start, end, step] of targets) {
  const snapshotSourceUrl = queryUrl(horizonsId, {
    TLIST: EPOCH.replace('T', ' '),
  });
  const response = await query(snapshotSourceUrl);
  const snapshot = response.points[0] ?? null;
  const warnings =
    horizonsId < 0
      ? [
          'JPL ephemerides may combine reconstructed and predicted navigation; coordinates do not confirm that a mission is active.',
        ]
      : [];
  if (!snapshot)
    warnings.push(
      `Position unavailable at the reference epoch: ${failureReason(response)}`,
    );
  if (!snapshot && previousEntries[id]?.snapshot) {
    entries[id] = {
      ...previousEntries[id],
      warnings: [...previousEntries[id].warnings, ...warnings],
    };
    console.warn(`${id}: previous entry preserved; new snapshot unavailable`);
    continue;
  }
  let trajectory = [];
  let sourceUrl = snapshotSourceUrl;
  if (start) {
    sourceUrl = queryUrl(horizonsId, {
      START_TIME: start,
      STOP_TIME: end,
      STEP_SIZE: step,
    });
    const routeResponse = await query(sourceUrl);
    trajectory = routeResponse.points;
    if (trajectory.length === 0) {
      warnings.push(
        `Trajectory unavailable in the requested window: ${failureReason(routeResponse)}`,
      );
      if (previousEntries[id]?.trajectory.length) {
        // Preserve the last known good extract instead of deleting a route.
        entries[id] = {
          ...previousEntries[id],
          warnings: [...previousEntries[id].warnings, ...warnings],
        };
        console.warn(
          `${id}: previous entry preserved; requested route unavailable`,
        );
        continue;
      }
    }
    if (
      trajectory.length > 0 &&
      snapshot &&
      snapshot.epoch >= trajectory[0].epoch &&
      snapshot.epoch <= trajectory.at(-1).epoch
    ) {
      trajectory = trajectory.filter((point) => point.epoch !== snapshot.epoch);
      trajectory.push(snapshot);
      trajectory.sort((left, right) => left.jdTdb - right.jdTdb);
    }
    warnings.push(
      'Points after the reference epoch are predictions. Sampled paths do not resolve close flybys, maneuvers or local orbits.',
    );
  }
  const targetName =
    response.result.match(/Target body name:\s*(.*?)\s+\{source:/)?.[1] ?? id;
  const kernelSource =
    response.result.match(/Target body name:.*?\{source:\s*([^}]+)\}/)?.[1] ??
    null;
  entries[id] = {
    horizonsId,
    targetName,
    kernelSource,
    snapshot,
    trajectory,
    sourceUrl,
    snapshotSourceUrl,
    fetchedAt,
    sampledStart: trajectory[0]?.epoch ?? null,
    sampledEnd: trajectory.at(-1)?.epoch ?? null,
    sampleStep: step ?? null,
    warnings,
    ...(id === 'psyche'
      ? {
          qualityNote:
            'The published Psyche trajectory has an apparent discontinuity around 1 December 2026. Interpolated motion and distances near that date may be unreliable.',
          qualitySourceUrl: queryUrl(horizonsId, {
            START_TIME: '2026-11-30',
            STOP_TIME: '2026-12-03',
            STEP_SIZE: '1 h',
          }),
        }
      : {}),
  };
  console.log(
    `${id}: snapshot ${snapshot ? 'ok' : 'unavailable'}, ${trajectory.length} route points${snapshot ? '' : ` (${failureReason(response)})`}`,
  );
}

const output = {
  epoch: EPOCH,
  timeScale: 'TDB',
  frame: 'Ecliptic of J2000.0',
  center: 'Sun (500@10)',
  units: 'AU',
  corrections: 'NONE (geometric)',
  fetchedAt,
  source: 'NASA/JPL Horizons',
  documentationUrl: 'https://ssd-api.jpl.nasa.gov/doc/horizons.html',
  entries,
};
await mkdir(new URL('../src/data/', import.meta.url), { recursive: true });
await writeFile(outputUrl, `${JSON.stringify(output)}\n`);
