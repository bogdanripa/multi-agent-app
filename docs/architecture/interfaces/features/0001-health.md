# 0001 Health

## Endpoint
GET /api/health

## Response 200
Type: HealthResponse (@acme/shared)

Example:
{
  "ok": true,
  "service": "api",
  "time": "2026-02-14T12:34:56.000Z"
}

## Errors
- 500: ApiError (see ../error-envelope.md) code=INTERNAL
