# Architecture — Phase 1

## 1. Architectural goal

Use the smallest architecture that cleanly separates scientific data, display
transformations, application state, and 3D rendering.

The first phase must remain a static frontend. The architecture should permit
later data or agent integrations without introducing their infrastructure now.

## 2. Stack

- React;
- TypeScript with strict mode;
- Vite;
- Three.js;
- React Three Fiber;
- React Three Drei for established scene helpers when justified;
- CSS approach to be selected during project scaffolding;
- Vitest and React Testing Library for automated tests;
- Vercel for static deployment.

No backend, database, authentication system, LLM SDK, or agent framework is part
of Phase 1.

## 3. Proposed responsibility boundaries

The precise file tree will be agreed during scaffolding. Regardless of names,
the code should preserve these conceptual boundaries.

### Domain data

Typed, framework-independent definitions for:

- celestial bodies;
- physical astronomical values;
- featured missions;
- official source URLs;
- identifiers and relationships.

React elements and Three.js objects must not be stored in domain data.

### Display model

Pure functions convert domain data into readable scene values:

- physical or orbital distance to scene distance;
- physical radius to display radius;
- orbit parameters to drawable paths;
- mission metadata to schematic visual placement.

Every non-scientific scaling choice must be named and documented.

### Application state

The initial state is expected to remain small:

- selected entity;
- global or focused camera mode;
- visible information panel;
- optional presentation settings.

Start with React state and context if required. Introduce a state-management
library only after identifying a concrete limitation.

### 3D scene

React Three Fiber components are responsible for:

- scene composition;
- lighting and background;
- body meshes;
- orbit lines;
- mission markers;
- picking and pointer interactions;
- camera transitions and controls.

Scene components consume prepared display values; they do not own scientific
constants or mission descriptions.

### Interface

Regular React DOM components are responsible for:

- navigation controls;
- selected-body and selected-mission panels;
- scale disclaimer;
- loading and error boundaries;
- keyboard-accessible alternatives to 3D picking.

## 4. Initial data policy

Phase 1 uses reviewed local TypeScript data.

Each record should include its source or a documented source reference. Mission
status text must avoid false real-time precision. A later phase may add JPL
Horizons or other official data services behind a dedicated adapter.

## 5. Deployment model

The application must produce static frontend assets through the standard Vite
build. Vercel serves those assets.

Consequences:

- no server runtime is assumed;
- no secret or API key is required;
- refreshing a route must not depend on server-side routing unless explicitly
  configured;
- all Phase 1 runtime data ships with the frontend bundle.

## 6. Testing strategy

### Unit tests

Prioritize deterministic logic:

- scale transformations;
- orbit/path calculations;
- entity lookup;
- mission-to-target relationships;
- state transitions where extracted into pure functions.

### Component tests

Cover essential DOM behavior:

- selecting through navigation;
- displaying the correct information;
- resetting selection;
- displaying the scale disclaimer.

### 3D verification

Do not rely entirely on snapshots of Three.js structures. Combine targeted
component tests with manual visual checks for:

- camera behavior;
- clipping and visibility;
- orbit readability;
- planet identification;
- desktop and small-screen layout.

### Required checks

Before a task is considered complete, run the relevant set of:

- formatter;
- lint;
- TypeScript typecheck;
- tests;
- production build.

Exact commands will be recorded after scaffolding.

## 7. Codex development workflow

For each non-trivial increment:

1. Start from a clean or understood Git state.
2. Give Codex an outcome, constraints, non-goals, and verification criteria.
3. Ask for a plan before editing when architectural judgement is involved.
4. Review and correct the plan.
5. Authorize only the agreed implementation increment.
6. Inspect commands and changed files.
7. Run the application and automated checks.
8. Ask for a separate review of the diff.
9. Record the learning result.
10. Commit the accepted checkpoint.

## 8. Future extension points, not Phase 1 work

Possible later adapters include:

- JPL Horizons for ephemerides;
- a larger mission catalogue;
- an LLM provider abstraction;
- typed scene-control tools;
- RAG over official mission documentation;
- natural-language navigation.

These possibilities do not justify adding interfaces, servers, dependencies, or
placeholder implementations during the MVP unless a current requirement needs
them.

