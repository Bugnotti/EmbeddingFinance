# Startup Companion Mobile Mockup Plan

## 1. Purpose

This plan turns [IDEA.md](./IDEA.md) and
[ARCHITECTURE.md](./ARCHITECTURE.md) into an executable roadmap for an
interactive mobile mockup.

The result will be a polished Expo application that runs from Linux in a browser,
an Android emulator, and Expo Go on a physical iPhone. It will demonstrate how a
founder moves from an initial startup idea to a personalized roadmap, completes
a practical validation task, creates a startup artifact, receives mock AI
feedback, and sees measurable progress.

The mockup is intended to:

- communicate the product vision to partners, early users, and investors;
- test the core navigation and founder journey;
- validate whether learning plus execution feels coherent;
- establish a reusable mobile design and code foundation;
- avoid premature backend, AI, legal, billing, and infrastructure work.

## Implementation Status: 2026-07-28

The P0 mobile demo is implemented in `mobile/` and currently runs as an Expo
application with local fixtures. The verified flow is Welcome -> Setup ->
Journey -> Lesson -> Task -> Completion -> Workspace -> Artifact -> Coach ->
Metrics.

Completed:

- Expo project bootstrap, strict TypeScript, Expo Router, app config, and scripts.
- Expo SDK 54 alignment for physical-device Expo Go compatibility.
- Shared semantic tokens, buttons, forms, progress, status, and tab navigation.
- Local Zustand state with explicit AsyncStorage persistence, reset, and sample
  restore.
- Welcome, onboarding, Journey, Workspace, Metrics, Profile, Lesson, Task,
  Artifact, and Coach routes.
- P0 assumption task with idempotent completion and milestone transition.
- Value Proposition Canvas editing and local demo Coach interaction.
- A playful non-green visual direction with a sky palette, a winding roadmap,
  clouds, colored stage nodes, and a matching mini-roadmap on the welcome screen.
- ESLint, strict typecheck, five domain tests, and web static export.
- Developer README and presenter runbook.

The mockup is functional again, but its visual design is **not approved** and the
current UI must still be treated as an iteration rather than a finished design.
The user explicitly considers several elements unattractive and wants a more
iconic, cartoonized, Duolingo-like experience.

## Current Checkpoint: Web Interactions Restored, Visual Audit In Progress

### Critical interaction regression found and fixed

The web app looked rendered but all React Native `Pressable` controls were inert.
The server-rendered HTML remained visible, which made this look like a button
problem, but the browser bundle was actually crashing before React hydration:

```text
SyntaxError: Cannot use 'import.meta' outside a module
```

The invalid syntax came from `zustand@5.0.14`'s middleware bundle, which left
`import.meta.env` inside Expo's classic browser script. The store no longer
imports `zustand/middleware`; it now uses the core Zustand store with a small,
explicit AsyncStorage hydration and persistence adapter. The served and
production bundles no longer contain executable `import.meta.env` syntax.

A second returning-user failure was also fixed. The welcome route previously
called `router.replace` before Expo Router's root layout had mounted. It now uses
Expo Router's declarative `Redirect`, and both fresh-user and persisted-user
entry paths work without a runtime error.

### Browser interaction audit completed

The following flow was exercised in a real headless Chrome session through the
Chrome DevTools Protocol, rather than inferred from static HTML:

1. Open the fresh welcome screen and activate `Start building`.
2. Open the industry selector and confirm that its choices render.
3. Fill and submit onboarding.
4. Activate the Journey `Continue` action.
5. Open the lesson and practical task.
6. Fill and complete the assumption task.
7. Confirm progress changes from 34% to 45%.
8. Return to Journey and switch to Workspace.
9. Open the Value Proposition Canvas and confirm field autosave behavior.
10. Reopen `/` with persisted data and confirm redirection to Journey.
11. Clear local storage and confirm the fresh welcome path returns.

No new browser runtime exceptions occurred after the fixes.

### Visual work completed tonight

- Replaced the green-led palette with centralized playful and sunset palette
  options in `src/constants/theme.ts`; the active palette is `playful`.
- Rebuilt Journey around a winding, connected path with sky, cloud, sun, stage
  color, progress, locked, current, and completed states.
- Increased roadmap row spacing so node labels and badges no longer collide with
  the next stop.
- Removed an initials bubble that overlapped Journey progress metadata.
- Replaced the welcome screen's plain white preview card with a compact,
  cartoon-like founder mini-roadmap.
- Confirmed the primary welcome action remains inside a 390 x 844 first viewport.
- Reviewed phone-sized screenshots for Welcome, Onboarding, Journey, and
  Workspace.

### First visual slice completed: Welcome and Journey

The first incremental polish pass was completed on 2026-07-28:

- Added a single `activePalette` switch so visual experiments can move between
  the playful and sunset palettes without rewriting consumers.
- Added shared `SkyCloud` geometry so the cartoon clouds are consistent and do
  not depend on clipped filled icon bounds.
- Replaced raw Welcome/Journey colors with semantic palette tokens, including
  path and sky border colors.
- Fixed the Welcome mini-roadmap SVG so its path stays connected to its nodes
  on both phone and desktop widths.
- Confirmed the Welcome action navigates to Onboarding in the browser after the
  visual changes.
- Generated and added the reusable transparent mascot asset at
  `mobile/assets/images/mascots/startup-cat.png`.
- Added `MascotGuide`, a reusable animated Pixel companion that gently bobs,
  respects reduced-motion settings, opens and closes its speech bubble on tap,
  and announces new guidance when its message changes.
- Rebuilt Onboarding as a responsive guided setup flow: a focused single-column
  mobile layout and a two-column guide-plus-form workspace at 760px and above.
- Integrated the animated guide into Onboarding and the Journey next-action
  surface. Pixel now reacts to industry and country choices and gives useful
  validation feedback after an incomplete submission.

