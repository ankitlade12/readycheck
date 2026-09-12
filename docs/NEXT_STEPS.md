# ReadyCheck next delivery steps

Updated September 12, 2026. The current build is a working local product prototype, with account-scoped persistence and a controlled CALL-E adapter. A CLI test and three app-originated inquiries completed; two app operations were recovered after lost create responses. Broader product behavior and public production readiness still need validation.

The decision features are implemented: explore supported limit changes or preview the single useful follow-up. A local fictional walkthrough and recording script are prepared; see `DEMO_WALKTHROUGH.md`. Prioritize real conversation evidence and submission access next.

## 1. Connect and validate live conversation control

The local policy controller, repeat-contact gates and literal-price checks are implemented. CALL-E still controls speech; its inspected API does not expose a per-turn response-approval hook. Ask the provider about a supported integration before claiming hard live voice guardrails. A local rehearsal is available via `npm run rehearse`; see `CONVERSATION_GUARDRAILS.md`.

The latest consenting test returned 13 turns and one fact with a proposed source-index repair. Policy 1.1 stopped after a $1,000 quote but announced the private $40 ceiling. Policy 1.2 now asks for the shop’s price first and makes at most one polite request for flexibility without revealing the maximum or accepting terms. Five local rehearsals cover that approach; another separately authorized live test is needed to validate the provider’s spoken behavior. Calling is disabled, and the result remains awaiting review.

The remaining dependency is a documented way to control speech before the next reply. `CALLE_CONTROL_REQUEST.md` contains the inspected API evidence, a ready-to-send provider question and acceptance checks. No message has been sent. A provider callback would still need an adapter and broader language interpretation; the local bounded rehearsal alone is insufficient. Validate that connection with separately authorized live tests before claiming the conversational issue is fixed.

Then verify positive supported facts, refusal/no-answer behavior, actual billing and provider retry behavior using `LIVE_TEST_PROTOCOL.md`. Keep the single-call approval, budgets, private transcripts and review boundaries intact.

## 2. Prepare a hosted pilot

A clean container package and Railway health-check configuration are prepared, with a database backup command and [restore/support procedures](DEPLOYMENT.md). The connected Railway account refused project creation because its trial expired. An active hosting plan or another persistent host is required; no project or public deployment was created. Configure the actual app origin, keep live access capped and allowlisted, and verify persistence on the selected host. Use a shared SQL database and coordinated worker before running multiple instances.

Completion evidence: a hosted URL with working signup/sign-in, a complete browser → API → database → provider flow, successful persistence after restart, and an operator who can resolve an uncertain inquiry without redialing.

## 3. Finish the hackathon package

The standalone source is published at `github.com/ankitlade12/readycheck`. The earlier upstream contribution is staged locally on `feat/readycheck-app` under `apps/typescript/readycheck/`; repository validation passed. [CONTRIBUTION_REVIEW.md](CONTRIBUTION_REVIEW.md) contains its proposed PR text and publication status. Select the source license, publish the PR and the under-three-minute video with genuine runtime CALL-E evidence, and supply judge access. The September 14 deadline was rechecked on September 9. These publication actions are not complete.

## 4. Develop beyond the controlled pilot

Prioritize general natural-language intake with reviewable structured output, verified candidate onboarding, account recovery, and task-success feedback. Add functionality based on observed task completion. The current helper handles limited starter text; it is not a general planning model. Business discovery, public unrestricted calling, payments, automatic bookings, shared cases and recurring checks are not included in this release.

The product should continue preserving its central behavior: a partial, conditional or stale answer must remain visibly unresolved, even when that means there is no matching option.
