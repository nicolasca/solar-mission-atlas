# MVP — Interactive Solar System

## 1. Purpose

Create a small but complete vertical product slice: a visitor opens the site,
sees the full planetary Solar System, navigates through it, selects a planet or
one of three missions, and reads concise contextual information.

The MVP is also the practical support for learning to develop with Codex. The
quality of the development workflow is therefore part of the result.

## 2. Primary learning objective

Learn how to use a coding agent without delegating understanding or technical
judgement to it:

- maintain durable repository instructions;
- distinguish planning from implementation;
- define outcomes, constraints, and verification criteria;
- steer an active task when the agent makes a wrong assumption;
- inspect and understand generated diffs;
- request a separate review;
- use Git checkpoints to keep changes reversible;
- record lessons from each meaningful agent interaction.

Phase 1 is about **developing with an agent**, not embedding an agent in the
application.

## 3. User experience

### Main journey

1. The visitor opens the application and sees the Sun and all eight planets.
2. The visitor can orbit, pan, and zoom the camera.
3. The visitor selects a planet from the scene or from a navigation control.
4. The camera focuses on the selected body.
5. A panel displays the body's name and concise scientific information.
6. The visitor can return to the global Solar System view.
7. The visitor can select one of three featured missions and see its purpose,
   agency, target, status, and an indicative visual representation.

## 4. MVP scope

### Solar System

- Sun;
- Mercury;
- Venus;
- Earth;
- Mars;
- Jupiter;
- Saturn;
- Uranus;
- Neptune;
- visible simplified orbit paths;
- visually distinct planets;
- explicit indication that sizes and distances are adapted for readability.

### Interaction

- orbit, pan, and zoom controls;
- select a planet by clicking it;
- select a planet through an accessible UI control;
- camera focus on the selected body;
- reset to global view;
- information panel for the selected entity;
- usable desktop layout and a reasonable small-screen fallback.

### Featured missions

The initial curated missions are:

- Parker Solar Probe;
- JUICE;
- Europa Clipper.

For each mission, the MVP displays:

- name;
- agency;
- launch date;
- current broad status or phase;
- primary destination or study target;
- short description;
- official source link;
- an indicative marker, route, or association with its target.

Mission metadata is maintained locally in typed data files. Positions and
trajectories do not claim live or navigational accuracy in this phase.

## 5. Scientific representation

True planetary diameters and interplanetary distances cannot both remain
readable in a single conventional scene.

The MVP therefore uses a documented display scale:

- orbital distances may be compressed;
- body radii may be exaggerated;
- mission routes may be schematic;
- the interface must state that the overview is not uniformly to scale.

Scientific constants must remain separate from display transformations so a
future scientific-view mode remains possible.

## 6. Out of scope

- natural satellites and moons;
- real-time planetary or spacecraft positions;
- JPL Horizons integration;
- accurate spacecraft trajectory propagation;
- end-user chatbot or agent;
- OpenAI or other paid model APIs;
- local LLM execution;
- backend and database;
- user accounts;
- exhaustive mission catalogue;
- detailed spacecraft models;
- virtual reality;
- physically realistic n-body simulation.

## 7. Cost and deployment constraints

- Mandatory additional cost: 0 EUR.
- The application must build as static frontend assets.
- The production target is Vercel.
- No production environment secret is required for Phase 1.
- The deployed MVP must remain fully usable without any development-agent
  service.

## 8. Definition of done

The MVP is complete when:

- all nine major displayed bodies are visible and identifiable;
- the user can navigate, select, focus, and reset the scene;
- every planet has a working information panel;
- the three missions can be selected and inspected;
- display-scale compromises are visible to the user;
- the application works without a backend or model API;
- lint, typecheck, tests, and production build pass;
- the production build is deployed and manually checked on Vercel;
- README setup instructions match commands actually tested;
- no known critical accessibility or navigation blocker remains;
- the developer can explain the main data flow and rendering architecture.

## 9. Non-goals for Codex

Codex is not expected to generate the entire MVP in one task. Work must be
divided into reviewable vertical increments. A fast result is less important
than learning to plan, constrain, inspect, and correct the agent's work.