Verification completed for this slice:

- Phone screenshots: 390 x 844 Welcome and Journey.
- Desktop screenshots: 1440 x 900 Welcome and Journey.
- Browser runtime check: no exceptions; `Start building` reaches Onboarding.
- Onboarding browser check: mascot renders at phone and desktop widths, and the
  `Build my roadmap` control remains present.
- Mascot interaction check: tapping Pixel hides and reopens the dialogue;
  industry, country, and validation actions update its message with no browser
  runtime exceptions.
- Journey browser check: Pixel, the dialogue, and `Continue` render at phone
  and desktop widths; Journey expands to a wider desktop content layout.
- Returning-session visibility check: the mascot is also present on Journey so
  persisted demo data does not hide it behind the onboarding route.
- `npm run typecheck`, `npm run lint`, five Jest tests, and web export all pass.

Responsive work is now a shared rollout rather than an isolated Onboarding fix.
The next pass should carry the same breakpoints, comfortable spacing, and
responsive content widths through Welcome, Lesson, Task, Workspace, Artifact,
Coach, Metrics, and Profile. Treat this as an explicit remaining task: the
application is materially improved on phone and desktop, but not every route
has been individually reviewed at all widths yet.

### Verification at pause

Run from `mobile/`:

```text
npm run typecheck       pass
npm run lint            pass
npm test -- --runInBand pass: 5 tests
npx expo export --platform web
                        pass: 16 static routes, 3.01 MB web bundle
git diff --check        pass
```

The isolated Expo server on port 8083 and the headless Chrome audit session on
port 9223 were stopped before pausing. No audit server should be running.

### Known issues and next steps

Resume in this order:

1. Continue the visual audit screen by screen. Treat the current playful UI as a
   direction test, not final polish. Review Welcome, Onboarding, Journey,
   Lesson, Task, Workspace, Artifact, Coach, Metrics, and Profile at phone and
   desktop widths.
2. Ask for concrete feedback on the least successful elements and compare a
   small number of coherent visual directions before another broad restyle.
3. Finish the interaction matrix for Coach, Profile alerts, reset and restore,
   filters, locked milestones, Metrics, back navigation, validation errors, and
   repeated task completion.
4. Add an automated browser smoke test that fails when React hydration breaks;
   static export alone did not detect the dead-button regression.
5. Investigate two non-blocking development warnings observed in Expo output:
   deprecated `props.pointerEvents` usage and one transient
   `Unexpected text node: .` server-render warning. Neither produced a browser
   exception during the final walkthrough.
6. Run the full physical iPhone UX checklist and Android emulator validation,
   followed by accessibility, large-text, reduced-motion, and keyboard checks.
7. Add an app error boundary and explicit loading, corrupted-storage, and
   recovery states before calling the mockup handoff-ready.

Current edits are uncommitted. Preserve the working tree and continue from the
present files rather than resetting the UI audit changes.

## 2. Success Outcome

At the end of this plan, a tester should be able to complete the following story
without explanation from the person presenting the app:

1. Open the application and understand that it helps build a startup.
2. Enter a startup name, idea, industry, and operating country.
3. Receive a personalized six-stage startup roadmap.
4. See the recommended next action and open it.
5. Read a short lesson about customer assumptions.
6. Complete a practical validation task.
7. See progress increase and the next milestone unlock.
8. Open the workspace and edit a Value Proposition Canvas.
9. Ask the mock AI coach to review the artifact.
10. Receive useful, contextual feedback and suggested improvements.
11. Open the Metrics tab and see the activity reflected in the startup overview.
12. Close and reopen the app without losing demo progress.

The experience must feel like a working product rather than a slide deck. Buttons,
forms, tabs, progress states, and navigation must behave consistently even where
the underlying content is mocked.

## 3. Delivery Strategy

Build one complete vertical slice before adding breadth.

The slice is:

```text
Welcome
  -> Startup setup
  -> Personalized journey
  -> Lesson
  -> Practical task
  -> Completion and unlock
  -> Workspace artifact
  -> Mock AI review
  -> Updated metrics
```

Each phase ends with a reviewable increment. A phase is complete only after its
acceptance checks pass; creating the files alone is not completion.

### Priority definitions

| Priority | Meaning |
| --- | --- |
| P0 | Required for the primary demo story |
| P1 | Important for a convincing, resilient mockup |
| P2 | Valuable follow-up after the main flow is stable |
| Out | Deliberately excluded from this mockup |

## 4. Assumptions

- One engineer is implementing the first mockup.
- The project will be created under `mobile/`.
- Expo Go on a physical iPhone is the primary iOS test environment.
- The mockup supports one local user and one startup at a time.
- English is the only interface language in the first version.
- The initial country fixtures are Italy, the United Kingdom, and the United
  States.
- Legal content is illustrative and visibly presented as educational, not legal
  advice.
- All AI responses are deterministic local fixtures with a simulated delay.
- Financial and traction data are illustrative local fixtures.
- No personal or commercially sensitive data should be entered during demos.
- Light mode is the initial visual target. System dark mode support is P2.
- The interface targets portrait phone layouts first while remaining usable on
  wider screens.

## 5. Product Decisions Needed

The following decisions improve the final polish but do not block initial
development. Use the defaults below until the team replaces them.

| Decision | Working default | Needed by |
| --- | --- | --- |
| Product name | Startup Companion | Phase 1 |
| App icon | Temporary monogram | Phase 10 |
| Primary demo startup | A local service marketplace | Phase 3 |
| Primary country | Italy | Phase 3 |
| Brand action color | Accessible medium blue | Phase 2 |
| Progress color | Accessible green | Phase 2 |
| Writing voice | Clear, encouraging, direct | Phase 2 |
| AI coach name | Coach | Phase 8 |

