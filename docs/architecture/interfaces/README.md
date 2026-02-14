# Interface Contracts (contract-first)

Rule: Any cross-agent feature (FE↔BE, BE↔DB, FE↔E2E selectors) MUST have a contract file
under docs/architecture/interfaces/features/.

The Architect owns these files.

## How to add a new contract
1) Create a new file in features/ named: NNNN-<slug>.md
2) Define endpoints + request/response schemas + status codes + examples
3) Add TypeScript types in packages/shared (source of truth for code)
4) Link the contract file in PRs that implement it

## Index
- 0001-health.md
- 0002-version.md
