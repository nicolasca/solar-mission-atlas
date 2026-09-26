# Solar Mission Atlas

A 3D atlas of robotic Solar System missions, with scientific objectives,
instruments, findings and primary sources. Built with React, strict TypeScript,
Three.js and React Three Fiber as both a static application and a learning project.

## Features and scope

- Select a spacecraft in the scene or searchable mission list to focus the camera;
  frame its trajectory, view the outer Solar System or browse adjacent missions.
- Move a date slider to synchronise spacecraft, planets and panel distances;
  choose Sun-, Earth- or destination-centred trajectory views.
- Filter by destination and status: operating, in transit, data analysis or uncertain.
- Read mission objectives, findings, launch and expected arrival dates, milestones,
  available distances and sources. Each mission has a shareable selection URL.

The catalogue covers major planetary missions and solar observatories. It is not
exhaustive: small or poorly documented missions may be absent. Completed missions
whose data remain under study are distinct from operating spacecraft. Statuses
are dated assessments, not live telemetry. Arrival dates retain the precision
of their sources and distinguish orbital insertion, rendezvous and flybys.

## Trajectory data

Positions come from [NASA/JPL Horizons](https://ssd.jpl.nasa.gov/horizons/) and are
bundled in `src/data/ephemerides.json`. The reference epoch is
**26 September 2026, 00:00:00 TDB** (Barycentric Dynamical Time, not UTC).
Stored coordinates are heliocentric XYZ vectors in AU, in the **J2000 ecliptic** frame,
without aberration or light-time corrections.

Lines connect sampled Horizons positions: solid before the selected date, dashed
afterwards. Between samples, positions are linearly interpolated in TDB; the
reference snapshot is used exactly. Planets and spacecraft share the selected
epoch, while mission status and findings retain their documented dates. Horizons
can combine reconstructed and predicted navigation data, including for past dates.

Planet samples span 2010–2034; cruise paths use daily samples. JUICE extends to
July 2031 and Europa Clipper to May 2030. Other paths remain partial: Psyche ends
in February 2029; Hayabusa2, Hera and ESCAPADE end in November 2026. Sampling does
not resolve precise closest approaches or local orbits. Full coverage and query
links are recorded with each entry.

Positions are never extrapolated beyond coverage. When no usable ephemeris is
available, the marker indicates only the mission's scientific region and no
distance is calculated. An available ephemeris does not prove operational status.

## Calculations and display scale

Distances are calculated **before** visual transformations: the vector norm gives
distance to the Sun, and the norm of the spacecraft–Earth vector difference gives
distance to Earth. **1 AU = 149,597,870.7 km**. Approximate one-way radio delay is
`Earth–spacecraft distance / 299,792.458 km/s`, converted to minutes.

For readability, radial distance becomes
`sceneRadius = 2.5 + 4.2 × sqrt(distanceAU)` for `distanceAU > 0`; the Sun stays at
the origin. Direction is preserved, with axes mapped `[x, y, z] → [x, z, −y]`.
Body and spacecraft sizes are exaggerated. Crowded markers are visually offset;
a line connects each to its physical position when known. Planetary rings mark
mean orbital distances. **The scene is not to scale**; its display coordinates
are never used to calculate the distances in mission panels.

Relative views subtract the centre's position **at each sample's own date**:
`relative(t) = spacecraft(t) − centre(t)`. They retain J2000 axis orientation and
show ±60 days, clipped to available coverage. Distances use one uniform scale
within that view; the camera and scale auto-fit when the date changes. The centre
and spacecraft remain exaggerated symbols. Asteroid targets use schematic markers.

## Sources and visual assets

Each mission, finding and milestone links to its source, chiefly
[NASA Science](https://science.nasa.gov/),
[ESA](https://www.esa.int/Science_Exploration/Space_Science),
[JAXA / Hayabusa2](https://www.isas.jaxa.jp/missions/spacecraft/current/hayabusa2),
[ISRO](https://www.isro.gov.in/SpacecraftMissions.html) and
[CNSA / Tianwen-2](https://www.cnsa.gov.cn/n6758823/n6758838/c10760422/content.html).
Ephemeris query parameters follow the
[Horizons API documentation](https://ssd-api.jpl.nasa.gov/doc/horizons.html).

Six locally stored NASA GLB models represent seven missions (Voyager 1 and 2
share a model). Models load on selection; their size and orientation are
illustrative. Other spacecraft use markers. Textures come from NASA Science,
[NASA SVS](https://svs.gsfc.nasa.gov/) and [USGS](https://astrogeology.usgs.gov/).
The application includes credits and notes on asset transformations. No agency
endorsement is implied.

## Development and updates

With Node.js 22 and npm:

```bash
npm ci
npm run dev
```

Validation:

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
```

`node scripts/fetch-ephemerides.mjs` regenerates ephemerides through sequential
JPL requests (network access required). Update the epoch and sampling windows in
that script for a new edition; review statuses, arrivals and sources separately
in `src/data/missions.ts`. Changing a displayed date alone does not refresh data.

Static Vite application, with no runtime backend, credentials or paid API.
Vercel: build command `npm run build`, output directory `dist`.
Local production preview: `npm run preview`.

Further documentation: [catalogue scope](docs/mission-catalogue.md),
[ephemerides and limits](docs/ephemerides.md),
[3D models and credits](docs/spacecraft-models.md),
[architecture](docs/architecture.md).