Changing these defaults should be isolated to constants, assets, and fixtures.
No screen should hard-code the product name, country names, or brand colors.

## 6. Scope

### P0: Required

- Welcome and resume states.
- Startup setup form.
- Country-specific roadmap selection.
- Four-tab application shell.
- Six-stage journey with milestone states.
- One complete lesson.
- One complete practical task.
- Progress calculation and milestone unlocking.
- Workspace overview.
- One editable Value Proposition Canvas artifact.
- Mock AI coach review.
- Metrics overview with sample data.
- Profile and reset-demo action.
- Local persistence.
- Loading, empty, validation, and recoverable error states.
- Responsive layout and iPhone safe-area support.
- Accessibility labels, roles, focus behavior, and reduced-motion handling.

### P1: Important

- Additional read-only lessons and artifact previews.
- Streak and achievement presentation.
- Haptic feedback for meaningful completion actions.
- Subtle completion animation.
- Country-specific legal checklist examples.
- Demo mode reset and sample-data restore.
- Offline-safe behavior.
- Focused unit and component tests.
- A presenter runbook.

### P2: Follow-up

- Dark mode.
- Tablet-specific layouts.
- Additional demo countries.
- More editable artifacts.
- A basic pitch deck preview.
- Optional seeded demo personas.
- Screenshot automation.
- Development build and custom app icon.

### Out of scope

- Real authentication or user accounts.
- Backend database or cloud file storage.
- Live OpenAI or other model calls.
- Generated legal documents.
- Authoritative country-specific legal guidance.
- Payments, subscriptions, or paywalls.
- Push notifications.
- Investor, mentor, or accelerator marketplace.
- Multi-user collaboration and permissions.
- Real bank, accounting, CRM, or analytics integrations.
- App Store or Play Store submission.
- Production security and compliance certification.

## 7. Information Architecture

### Root routes

| Route | Purpose | Priority |
| --- | --- | --- |
| `/` | Resolve welcome, onboarding, or saved session | P0 |
| `/onboarding/welcome` | Introduce the product and begin | P0 |
| `/onboarding/startup` | Collect startup information | P0 |
| `/(tabs)/journey` | Show roadmap and next action | P0 |
| `/(tabs)/workspace` | Show startup artifacts | P0 |
| `/(tabs)/metrics` | Show business and progress metrics | P0 |
| `/(tabs)/profile` | Show startup settings and reset | P0 |
| `/lesson/[lessonId]` | Present lesson content | P0 |
| `/task/[taskId]` | Complete a practical activity | P0 |
| `/artifact/[artifactId]` | View or edit an artifact | P0 |
| `/coach` | Chat with the mocked AI coach | P0 |
| `/achievement/[achievementId]` | Show an earned achievement | P1 |

### Navigation rules

- Onboarding is a stack and does not show bottom tabs.
- Completing onboarding replaces the stack with the tab shell.
- The Journey tab is the default signed-in location.
- Lessons, tasks, artifacts, and Coach open above the tab shell.
- Back always returns to the place that launched the detail screen.
- Completing a task returns to Journey after the completion feedback.
- Reopening the app restores the correct onboarding or tab state.
- Resetting the demo clears persisted state and returns to Welcome.

## 8. Demo Content Plan

### Seed startup

Use one well-developed fixture so every screen tells a consistent story:

```text
Name: NeighbourFix
Idea: A marketplace connecting residents with trusted local repair professionals.
Industry: Local services marketplace
Country: Italy
Stage: Validate
Current goal: Validate the most urgent homeowner repair problems.
```

The fixture is not a product recommendation. It is a neutral scenario that makes
customer discovery, personas, marketplace assumptions, metrics, and local
administrative steps easy to demonstrate.

### Roadmap stages

| Stage | Core question | Example milestone |
| --- | --- | --- |
| Idea | What problem are we solving? | Define the problem and target user |
| Validate | Do customers experience this problem? | Complete five customer interviews |
| Plan | How will the business create value? | Draft the business model canvas |
| Build | What is the smallest useful product? | Define MVP scope |
| Launch | How will the first customers arrive? | Prepare a launch experiment |
| Grow | What should the company measure and improve? | Create a growth dashboard |

### Initial lessons

| ID | Title | Interaction | Priority |
| --- | --- | --- | --- |
| `problem-assumptions` | Turn beliefs into testable assumptions | Read and continue | P0 |
| `customer-interviews` | Ask questions without bias | Read and continue | P1 |
| `value-proposition` | Connect customer pain to value | Read and continue | P1 |
| `mvp-scope` | Reduce an idea to a useful experiment | Preview only | P1 |

### Initial tasks

| ID | Title | Input | Result |
| --- | --- | --- | --- |
| `write-assumption` | Write the riskiest assumption | Short structured form | Unlock customer interviews |
| `prepare-interview` | Prepare an interview guide | Checklist and questions | Update validation progress |
| `record-interview` | Record one interview | Notes and signals | Increment interview metric |

Only `write-assumption` must be fully functional for the first vertical slice.
The other tasks can use convincing preview states until the P0 flow is stable.

### Workspace artifacts

| Artifact | Mockup behavior | Priority |
| --- | --- | --- |
| Value Proposition Canvas | Fully editable structured form | P0 |
| Customer Persona | Populated preview | P1 |
| Interview Plan | Populated preview | P1 |
| Business Model Canvas | Status and preview | P1 |
| MVP Scope | Locked or not started | P1 |
| Financial Projection | Sample summary | P1 |
| Pitch Deck | Not started state | P1 |
| Legal Checklist | Country-specific list | P1 |

## 9. Phase Plan

## Phase 0: Product and Content Alignment

### Goal

Remove avoidable ambiguity before implementation while preserving the ability to
start with the working defaults.

