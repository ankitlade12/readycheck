# ReadyCheck submission preparation

This is a preparation document, not a submitted entry. No public repository PR, hosted production deployment, public demonstration video, or Devpost submission has been created.

## Contribution

Prepared target: `apps/typescript/readycheck/` in [Awesome Phone Call Agents](https://github.com/CALLE-AI/awesome-phone-call-agents), on local branch `feat/readycheck-app`. Current agent and contribution instructions were reviewed and repository validation passed. The clean package includes the app, domain engine, local sample path, README, lockfile, tests and configuration placeholders. It excludes `data/`, `.env`, private installation records, original product documents and `node_modules/`.

Before submission, choose the public contribution license and confirm ownership of the original implementation. Upstream font notices are bundled in `public/notices/`. The current local source does not claim a selected license for the entrant; the destination repository uses MIT.

## Draft project description

ReadyCheck helps someone check whether a local service, rental, or venue meets their entire request. It preserves must-haves, links each decision to its source evidence, and leaves incomplete or conditional answers unresolved. CALL-E handles approved factual inquiries; ReadyCheck owns comparison, persistence, recovery, and human follow-through.

The reusable contribution is a typed requirement evaluator, evidence-backed limit exploration and a bounded inquiry workflow that can ask just the one missing factual question. A limit change becomes a new revision only when the user applies it. Examples include a starting repair estimate that cannot satisfy a hard budget, a rental deposit checked separately from final cost and up-front cash, and a venue whose capacity or entry route blocks the request.

Current proof: local working app, synthetic evaluator fixtures, mocked call recovery and HTTP tests, and browser verification. A separately requested CLI audio test and one app-originated inquiry completed. The app persisted the task ID and transcript, resumed reads after restart, and correctly left zero-fact requirements unresolved. Caller behavior was repetitive; the subsequent instruction changes still need a live test. Positive extraction and contrasting outcomes remain unverified. Do not claim that sample providers represent current businesses or availability.

## Proposed 2:45 demo

| Time      | Show                                                                                                       |
| --------- | ---------------------------------------------------------------------------------------------------------- |
| 0:00–0:20 | The backpack zipper request: deadline, firm $40 budget, drop-off window                                    |
| 0:20–0:50 | Genuine consented CALL-E runtime clip; label any role-play and remove private details                      |
| 0:50–1:20 | Comparison: starting estimate unresolved, wrong service fails, confirmed $45 quote exceeds budget          |
| 1:20–1:50 | “What would make this work?” Preview $45 from the quote; apply a revision and inspect original $40 history |
| 1:50–2:20 | Alternative path: keep $40; preview “The one question left” and inspect its result                         |
| 2:20–2:45 | Saved evidence, human next action and accurately labeled validation results                                |

The local fictional feature recording and its narration are described in `DEMO_WALKTHROUGH.md`. It is a review asset, not the final live-evidence submission video. The two decision paths use separate fresh sample cases so applying $45 does not hide the unresolved $40 scenario.

Label the sample flow as a fictional prototype demonstration; the existing zero-fact live inquiry does not prove the sample’s positive outcomes. A sample recording does not prove actual CALL-E runtime execution. Label role-play, historical recordings, and time cuts. Judge evidence intended to remain available longer than the normal transcript policy needs a separately consented and disclosed retention arrangement.

## Submission checklist

- [ ] Confirm participant eligibility and account registration.
- [ ] Complete at least three contrasting consenting live tests and record operational limitations.
- [ ] Verify actual provider create/read response contract and attempts/billing behavior.
- [ ] Prepare a clean contribution directory and select its license.
- [x] Run the target repository's required validators.
- [ ] Open the contribution PR and include its URL in Devpost.
- [ ] Publish a demonstration video shorter than three minutes.
- [ ] Supply the CALL-E account email and accurate testing instructions.
- [ ] Provide judge-accessible project/test-build access through the end of judging.
- [ ] Check every required link before submitting.

The deadline was rechecked on September 9: September 14, 2026 at 23:45 Singapore time, or 10:45 a.m. Chicago time. Verify against the [current rules](https://call-e.devpost.com/rules) before submission. Aim to finish assets September 13.
