# Decision feature walkthrough

This local review recording uses fictional businesses and responses throughout. It makes no calls and is not proof of live voice quality, extraction accuracy or current business availability. The recording is generated from the working production app with explanatory captions; those captions are recording overlays, not product UI.

Local assets (excluded from the source contribution):

- `artifacts/readycheck-decision-walkthrough.mp4`: captioned screen recording.
- `artifacts/readycheck-decision-walkthrough.webm`: original browser recording.
- `artifacts/record-decisions.mjs`: repeatable local capture script.
- `artifacts/decisions-preview-desktop.png` and `artifacts/decisions-preview-mobile.png`: preview screenshots.

## Reproduce the story

1. Start the app and choose the repair example. Review the $40 budget, service and time requirements; preview the inquiry and load fictional responses.
2. Inspect the comparison: Thread & Trail gives a $35 starting estimate, The Mending Room offers the wrong service, and Everyday Repair Co. confirms an all-in $45 total.
3. Open “What would make this work?” The supported minimum limit is $45. Enter $44 to see that the option still fails. Restore $45 and apply as a new revision. Inspect revision 1 to show the original $40 requirement and unchanged evidence.
4. Create a separate fresh repair example to show the alternative: keeping $40. “The one question left” identifies the missing final total for Thread & Trail.
5. Preview the focused question and load the explicitly fictional follow-up. Its $38 all-in confirmation resolves the price blocker. Inspect the source and correction before recording any human next action.

## Suggested narration

“A starting estimate does not tell me whether my whole request will work. ReadyCheck checks each must-have against the actual evidence. When nothing fits, I have two concrete choices: change a limit using a confirmed quote, or resolve the missing answer. Here, $44 is still insufficient; $45 fits the checked requirements. Applying that choice saves a revision without rewriting the original request or quote. Alternatively, I can keep my budget and ask only for the final total. ReadyCheck preserves what changed and why, and I decide the next action.”

## Final submission work

Replace the relevant section with a consented genuine CALL-E runtime clip, label any role-play and time cuts, and keep fictional results visibly distinct. A real app inquiry already verified transport and transcript persistence but returned zero facts. Revised conversational instructions and positive fact extraction still require live validation. Do not claim the recorded sample establishes those results. Keep the public video below three minutes and provide a working judge-accessible build.