### Tasks

- [ ] Confirm or replace the working product name.
- [ ] Confirm the initial presentation audience.
- [ ] Confirm the three demo countries.
- [ ] Review the NeighbourFix seed startup.
- [ ] Agree on the six journey stages and their order.
- [ ] Approve the first lesson, task, and artifact for the vertical slice.
- [ ] Define the desired demo length; target five to seven minutes.
- [ ] Collect any existing logo, font, color, or brand references.
- [ ] Write the educational-content disclaimer.
- [ ] Decide whether financial figures should use euros for the primary demo.

### Deliverables

- Approved working defaults or documented replacements.
- Final primary demo story.
- Content checklist for the lesson, task, Coach response, and artifact.

### Exit criteria

- A presenter can describe the complete demo story in under one minute.
- The selected story demonstrates learning, execution, AI help, and progress.
- No screen in the main path depends on unwritten content.

## Phase 1: Project Bootstrap

### Goal

Create a reproducible Expo TypeScript project that runs on all three development
targets.

### Tasks

- [x] Create the Expo project in `mobile/`.
- [x] Confirm strict TypeScript configuration.
- [x] Configure Expo Router and the `src/app/` layout.
- [x] Install AsyncStorage, Zustand, Lucide icons, Reanimated, and Haptics.
- [x] Configure ESLint.
- [ ] Add Prettier configuration.
- [x] Add useful npm scripts for start, web, Android, lint, typecheck, and test.
- [x] Add environment and generated files to `.gitignore`.
- [x] Configure application name, slug, orientation, and supported platforms.
- [x] Add a temporary splash color and icon asset.
- [ ] Add a top-level error boundary.
- [ ] Verify Fast Refresh.
- [x] Write `mobile/README.md` with setup and run commands.

### Suggested scripts

```json
{
  "scripts": {
    "start": "expo start",
    "web": "expo start --web",
    "android": "expo start --android",
    "lint": "expo lint",
    "typecheck": "tsc --noEmit",
    "test": "jest --runInBand"
  }
}
```

### Deliverables

- Bootable Expo application.
- Reproducible dependency installation.
- Basic route with a visible build identifier.
- Local development documentation.

### Exit criteria

- `npm install` completes from a clean checkout.
- Lint and typecheck scripts pass.
- The application opens in a Linux browser.
- The application opens in Expo Go on the iPhone.
- The application opens in an Android emulator.
- Editing the first route triggers Fast Refresh on each available target.

## Phase 2: Design Foundation and App Shell

### Goal

Create a consistent interface foundation before building feature screens.

### Tasks

- [x] Define semantic color tokens.
- [x] Define spacing, typography, radius, border, elevation, and motion tokens.
- [x] Add safe-area and keyboard-avoidance conventions.
- [x] Implement `AppText` with accessible type variants.
- [x] Implement primary, secondary, destructive, and text button variants.
- [x] Implement `IconButton` with accessible labels.
- [x] Implement form label, input, helper, and error states.
- [x] Implement progress bar and status badge.
- [x] Implement screen header and bottom action area.
- [ ] Implement loading skeleton and empty state components.
- [x] Build the four-tab shell with Lucide icons.
- [x] Configure stack presentation for details and modals.
- [ ] Add a development-only component gallery route.
- [ ] Check all controls at large text sizes.
- [ ] Verify minimum touch target sizes.
- [ ] Verify visible focus states on web.

### Required semantic tokens

```text
surface.canvas
surface.raised
surface.subtle
text.primary
text.secondary
text.inverse
border.default
action.primary
action.primaryPressed
progress.complete
status.warning
status.danger
status.locked
focus.ring
```

### Deliverables

- Theme token module.
- Reusable UI component set.
- Working bottom tabs and stack navigation.
- Component gallery showing every state.

### Exit criteria

- Screens can be assembled without introducing arbitrary colors or spacing.
- Interactive components show default, pressed, focused, disabled, and loading
  states.
- Text remains readable at 200 percent scaling.
- Tab labels and icons do not shift when selected.
- Content does not overlap status bars, home indicators, or the keyboard.

## Phase 3: Domain Model, Fixtures, and Persistence

### Goal

Create stable data boundaries that support the complete demo without a backend.

### Tasks

- [x] Define the `Startup`, `JourneyStage`, and `Milestone` types used by the P0
  journey.
- [ ] Define `Lesson`, `Task`, `Metric`, `CoachMessage`, and `Achievement` types.
- [ ] Create IDs as constants rather than repeated string literals.
- [x] Add seed startup and roadmap fixtures.
- [ ] Add roadmap variations for Italy, the UK, and the US.
- [ ] Add lesson and task fixture modules; the P0 lesson is currently screen-local.
- [x] Add artifact and metric fixtures.
- [ ] Add deterministic Coach response fixture modules; the first response is
  currently screen-local.
- [ ] Define repository and Coach service interfaces.
- [ ] Implement mock services with configurable artificial latency.
- [x] Implement the Zustand demo store.
- [x] Add AsyncStorage persistence.
- [ ] Version the persisted state schema.
- [ ] Add a migration and invalid-state fallback.
- [x] Implement reset and restore-sample-data actions.
- [x] Implement pure helpers for next action, completion count, and transitions.
- [x] Unit test calculations and state transitions.

### State rules

- Progress is derived from completed required tasks, not independently edited.
- A milestone unlocks when all prerequisite task IDs are complete.
- A stage completes when all required milestones within it are complete.
- Reset removes user-entered data and restores the app to its first-run state.
- Restore sample data loads the NeighbourFix fixture and moves to Journey.
- Unknown persisted fields are ignored.
- Invalid or obsolete persisted data falls back safely rather than crashing.

### Deliverables

