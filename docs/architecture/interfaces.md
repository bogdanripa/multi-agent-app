# Interfaces (Source of Truth)

Rule: Any cross-boundary work MUST reference an interface contract defined here
(or in packages/shared for types).

Each feature gets an entry with:
- Endpoint(s)
- Request/Response types (TS)
- Error envelope + status codes
- Example payloads
- Notes (auth, validation, pagination)
