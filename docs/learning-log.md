# Codex Learning Log

## Purpose

Record concrete evidence about working with a coding agent. The objective is to
replace passive tool watching with deliberate experiments and retrospective
analysis.

Do not log every trivial prompt. Add an entry when a task teaches something
about planning, instructions, context, implementation, review, permissions, or
agent limitations.

## Phase 1 learning questions

- What belongs in repository documentation versus a task prompt?
- When does `/plan` improve the result?
- What makes a `/goal` verifiable rather than vague?
- How small should a task be for effective review?
- Which constraints does Codex tend to ignore or reinterpret?
- Which errors can tests detect, and which require visual or architectural
  review?
- How much generated code can I genuinely understand in one iteration?
- Which repeated corrections should become durable `AGENTS.md` rules?

## Experiment template

### Experiment XXX — Title

**Date:** YYYY-MM-DD  
**Agent and surface:** Codex CLI / IDE / cloud  
**Repository state:** branch or commit  
**Task type:** plan / implementation / debug / review

#### Intended outcome

Describe the observable result.

#### Prompt and supplied context

Record the prompt or a concise faithful summary. List referenced documents and
files.

#### Constraints and verification

- Constraint:
- Non-goal:
- Required check:

#### Agent approach

Summarize the proposed plan, commands, files changed, and major decisions.

#### Result

- Checks run:
- Checks passed:
- Manual verification:
- Diff size or scope:

#### What worked

Record useful behaviour without inflating ordinary success.

#### Problems

Record incorrect assumptions, unnecessary complexity, missed requirements,
weak explanations, or failures.

#### My interventions

What did I correct, clarify, reject, or rewrite?

#### Lesson and durable action

What will change in the next prompt, task size, test strategy, architecture, or
`AGENTS.md`?

---

## Experiment 001 — Product and workflow framing

**Date:** 2026-08-27  
**Agent and surface:** ChatGPT Work  
**Task type:** planning

#### Intended outcome

Define a zero-additional-cost visual MVP that supports learning to code with
Codex.

#### Supplied context

- desire to learn modern coding-agent workflows;
- interest in Three.js and React Three Fiber;
- Solar System and current-mission visualization concept;
- static Vercel deployment target;
- no paid model API and no locally hosted model in Phase 1.

#### Result

Created the initial product scope, architecture boundaries, agent instructions,
and this learning-log structure.

#### Lesson and durable action

Separate two meanings of "agentic learning":

1. using Codex to develop software;
2. embedding an agent inside the delivered product.

Phase 1 concerns only the first. The product must not acquire runtime AI
infrastructure merely to make the learning project appear agentic.