- Typed domain modules.
- Complete demo fixture set.
- Mock repository and Coach service.
- Persisted demo store with migrations.
- Unit tests for core state behavior.

### Exit criteria

- The same seed startup appears consistently across all service calls.
- Italy, UK, and US return different legal-checklist examples.
- Completing the P0 task updates derived progress exactly once.
- Restarting the application restores the previous state.
- Reset returns to the Welcome route.
- Corrupt stored state produces a recoverable fresh session.

## Phase 4: Welcome and Startup Setup

### Goal

Let a first-time user create a startup context quickly and understand what happens
next.

### Tasks

- [x] Build the Welcome screen.
- [x] Add primary start action.
- [x] Add resume action when saved progress exists.
- [x] Build the startup setup form.
- [x] Add startup name, idea, industry, and country fields.
- [x] Use an option menu for industry and country.
- [x] Add inline validation and helpful error messages.
- [ ] Preserve form input when navigating back.
- [ ] Add a review step only if usability testing shows it is necessary.
- [x] Generate the local roadmap through the local fixture store.
- [ ] Show a short loading transition while the roadmap is prepared.
- [x] Route to Journey and show the next recommended action.
- [ ] Add component tests for form validation and submission.

### Validation rules

| Field | Rule |
| --- | --- |
| Startup name | Required, 2 to 50 characters |
| Idea | Required, 20 to 500 characters |
| Industry | Required from supported options |
| Country | Required from supported countries |

### Deliverables

- First-run and returning-user Welcome states.
- Validated setup flow.
- Country-aware roadmap initialization.

### Exit criteria

- A user can complete setup with the keyboard alone on web.
- The keyboard does not obscure the focused mobile input.
- Invalid fields explain how to correct the problem.
- Submitting twice does not create duplicate state.
- Returning to the app resumes rather than repeating onboarding.

## Phase 5: Journey Roadmap

### Goal

Make the personalized journey the central, motivating home of the product.

### Tasks

- [x] Build the Journey header with startup name, stage, and overall progress.
- [x] Add the next recommended action.
- [x] Build the vertical roadmap.
- [x] Implement locked, available, in-progress, and completed milestone states.
- [x] Add stage section headers.
- [x] Add progress summary and optional streak display.
- [x] Make the active milestone navigable.
- [ ] Explain prerequisites for locked milestones.
- [ ] Scroll or focus to the active milestone on first entry.
- [ ] Add a compact completion summary for finished milestones.
- [ ] Add Journey empty and recovery states.
- [ ] Test the roadmap with short and long translated-like fixture text.
- [ ] Add component tests for milestone rendering and action routing.

### Deliverables

- Populated six-stage roadmap.
- Active next action.
- Clear locked and completed states.
- Responsive small-phone layout.

### Exit criteria

- The current stage is identifiable without relying only on color.
- The primary next action is visible in the first viewport.
- Locked items cannot be opened accidentally.
- Every enabled milestone opens the correct lesson or task.
- Long titles wrap without resizing or shifting adjacent controls.
- Progress values match the store selectors.

## Phase 6: Lesson, Task, and Completion

### Goal

Demonstrate the central learning-plus-execution loop.

### Tasks

- [x] Build the lesson screen with title, estimated time, sections, and progress.
- [x] Keep lesson content concise and scannable.
- [x] Add a single continue action into the practical task.
- [x] Build the riskiest-assumption task as a structured form.
- [ ] Ask for target customer, assumed problem, current alternative, and evidence.
- [ ] Add examples as helper content without pre-filling the answer.
- [x] Validate required task fields.
- [x] Save an in-progress draft locally.
- [ ] Add a review state before completion if it improves clarity.
- [x] Implement idempotent task completion.
- [x] Update roadmap, metrics, and artifact context from the completion action.
- [ ] Add haptic feedback on supported physical devices.
- [ ] Add a restrained completion transition.
- [ ] Respect reduced-motion preferences.
- [ ] Present the newly unlocked milestone.
- [ ] Return the user to the relevant Journey position.
- [x] Unit test task completion and unlocking.
- [ ] Component test the full lesson-to-completion flow.

### Deliverables

- Complete P0 lesson.
- Complete P0 practical task.
- Visible progress update and milestone unlock.
- Saved draft and completed states.

### Exit criteria

- Leaving and returning to the task restores the draft.
- The task cannot complete with missing required fields.
- Repeated taps produce one completion event.
- Completion persists across an app restart.
- The unlocked milestone is immediately understandable.
- Essential feedback remains clear with animation and haptics disabled.

## Phase 7: Workspace and Artifact Editor

### Goal

Show that work created during the journey becomes reusable startup documentation.

### Tasks

- [x] Build the Workspace overview.
- [ ] Group artifacts by planning, validation, finance, pitch, and legal areas.
- [x] Display not-started, draft, needs-review, and complete statuses.
- [ ] Add an informative empty state.
- [x] Build the Value Proposition Canvas editor.
- [x] Use structured fields for customer jobs, pains, gains, products, pain
  relievers, and gain creators.
- [x] Pre-populate the initial artifact with the demo startup context.
- [ ] Autosave edits to local state while typing; the current P0 save occurs on
  Coach review.
- [ ] Show a compact last-saved indicator.
- [x] Add a review-with-Coach action.
- [ ] Add a confirmation flow for discarding an unsaved invalid change.
- [x] Build preview states for P1 artifacts.
- [x] Add the Italy legal checklist preview.
- [ ] Test long entries, empty fields, and keyboard behavior.

### Deliverables

- Workspace with meaningful artifact statuses.
- Editable Value Proposition Canvas.
- Data reuse between task and artifact.
- Entry point to Coach review.

### Exit criteria

- Completing the assumption task changes the artifact from not started to draft.
- Artifact input survives navigation and restart.
- The editor clearly separates customer and value-map content.
- Long text remains editable without covering actions.
- The Coach receives the current saved artifact context.

