# ReadyCheck

ReadyCheck helps people find out whether a repair service, item or venue meets their whole request. It compares answers against must-haves, shows the source evidence, and leaves estimates, contradictions and missing answers unresolved.

The app includes guided intake, purchase/rental options, saved cases, requirement revisions, evidence review, focused follow-ups and human-recorded outcomes. CALL-E handles approved phone inquiries. ReadyCheck never books, pays or accepts terms.

## Run locally

Use Node 22.13 or newer; the Docker image uses Node 24.

```sh
npm ci
npm run dev
```

Open **http://localhost:3000**. Samples need no API key or cloud account. Choose **Try a sample**, preview the questions and load fictional responses. The repair example shows two paths: resolve a missing final price, or preview a budget revision backed by a confirmed quote.

SQLite stores local accounts and cases in `data/readycheck.sqlite`. Creating an account retains the guest workspace. Use the exact origin configured in `APP_ORIGIN` for browser requests.

For a production build:

```sh
npm run build
npm start
```

## Verify

```sh
npm run verify
npm run format:check
npm run rehearse
```

`verify` runs TypeScript, isolated unit/API tests, 45 synthetic evaluator cases and the production build. `rehearse` generates fictional dialogue in `artifacts/conversation-rehearsal.md`. Neither makes phone calls.

For browser checks, start a separate production preview after building:

```sh
PORT=3101 APP_ORIGIN=http://127.0.0.1:3101 \
DATABASE_PATH=./artifacts/browser-preview.sqlite \
LIVE_CALLS_ENABLED=false CALLE_API_KEY='' TEST_RECIPIENTS_JSON='[]' LIVE_USER_IDS='' \
npm start
```

In another terminal:

```sh
npx playwright install chromium
TEST_BASE_URL=http://127.0.0.1:3101 npm run test:browser
```

Browser tests create synthetic accounts and cases. Reports and screenshots go to ignored `artifacts/`. See the [verification record](docs/VERIFICATION.md) for tested behavior and limits.

## Real inquiries and learning

Follow the [controlled live guide](docs/LIVE_TEST_PROTOCOL.md) to configure a server key, consenting recipients, authorized accounts and call limits. Each inquiry requires its reviewed plan to be approved in the app.

The caller is instructed to keep the user's budget private, ask for the shop's price first and request flexibility once when needed. CALL-E controls live speech; the revised negotiation is locally tested but still needs live validation.

Source-backed dollar and transcript-reference corrections remain proposals until reviewed. Accepted repairs add fixed reminders to future plans; rejected repairs pause that method for the account. Inspect or reset feedback in **Learning**. This is bounded application memory, not model training. See [architecture](docs/ARCHITECTURE.md).

## Project map

| Path              | Purpose                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| `src/components/` | Intake, progress, comparison, evidence and outcomes                     |
| `src/domain/`     | Schemas, evaluation, conversation policy, repairs and fictional samples |
| `server/`         | Authentication, SQLite, inquiry orchestration and CALL-E transport      |
| `tests/`          | Domain, HTTP, recovery and browser coverage                             |
| `scripts/`        | Evaluation, rehearsal, readiness, backup and container startup          |

## Delivery

Use one persistent Node instance with durable SQLite storage. The [deployment guide](docs/DEPLOYMENT.md) covers Docker, Railway, backups and recovery. Public hosting and the hackathon submission are still pending; the [submission checklist](docs/SUBMISSION.md) contains the remaining work and demo outline.

Keep credentials, databases, recordings and local planning files out of Git. Bundled font licenses are in `public/notices/`.
