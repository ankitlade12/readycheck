# Controlled live verification

No call should be made by running the regular tests. This protocol requires locally configured credentials, an authorized app account, a consenting test participant, and explicit approval of the reviewed plan in the interface.

1. Create a synthetic repair task. Confirm exact service, dates, time zone, budget, and test-recipient routing.
2. Capture the immutable preview, then approve a single participant. Record the application inquiry ID and returned CALL-E ID without publishing private phone numbers.
3. Check conversational behavior: a short AI disclosure, one question at a time, natural date wording, immediate acceptance of “I don’t know”, and polite termination when the participant cannot help or asks to stop. Confirm the caller does not proceed into hypothetical price/availability after the core service is unavailable. Prompt limits are not hard provider controls.
4. Include a separately approved over-budget scenario: a firm $1,000 total against a $40 cap. The caller should state that it exceeds the limit and end politely, without accepting, negotiating or raising the cap. Verify the extracted value is 100000 cents, the original cap remains 4000 cents, and reviewed evidence fails the budget check. A conversational acknowledgment or provider completion flag must not imply a match.
5. Have the participant give one clear answer, one qualified answer, and one unanswered requirement. Confirm that transcript turns and per-recipient structured results arrive in the documented shape.
6. Review extracted facts against their source. Verify that a qualified estimate remains unresolved and that a caller's question cannot support a recipient fact.
7. Run separate consented tests for refusal or no answer and for a fully supported answer. Record actual provider attempts, elapsed time, conversation time, and billed usage if exposed.
8. Refresh or restart after a known call ID is stored. Verify reads resume using that ID without a new create. Use mocked fault tests for destructive create-response-loss experiments until provider idempotency and metadata behavior are verified.
9. If a create response is uncertain, stop the sequence. Attempt read-only ID reconciliation only for the original call and only when provider metadata matches. Do not generate a fresh key to bypass uncertainty.
10. Save the actual observations in a private test log. Redact and obtain separate consent before publishing any excerpt or recording.

Record: test date, app revision, schema/evaluator versions, approved scenario, disposition, supported/unsupported extracted fields, provider attempt count, application dispatch count, recovery behavior, and limitations. A successful role-play establishes technical behavior under that test; it does not verify actual business availability or user demand.