## Phase 8: Mock AI Coach

### Goal

Demonstrate useful contextual AI assistance without making live model calls.

### Tasks

- [x] Build the Coach screen and message list.
- [x] Add startup and artifact context header.
- [x] Add suggested prompt actions.
- [x] Implement a message composer.
- [x] Add sending, loading, and response states.
- [ ] Add a recoverable Coach error state and retry action.
- [ ] Return responses from a dedicated fixture/service boundary; the current
  response is deterministic but screen-local.
- [ ] Write a high-quality Value Proposition Canvas review fixture.
- [ ] Structure feedback into strengths, gaps, questions, and next action.
- [ ] Add a retry action.
- [ ] Persist the current demo conversation.
- [ ] Add a clear mock or preview indicator for internal demos.
- [ ] Ensure AI suggestions are not described as legal or financial advice.
- [ ] Test keyboard, message scrolling, and long responses.
- [ ] Test service failure and retry.

### Mock response behavior

| User action | Response |
| --- | --- |
| Review my canvas | Contextual strengths, gaps, and three questions |
| Improve this assumption | A rewritten testable assumption |
| What should I do next? | Link to the next available roadmap action |
| Explain this feedback | Short clarification related to the last review |
| Unknown free text | General contextual coaching response |

### Deliverables

- Interactive Coach conversation.
- Contextual artifact review.
- Suggested prompts and retry state.
- Swappable `CoachService` boundary.

### Exit criteria

- The response mentions actual fixture or user-entered artifact content.
- Sending is disabled for empty input.
- Multiple rapid taps do not duplicate a message.
- The loading state feels responsive but does not block navigation.
- Errors preserve the user message and allow retry.
- No API key or network dependency exists.

## Phase 9: Metrics and Profile

### Goal

Show that the companion remains useful after setup and give presenters reliable
demo controls.

### Tasks

- [x] Build the Metrics overview.
- [x] Add interviews, experiments, artifacts, and journey-progress metrics.
- [x] Add illustrative revenue, expenses, and runway values.
- [x] Label sample financial values clearly.
- [x] Use simple bars, trends, or progress visuals rather than complex charts.
- [ ] Add accessible text equivalents for every visual metric.
- [x] Update at least one metric after the P0 task completes.
- [x] Build the Profile screen.
- [ ] Display startup identity and selected operating country.
- [ ] Add a non-functional notification preference toggle with local state.
- [ ] Add educational-content and privacy notices.
- [x] Add reset-demo confirmation.
- [x] Add restore-sample-data action for presenters.
- [x] Add application version and build identifier.

### Deliverables

- Populated Metrics tab.
- Profile and startup settings.
- Reliable demo reset and restore controls.

### Exit criteria

- Metrics use the same domain state as Journey and Workspace.
- A completed task changes the relevant validation metric.
- Sample financial data cannot be mistaken for a live integration.
- Reset requires confirmation and returns to Welcome.
- Restore sample data produces the same known demo state every time.

## Phase 10: Quality, Accessibility, and Device Hardening

### Goal

Make the mockup dependable enough to hand to a tester or present live.

### Tasks

- [x] Run lint, typecheck, and the current domain tests.
- [ ] Remove console warnings and unhandled promise rejections.
- [ ] Verify every interactive control has an accessible name and role.
- [ ] Verify logical screen-reader order.
- [ ] Announce validation errors and completion state changes.
- [ ] Verify contrast for text, icons, borders, and focus indicators.
- [ ] Test large text and bold text settings.
- [ ] Test reduced-motion behavior.
- [ ] Test slow mock-service latency.
- [ ] Test offline launch after the initial bundle has loaded.
- [ ] Test empty, loading, complete, locked, and error states across every screen.
- [ ] Test small, standard, and large phone widths.
- [ ] Check keyboard behavior on every form.
- [ ] Check safe areas on a notched iPhone.
- [ ] Check Android system back behavior.
- [ ] Verify web pointer, hover, and keyboard interaction.
- [ ] Confirm no screen contains dead or misleading actions.
- [ ] Run the full demo twice after a clean reset.
- [x] Run the full demo after restoring sample data in the web preview.
- [ ] Capture approved reference screenshots.

### Device matrix

| Target | Viewport or device | Required |
| --- | --- | --- |
| Web narrow | 360 x 800 | Yes |
| Web iPhone-sized | 390 x 844 | Yes |
| Web large phone | 430 x 932 | Yes |
| Physical iPhone | Available team device | Yes |
| Android emulator | Current standard Pixel profile | Yes |
| Tablet | 768 px or wider | P2 |

### Deliverables

- Passing validation scripts.
- Completed manual test checklist.
- Approved reference screenshots.
- Prioritized list of accepted limitations.

### Exit criteria

- No P0 functional or visual defects remain.
- No incoherent overlaps, clipped controls, or inaccessible primary actions remain.
- The complete demo works from a fresh state and a seeded state.
- A second person can complete the flow without implementation knowledge.
- The physical iPhone flow has been explicitly approved.

## Phase 11: Demo Packaging and Handoff

### Goal

Make the mockup easy to run, present, and continue developing.

### Tasks

- [x] Finalize `mobile/README.md`.
- [x] Document installation and start commands.
- [x] Document iPhone QR-code setup and tunnel fallback.
- [x] Document reset and restore-sample-data controls.
- [x] Add a five-to-seven-minute presenter script.
- [x] Add a one-minute abbreviated presenter path.
- [x] Document known limitations.
- [ ] Record the exact tested Node and package-manager versions.
- [ ] Confirm a clean checkout can run using the documentation.
- [ ] Tag or otherwise identify the approved demo version.
- [ ] Back up approved screenshots and fixture copy.
- [ ] Create a post-demo feedback template.

