# Multi-agent workflow (contract-first)

## Delivery mode (default)
- Default mode is direct delivery: when the user asks for a feature/fix, the agent workflow completes it end-to-end in one run.
- "Done" means: implementation + checks + required docs/tests updates are completed, not handed back for manual orchestration.
- Do not require the user to manually create a PR or merge to continue work.
- Branch/PR workflow is opt-in and used only when the user explicitly asks for PR-based collaboration.
- See root `EXECUTION_CONTRACT.md` for the repository-level rule.

Roles:
- PM: orchestration (tasks, sequencing, acceptance tests, final sign-off) only
- Architect: defines interfaces/contracts + architecture + final technical sign-off
- Frontend: React implementation (apps/web)
- Backend: Node implementation (apps/api + uses shared contracts)
- Tester: Playwright e2e + UX checklist (e2e)

## Global rules
- Scope boundaries are strict (see each role doc).
- Any cross-agent work starts with an Architect-defined interface contract.
- Use packages/shared as the canonical contract library.
- PM does not write implementation code; PM coordinates workflow and acceptance.
- Mirror existing patterns; avoid introducing new conventions without documenting them.
- Do not force PR/merge ceremony in default direct-delivery mode.
- If PR flow is explicitly requested, follow normal review/merge constraints.
- Keep CI green.

## Required sequence (for cross-boundary features)
1) PM: tasks + acceptance tests
2) Architect: interface contract + schemas in packages/shared + notes in docs/architecture/interfaces.md
3) FE & BE: implement in parallel against the contract
4) Peer review (FE ↔ BE)
5) Architect: final review
6) Tester: e2e + UX gate
7) PM: acceptance gate
