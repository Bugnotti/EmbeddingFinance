# Startup Companion Mobile Mockup Architecture

## 1. Goal

Build an interactive mobile mockup that demonstrates the startup journey described
in [IDEA.md](./IDEA.md). The first version is for product demos and usability
testing, not production. It should:

- look and behave like a real mobile application;
- run from a Linux development machine;
- open on a real iPhone with minimal setup;
- also run in a web browser and Iphone emulator;
- use realistic sample startup data;
- make the main founder journey clickable end to end;
- avoid backend, authentication, billing, and live AI costs for now.

## 2. Recommended Approach

Use **Expo with React Native and TypeScript**.

This is the best fit because one codebase can run on iOS, Android, and the web.
On Linux, the app can be developed locally and opened on a physical iPhone using
Expo Go. The same project can later become a production application without
throwing away the mockup.

An Apple iOS Simulator cannot run locally on Linux. It is provided with Xcode,
which runs on macOS. The practical testing options are therefore:

| Option | Runs from Linux | Fidelity | Recommended use |
| --- | --- | --- | --- |
| Physical iPhone with Expo Go | Yes | Highest | Primary UI testing and demos |
| Expo web at an iPhone-sized viewport | Yes | Good for layout | Fast daily development |
| Android Studio emulator | Yes | High, but Android | Interaction and responsive testing |
| EAS cloud build installed on iPhone | Yes | Production-like | Stakeholder previews later |
| Local Apple iOS Simulator | No | High | Requires a Mac with Xcode |

Browser responsive mode is a viewport preview, not a true iOS simulator. It does
not reproduce native keyboard, gestures, safe areas, fonts, or platform behavior
perfectly. Final UI checks should happen on the real iPhone.

### Expo Go compatibility note

The mockup currently targets **Expo SDK 54** for physical iPhone testing. During
the current SDK 57 transition, Expo's project guidance recommends SDK 54 for
projects opened in Expo Go on a physical device. SDK 57 may be appropriate for a
development build or simulator, but it can produce the Expo Go message that the
project and client use different protocols. Verify the installed Expo Go support
before upgrading the SDK.

Official references:

