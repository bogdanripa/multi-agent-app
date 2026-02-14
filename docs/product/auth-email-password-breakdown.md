# PM Breakdown: Email/Password Auth

## Scope
- Add email/password sign-up, sign-in, and sign-out.
- Add authenticated session handling for browser refresh persistence.
- Add clear logged-out/authenticated UI states.

## Required Sequence (contract-first)
1. PM: task breakdown and acceptance tests (this document + `acceptance-tests.md` updates).
2. Architect: define auth interface contract in `docs/architecture/interfaces/features/` and shared types in `packages/shared`.
3. Frontend + Backend: implement against Architect contract.
4. Tester: e2e and UX checks against acceptance tests + interface contract.
5. PM: final acceptance gate on preview.

## Implementation Tasks
1. Architect
- Define endpoints and payloads for sign-up, sign-in, sign-out, and session lookup.
- Define status codes and error envelope mappings.
- Add shared auth request/response/session types in `packages/shared`.

2. Backend
- Implement auth endpoints exactly per shared contracts.
- Persist user credentials securely (hashed passwords only).
- Create and revoke authenticated sessions.
- Enforce contract error responses for invalid input and invalid credentials.

3. Frontend
- Implement sign-up and sign-in forms with basic validation.
- Implement authenticated and logged-out states.
- Call auth endpoints and render server-provided errors.
- Persist and restore auth state on reload via session endpoint.

4. Tester
- Add e2e scenarios for AT-2 through AT-6.
- Verify both success paths and auth failure paths.

## Gate
- FE/BE implementation must not start until Architect auth contract exists.

## Execution Board (PM-driven)
1. Architect PR (blocking)
- Deliverables:
- `docs/architecture/interfaces/features/NNNN-auth-email-password.md`
- `packages/shared` auth contract types
- `docs/architecture/interfaces.md` auth entry update
- Exit criteria:
- Contract includes request/response schemas, status codes, and examples for sign-up, sign-in, sign-out, and session lookup.
- PM approves contract completeness against AT-2 to AT-6.

2. Backend PR
- Depends on: Architect PR merged
- Deliverables:
- Auth routes + validation + session handling using shared contract types only
- Exit criteria:
- Backend responses match contract for success and error cases.
- Unit/integration tests cover invalid credentials and session revoke behavior.

3. Frontend PR
- Depends on: Architect PR merged
- Deliverables:
- Sign-up/sign-in UI, authenticated state UI, sign-out action
- Session restore flow on app load
- Exit criteria:
- All auth user journeys in AT-2 to AT-6 are implemented.
- FE uses shared contract types; no local contract drift.

4. Tester PR
- Depends on: Backend PR + Frontend PR merged
- Deliverables:
- E2E tests for AT-2 through AT-6
- Exit criteria:
- E2E passes on preview environment.
- UX gate confirms clear loading/error/authenticated/logged-out states.

5. PM Acceptance Gate
- Depends on: Tester PR merged + preview available
- Exit criteria:
- Acceptance tests AT-1 through AT-6 pass on preview.
- No contract drift or undocumented behavior changes.