### Deliverables

- Runnable approved mockup.
- Presenter runbook.
- Developer setup guide.
- Known-limitations list.
- Feedback capture template.

### Exit criteria

- A new developer can start the project from the README.
- A presenter can reset and prepare the app without developer tools.
- The demo can recover from local-network failure using tunnel mode.
- The approved version and its screenshots are identifiable.

## 10. Detailed Component Backlog

### Foundation

- [ ] `AppScreen`
- [x] `AppText`
- [x] `AppButton`
- [x] `IconButton`
- [x] `ScreenHeader`
- [ ] `BottomAction`
- [ ] `Divider`
- [ ] `LoadingSkeleton`
- [ ] `EmptyState`
- [ ] `ErrorState`

### Forms

- [x] `FormField`
- [ ] `TextAreaField`
- [ ] `OptionPicker`
- [ ] `CheckboxRow`
- [ ] `ToggleRow`
- [ ] `FieldError`
- [ ] `CharacterCount`

### Journey

- [x] `JourneyHeader`
- [x] `NextAction`
- [x] `StageHeader`
- [x] `MilestoneRow`
- [x] `ProgressBar`
- [ ] `ProgressRing`
- [ ] `LockedReason`
- [ ] `CompletionPanel`
- [ ] `AchievementBadge`

### Workspace

- [x] `ArtifactRow`
- [ ] `ArtifactStatus`
- [ ] `ArtifactSection`
- [ ] `AutosaveStatus`
- [ ] `CanvasSection`
- [ ] `LegalChecklistRow`

### Coach

- [x] `CoachContextHeader`
- [x] `MessageBubble`
- [x] `PromptSuggestion`
- [x] `MessageComposer`
- [x] `TypingIndicator`
- [ ] `ReviewSection`

### Metrics

- [x] `MetricTile`
- [x] `MetricTrend`
- [x] `SimpleBarChart`
- [ ] `RunwaySummary`
- [ ] `SampleDataNotice`

## 11. State and Service Backlog

### Store actions

- [x] `completeOnboarding`
- [ ] `updateStartup`
- [x] `saveTaskDraft`
- [x] `completeTask`
- [x] `saveArtifact`
- [ ] `requestArtifactReview`
- [ ] `appendCoachMessage`
- [ ] `setPreference`
- [x] `restoreSampleData`
- [x] `resetDemo`
- [x] `hydrate`
- [ ] `migrate`

### Selectors

- [x] `selectCurrentStartup`
- [x] `selectCurrentStage`
- [ ] `selectOverallProgress`
- [ ] `selectStageProgress`
- [x] `selectNextAction`
- [ ] `selectUnlockedMilestones`
- [ ] `selectArtifactsByGroup`
- [ ] `selectArtifactStatus`
- [ ] `selectValidationMetrics`
- [ ] `selectResumeRoute`

### Service scenarios

- [ ] Normal successful response.
- [ ] Slow successful response.
- [ ] Recoverable failure.
- [ ] Missing fixture.
- [ ] Invalid persisted state.
- [ ] Unsupported country fallback.

## 12. Test Plan

### Unit tests

- Progress is zero for a new startup.
- Completing a task updates progress once.
- Completing prerequisites unlocks the correct milestone.
- Completing unrelated tasks does not unlock a milestone.
- Stage completion is derived correctly.
- Country selection returns the correct roadmap additions.
- Unsupported countries use the generic roadmap.
- Artifact status changes from not started to draft after the related task.
- Reset clears all user state.
- Sample restore produces a deterministic state.
- Persistence migration preserves supported fields.
- Invalid persistence falls back safely.

### Component tests

- Startup setup shows required-field errors.
- Valid startup setup initializes and routes correctly.
- Milestones render every supported status.
- Locked milestones explain their prerequisite.
- Task draft restores after remount.
- Task submission rejects missing data.
- Task completion shows the unlocked milestone.
- Artifact editor autosaves valid input.
- Coach disables empty submissions.
- Coach retry preserves the failed message.
- Reset confirmation requires an explicit destructive action.

### Manual flow tests

1. Fresh installation and first-time setup.
2. Returning session and resume.
3. Primary lesson and task completion.
4. Exit midway through a task and restore the draft.
5. Artifact editing and Coach review.
6. Slow Coach response and navigation away.
7. Coach failure and retry.
8. Country change and legal-checklist update.
9. Reset, cancellation, and confirmed reset.
10. Restore seeded presenter data.
11. Large text, reduced motion, and screen-reader navigation.
12. Offline relaunch with persisted state.

### Visual checks

- No text truncation in buttons or tabs.
- No card contains another card.
- No arbitrary gradients or decorative blobs appear.
- Long words wrap or resize safely.
- Bottom actions remain above the home indicator.
- Focused inputs remain visible above the keyboard.
- Loading content reserves stable dimensions.
- Selected tab state does not shift layout.
- Charts include readable values and labels.
- Error and locked states do not rely on color alone.

## 13. Content Checklist

Every content item must be:

- concise enough for a phone screen;
- written in plain language;
- actionable rather than motivational filler;
- consistent with the seed startup;
- explicit when data is illustrative;
- free from guarantees of business success;
- free from personalized legal, financial, or investment advice;
- reviewed for spelling and terminology;
- tested with long text to protect layout.

### Required copy

- [ ] Welcome title and supporting sentence.
- [ ] Setup field labels and helper text.
- [ ] Six stage descriptions.
- [ ] Primary lesson copy.
- [ ] Primary task instructions and examples.
- [ ] Completion message.
- [ ] Value Proposition Canvas field guidance.
- [ ] Coach suggested prompts.
- [ ] Coach review response.
- [ ] Metrics labels and sample-data notice.
- [ ] Legal educational disclaimer.
- [ ] Reset confirmation.
- [ ] Empty and error messages.

