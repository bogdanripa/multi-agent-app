# Conventions

- Use TypeScript everywhere.
- API:
  - Routes return typed objects (see @acme/shared).
  - Errors must be consistent (TODO: define standard error envelope).
- Web:
  - Always implement loading/empty/error states.
- Tests:
  - Add unit tests where logic exists.
  - Add e2e tests for key user flows (Playwright chromium).
