# API Error Envelope

All non-2xx responses return:

{
  "error": {
    "code": "STRING_ENUM",
    "message": "Human readable",
    "details": { "optional": "object" }
  }
}
