<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

### E2E Testing

E2E tests live in `e2e/` and run via Playwright inside Docker (`docker-compose.e2e.yml` at the project root).
- **Run**: `docker compose -f ../docker-compose.yml -f ../docker-compose.e2e.yml run --rm e2e` (from `web/`)
  or `docker compose -f docker-compose.yml -f docker-compose.e2e.yml run --rm e2e` (from project root)
- Tests target the app at `http://api-nginx:80` inside the Docker network
- `PLAYWRIGHT_BASE_URL` env var controls the target URL (defaults to `http://localhost:8080` for local runs)
- The Playwright Docker image (`mcr.microsoft.com/playwright`) includes Chromium + all system deps
- When editing tests using `addCookies`, use `BASE_HOST` from the env var to set the domain dynamically
- UI tests with `page.route` handle auth state via API mocking; flow tests (`auth-flow.spec.ts`) need the full stack running
