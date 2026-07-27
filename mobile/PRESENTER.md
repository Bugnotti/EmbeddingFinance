# Startup Companion Demo Runbook

## Before the demo

1. Start the preview with `npm start` and open the app in Expo Go, or open the
   web preview at `http://localhost:8081`.
2. Open Profile and tap **Restore sample startup**.
3. Return to Journey and confirm that NeighbourFix is in the Validate stage.
4. Keep the device in portrait mode and set text size to the standard setting.

## Five-minute story

### 1. Set the context

Say: “Startup Companion turns the startup process into a sequence of small
decisions and useful outputs. We’ll follow NeighbourFix, a local repair
marketplace.”

Show the Journey tab. Point out the current stage, progress percentage, and
the single recommended next action. Avoid opening every milestone; the value is
the guidance, not the number of screens.

### 2. Learn, then do

Tap **Continue** on **Test your riskiest assumption**. Read the short lesson
headline, then tap **Try it now**. Enter or keep this example:

```text
Assumption: Homeowners struggle to find reliable repair help quickly.
Customer: Busy homeowners in urban neighborhoods.
```

Tap **Complete task**. Highlight the completion feedback and the newly active
customer interview milestone. This is the core learning-to-execution moment.

### 3. Show the work product

Open Workspace and select **Value Proposition Canvas**. Point out that the
artifact is structured, editable, and connected to the founder’s work rather
than being a blank document template.

Tap **Review with Coach**. Use **Review my canvas** or ask **What should I do
next?**. Emphasize that the preview gives specific prompts and next actions;
live AI is intentionally outside this mockup.

### 4. Close with continuity

Open Metrics and show progress, interviews, experiments, and the sample runway.
Clarify that these values are illustrative. Finish in Profile, where the demo
can be reset or restored for the next person.

## One-minute version

Restore sample data, show Journey progress, open the active task, complete it,
open the Value Proposition Canvas, and ask Coach for a review. Skip the lesson
reading and Metrics unless a question leads there.

## Recovery steps

| Situation | Action |
| --- | --- |
| Demo opens at Welcome | Profile is unavailable; use the setup flow or restart and restore sample data once tabs appear |
| Previous presenter data appears | Profile -> **Reset demo data**, then **Restore sample startup** |
| iPhone cannot find the project | Put computer and phone on the same Wi-Fi, then restart with `npx expo start --tunnel` |
| Web server is unavailable | Run `EXPO_OFFLINE=1 npx expo export --platform web`; serve `mobile/dist` on a local static server |
| Coach takes too long | Wait for the visible response state, or go back and return to the artifact |
| User enters a long idea | Keep the entry; the form scrolls and the prototype stores it locally |

## Important framing

- This is a UI prototype with local sample data.
- Coach feedback is deterministic and does not call a model.
- Financial and legal screens are educational examples, not advice or live data.
- Do not enter confidential founder, customer, financial, or legal information.
