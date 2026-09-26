# Positions and trajectories

`src/data/ephemerides.json` is a checked-in extract from
[NASA/JPL Horizons](https://ssd.jpl.nasa.gov/horizons/). The static application
uses this local file; visiting the atlas does not call the JPL API.

## Physical reference

- Reference snapshot: **26 September 2026, 00:00:00 TDB**, not live tracking.
- Origin: Sun center (`500@10`). Reference plane: J2000.0 ecliptic, ICRF axes.
- Geometric XYZ positions in astronomical units; no light-time or aberration
  correction (`VEC_CORR=NONE`). TDB is not UTC, so epochs have no `Z` suffix.
- Exact conversion: 1 AU = 149,597,870.7 km. Approximate one-way signal time is
  simultaneous Earth–spacecraft distance / 299,792.458 km/s. This does not solve
  the changing geometry while a radio signal travels.

Scientific distances are computed from physical coordinates, before display
scaling. Positions at an intermediate date are linearly interpolated between
bracketing samples in TDB; they are never extrapolated beyond available data.
The exact reference snapshot is inserted into every route that spans its date.
An object with only a snapshot does not acquire an invented history.

## Coverage and interpretation

The eight planets cover 2010–2034, sampled daily for Mercury, Venus, Earth and
Mars, and every five days for the outer planets. Cruise paths and their asteroid
targets use daily samples. Parker Solar Probe uses six-hour samples; the three
outer-system probes use 30-day samples. Most local orbiters and surface missions
have a snapshot only. These intervals support navigation through the atlas,
not precision orbit determination or detailed flyby geometry.

Horizons can combine reconstructed trajectories and navigation predictions.
Future samples are predictions; earlier samples may also come from a historical
prediction. Coordinates alone do not establish whether a mission is active.
Operational status belongs to the independently sourced mission catalogue.

The extract extends JUICE to July 2031, Europa Clipper to May 2030, BepiColombo
to December 2026, Lucy to April 2033 and OSIRIS-APEX to July 2029. Coverage is
still partial when public spacecraft kernels end before an expected encounter:

| Spacecraft | Last sample in the extract (TDB) | Limitation |
| --- | --- | --- |
| Psyche | 10 February 2029 | Before the planned August 2029 arrival |
| Hayabusa2 | 26 November 2026 | Before the planned 1998 KY26 encounter |
| Hera | 4 November 2026 | Public kernel stops in November 2026 |
| ESCAPADE Blue | 15 November 2026 | Does not cover the Mars transfer |
| ESCAPADE Gold | 17 November 2026 | Does not cover the Mars transfer |

At retrieval, Horizons also has no reference-date snapshot for MAVEN, Tianwen-1,
Perseverance/Mars2020 or CAPSTONE. Their queried public coverage ends on
1 March 2026, 10 February 2021, 19 February 2026 and 14 August 2026 respectively.
These are ephemeris limits, **not mission end dates**.

The published Psyche trajectory has an apparent discontinuity around
1 December 2026, also present in an hourly Horizons query. Interpolated motion
and distances near that date may be unreliable. Its entry records this warning
and the exact diagnostic query URL; reassess the warning when refreshing data.

## Frames and display scale

The global view is Sun-centered. Planets and spacecraft use the same selected
epoch; a historical path should not be read as passing planets frozen at today's
positions. The global radial compression makes the full system navigable and
is not a physical distance scale.

Earth-centered and destination-centered views subtract the center's position
**at each sample's own epoch**, before applying one uniform local display scale.
The axes remain parallel to the J2000 ecliptic axes; this is a translating frame,
not an Earth–destination rotating frame. Local views show a bounded time window.
Changing the origin can clarify a departure or approach, but does not remove
real multi-revolution cruise geometry. Daily samples cannot resolve a close
flyby, a landing or an orbit around a small body. Body and spacecraft models
remain enlarged for visibility.

Asteroid centers are queried explicitly: Psyche (`16;`), Didymos (`65803;`),
Apophis (`99942;`), 1998 KY26 (`1998 KY26;`) and Eurybates (`3548;`). The semicolon
selects the small-body catalogue. Eurybates represents Lucy's first Trojan
encounter, not every later target in its extended tour.

## Refresh and audit

Run `node scripts/fetch-ephemerides.mjs` with network access. Queries are
sequential under the [JPL API usage policy](https://ssd-api.jpl.nasa.gov/doc/),
with no additional dependency. Each entry retains its Horizons command, returned
name, kernel source when available, exact query URLs, sampled interval, step,
retrieval timestamp and warnings. The [API parameters](https://ssd-api.jpl.nasa.gov/doc/horizons.html)
and [Horizons manual](https://ssd.jpl.nasa.gov/horizons/manual.html) define the
reference conventions.

The generator validates every vector and writes the file only after completing
all requests. HTTP or malformed-response errors preserve the previous file. If
a requested trajectory has no coverage, the previous entry is kept with a
warning when one exists; otherwise the absence remains explicit. No substitute
orbit is generated. JSON is compact because it is generated numerical data;
the acquisition script and this document are the reviewable specification.
