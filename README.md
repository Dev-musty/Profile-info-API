# Profile-info-API

A simple RESTful API that returns your profile information along with a dynamic cat fact fetched from `https://catfact.ninja`.

### Features
- Returns profile info and a random cat fact
- Network timeout applied and error handling status codes
- Centralized error handling with meaningful HTTP status codes

## Prerequisites
- Node.js 18+ (includes built-in `fetch`)
- npm 8+

## Setup
1. Install dependencies:
```bash
npm install
```
2. Create a `.env` file in the project root and set the port:
```bash
PORT=8000
WINDOW_MS=900000
RATE_MAX=10
```

## Run
- Development:
```bash
npm run dev
```
- Production:
```bash
npm start
```

The server will start on `http://localhost:<PORT>`.

## API
### API TEST -> `Swagger UI link`
### GET `/me`
Returns a JSON payload containing the provided user info and a random cat fact.
#### Response Structure
```json
{
  "status": "success",
  "user": {
    "email": "<your email>",
    "name": "<your full name>",
    "stack": "<your backend stack>"
  },
  "timestamp": "<current UTC time in ISO 8601 format>",
  "fact": "<random cat fact from Cat Facts API>"
}
```


#### Request (JSON body or query string)
```json
{
  "email": "jane.doe@example.com",
  "name": "Jane Doe",
  "stack": "Node.js"
}
```

#### Response
```json
{
  "status": "success",
  "user": {
    "email": "mustridt@example.com",
    "name": "Must Rid",
    "stack": "Nodejs/Expressjs"
  },
  "timestamp": "2025-01-01T12:34:56.000Z",
  "fact": "Cats sleep 70% of their lives."
}
```

## Error handling
The service applies a timeout to the upstream cat fact request. Errors are surfaced with appropriate status codes:
- `504 Gateway Timeout`: request timed out
- `500 Internal Server Error`: unexpected errors

Example timeout response:
```json
{
    "message": "AbortError: This operation was aborted"
}
```

## References
- AbortController and fetch timeouts (medium): https://medium.com/@YassineDev/how-to-timeout-a-fetch-request-2100dfee0762
- catfact.ninja API : https://catfact.ninja/
- Rate limiting : https://express-rate-limit.mintlify.app


