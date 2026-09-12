# ReadyCheck

ReadyCheck checks a complete local request against evidence from selected businesses. It keeps estimates, unanswered questions, contradictions, and expired facts visible. Users choose and record the next action themselves.

The runnable MVP includes repair, rental, and venue templates; editable requirements; fictional comparisons; source conversations; targeted follow-ups; saved cases and revisions; local account authentication; text export; and human-recorded outcomes. The controlled CALL-E path uses the official HTTP API from the server. One controlled app-originated call verified create/read, matching metadata, transcript persistence and an unresolved result. Revised conversational behavior, positive fact extraction and broader provider behavior still need live validation.

## Run locally

Use Node 22.13 or newer (Node 24 LTS recommended). This build was tested with Node 25.2.1; `node:sqlite` may print an experimental-feature warning on some versions.

```sh
npm ci
npm run dev
```

Open **http://localhost:3000**. No API key, cloud account, or external model is required for samples. Fonts and assets are bundled locally. The server binds to loopback by default. Use the same origin shown in `APP_ORIGIN`; writes from a different origin are intentionally rejected.

Try the repair sample: preview the inquiry and load fictional responses. **The one question left** identifies the missing all-in price for Thread & Trail’s $35 starting estimate; its focused fictional follow-up confirms $38. **What would make this work?** previews increasing the budget from $40 to $45 for Everyday Repair Co.’s confirmed quote. Cancel without changing anything, or apply a new revision that preserves the original requirements and evidence. These are two alternative paths through the same comparison. Rental includes a fully matching option and checks refundable deposits and up-front cash separately. The venue sample intentionally has no confirmed match.

Use **New check** for the guided product flow. Choose the task and whether you want a fictional example or an enabled real inquiry, then review all fields before creating the case. For an item check, choose **Buy it** or **Rent it**. Under the exact model, **Accept another model** lets you name up to three acceptable alternatives. This does not accept arbitrary substitutions or transfer another model’s quote.

SQLite data is stored at `data/readycheck.sqlite`, including WAL files. Guest workspaces have isolated sessions. Creating an account retains that guest workspace; signing into an existing account opens that account's cases. Accounts belong to this server and are not synced through a third-party identity service. No verification email is sent.

## Build and verify

```sh
npm run typecheck
npm test
npm run evaluate
npm run build
npm start
```

`npm test` uses local HTTP listeners, an isolated SQLite store, and a fake CALL-E transport. It never places calls. `npm run evaluate` writes `artifacts/evaluation.json` with all counts and denominators. The 45 fixtures are synthetic and self-authored; the 15 held-out examples are designated scenario families, not an independently concealed benchmark. Their success does not establish live extraction accuracy or market demand.

For browser tests, start the app in another terminal:

```sh
npx playwright install chromium
npx playwright test
```

Browser screenshots, traces on failure, and the report go to `artifacts/`. Set `TEST_BASE_URL` if testing another local server. The tests create isolated guest sessions and a synthetic local account; they never contact businesses.

## Conversation behavior

ReadyCheck now proposes bounded extraction corrections and learns from their reviews. It can repair an unambiguous dollar/cents mismatch from a complete recipient statement and recover a unique recipient source reference, preserving the original interpretation. Every live fact still requires review. Accepted corrections add fixed extraction reminders to future approved plans; rejecting or editing a repair pauses that method for your account. Inspect or reset feedback in **Connection → Learning from your reviews**. See [correction learning](docs/LEARNING.md) for the supported grammar, memory lifecycle and verification limits.

The server compiles an approved conversation policy and enforces repeat-contact and price-interpretation checks. A refusal or explicit uncertainty in the saved recipient conversation blocks follow-ups for that inquiry. A recognized dollar quote that conflicts with its extracted cents is repaired only within the bounded grammar above; other disagreements are excluded for review. Old approvals cannot dispatch after a conversation or correction-policy change.

Run `npm run rehearse` for fictional, no-call examples of the local controller responding to an excessive price, unknown answer, budget question and scope change. CALL-E receives compiled instructions but does not invoke this controller before speaking. Hard live speech control requires a provider callback not exposed in the inspected API. See [conversation guardrails and limits](docs/CONVERSATION_GUARDRAILS.md).

## Controlled live configuration

Copy `.env.example` to `.env` and set values locally. Do not commit secrets or private phone numbers. Configure:

- `CALLE_API_KEY`: the account's server-side API key.
- `LIVE_CALLS_ENABLED=true`: explicit server enablement.
- `TEST_RECIPIENTS_JSON`: consenting test recipients with `id`, `name`, E.164 `phone`, `consentRef`, and IANA `timezone`.
- `LIVE_USER_IDS`: comma-separated exact account IDs allowed to spend the server's call allowance. Register locally and copy the ID from Connection. Email alone grants no calling authority.
- `APP_ORIGIN`: the exact app origin, including protocol and port.
- Per-user/global daily call counts and recipient-local calling hours.

Check local setup before enabling a real inquiry:

```sh
npm run live:check
# Machine-readable output:
npm run live:check -- --json
```

This command checks configuration, app origin, persistent database access, and whether authorized IDs belong to registered users. It performs no network requests and prints no API keys, recipient names, numbers, or consent references. Exit code 1 means setup is incomplete; it is expected without live configuration. A successful check does not verify API-key validity, credits, active calling hours, or provider behavior. Invalid numeric environment settings block live mode; hours use a same-day half-open interval, with start 0–23 and end 1–24.

