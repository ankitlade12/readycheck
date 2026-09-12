# Local verification record

## September 12 product flow and private-budget negotiation

**157 automated tests across 18 suites**, **45/45 synthetic evaluator expectations**, TypeScript, production build and all **16 browser flows** passed. Browser tests used an isolated preview with calling disabled. The product now derives check progress from inquiry states, pending evidence and user-recorded outcomes; it adds a resume card, clearer call activity, an explicit zero-fact review action and a dedicated Learning navigation item. Passing evidence and shortlisting never mark the task completed.

One new consenting repair test was approved through the app using conversation policy **1.1.0**. The create response exceeded the local deadline; one operator replay with the exact stored body and original idempotency key recovered the original operation, which was reconciled by matching metadata. No replacement key or additional inquiry was introduced. It completed with **13 transcript turns**, **one extracted fact** and **one proposed source-index correction**. The result remains awaiting human review; no successful repair or matching option is claimed. Calling was disabled again after the test; private transcripts and recordings are excluded from Git.

The transcript showed the caller ending after a $1,000 quote, while announcing the $40 maximum and bundling price questions. In response to user feedback, policy **1.2.0** keeps the maximum private, asks for the shop’s price first, allows one polite request for flexibility and respects a firm price or refusal. It never accepts a quote or books work. Extraction instructions preserve uncertainty when a bare amount does not establish a firm all-in total. Five fictional controller rehearsals and regression tests cover this change; **the revised negotiation has not been validated in another real call**. CALL-E still controls live speech, so local tests cannot prove live adherence.

## September 12 correction learning

**150 automated tests across 17 suites**, **45/45 synthetic evaluator expectations**, TypeScript and the production build passed. All **16 browser flows** passed against an isolated local production preview with calling disabled. The new browser flow owns a separate in-memory database and fake transport; it verifies a proposed correction, confirmation, reload, a manual edit that pauses the method, and reset through the account learning panel. No provider requests were made by that flow.

New regression coverage verifies literal dollar corrections with original-value provenance, source-index recovery, ambiguous/qualified/adversarial exclusions, preserved uncertainty and expiry, account isolation, duplicate-review handling, rejection persistence, SQLite restart durability, transactional review rollback, case-deletion cleanup and invalidation of plans when correction feedback changes. The first sandboxed HTTP run could not bind local ports; the complete suite passed with loopback access. Agent-browser opened the preview and learning panel without recorded page errors.

This is bounded source repair plus feedback-driven method selection and fixed prompt reminders. It is not model training, independent extraction-accuracy measurement or proof of improved live conversation. No real calls, deployment or submission were performed. See `LEARNING.md` for supported behavior and limits.

## September 9 recovered call and spoken-price regression

