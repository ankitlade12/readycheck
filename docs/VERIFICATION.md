# Verification record

Application snapshot: **7496006**, September 12, 2026. This record describes observed checks, not general AI accuracy. Earlier development logs are retained in Git history.

## Automated checks

| Check                                | Result                                                                   |
| ------------------------------------ | ------------------------------------------------------------------------ |
| TypeScript, unit/API and fault tests | 157 tests across 18 suites passed                                        |
| Synthetic evaluator corpus           | 45/45 expectations matched                                               |
| Production build                     | Passed                                                                   |
| Browser workflows                    | 16 passed against an isolated preview with calling disabled              |
| Formatting                           | Passed                                                                   |
| Browser inspection                   | Desktop/mobile progress and main app loaded without recorded page errors |

Coverage includes ownership, persistent revisions, call recovery, budget reservations, stale approvals, source validation, correction feedback, rejected-method suppression, transactional review, mobile layout and user-recorded outcomes. Regular automated tests use isolated stores and fake provider transports; they make no telephone calls.

The corpus contains 30 development and 15 designated held-out examples, all self-authored. These are regression expectations, not an independent accuracy benchmark. Five fictional conversation rehearsals cover private-budget handling, negotiation, uncertainty and scope changes.

## Observed live behavior

Three app-originated inquiries and a separate CLI test completed during development. Two app operations needed an operator recovery using their exact persisted request bodies and original idempotency keys after lost create responses. No replacement key was used.

The latest app test used policy **1.1.0**, a consenting repair participant and one browser-approved inquiry. It returned **13 transcript turns**, **one extracted fact** and **one proposed source-index correction**. The result remains awaiting human review; it does not establish a matching option or successful repair.

The caller stopped after a $1,000 quote but announced the private $40 ceiling and bundled price questions. Policy **1.2.0** now instructs price-first questioning, a private ceiling and at most one request for flexibility. Regression tests and rehearsals cover this change; **the revised negotiation has not been validated in another real call**. Calling was disabled after the test. Private transcripts and recordings are excluded from Git.

An earlier app test returned zero facts and correctly left requirements unresolved. Another returned a $1,000 amount correctly in cents but continued into timing questions, demonstrating why transport success cannot establish conversation quality.

## Deployment boundary

An earlier Docker snapshot passed local browser checks, container replacement persistence and an isolated backup/restore drill with SQLite integrity checks. That does not establish hosted resilience or verification of the latest container image. The prior Railway project-creation attempt was blocked by an expired account trial; no public deployment was created.

Outstanding: live policy 1.2 behavior, contrasting refusal/no-answer and successful cases, actual billing and retry behavior, independent extraction accuracy, current hosted persistence and judge access.

## Reproduce

Follow the [README verification commands](../README.md#verify). Live checks use the separately approved [live protocol](LIVE_TEST_PROTOCOL.md). Record the tested application revision when updating this file; keep private source evidence outside Git.
