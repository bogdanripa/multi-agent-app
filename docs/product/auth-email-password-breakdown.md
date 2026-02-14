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
