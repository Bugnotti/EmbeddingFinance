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

- [ ] Create the Expo project in `mobile/`.
- [ ] Confirm strict TypeScript configuration.
- [ ] Configure Expo Router and the `src/app/` layout.
- [ ] Install AsyncStorage, Zustand, Lucide icons, Reanimated, and Haptics.
- [ ] Configure ESLint and Prettier.
- [ ] Add useful npm scripts for start, web, Android, lint, typecheck, and test.
- [ ] Add environment and generated files to `.gitignore`.
- [ ] Configure application name, slug, orientation, and supported platforms.
- [ ] Add a temporary splash color and icon asset.
- [ ] Add a top-level error boundary.
- [ ] Verify Fast Refresh.
- [ ] Write `mobile/README.md` with setup and run commands.

### Suggested scripts

```json
{
  "scripts": {
    "start": "expo start",
    "web": "expo start --web",
    "android": "expo start --android",
    "lint": "expo lint",
    "typecheck": "tsc --noEmit",
    "test": "jest"
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

- [ ] Define semantic color tokens.
- [ ] Define spacing, typography, radius, border, elevation, and motion tokens.
- [ ] Add safe-area and keyboard-avoidance conventions.
- [ ] Implement `AppText` with accessible type variants.
- [ ] Implement primary, secondary, destructive, and text button variants.
- [ ] Implement `IconButton` with tooltip support on web.
- [ ] Implement form label, input, helper, and error states.
- [ ] Implement progress bar and status badge.
- [ ] Implement screen header and bottom action area.
- [ ] Implement loading skeleton and empty state.
- [ ] Build the four-tab shell with Lucide icons.
- [ ] Configure stack presentation for details and modals.
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

- [ ] Define `Startup`, `JourneyStage`, `Milestone`, `Lesson`, `Task`,
  `Artifact`, `Metric`, `CoachMessage`, and `Achievement` types.
- [ ] Create IDs as constants rather than repeated string literals.
- [ ] Add seed startup and roadmap fixtures.
- [ ] Add roadmap variations for Italy, the UK, and the US.
- [ ] Add lesson and task fixtures.
- [ ] Add artifact and metric fixtures.
- [ ] Add deterministic Coach response fixtures.
- [ ] Define repository and Coach service interfaces.
- [ ] Implement mock services with configurable artificial latency.
- [ ] Implement the Zustand demo store.
- [ ] Add AsyncStorage persistence.
- [ ] Version the persisted state schema.
- [ ] Add a migration and invalid-state fallback.
- [ ] Implement reset and restore-sample-data actions.
- [ ] Implement selectors for current stage, progress, next action, and unlocked
  milestones.
- [ ] Unit test calculations and state transitions.

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

- [ ] Build the Welcome screen.
- [ ] Add primary start action.
- [ ] Add resume action when saved progress exists.
- [ ] Build the startup setup form.
- [ ] Add startup name, idea, industry, and country fields.
- [ ] Use an option menu or searchable picker for industry and country.
- [ ] Add inline validation and helpful error messages.
- [ ] Preserve form input when navigating back.
- [ ] Add a review step only if usability testing shows it is necessary.
- [ ] Generate the local roadmap through the repository.
- [ ] Show a short loading transition while the roadmap is prepared.
- [ ] Route to Journey and focus the next recommended action.
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

- [ ] Build the Journey header with startup name, stage, and overall progress.
- [ ] Add the next recommended action.
- [ ] Build the vertical roadmap.
- [ ] Implement locked, available, in-progress, and completed milestone states.
- [ ] Add stage section headers.
- [ ] Add progress summary and optional streak display.
- [ ] Make available milestones navigable.
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

- [ ] Build the lesson screen with title, estimated time, sections, and progress.
- [ ] Keep lesson content concise and scannable.
- [ ] Add a single continue action into the practical task.
- [ ] Build the riskiest-assumption task as a structured form.
- [ ] Ask for target customer, assumed problem, current alternative, and evidence.
- [ ] Add examples as helper content without pre-filling the answer.
- [ ] Validate required task fields.
- [ ] Save an in-progress draft locally.
- [ ] Add a review state before completion if it improves clarity.
- [ ] Implement idempotent task completion.
- [ ] Update roadmap, metrics, and artifact context from the completion action.
- [ ] Add haptic feedback on supported physical devices.
- [ ] Add a restrained completion transition.
- [ ] Respect reduced-motion preferences.
- [ ] Present the newly unlocked milestone.
- [ ] Return the user to the relevant Journey position.
- [ ] Unit test task completion and unlocking.
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

- [ ] Build the Workspace overview.
- [ ] Group artifacts by planning, validation, finance, pitch, and legal areas.
- [ ] Display not-started, draft, needs-review, and complete statuses.
- [ ] Add an informative empty state.
- [ ] Build the Value Proposition Canvas editor.
- [ ] Use structured fields for customer jobs, pains, gains, products, pain
  relievers, and gain creators.
- [ ] Pre-populate appropriate fields from the completed assumption task.
- [ ] Autosave edits to local state.
- [ ] Show a compact last-saved indicator.
- [ ] Add a review-with-Coach action.
- [ ] Add a confirmation flow for discarding an unsaved invalid change.
- [ ] Build preview states for P1 artifacts.
- [ ] Add the country-specific legal checklist preview.
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

- [ ] Build the Coach screen and message list.
- [ ] Add startup and artifact context header.
- [ ] Add suggested prompt actions.
- [ ] Implement a message composer.
- [ ] Add sending, loading, response, and recoverable error states.
- [ ] Return deterministic responses based on prompt intent and current context.
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

- [ ] Build the Metrics overview.
- [ ] Add interviews, experiments, artifacts, and journey-progress metrics.
- [ ] Add illustrative revenue, expenses, and runway values.
- [ ] Label sample financial values clearly.
- [ ] Use simple bars, trends, or progress visuals rather than complex charts.
- [ ] Add accessible text equivalents for every visual metric.
- [ ] Update at least one metric after the P0 task completes.
- [ ] Build the Profile screen.
- [ ] Display startup identity and selected operating country.
- [ ] Add a non-functional notification preference toggle with local state.
- [ ] Add educational-content and privacy notices.
- [ ] Add reset-demo confirmation.
- [ ] Add restore-sample-data action for presenters.
- [ ] Add application version and build identifier.

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

- [ ] Run lint, typecheck, and all tests.
- [ ] Remove console warnings and unhandled promise rejections.
- [ ] Verify every interactive control has an accessible name and role.
- [ ] Verify logical screen-reader order.
- [ ] Announce validation errors and completion state changes.
- [ ] Verify contrast for text, icons, borders, and focus indicators.
- [ ] Test large text and bold text settings.
- [ ] Test reduced-motion behavior.
- [ ] Test slow mock-service latency.
- [ ] Test offline launch after the initial bundle has loaded.
- [ ] Test empty, loading, complete, locked, and error states.
- [ ] Test small, standard, and large phone widths.
- [ ] Check keyboard behavior on every form.
- [ ] Check safe areas on a notched iPhone.
- [ ] Check Android system back behavior.
- [ ] Verify web pointer, hover, and keyboard interaction.
- [ ] Confirm no screen contains dead or misleading actions.
- [ ] Run the full demo twice after a clean reset.
- [ ] Run the full demo after restoring sample data.
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

- [ ] Finalize `mobile/README.md`.
- [ ] Document installation and start commands.
- [ ] Document iPhone QR-code setup and tunnel fallback.
- [ ] Document reset and restore-sample-data controls.
- [ ] Add a five-to-seven-minute presenter script.
- [ ] Add a one-minute abbreviated presenter path.
- [ ] Document known limitations.
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
- [ ] `AppText`
- [ ] `AppButton`
- [ ] `IconButton`
- [ ] `ScreenHeader`
- [ ] `BottomAction`
- [ ] `Divider`
- [ ] `LoadingSkeleton`
- [ ] `EmptyState`
- [ ] `ErrorState`

### Forms

- [ ] `FormField`
- [ ] `TextAreaField`
- [ ] `OptionPicker`
- [ ] `CheckboxRow`
- [ ] `ToggleRow`
- [ ] `FieldError`
- [ ] `CharacterCount`

### Journey

- [ ] `JourneyHeader`
- [ ] `NextAction`
- [ ] `StageHeader`
- [ ] `MilestoneRow`
- [ ] `ProgressBar`
- [ ] `ProgressRing`
- [ ] `LockedReason`
- [ ] `CompletionPanel`
- [ ] `AchievementBadge`

### Workspace

- [ ] `ArtifactRow`
- [ ] `ArtifactStatus`
- [ ] `ArtifactSection`
- [ ] `AutosaveStatus`
- [ ] `CanvasSection`
- [ ] `LegalChecklistRow`

### Coach

- [ ] `CoachContextHeader`
- [ ] `MessageBubble`
- [ ] `PromptSuggestion`
- [ ] `MessageComposer`
- [ ] `TypingIndicator`
- [ ] `ReviewSection`

### Metrics

- [ ] `MetricTile`
- [ ] `MetricTrend`
- [ ] `SimpleBarChart`
- [ ] `RunwaySummary`
- [ ] `SampleDataNotice`

## 11. State and Service Backlog

### Store actions

- [ ] `completeOnboarding`
- [ ] `updateStartup`
- [ ] `saveTaskDraft`
- [ ] `completeTask`
- [ ] `saveArtifact`
- [ ] `requestArtifactReview`
- [ ] `appendCoachMessage`
- [ ] `setPreference`
- [ ] `restoreSampleData`
- [ ] `resetDemo`
- [ ] `hydrate`
- [ ] `migrate`

### Selectors

- [ ] `selectCurrentStartup`
- [ ] `selectCurrentStage`
- [ ] `selectOverallProgress`
- [ ] `selectStageProgress`
- [ ] `selectNextAction`
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
