# CALL-E live conversation control: integration request

Prepared September 9, 2026. Draft for the provider; not sent. This document contains no account identifiers, credentials or private transcript.

## Verified public interface

The [Calls guide](https://docs.heycall-e.com/calls), [Goal Runs guide](https://docs.heycall-e.com/goal-runs), [SDK documentation](https://docs.heycall-e.com/sdks) and [TypeScript Calls implementation](https://github.com/CALLE-AI/server-sdk-typescript/blob/main/src/calls.ts) were inspected. They expose asynchronous creation, reads and polling. Goal Runs pin a published provider-owned conversation; they do not expose the prompt or accept a per-run conversation-control override. The documented SDK does not offer client-initiated cancellation of an active call.

[Webhooks](https://docs.heycall-e.com/webhooks) deliver terminal results, not a recipient turn before the next utterance. Current webhook deliveries are unsigned. An event ID is useful for deduplication, not authentication; any future receiver should use an authenticated task read and check local ownership and inquiry metadata before accepting a result. ReadyCheck currently polls and has no webhook receiver.

Dashboard Stop controls described in the changelog are not evidence of a supported Developer API interruption endpoint. No undocumented dashboard endpoint is used.

## Message ready for provider review

We are building ReadyCheck, which checks repair, item and venue requirements through CALL-E. Its application evaluates evidence against approved limits. We need equivalent control before the caller speaks.

For example, with a hard $40 total limit, a recipient saying “Thousand dollars” should cause the caller to acknowledge the mismatch and finish politely, rather than continue asking timing questions. Explicit uncertainty should not trigger repeated versions of the same question. Replies about the caller's identity or the approved request should be answered from that context without losing the pending question.

Does CALL-E offer a supported Developer API or published Goal integration that:

1. Delivers the final recipient turn with call/turn identity before generating the next spoken reply?
2. Waits for our approved response or end action, rather than independently speaking while the callback runs?
3. Supports ending the conversation and interrupting any queued speech, with a confirmed outcome?
4. Documents callback authentication, ordering, retry/deduplication, timeout behavior and latency limits?
5. Provides a sandbox or consenting-recipient test path for this contract?

Please provide the documentation, account enablement requirements and a minimal working example. If this capability is unavailable, please confirm that limitation so we can choose an appropriate supported runtime.

## Integration acceptance checks

These are requirements, not claims about an existing provider interface:

- A recipient turn is interpreted into a bounded event, validated against the approved task and current conversation state, and mapped to an allowed response. Uncertain interpretation remains unknown; it cannot raise the budget or authorize a booking.
- The runtime speaks only the allowed response. A hard price mismatch, explicit refusal or completed scope ends further questioning.
- Duplicate/out-of-order turns do not cause repeated questions. An ended conversation cannot restart.
- Callback failure cannot silently fall back to accepting a price or continuing an unrestricted conversation.
- Validate the $1,000/$40 mismatch, repeated uncertainty, identity/budget questions, refusal, interruption, and malformed or repeated callbacks using actual runtime evidence. Local rehearsals alone do not satisfy this requirement.

The existing bounded English controller is a rehearsal implementation. A supported speech hook would still require an adapter, broader utterance interpretation and these integration checks before hard live control could be claimed.
