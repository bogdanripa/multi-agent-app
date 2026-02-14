# Multi-agent workflow (contract-first)

Roles:
- PM: tasks + acceptance tests + final acceptance sign-off
- Architect: defines interfaces/contracts + architecture + final technical sign-off
- Frontend: React implementation (apps/web)
- Backend: Node implementation (apps/api + uses shared contracts)
- Tester: Playwright e2e + UX checklist (e2e)

## Global rules
- Scope boundaries are strict (see each role doc).
- Any cross-agent work starts with an Architect-defined interface contract.
- Use packages/shared as the canonical contract library.
- Mirror existing patterns; avoid introducing new conventions without documenting them.
- Never merge your own PR.
- Keep CI green.

## Required sequence (for cross-boundary features)
1) PM: tasks + acceptance tests
2) Architect: interface contract + schemas in packages/shared + notes in docs/architecture/interfaces.md
3) FE & BE: implement in parallel against the contract
4) Peer review (FE ↔ BE)
5) Architect: final review
6) Tester: e2e + UX gate
7) PM: acceptance gate
