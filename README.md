# AI DevOps Demo

A Node.js Express API designed to demonstrate AI-powered CI/CD pipelines using n8n + Claude.

## What This Repo Does

Every push triggers a GitHub Actions pipeline with 6 jobs. Each job sends a webhook to n8n. The AI Agent in n8n reads the results and takes intelligent actions.

## Pipeline Scenarios

| Job | Status | What the AI Does |
|-----|--------|-----------------|
| Lint | ✅ Pass | Posts a clean code confirmation comment |
| Lint | ❌ Fail | Summarises the lint errors and suggests fixes |
| Unit Tests | ✅ Pass | Posts test coverage summary |
| Unit Tests | ❌ Fail | Diagnoses which test failed and why, opens GitHub Issue |
| Integration Tests | ❌ Fail | Analyses the API failure and suggests root cause |
| Performance Tests | ❌ Fail | Flags which test exceeded the threshold |
| Security Audit | ❌ Fail | Explains the vulnerability and suggests fix version |
| All Jobs Pass | ✅ | Posts a full pipeline success summary |

## Setup

### 1. Add your n8n webhook URL as a GitHub Secret

Go to your repo → Settings → Secrets and variables → Actions → New repository secret

- Name: `N8N_WEBHOOK_URL`
- Value: your n8n webhook URL (from the Webhook trigger node)

### 2. Install dependencies locally

```bash
npm install
```

### 3. Run tests locally

```bash
# All tests
npm test

# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

# Performance tests only
npm run test:performance

# Lint
npm run lint
```

## How to Trigger Each Scenario

### Trigger a test failure (Unit Tests)
Edit `src/calculator.js` — change the `add` function to return `a - b` instead of `a + b`. Push. The test `adds positive numbers` will fail.

### Trigger a lint error
Edit any file in `src/` — add a variable that is never used:
```js
const unusedVariable = 'this will fail lint';
```

### Trigger a performance failure
Edit `tests/performance.test.js` — change `THRESHOLD_MS` from `100` to `1`.
Every performance test will now fail as too slow.

### See a full success run
Revert all changes and push clean code. All 6 jobs pass and AI posts a summary.

## Project Structure

```
ai-devops-demo/
├── src/
│   ├── app.js           Express API with 4 endpoints
│   ├── calculator.js    Math operations (add, subtract, multiply, divide, power, modulo)
│   └── validator.js     User input validation
├── tests/
│   ├── app.test.js      Integration tests for all API endpoints
│   ├── calculator.test.js  Unit tests for calculator
│   └── performance.test.js  Performance threshold tests
├── .github/
│   └── workflows/
│       └── ci.yml       GitHub Actions pipeline
├── .eslintrc.json       ESLint rules
└── package.json
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Service health check |
| GET | /version | Current version |
| POST | /calculate | Math operations |
| POST | /users/validate | User input validation |

### Example requests

```bash
# Health check
curl http://localhost:3000/health

# Calculate
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"a": 10, "b": 3, "operation": "divide"}'

# Validate user
curl -X POST http://localhost:3000/users/validate \
  -H "Content-Type: application/json" \
  -d '{"user": {"name": "Alice", "email": "alice@example.com", "role": "admin"}}'
```