Connection also offers an optional **Check existing-call access** action. It performs only a provider GET for your latest persisted inquiry, or an operator-configured `CALLE_VERIFICATION_CALL_ID` when you have no inquiry. It requires an authorized registered account and a server key, but works while calling is disabled. Status and time persist per account and key fingerprint; checks are limited to once per minute. No conversation is imported or returned. A successful read does not verify call creation or credits, and a 404 is inconclusive. Use the API call-task `id`; the `provider_call_id` shown in dashboard call records identifies an individual attempt and is not a valid lookup ID for this endpoint. Leave the optional ID blank for a fresh installation.

Restart the server after changing `.env`. Open Connection, sign in to the authorized account, and create a controlled live check. Select up to three test recipients, review the questions and disclosure, and approve the exact plan in the app. No account configuration or code build itself places a call.

The server persists the payload, immutable plan hash, and stable idempotency key before create. Calls are sequential and pause for fact review. Review each extracted fact against the recipient's statement, then explicitly continue the approved sequence. A confirmed match stops future dispatch. The app never books, purchases, reserves, pays, or accepts terms.

## Recovery and limits

- Refresh reads the existing saved inquiry. It does not dispatch again.
- A lost create response or a restart during dispatch becomes `dispatch_unknown`; the sequence and reserved budget remain paused.
- “Recover an existing call” makes a read-only provider request and attaches the ID only when returned metadata contains the exact `readycheck_inquiry_id`. If the provider does not expose matching metadata, recovery remains blocked for operator/provider reconciliation. Same-key replay is not automatically attempted. CALL-E documents an operator recovery path using the exact persisted request and original key when an ID was lost; this path recovered one controlled test. Never rebuild that request or create a new key to bypass a conflict.
- A read timeout retries reading the existing ID with backoff. No new application call is created.
- “Stop future calls” stops queued application work. It does not claim an active provider call has been canceled.
- Editing requirements creates a revision, invalidates queued approvals, and leaves in-flight results associated with their original revision.
- Budget limits count application dispatches per UTC day. They do not guarantee a monetary ceiling or exactly one telephone attempt per provider task.

API contract reference: [official CALL-E integration README](https://github.com/CALLE-AI/call-e-integrations). The implementation uses `POST /v1/calls`, `GET /v1/calls/{call_id}`, recipient-specific results, transcript turns, and an idempotency header. Actual account response shapes, provider retry behavior, billing, and metadata availability need controlled integration verification.

## Evidence and data handling

Only a current, supported recipient fact can satisfy a requirement. Live facts require human review. An exact quote establishes source presence, not semantic truth; users must verify that the normalized interpretation preserves qualifications. A schema-valid model result never directly chooses the winner. Unknown output shapes, absent evidence, and unsupported custom judgment remain unresolved.

Facts expire after 24 hours or an earlier explicit provider expiry. Until the provider's completion timestamp contract is verified, live freshness conservatively uses the persisted inquiry creation time; delayed retrieval cannot renew evidence. Rental cost, refundable deposit, and up-front cash have separate checks. Requirements with subjective/custom semantics can be marked for manual judgment; they cannot automatically pass. The offline text helper extracts limited starter fields and explicitly requires review; it is not a general natural-language planning model.

Raw live provider payloads and transcript text expire after `TRANSCRIPT_RETENTION_DAYS` (30 by default). Case summaries remain until case deletion. Deleting a case removes normal access and clears its plan payloads; a minimal inquiry record remains for in-flight reconciliation and budget integrity. Incoming results cannot recreate a deleted case. External CALL-E retention is separate, and external deletion is not promised. Use synthetic non-sensitive descriptions and consenting test participants for this release.

## Deployment

This app expects a persistent Node process and durable SQLite storage. It is not configured for an ephemeral serverless filesystem or multiple independent SQLite copies. For a container:

```sh
docker build -t readycheck .
docker run --rm -p 3000:3000 \
  -e APP_ORIGIN=http://localhost:3000 \
  -v readycheck-data:/app/data readycheck
```

For a public host, set the actual HTTPS `APP_ORIGIN`, preserve the data volume, use one instance, and keep live access restricted to authorized accounts. The [pilot operations guide](docs/DEPLOYMENT.md) covers Railway volume permissions, verified SQLite backups, restore drills and rollback. Move to a shared SQL store and a coordinated worker before multi-instance operation. See [verification](docs/VERIFICATION.md) for completed checks and remaining limits.

## Project map

| Path                            | Purpose                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------- |
| `src/domain/`                   | Versioned schemas, templates, time normalization, evaluator, fictional fixtures |
| `src/components/`               | Intake, requirement editing, evidence, comparisons, and outcomes                |
| `server/app.ts`                 | Session-scoped HTTP routes and human actions                                    |
| `server/inquiries.ts`           | Immutable plans, budgets, dispatch, recovery, and retention                     |
| `server/calle.ts`               | Server-only provider transport and conservative extraction adapter              |
| `tests/`                        | Domain, fault, HTTP, ownership, and browser verification                        |
| `docs/IMPLEMENTATION_STATUS.md` | PRD traceability and actual remaining gaps                                      |
| `docs/SUBMISSION.md`            | Hackathon packaging and demo outline                                            |

The implementation tracker distinguishes shipped behavior from external or post-MVP work. Bundled fonts retain their upstream notices in `public/notices/` (served at `/notices/`).

## Supported inquiry boundary

Use ReadyCheck for factual repair, item and venue inquiries. Do not use it for emergencies, medical advice, legal advice or financial decisions. Recipients are configured by an operator after consent, numbers are masked in the interface, and the server keeps the actual E.164 destination out of public plans. There are no hidden recurring schedules. Stopping future work does not cancel an active call; recovery and rollback behavior are described above.