- [Create an Expo application](https://docs.expo.dev/tutorial/create-your-first-app/)
- [Run and develop an Expo application](https://docs.expo.dev/get-started/start-developing/)
- [Expo Go and development build differences](https://docs.expo.dev/develop/development-builds/faq/)
- [Build iOS applications in the cloud from any operating system](https://docs.expo.dev/develop/development-builds/introduction/)
- [Apple Simulator and Xcode requirements](https://developer.apple.com/documentation/safari-developer-tools/installing-xcode-and-simulators)

## 3. Technology Stack

### Mockup stack

| Area | Choice | Reason |
| --- | --- | --- |
| Application | Expo + React Native | iOS, Android, and web from one project |
| Language | TypeScript with strict mode | Safer domain models and screen props |
| Navigation | Expo Router | File-based routes, deep linking, tab and stack navigation |
| Styling | React Native `StyleSheet` + design tokens | Few dependencies and predictable native rendering |
| Icons | `lucide-react-native` | Consistent, accessible interface icons |
| State | Zustand | Small, simple store for demo progress and actions |
| Persistence | AsyncStorage | Keeps mock progress between launches |
| Animation | React Native Reanimated | Progress, completion, and screen transitions |
| Haptics | Expo Haptics | Tactile task completion on a real phone |
| Tests | Jest + React Native Testing Library | Focused tests for state and core flows |
| Code quality | ESLint + Prettier | Consistent TypeScript and styling |

Do not add a component framework for the first mockup. A small token system and
about a dozen reusable components will be easier to control and will produce a
more distinct product identity.

### Later production services

These are future boundaries, not dependencies of the mockup:

| Capability | Suggested production choice |
| --- | --- |
| Database, authentication, file storage | Supabase |
| Server-side application logic | Supabase Edge Functions or a small TypeScript API |
| AI assistance | Server-side OpenAI integration with structured outputs |
| Product analytics | PostHog |
| Error reporting | Sentry |
| Subscriptions | RevenueCat |
| Transactional email | Resend |

Secrets and AI provider keys must never be embedded in the mobile application.
The production app will call a server-side endpoint, which validates the user,
applies rate limits, calls the model, and stores only the required result.

## 4. Mockup Scope

The demo should tell one coherent story: a founder enters an idea, receives a
roadmap, completes a validation task, creates an artifact, and sees progress.

### Primary screens

1. **Welcome**
   - Product name and a single primary action.
   - Continue an existing demo when saved progress exists.

2. **Startup setup**
   - Startup idea, short description, industry, and operating country.
   - Country selection changes the example legal checklist.

3. **Journey**
   - Current stage, overall progress, streak, and next recommended action.
   - A vertical roadmap with locked, active, and completed milestones.
   - Stages: Idea, Validate, Plan, Build, Launch, and Grow.

4. **Lesson and task**
   - One concise concept followed by one practical activity.
   - Checklist or short form, estimated time, completion action, and feedback.
   - A completion moment updates progress and unlocks the next milestone.

5. **AI coach**
   - Chat-style review of the current task or artifact.
   - Suggested prompt chips and a clearly presented mock response.
   - Responses come from local fixtures in this version.

6. **Workspace**
   - Business model canvas, personas, interview plan, financial projection,
     pitch deck, and legal checklist.
   - Each item has a status: not started, draft, needs review, or complete.

7. **Artifact editor**
   - Structured inputs rather than an open document editor.
   - Autosave to local state and a mock “Review with AI” action.

8. **Metrics**
   - Validation interviews, experiments, revenue, expenses, runway, and
     milestones using sample data.
   - Keep charts simple and readable; the mockup does not need live finance data.

9. **Profile and startup settings**
   - Startup identity, operating country, notification toggle, and reset demo.

### Navigation

Use four bottom tabs:

- Journey
- Workspace
- Metrics
- Profile

Open lessons, tasks, artifacts, and the AI coach as stack screens above the tabs.
Keep the primary next action visible near the bottom of task screens, above the
iPhone safe area.

## 5. Visual Direction

The product should feel encouraging and energetic without looking childish.
Gamification supports progress; it should not overwhelm the founder’s work.

- Use a light neutral surface, near-black text, a green progress color, a blue
  action color, and amber only for attention states.
- Use one clear type hierarchy and platform system fonts in the mockup.
- Keep cards at an 8 px radius or less.
- Use icons for familiar actions and labels where an icon alone is ambiguous.
- Use progress rings, milestone states, restrained celebration animation, and
  optional haptics to communicate achievement.
- Do not use ornamental gradients, decorative blobs, nested cards, or a
  marketing-style hero screen.
- Respect iOS safe areas, large text settings, reduced motion, and a minimum
  44 x 44 point touch target.
- Maintain at least WCAG AA color contrast and never rely on color alone for
  completion, warning, or locked states.

Define colors, spacing, type sizes, radii, and shadows in one token file. Screens
must not introduce arbitrary color or spacing values.

## 6. Project Layout

The repository already uses `app/` for product documents, so place the Expo
project in `mobile/`. Expo Router routes can then live in `mobile/src/app/`.

```text
EmbeddingFinance/
├── app/
│   ├── IDEA.md
│   └── ARCHITECTURE.md
└── mobile/
    ├── src/
    │   ├── app/
    │   │   ├── _layout.tsx
    │   │   ├── index.tsx
    │   │   ├── onboarding/
    │   │   ├── (tabs)/
    │   │   │   ├── _layout.tsx
    │   │   │   ├── journey.tsx
    │   │   │   ├── workspace.tsx
    │   │   │   ├── metrics.tsx
    │   │   │   └── profile.tsx
    │   │   ├── lesson/[lessonId].tsx
    │   │   ├── artifact/[artifactId].tsx
    │   │   └── coach.tsx
    │   ├── components/
    │   │   ├── ui/
    │   │   ├── journey/
    │   │   └── workspace/
    │   ├── constants/
    │   │   └── theme.ts
    │   ├── data/
    │   │   ├── demo-startup.ts
    │   │   ├── roadmap.ts
    │   │   └── coach-responses.ts
    │   ├── domain/
    │   │   ├── startup.ts
    │   │   ├── journey.ts
    │   │   └── artifact.ts
    │   ├── services/
    │   │   ├── startup-repository.ts
    │   │   └── coach-service.ts
    │   └── store/
    │       └── use-demo-store.ts
    ├── assets/
    ├── app.json
    ├── package.json
    └── tsconfig.json
```

### Component boundaries

Reusable interface components should include:

- `AppButton`
- `IconButton`
- `ProgressBar`
- `StatusBadge`
- `MilestoneRow`
- `MetricTile`
- `FormField`
- `OptionPicker`
- `EmptyState`
- `ScreenHeader`
- `BottomAction`
- `LoadingSkeleton`

Components receive data and callbacks through typed props. Route screens compose
components, while state transitions live in the store. This prevents navigation
files from accumulating business logic.

## 7. Data and State

Use domain types even though the initial data is local:

```ts
type Startup = {
  id: string;
  name: string;
  idea: string;
  industry: string;
  countryCode: string;
  stage: JourneyStage;
};

type Milestone = {
  id: string;
  stage: JourneyStage;
  title: string;
  status: "locked" | "available" | "in_progress" | "completed";
  progress: number;
  lessonIds: string[];
};

type Artifact = {
  id: string;
  type: ArtifactType;
  title: string;
  status: "not_started" | "draft" | "needs_review" | "complete";
  fields: Record<string, string | string[]>;
  updatedAt: string;
};
```

The Zustand store owns:

- startup setup data;
- completed lessons and tasks;
- roadmap progress and unlocked milestones;
- artifact drafts;
- demo metrics;
- onboarding completion;
- reset-demo action.

Persist only this store through AsyncStorage. Navigation state, modal state, and
temporary input errors remain local to their screen.

### Service contracts

Screens should not import fixture files directly. Use small service interfaces:

```ts
interface CoachService {
  reviewArtifact(artifact: Artifact): Promise<CoachReview>;
  sendMessage(message: string, context: CoachContext): Promise<CoachMessage>;
}

interface StartupRepository {
  getStartup(): Promise<Startup>;
  saveArtifact(artifact: Artifact): Promise<void>;
  getRoadmap(countryCode: string): Promise<Milestone[]>;
}
```

The mock implementations return fixture data after a short artificial delay.
Production implementations can later call authenticated APIs without changing
the screens.

## 8. Setup and Run

From the repository root:

```bash
npx create-expo-app@latest mobile
cd mobile
npx expo install @react-native-async-storage/async-storage
npx expo install expo-haptics react-native-reanimated react-native-svg
npm install zustand lucide-react-native
npx expo start
```

Follow the versions selected by the current Expo SDK rather than pinning React
Native packages manually.

### Open on an iPhone

1. Install **Expo Go** from the iOS App Store.
2. Connect the Linux computer and iPhone to the same Wi-Fi network.
3. Run `npx expo start`.
4. Scan the terminal QR code with the iPhone camera.
5. Edit a file and confirm that Fast Refresh updates the phone.

If the network blocks local device discovery, use:

```bash
npx expo start --tunnel
```

Tunnel mode is slower, so use the normal LAN connection when possible.

### Open in a Linux browser

After `npx expo start`, press `w`. In browser developer tools, set a mobile
viewport such as 390 x 844. Test narrower and wider widths too; do not optimize
for one iPhone model only.

### Open in an Android emulator

Install Android Studio, create an Android Virtual Device, start it, then run
`npx expo start` and press `a`.

## 9. Expo Go Versus a Development Build

Use **Expo Go** for the first mockup. It supports the selected UI stack and gives
the shortest path from Linux to an iPhone.

Move to an **Expo development build** when the application needs custom native
modules, a real app icon and splash-screen test, universal links, remote push
notifications, or production-like native configuration. EAS Build can create
iOS builds in the cloud from Linux, but installing ad hoc iOS builds requires
device registration and normally a paid Apple Developer account.

Suggested transition commands:

```bash
npx expo install expo-dev-client
npm install --global eas-cli
eas login
eas build:configure
eas build --platform ios --profile development
```

Do not introduce this extra build workflow until Expo Go becomes a real
constraint.

## 10. Validation and Testing

The mockup is ready for a demo when:

- a new user can enter an idea and select a country;
- the generated sample roadmap reflects that country;
- the user can open and complete one lesson and one practical task;
- completing a task changes roadmap progress and survives an app restart;
- the user can edit one artifact and receive a convincing mock AI review;
- Journey, Workspace, Metrics, and Profile all have meaningful populated states;
- loading, empty, completed, locked, and error states are represented;
- the UI works at small and large phone widths without clipped text;
- keyboard input does not cover the active field or bottom action;
- VoiceOver labels and accessible roles exist for interactive controls;
- reduced-motion mode does not hide essential state changes;
- the flow has been checked in web preview, Android emulator, and a real iPhone.

Add unit tests for progress calculation, milestone unlocking, persistence
migration, and country-roadmap selection. Add component tests for the setup form
and task completion flow. Full end-to-end automation can wait until the product
direction is validated.

## 11. Implementation Order

1. Create the Expo project, token system, fonts, app shell, and tab navigation.
2. Add domain types, demo fixtures, the Zustand store, and persistence.
3. Build startup setup and the Journey roadmap.
4. Build the lesson/task flow and completion interaction.
5. Build Workspace and one complete artifact editor.
6. Add the mocked AI coach and review states.
7. Add Metrics, Profile, loading, empty, and error states.
8. Test responsive layout, accessibility, and the full flow on the iPhone.

The first polished demo should focus on this vertical slice instead of trying to
represent every feature in the long-term vision. Fundraising marketplaces,
document uploads, live legal guidance, subscriptions, multi-user teams, and real
financial integrations should remain out of scope until the core founder journey
has been tested with prospective users.
