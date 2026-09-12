# Correction and feedback learning

ReadyCheck has a bounded correction loop: detect an extraction error, try one source-backed repair, keep the proposed interpretation unreviewed, save the user's feedback, and adapt future interpretation and inquiry plans. This is application memory and fixed repair selection, not model training or autonomous code modification.

## Automatic repairs

- **Dollar amounts:** If the recipient's complete turn is a supported, unambiguous dollar expression and the extracted numeric cents disagree, propose the literal amount. For example, `Thousand dollars.` interpreted as 1000 cents becomes 100000 cents. The original value remains attached to the fact. A small grammar deliberately excludes ranges, discounts, qualifiers, foreign currencies, malformed numbers and arithmetic. Broader disagreements remain excluded with the existing warning.
- **Source references:** If the supplied index is wrong, find a unique exact quote in recipient speech. Record the original index. Caller-only quotations and ambiguous matches remain unsupported.

Repairs do not invent facts when the provider returns none. They preserve the quote, conditions, certainty, price basis, scope and expiry. They never approve live evidence or modify the user's requirements. The evidence panel displays the proposed change and its original interpretation before review.

## Learning and rollback

Feedback is scoped to the owning account and a source fact. Confirming an automatically repaired fact adds one accepted outcome per repair method. Repeated reviews and copied revisions do not multiply that outcome. Acceptances activate fixed extraction reminders in future call plans; neither recipient words nor free-text user corrections become instructions.

Rejecting or manually editing a repaired fact marks its repair method paused for that account. Future extractions exclude facts needing that method, while valid unmodified facts still work. The corresponding reminder is removed from new plans. A rejection cannot be reversed by replaying an older acceptance. There is no claim that one accepted correction establishes general accuracy.

Open **Connection → Learning from your reviews** to inspect counts and reset a method. Reset removes its feedback and resumes proposals awaiting review. It does not change saved evidence. Deleting a case also removes its learning contributions; methods are recalculated from remaining cases.

Every plan includes a fingerprint of the correction policy version and active/paused methods. If those change, approval and dispatch require a new preview. Existing stored call payloads and idempotency keys remain immutable. An in-flight call is not canceled or rewritten by feedback. New recipient requests still need their normal approval.

The `correction_feedback` table stores owner/case/source/fact identifiers, the fixed method identifier, accepted/rejected outcome, and update time. It contains no quotes, phone numbers, original monetary values or correction reasons. This metadata remains until a method is reset or its source case is deleted. Original interpretations remain in case evidence; transcript retention still applies to source text. Review mutations, feedback, events and resulting case state commit together or roll back together.

## Verification and boundaries

`npm run verify` covers parsing, ambiguous and adversarial inputs, unchanged review requirements, account isolation, duplicate feedback, persistence after reopening SQLite, rejected-method suppression, plan invalidation and atomic HTTP review. The 45 evaluator fixtures are synthetic and self-authored.

After building, `npx playwright test tests/browser/learning.spec.ts` verifies correction display, confirmation, reload, manual correction, persisted rejection, mobile memory controls and reset. This test creates its own isolated in-memory store and local server; its provider transport rejects any request. It does not contact CALL-E or use the normal application database.

CALL-E still controls the live speech loop. This change cannot interrupt an ongoing conversation, guarantee an improved next call, or learn new language rules from arbitrary corrections. Actual voice quality, extraction accuracy and task success require separate consenting live validation. No real calls were placed while implementing this feature.