The uncertain app inquiry was recovered using the documented [lost-response recovery procedure](https://docs.heycall-e.com/calls#recover-after-a-restart-or-lost-response): one operator replay with the exact persisted request body and original idempotency key. HTTP 201 returned a task ID; an authenticated GET returned matching inquiry metadata, `completed`, one provider attempt and 35 transcript turns. The existing inquiry now has that ID and is `review_required`. Its original reservation remains; no replacement key, additional recipient or automatic retry was introduced. Live calling remains disabled.

The transcript confirms the reported failure: after the recipient stated a thousand-dollar price, the caller clarified whether it was firm and continued to timing questions despite the $40 cap. The provider correctly returned 100000 cents; this was not a dollars/cents conversion error. Of four extracted facts, three survived local source validation. The deadline fact's supplied index pointed at caller speech and its short quotation was ambiguous, so it was excluded. The price includes a provider clarification annotation in `conditions`; the app conservatively retains it for review rather than silently removing that annotation or declaring a match.

The evidence panel now displays the quoted amount without the requirement-only “Up to” prefix. The literal-price parser and local controller now recognize the observed phrase “Thousand dollars.” Whole spoken amounts are checked to avoid interpreting a larger phrase such as “twenty-one thousand dollars” as one thousand. Unsupported compounds and multiple amounts remain unrecognized. The simulated parser/evaluator regression also verifies that this phrase cannot accept a misnormalized $10 value and that a reviewed, unconditional $1,000 total fails the unchanged $40 cap. This is regression coverage, not proof of improved live speech.

The updated source passes **140 tests across 16 suites**, 45 synthetic evaluator expectations, TypeScript and a production build. All **15 browser flows** passed. A separate authenticated browser check displayed the recovered $1,000 quote as awaiting review and preserved it after reload, with no recorded runtime errors. The returned task creation time predates recovery by more than two hours, confirming recovery of the earlier operation. The provider control review and ready-to-send integration request are in `CALLE_CONTROL_REQUEST.md`. No supported per-turn response hook or active-call interruption method was found in the inspected Calls, Goal Runs, webhook or TypeScript SDK interfaces. The compiled policy remains instructions only; the recovered call predates that policy.

## September 9 structured conversation policy and enforced gates

The current source passes **139 automated tests across 16 suites**, 45 synthetic evaluator expectations, strict TypeScript and a production build. All **15 browser flows** passed against the final local production server, including the mobile excluded-price warning. Browser checks found no recorded runtime errors. The local rehearsal produces four fictional conversation traces using no model or telephony. Coverage includes $1,000 against $40, identity/budget questions without losing the pending field, explicit uncertainty, clarification limits, qualified answers, preference boundaries, refusal, scope changes and terminal states.

New server-side checks prevent recorded refusal/uncertainty from being bypassed at plan preparation, approval or dispatch; tests assert zero provider creates and zero reserved budgets. Obsolete conversation-policy approvals cannot dispatch. An explicit dollar quote that conflicts with its extracted cents is excluded with a visible evidence-review warning. The same check runs during evaluation, so an older reviewed fact with a cents mismatch remains unresolved until corrected. These are application enforcement checks, not live speech interception. The CALL-E contract was downloaded again and exposes no per-turn response-approval operation; the local controller is not connected to its live conversation. See `CONVERSATION_GUARDRAILS.md` for the complete limits.

No additional real call was attempted. The previously uncertain create remains unresolved and calling remains disabled. Prior Docker records describe their named earlier snapshots; this version was checked on the local production server.

## September 9 reported $1,000 quote

The participant reported saying $1,000 and receiving an accepting response. The latest call remains `dispatch_unknown` without an API task ID, so its transcript and extracted amount could not be retrieved; the exact response and any normalization error are not verified. The earlier stored transcript contains no $1,000 quote.

Inspection found that the caller received the $40 budget but lacked an explicit conversational response to an over-budget quote. Instructions now state the approved hard money limits, require an explicit mismatch acknowledgment and polite end, and prohibit accepting or raising the limit. Estimates above the cap must be described as estimates, and preferences are not treated as hard limits. The extraction instructions explicitly distinguish dollars and integer cents ($1,000 = 100000 cents) and preserve the actual quote.

**120 automated tests across 13 suites**, 45 synthetic expectations, strict TypeScript and the production build passed. A no-network regression passes recipient totals of $38, $40 and $1,000 through the provider parser and evaluator, with a caller saying “Okay, that's fine” and the provider marking the call completed. Live facts remain unresolved before review; reviewed $38 and $40 budget checks pass while reviewed $1,000 fails the unchanged $40 cap. This verifies the supplied structured-result path, not actual model extraction or live adherence to the revised instructions. The preceding 14-flow container check predates this prompt-only change.

## September 9 additional live attempt and current container

The user requested the next live validation. One new repair inquiry was prepared and approved through the browser for the configured consenting participant. The app sent one create request; its 20-second network deadline elapsed without a usable response or task ID. The inquiry remains `dispatch_unknown` with its original payload, idempotency key and budget reservation. No retry, replacement call or budget release was made. Calling was then disabled and the original daily limits restored. A restart preserved the uncertain state. A read-only request for the earlier completed task returned HTTP 200 with matching metadata, which verifies existing-task access but does not resolve the new request.

No new transcript, extracted result, confirmed recipient connection or cost was available from this attempt. Improved conversation and positive extraction therefore remain unverified. Recovery needs the original API task ID with matching metadata or provider reconciliation; a dashboard telephone-attempt ID is insufficient. The documented API has no call-list route. Do not treat a client timeout as proof that no call was placed.

The current 66-file source package built as `readycheck:decisions-20260909` on Node 24 / Linux ARM64. **14/14 browser flows passed** against its isolated persistent volume, with live calls disabled and no CALL-E credential in the container. Agent-browser confirmed meaningful content and no recorded browser errors. Restarting the container preserved the guest session, saved three-option repair comparison and both decision panels. This updates the earlier container coverage to the current application code; it does not establish hosted operation.

Railway project creation was attempted again and refused because the connected account's trial expired. No project, paid plan or public deployment was created. Publication remains pending the entrant's license choice; no PR was sent.

## September 9 decision features (current snapshot)

**119 automated tests across 13 suites**, **45/45 synthetic evaluator expectations**, strict TypeScript and the production build passed. All **14 browser flows** passed against the local production server. Desktop and 360px mobile previews were visually inspected; no horizontal overflow or browser runtime errors were found in the checked paths. The synthetic corpus remains a regression set, not independent accuracy evidence.

“What would make this work?” computes supported budget, deposit and up-front cash limit changes from confirmed all-in evidence. Previewing does not mutate the case or call anyone. Applying saves a new revision, preserving the original quotations and their expiry. Tests exclude estimates, conditions, stale or unreviewed facts, conflicting evidence and changed scope. Browser checks cover cancel, insufficient limits, apply/reload/history and preservation of the local draft after a failed save.

“The one question left” selects an unresolved factual requirement when one answer could complete the evidence. It withholds suggestions for refusal, no answer, explicit uncertainty, a confirmed must-have failure or evidence needing review. The focused plan includes exactly one approved question and requirement; existing request details remain context. Both preparation and approval recheck whether that question is still appropriate. Automated checks verify that previewing makes zero provider create requests.

Fresh fictional repair samples now show a $35 starting estimate, a wrong-service response and a confirmed $45 total against a $40 budget. Existing saved cases are unchanged. The local walkthrough uses fictional responses throughout and makes no telephone calls. These feature checks do not establish improved live voice quality or positive live extraction. The Docker and restore checks below cover an earlier source snapshot.

## September 9 app-originated live inquiry

The complete app path was exercised through the local browser: authorized account → saved repair case → reviewed plan → provider create → persisted API call-task ID → GET with matching inquiry metadata → transcript and structured result → unresolved comparison → explicit result acknowledgment. CALL-E reported `completed`, one provider attempt, 38 transcript turns, and 111 seconds between the attempt timestamps. The result contained zero extracted facts. All four requirements remained unresolved; no business availability or completed repair was claimed. The app inquiry reached `evaluated` after review acknowledgment. Billed cost for this app call was not independently verified.

The first create request returned HTTP 400 with no call ID. Inspection found unsupported schema features; the schema was corrected to use the documented subset, keeping stricter validation locally. The corrected request was accepted. The database retains both the rejected attempt with its released reservation and the single accepted inquiry with its reserved dispatch. A restart after the accepted ID was persisted resumed reads without another create. Additional app calling was then disabled.

The earlier 404 came from using a dashboard attempt identifier as an API task identifier. The [official OpenAPI reference](https://docs.heycall-e.com/openapi/calle.openapi.yaml) distinguishes the task `id` used for reads from an attempt's `provider_call_id` used in dashboard records. The app's Connection read check now reports a verified read of its own task.

The recipient reported repetitive questioning and unnatural wording. Transcript review confirmed continued questions after uncertainty and literal timezone wording. Caller instructions were updated afterward: shorter disclosure, natural date phrasing, one question at a time, no repeated probing after an unknown, an immediate exit when the core request cannot be established, and early termination after repeated unknowns or a stop request. These are prompt instructions, not provider-enforced interruption or duration guarantees. Their conversational effectiveness has **not** been live-tested; no second connected call was placed to validate them.

The transport/schema changes passed **110 tests across ten suites**, 45 synthetic expectations, strict TypeScript and a production build. The full browser suite passed **11/11** after the API/schema changes. The subsequent caller-instruction update is covered by local validation, not evidence of improved live voice quality. Private call identifiers and transcripts remain outside the source package.

## September 9 connection setup verification (earlier snapshot)

The current source passed strict TypeScript, **107 tests across nine suites**, **45/45 self-authored synthetic verdict expectations**, and a production build. The complete Chromium suite passed **11/11** against the local production server. The two added browser flows cover mobile setup, disabled unauthorized verification, persisted inconclusive results and cooldown errors. Agent-browser found no runtime errors in the connection screen.

The connection screen now shows five setup checks and a separate optional existing-call read check. The endpoint accepts no client-supplied call ID, requires an allowlisted registered account, respects CSRF and same-origin controls, and stores only a status, time and credential fingerprint per account. Tests cover ownership, credential rotation, persistence, overlapping requests, provider failures and zero create requests.

A server REST key and an isolated authorized account are configured locally. A user-requested CALL-E CLI test call completed and the recipient confirmed clear audio. This proves CLI calling only. The app's browser → authenticated API → provider GET check returned **404** for that existing CLI call ID. The UI correctly preserves an inconclusive result; application key validity, call creation and end-to-end evidence processing remain unverified. Live app calling remains disabled. No additional phone call was placed during this connection verification. Private numbers, credentials, call IDs and transcripts are excluded from this record.

The container and restore results below describe the preceding package snapshot; the new connection feature was verified against the local production server, not rerun in that container.

## September 9 installation and deployment verification (earlier snapshot)

CALL-E agent authentication completed through the portable skill's verified launcher. `auth status` reported `usable: true`; `mcp tools` included `plan_call`, `run_call`, and `get_call_run`. These were read-only setup checks. At that stage the separate application REST credential was missing and no phone call had been made; see the newer connection record above.

The clean 57-file deployment package built successfully as `readycheck:release` using Node 24 on Linux ARM64. The image started against an intentionally root-owned volume, prepared its database paths and ran the server as UID/GID 1000 with no supplementary groups. `/api/health` returned 200. Agent-browser verified meaningful content and no recorded errors. The full browser suite passed **9/9** against this container in 35.5 seconds.

Replacing the container with a new instance using the same volume preserved the guest session, saved repair check, all three comparison results and unresolved starting estimate. A snapshot produced by `scripts/backup.mjs` was then restored into a separate empty volume with live calling disabled. The restored app displayed the same comparison; all **10 synthetic users and 10 cases** were present, inquiries remained **0**, and `PRAGMA integrity_check` returned `ok`. Local screenshots: `artifacts/container-home.png` and `artifacts/container-restored.png`.

An additional isolated backup drill confirmed committed WAL data survives backup, successive snapshots remain independent, snapshot files use mode 0600, and a missing source database is rejected. This is a local restore drill, not evidence of scheduled off-site backups or hosting resilience.

The contribution was staged under `apps/typescript/readycheck/` on validated branch `feat/readycheck-app`. The upstream repository's required `python3 scripts/validate_repository.py` passed. No public PR was opened. Railway project creation was attempted but the service refused because the connected account's trial expired; no hosted deployment was created.

## September 9 product update verification

`npm run verify` passed with **102 tests across eight suites**, the unchanged **45/45 synthetic verdict expectations**, strict TypeScript, and the production build. The full Chromium suite passed **9/9** against the updated local production server. The additional flows cover purchase onboarding, accepted-alternative revision/reload/history, and mobile onboarding with an injected failed create. Following a mobile form readability adjustment, the three affected onboarding/mobile flows were rerun and passed (3/3).

The new onboarding dialog’s axe audit returned **0 violations and 0 incomplete checks**; agent-browser recorded no browser errors. `artifacts/new-check-desktop.png`, `artifacts/onboarding-mobile.png`, and `artifacts/a11y-onboarding.json` contain local inspection evidence. An automated audit of one dialog is not whole-product accessibility certification.

`npm run live:check` returned expected exit code 1: the database and origin are ready, while enablement, an API key, consenting recipients, and account allowlisting remain missing. No network call or phone call was made. CALL-E request/result fields were rechecked against the [official integration README](https://github.com/CALLE-AI/call-e-integrations#api); account-specific execution remains unverified. Evaluator/schema version: 1.1.0.

The original September 8 results below remain as a historical record.

September 8, 2026. macOS ARM64, Node 25.2.1, local persistent SQLite, production Vite assets served by Express on `http://localhost:3000`. Tests use synthetic data and a fake CALL-E transport. No real call was made.

## Automated checks

| Check                                                   | Result                                                                        | Evidence                                                                     |
| ------------------------------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Strict TypeScript check                                 | Passed                                                                        | `npm run verify`; strict and unused-local checks enabled                     |
| Domain, API, ownership, storage and inquiry fault tests | 85 passed, 0 failed, 0 skipped                                                | `npm test`; five suites in `tests/*.test.ts`                                 |
| Synthetic evaluation                                    | 30/30 development and 15/15 designated held-out verdicts matched expectations | `npm run evaluate`; detailed rows in `artifacts/evaluation.json`             |
| Production build                                        | Passed                                                                        | `npm run build`; bundled local fonts and separated application/vendor chunks |
| End-to-end browser flows                                | 7 passed                                                                      | `npm run test:browser`; Chromium against the production server               |

The seven browser flows cover repair evidence and a targeted follow-up, shortlist and arrangement confirmation, persistence and export; rental exact matching and separate deposit; venue no-match and historical revisions; 360px layout, keyboard dialogs and deletion; guest-to-account retention and live lock; adding a candidate without losing prior evidence; and preserving a draft after an injected HTTP save failure and reload.

The mobile navigation received an additional check after visual inspection: a closed sidebar must not expose off-screen controls to keyboard navigation; opening focuses the navigation, and Escape closes it and restores focus. The affected mobile browser flow was rerun after this change and passed (1/1).

## Evaluation interpretation

| Split               | Examples | True matches surfaced | False matches | Invalid leads correctly withheld | Missed valid leads |
| ------------------- | -------- | --------------------- | ------------- | -------------------------------- | ------------------ |
| Development         | 30       | 3                     | 0             | 27                               | 0                  |
| Designated held-out | 15       | 3                     | 0             | 12                               | 0                  |

For the held-out fixtures, false matches divided by all predicted matches is **0/3** and valid-lead recall is **3/3**. Those tiny denominators matter. Expected verdicts were authored explicitly; the same developer can inspect all examples. This is a regression corpus, not an independent or statistically representative measure of AI accuracy. The test runner's 45 scenario tests and the evaluation report use the same corpus; they are not 90 separate examples.

The corpus covers all three templates with exact-model mismatches, missing totals, starting estimates, over-budget prices, unanswered conditions, tentative claims, touching time endpoints, expiry, changed request scope, contradictory totals, explicit corrections, wrong currency, caller-only quotations and conditional answers. Additional tests cover live review, source presence, deposits/up-front cash, daylight-saving ambiguity, dispositions and preference boundaries.

## Browser and visual review

The production home and saved comparison loaded through agent-browser with meaningful content, working navigation and no recorded page errors. Desktop and 360px screenshots were inspected. The mobile Playwright assertion checks the document has no horizontal overflow, and native-dialog focus remains within the open dialog after a Tab keypress.

Automated axe audits of the production home and comparison returned **zero violations**. Both reported incomplete contrast checks on short text or decorative/pseudo-element content; they were not silently counted as passes. Full screen-reader usability and every possible UI state are not certified by these audits.

Local artifacts include `home-production.png`, `repair-verified.png`, `mobile-verified.png`, `evidence-mobile.png`, `a11y-home-production.json` and `a11y-comparison-production.json` under `artifacts/`. Generated artifacts and test workspaces are excluded from source distribution.

## Not verified

The single answered-but-unresolved app path, task metadata and transcript shape are verified above. Positive fact extraction, contrasting call outcomes, revised caller behavior, provider retries, billing, general extraction accuracy, provider retention, public hosting and judge access remain unverified. Docker execution and local backup/restore are verified above. See `LIVE_TEST_PROTOCOL.md` for the controlled next step and `IMPLEMENTATION_STATUS.md` for feature limits. Hackathon PR, video and submission are not completed.

## Reproduce

```sh
npm ci
npm run verify
npm start
# In a second terminal after the server starts:
npx playwright install chromium
npm run test:browser
npm run format:check
```

Browser tests create fictional cases and a synthetic account on the local server. Domain/API tests use isolated temporary stores. Repeat browser tests against an isolated local data directory if you want a clean manual-demo workspace. No live configuration is needed.
