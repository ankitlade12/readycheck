# Architecture and behavior

ReadyCheck uses React/Vite, an Express API and SQLite in one persistent Node process. CALL-E credentials and recipient phone numbers stay on the server. The app polls existing provider tasks; it has no webhook receiver or per-turn voice adapter.

## Request and evidence flow

1. The user reviews a structured repair, item or venue request. The offline text helper supplies limited starter fields; it is not a general planning model.
2. Requirements, recipient selection, questions, conversation policy and correction-memory fingerprint form an immutable, expiring plan.
3. Approval and dispatch recheck ownership, account/recipient allowlists, calling hours, budgets, current requirements and policy versions. The payload and stable idempotency key persist before dispatch.
4. Both provider extraction schemas restrict field names to the approved requirement IDs, including focused follow-up scope. CALL-E results pass through schema, speaker, quote and source checks. Unexpected field names are excluded with a visible warning; the app never guesses a field mapping. Unsupported interpretations remain unresolved. Live facts require human review.
5. The evaluator compares current evidence with each requirement. Estimates, qualifications, contradictions, stale facts and manual judgments cannot silently become matches.
6. The user chooses and records the next action. A completed provider call, passing comparison or shortlist never marks the task completed.

Requirement edits create revisions; earlier evidence retains its original scope. Rental cost, refundable deposit and up-front cash are evaluated separately. Supported limit changes use confirmed quotes and only take effect when the user saves a revision.

## Conversation policy

The current policy supplies a short AI disclosure, natural date wording and one question at a time. The budget is private evaluation context. The caller asks the shop for a price first and can make one polite request for flexibility when it exceeds the budget. A firm price, refusal, uncertainty during negotiation or a still-too-high revised quote ends that inquiry. An affordable revised quote leads to verification of the total and remaining requirements. The caller never accepts terms, changes the requested work or books anything.

`src/domain/conversation.ts` also implements a bounded English rehearsal controller. It remembers pending and resolved fields, unknown answers, one clarification, one negotiation and reply limits. `npm run rehearse` exercises five fictional scenarios without telephony or model requests.

CALL-E receives the compiled instructions but does **not** call this controller before speaking. No supported per-turn approval or active-speech interruption hook was found in the provider interface inspected for this implementation. Hard voice control would require a supported adapter with authenticated turn delivery, response/end actions, ordering, deduplication and timeout handling, followed by live verification. The latest policy 1.2 live test did not follow the negotiation instructions. Local rehearsals do not establish live adherence.

The app independently blocks follow-ups after recorded refusal or explicit uncertainty and rejects stale approvals. Stopping future calls does not cancel an active provider call.

## Correction memory

Two bounded repairs preserve their original interpretations:

- **Dollar amounts:** a complete, supported and unambiguous recipient statement can correct an extracted cents value. For example, “Thousand dollars.” interpreted as 1000 cents becomes 100000 cents. Ranges, qualifiers, foreign currencies, malformed amounts and unsupported arithmetic are not guessed.
- **Source references:** a wrong transcript index can be replaced when the quote has exactly one matching recipient source. Ambiguous or caller-only matches remain unsupported.

Repairs preserve quotations, certainty, conditions, price basis, scope and expiry. They do not invent missing facts or approve evidence.

Feedback is account-scoped and deduplicated by source fact and method. Confirming a repair enables a fixed extraction reminder in future plans. Rejecting or manually editing it pauses the method; replaying an earlier acceptance cannot undo that rejection. User free text and recipient speech never become learned instructions.

**Learning** exposes counts and reset. Reset removes method feedback without rewriting evidence. Deleting a case removes its feedback contributions. The `correction_feedback` table contains identifiers, method, outcome and time, not transcript text or correction reasons. Review, feedback and case changes commit transactionally.

Changes to correction memory invalidate previews awaiting approval or dispatch. Existing stored payloads and keys remain immutable; in-flight calls are not rewritten. This is fixed method selection and application memory, not autonomous code changes or model training.

## Persistence and recovery

Guest and registered workspaces are isolated by server sessions. Creating an account retains the guest's cases; signing into an existing account opens its workspace. Email verification and password recovery are not implemented.

A lost create response becomes `dispatch_unknown`; the sequence and original dispatch reservation remain paused. The app can attach an existing API task ID only after an authenticated provider read returns matching inquiry metadata. It does not automatically replay creates or generate replacement keys. Read failures retry the existing ID with backoff. Operator recovery is covered in the [live guide](LIVE_TEST_PROTOCOL.md).

Budgets count application dispatches per UTC day, not currency spend or provider telephone attempts. Calls run sequentially and pause for review before the user continues. A confirmed match stops future dispatch.

## Data lifecycle and scope

Facts expire after 24 hours or an earlier explicit provider expiry. Live freshness conservatively uses inquiry creation time. Retrieval cannot renew evidence. Quote presence establishes provenance, not semantic truth.

Raw provider payloads and transcript text expire after `TRANSCRIPT_RETENTION_DAYS` (default 30). Case summaries remain until deletion. Case deletion clears normal access and plan payloads while retaining minimal inquiry records for in-flight reconciliation and budget integrity. Late results cannot recreate a deleted case. External provider retention and deletion are separate.

This release supports factual inquiries to operator-configured consenting recipients. Public business discovery, unrestricted dialing, shared cases, recurring checks, payments and automatic bookings are not implemented. Independent extraction-accuracy and user-outcome studies remain pending.
