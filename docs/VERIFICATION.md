# Verification record

September 12, 2026. The latest live test used **86d46b4**, policy **1.2.0**; the subsequent extraction-contract fix is policy **1.2.1**. This record describes observed checks, not general AI accuracy. Earlier development logs are retained in Git history.

## Automated checks

| Check                                | Result                                                                                  |
| ------------------------------------ | --------------------------------------------------------------------------------------- |
| TypeScript, unit/API and fault tests | 159 tests across 18 suites passed                                                       |
| Synthetic evaluator corpus           | 45/45 expectations matched                                                              |
| Production build                     | Passed                                                                                  |
| Browser workflows                    | 16 passed on the preceding UI snapshot; saved live-result review checked after this fix |
| Formatting                           | Passed                                                                                  |
| Browser inspection                   | Desktop/mobile progress and main app loaded without recorded page errors                |

Coverage includes ownership, persistent revisions, call recovery, budget reservations, stale approvals, source validation, correction feedback, rejected-method suppression, transactional review, mobile layout and user-recorded outcomes. Regular automated tests use isolated stores and fake provider transports; they make no telephone calls.

The corpus contains 30 development and 15 designated held-out examples, all self-authored. These are regression expectations, not an independent accuracy benchmark. Five fictional conversation rehearsals cover private-budget handling, negotiation, uncertainty and scope changes.

## Observed live behavior

Four app-originated inquiries and a separate CLI test completed during development. Three app operations needed an operator recovery using their exact persisted request bodies and original idempotency keys after lost create responses. No replacement key was used.

### Latest negotiation test: failed conversation acceptance

One consenting participant answered the policy **1.2.0** inquiry. The saved transcript contains **45 turns** and about **137 seconds** of conversation. Observations:

- The caller kept the $40 budget private.
- It did **not** request flexibility after a $60 quote. It asked about fees; the participant then volunteered $30. This does not establish successful agent negotiation.
- It read the checklist to phone screening, inserted unrequested holding phrases and reversed the roles when asking about drop-off.
- It confirmed the revised total, asked about the deadline and ended after the participant declined the drop-off window. It did not book or accept a transaction.
- The provider returned six facts, four using unknown requirement IDs. The app retained only service and deadline, each with a proposed source-index correction. These remain unreviewed; price and drop-off remain unresolved. The service transcript itself contains ambiguous wording, so source presence is not semantic verification.

Policy **1.2.1** restricts provider schema field IDs to the approved scope and adds an exclusion warning for unknown IDs. It does not change the live voice instructions or claim to solve the observed speech failures. The original call payload and transcript remain unchanged. The saved result now explains the excluded fields. No further call was placed; live calling is disabled.

The completed operator recovery followed the [documented same-key, unchanged-body procedure](https://docs.heycall-e.com/calls#recover-after-a-restart-or-lost-response). Private transcripts and recordings remain excluded from Git.

Earlier calls established transcript persistence, a zero-fact unresolved result and an accurately extracted $1,000 amount. They also exposed repeated questioning and a spoken budget ceiling, reinforcing that transport success is not conversation quality.

## Deployment boundary

An earlier Docker snapshot passed local browser checks, container replacement persistence and an isolated backup/restore drill with SQLite integrity checks. That does not establish hosted resilience or verification of the latest container image. The prior Railway project-creation attempt was blocked by an expired account trial; no public deployment was created.

Outstanding: reliable natural live negotiation and screening behavior, live validation of the narrowed extraction schema, contrasting refusal/no-answer and successful cases, actual billing and retry behavior, independent extraction accuracy, current hosted persistence and judge access.

## Reproduce

Follow the [README verification commands](../README.md#verify). Live checks use the separately approved [live protocol](LIVE_TEST_PROTOCOL.md). Record the tested application revision when updating this file; keep private source evidence outside Git.
