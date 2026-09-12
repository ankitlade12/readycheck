# ReadyCheck contribution review

Target: `CALLE-AI/awesome-phone-call-agents`, `apps/typescript/readycheck/`.
Prepared branch: `feat/readycheck-app`. This is a local contribution draft, not a published PR.

Review the [complete patch](../artifacts/readycheck-contribution.patch), [source archive](../artifacts/readycheck-source.tar.gz) and [file hashes](../artifacts/readycheck-package-manifest.json). The patch targets upstream commit `d2e7a4ff9c4bac62ed25032d5017dd715b9e1be3`. These artifacts contain 72 app files plus the patch's upstream README entry.

## Proposed PR title

feat(apps): add ReadyCheck evidence-based local inquiries

## Proposed PR body

ReadyCheck helps users check a complete repair, item or venue request against evidence from approved CALL-E inquiries. Estimates, contradictions, missing answers and expired facts remain unresolved; users inspect recipient quotations and record their own next action.

The app includes guided intake, purchase/rental choices and named alternatives, isolated guest and registered accounts, SQLite persistence, versioned requirements, evidence review, comparison, export and human-recorded outcomes. Supported monetary-limit previews save explicit revisions without rewriting evidence; focused follow-ups request only the next useful missing fact and revalidate it at approval. A versioned conversation policy supplies a no-call rehearsal, while server gates block repeat contact after recorded uncertainty/refusal, reject stale policy approvals and exclude literal dollar/cents mismatches. CALL-E still controls live speech. The server's controlled CALL-E adapter persists immutable approvals and idempotency keys before dispatch, pauses uncertain starts, recovers known IDs read-only, and applies recipient/account allowlists and daily limits. Samples and default tests make no calls.

Validation includes strict TypeScript, 140 tests, 45 synthetic evaluator expectations and 15 browser flows. The preceding clean Docker build passed all 14 browser flows and retained its saved comparison and decision panels across restart. An earlier isolated backup restore retained all 10 synthetic users and 10 cases with SQLite integrity checks passing. The upstream repository validator passed. A user-authorized app inquiry completed after correcting the provider extraction schema: task ID and metadata persisted, one attempt returned a transcript, and zero supported facts produced an unresolved comparison. Restart recovery reused the saved ID. The earlier 404 used a dashboard attempt ID instead of the API task ID. Feedback exposed unnatural questioning; revised caller instructions remain untested in a subsequent live call. An additional approved create timed out; an operator replay of the exact stored body and original key recovered its completed task, one attempt and 35 turns. Three facts survived source validation and remain for review. Its correctly extracted $1,000 quote confirms a live conversational failure against the $40 limit. The current compiled policy has not been live-tested. Supported per-turn speech control, contrasting outcomes, costs and hosted operation still need validation. The sample corpus is a regression set, not independent accuracy evidence.

See the app README for setup and limits and its deployment guide for single-instance SQLite operations. Bundled font notices are included. This contribution does not book, purchase, pay, or hide recurring calls.

## Publication status

The local draft excludes credentials, local databases, private installation records and original product documents. It includes only the runnable app, its tests, configuration examples and relevant documentation. Before publishing, resolve source licensing with the entrant (the destination repository uses MIT), review the generated patch and retain the honest runtime-verification limitation. No GitHub message or PR has been sent.
