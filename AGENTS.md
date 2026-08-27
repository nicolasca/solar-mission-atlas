# Project instructions

## Project intent

- Treat this repository as both a product and a learning project.
- Optimize for code the developer can understand and review, not maximum output.
- Implement only the scope requested in the current task.
- Do not anticipate later phases without an explicit request.

## Technical constraints

- Use React, TypeScript, Vite, Three.js, and React Three Fiber.
- Keep TypeScript strict mode enabled.
- Keep the MVP deployable as a static application on Vercel.
- Do not add a backend, database, authentication, LLM, model API, or local model
  during Phase 1.
- Do not add a production dependency without first explaining its purpose and
  why the existing stack is insufficient.

## Architecture expectations

- Separate astronomical and mission data from React components.
- Separate domain calculations from Three.js rendering.
- Keep display-scale transformations explicit and documented; never imply that
  compressed distances or exaggerated radii are scientifically to scale.
- Prefer small, named components and pure functions over premature abstractions.
- Avoid global state libraries until React state clearly becomes insufficient.

## Working method

- For non-trivial tasks, inspect the repository and propose a plan before editing.
- State ambiguities and assumptions instead of silently inventing requirements.
- Preserve unrelated user changes.
- Keep each task small enough for its diff to be reviewed in one sitting.
- Summarize changed files, important decisions, verification results, and known
  limitations after implementation.
- When corrected on a recurring project rule, propose a concise update to this
  file instead of relying on chat history.

## Verification

- Run the relevant formatting, lint, typecheck, test, and build commands after
  changing code.
- Never claim a check passed unless it was actually run successfully.
- Add unit tests for domain calculations and data transformations.
- Review the final diff for unnecessary complexity and scope creep.

## Safety and source control

- Do not commit secrets or local credentials.
- Do not use destructive Git commands.
- Do not create commits unless explicitly asked.