## 14. Accessibility Requirements

- All controls have programmatic labels and roles.
- Icon-only controls include accessible names.
- Decorative icons are hidden from assistive technology.
- Screen titles receive focus after navigation when appropriate.
- Errors are associated with their fields and announced.
- Completion and unlock events are announced without stealing focus repeatedly.
- Reading order follows the visual order.
- Touch targets are at least 44 x 44 points.
- Text supports platform scaling without clipping.
- Content remains understandable without animation or haptics.
- Color contrast meets WCAG AA.
- Status is communicated through text or icons as well as color.
- Web controls have visible keyboard focus.
- Modal focus is contained and returns to the triggering control.

## 15. Performance Requirements

Performance work should match the mockup’s scale, but the following standards
prevent avoidable demo failures:

- Initial route should display a stable loading or content state immediately.
- Tab changes should not wait on artificial service latency.
- Long roadmap and Coach lists should use efficient list primitives.
- Derived state should use selectors to avoid unnecessary whole-screen renders.
- Fixtures should remain reasonably small and load synchronously.
- Images should be compressed and sized for their display bounds.
- Animations should use native-supported properties.
- Repeated actions should be guarded while requests are pending.
- AsyncStorage writes should be batched or debounced for text editing.

## 16. Risks and Mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Scope expands to the entire platform vision | Core flow remains unfinished | Protect the P0 vertical slice and defer breadth |
| Mock AI feels generic | Demo loses credibility | Make responses reference actual artifact fields |
| Legal examples appear authoritative | Trust and liability concerns | Use illustrative content and a clear disclaimer |
| Browser preview hides iOS problems | Broken physical demo | Test every phase on the real iPhone |
| Expo Go limitation appears later | Native feature cannot be tested | Stay within supported libraries; move to EAS only when required |
| Fixture data becomes inconsistent | Screens tell conflicting stories | Centralize data behind repositories and selectors |
| Persistence schema changes break demos | App fails after an update | Version state and provide migration plus reset |
| Gamification feels childish | Target founders disengage | Use restrained progress and completion feedback |
| Long content breaks layouts | Unusable screens | Test long strings and large type continuously |
| Live presentation network fails | Demo cannot open | Keep local fixtures and prepare tunnel plus seeded state |
| Too many visual dependencies slow work | Inconsistent or fragile UI | Use tokens and a small internal component set |

## 17. Review Gates

### Gate A: Foundation review

Occurs after Phase 2.

- Project runs on required targets.
- Navigation shell and component gallery are approved.
- Tokens and interaction states are stable enough for feature work.

### Gate B: Vertical slice review

Occurs after Phase 6.

- Setup, Journey, lesson, task, completion, and unlock work end to end.
- Progress persists.
- The real-iPhone experience is approved before adding breadth.

### Gate C: Product story review

Occurs after Phase 9.

- Workspace, Coach, Metrics, and Profile complete the narrative.
- Fixture content is consistent and presentation-ready.
- Reset and seeded-demo controls work reliably.

### Gate D: Release review

Occurs after Phase 11.

- P0 quality checks pass.
- Presenter and setup documentation are complete.
- A person outside implementation can run the demo.

## 18. Suggested Schedule

This is a relative estimate for one focused engineer and should be recalibrated
after Phase 1. It is not a delivery commitment.

| Phase | Focus | Estimate |
| --- | --- | --- |
| 0 | Product and content alignment | 0.5 to 1 day |
| 1 | Project bootstrap | 0.5 to 1 day |
| 2 | Design foundation and shell | 2 to 3 days |
| 3 | Domain, fixtures, and persistence | 1.5 to 2 days |
| 4 | Welcome and setup | 1 to 1.5 days |
| 5 | Journey roadmap | 1.5 to 2 days |
| 6 | Lesson, task, and completion | 2 to 3 days |
| 7 | Workspace and artifact | 2 to 3 days |
| 8 | Mock AI Coach | 1.5 to 2 days |
| 9 | Metrics and Profile | 1.5 to 2 days |
| 10 | Quality and device hardening | 2 to 3 days |
| 11 | Packaging and handoff | 0.5 to 1 day |

Expected range: approximately 17 to 24 focused engineering days, depending on
content readiness and the number of visual review cycles.

### Earliest useful checkpoints

- End of Phase 2: navigable visual shell.
- End of Phase 6: testable core concept.
- End of Phase 9: complete investor or user demo story.
- End of Phase 11: handoff-ready mockup.

## 19. Definition of Done

The mobile mockup is done when all of the following are true:

- The complete primary demo story works without manual state manipulation.
- All P0 screens and states are implemented.
- The app runs in web, Android emulator, and Expo Go on a physical iPhone.
- Progress, drafts, artifacts, and Coach messages persist correctly.
- Reset and restore-sample-data actions are dependable.
- There are no known P0 defects.
- Lint, typecheck, and focused automated tests pass.
- Accessibility and responsive checks pass on the defined device matrix.
- Content is consistent and reviewed.
- AI, financial, and legal mock content is labeled appropriately.
- The README and presenter runbook are sufficient for another person.
- Approved screenshots and the demo version are identifiable.

## 20. Post-Mockup Decision

After testing the mockup, evaluate evidence before beginning production work.

The review should answer:

1. Do founders understand the roadmap without explanation?
2. Does the lesson-to-task transition feel useful or burdensome?
3. Which artifact creates the most perceived value?
4. Does the Coach feedback feel specific enough to trust?
5. Is gamification motivating for the intended audience?
6. Which country-specific guidance do users expect first?
7. Do users want to continue into metrics and operations?
8. What would they pay for, and at what point in the journey?

Only after this review should the team choose the first production backend,
authentication model, live AI workflow, legal content process, analytics events,
and subscription design.
