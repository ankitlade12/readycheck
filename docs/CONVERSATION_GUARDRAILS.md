# Conversation control and enforcement

ReadyCheck must distinguish a natural acknowledgment from accepting a price, remember what was already answered, and stop when further questions cannot help. A model prompt alone does not enforce those decisions.

## What runs now

The server compiles each approved task into a versioned conversation policy. It orders core fit before money and timing, separates hard limits from preferences, excludes derived up-front cash from independent questions, and limits a focused follow-up to its approved fields. The policy, context and questions are frozen in the existing approved payload and hash. This replaces the growing list of separate caller-prompt patches.

The application enforces these boundaries in code:

- Recorded recipient refusal or explicit uncertainty blocks repeat contact for that saved inquiry, including direct API requests. Preparation, approval and dispatch each check current evidence. The check is conservative and also inspects preserved earlier transcript sources; it is not a general semantic consent classifier.
- Reusing an initial inquiry for an existing recipient is rejected; a follow-up must be explicitly scoped.
- An extracted USD value that disagrees with one recognized, explicit dollar amount in its source quote is excluded and displayed as a price-interpretation warning. Supported examples include `$1,000`, `1000 dollars`, `one thousand dollars`, and the recovered speech form `Thousand dollars.`. The evaluator also withholds older reviewed facts whose values contradict a recognized literal quote. Multiple amounts, shorthand and unsupported currencies are not guessed. This does not validate arbitrary natural-language arithmetic or replace human evidence review.
- The existing evaluator requires supported, current, reviewed live facts. Caller acknowledgments, provider completion flags and vague replies cannot make the request pass. Original budget limits cannot be changed by a recipient.

These checks do not stop an already active CALL-E call or change words already spoken. Existing uncertain dispatches remain reserved and cannot be retried automatically.

## Executable local conversation controller

`src/domain/conversation.ts` also provides `startConversation` and `respond`. Their state remembers the pending field, answered/unknown fields, one clarification, consecutive unanswered replies and a turn limit. The controller returns one action: ask, answer from context, clarify, or end. Once ended, it cannot restart from another reply.

Recognized branches include explicit refusal, unknown core fit, excessive price, failed dates, a budget or identity question, and attempts to change the task or make a transaction. Unrecognized answers receive at most one clarification and then remain unknown. This is a bounded English rehearsal interpreter, not a general language model, speech-recognition system or proof that all possible answers are handled. It never creates verified application facts or books anything.

Run `npm run rehearse` to produce `artifacts/conversation-rehearsal.md`. The scenarios are fictional, use no model or telephony requests, and expose actual controller responses. The regression suite separately checks money conversion, uncertainty, context questions, preferences, scope changes, focused questions, terminal states and API contact gates.

## CALL-E boundary

The [official developer API](https://docs.heycall-e.com/openapi/calle.openapi.yaml) documents asynchronous call creation, task reads and terminal-event delivery. The inspected contract does not expose a per-turn callback to approve the next utterance or an active-call speech-interruption operation. CALL-E therefore receives the compiled policy as instructions; it does **not** currently invoke ReadyCheck's local controller before speaking.

Hard control of live speech requires a supported provider hook that submits each recipient turn to the controller and uses its approved response/end action, or a different voice runtime with that control. That connection is not implemented. Do not describe the rehearsal runner or post-call checks as a live speech firewall. The missing task ID has been recovered by an exact-body, same-key operator replay. Its transcript confirms continued questioning after an excessive price; the amount was extracted correctly. New CALL-E voice behavior still needs a separately authorized live test. See [provider integration request](CALLE_CONTROL_REQUEST.md) for the reviewed API surfaces and required integration checks.
