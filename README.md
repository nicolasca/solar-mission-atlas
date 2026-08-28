# Solar Missions

Interactive 3D visualization of the Solar System and a curated selection of
space missions.

The project is primarily a learning vehicle for:

- building a modern React and TypeScript application with Codex;
- learning how to scope, instruct, steer, and review a coding agent;
- practising Three.js through React Three Fiber;
- modelling and presenting scientific data clearly;
- establishing a clean, reproducible workflow from the first commit.

## Current phase

The project is currently in **Phase 1 — visual MVP and Codex workflow**.

The first MVP contains:

- the Sun and all eight planets;
- simplified orbit visualization;
- camera navigation and focus on a selected planet;
- concise information for every displayed body;
- three curated missions: Parker Solar Probe, JUICE, and Europa Clipper;
- a static deployment compatible with Vercel.

The first MVP does **not** contain an LLM, an end-user agent, a paid API, a
local model, a backend, or live ephemeris data.

## Cost constraint

Mandatory runtime and development-service cost for the MVP: **0 EUR**.

Codex is used as a development tool through the developer's existing ChatGPT
subscription. The deployed application does not call Codex or any model API.

## Project documents

- [MVP scope](docs/mvp.md)
- [Architecture](docs/architecture.md)
- [Codex learning log](docs/learning-log.md)
- [Instructions for coding agents](AGENTS.md)

## Setup

The scaffold has been verified with Node.js 22 and npm 10.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Verification

Format the scaffold or check its formatting:

```bash
npm run format
npm run format:check
```

Run lint, TypeScript, and automated test checks:

```bash
npm run lint
npm run typecheck
npm test
```

Create and locally preview the production build:

```bash
npm run build
npm run preview
```

## Deployment

The application builds to static assets and needs no server or environment
secrets in Phase 1. For Vercel, use `npm run build` as the build command and
`dist` as the output directory.

## Visual asset sources

Planet, Sun, and Saturn-ring textures are stored locally as optimized WebP
assets. Their source links, required credit text, provenance, and processing
notes are available from the **Visual credits** control in the application.

The textures use material from
[NASA Science](https://science.nasa.gov/),
[NASA's Scientific Visualization Studio](https://svs.gsfc.nasa.gov/), and
[USGS Astrogeology](https://astrogeology.usgs.gov/). Processed or reconstructed
assets are identified in the application. Use of agency material does not imply
endorsement of this project.
