# Startup Companion mobile mockup

This is the Expo/React Native UI prototype for the Startup Companion concept.
It uses local fixtures and AsyncStorage, so it does not need an account, backend,
AI key, or network connection after dependencies are installed.

## Run it

```bash
npm install
npm run web
```

For a physical iPhone, install Expo Go, connect the phone and computer to the
same Wi-Fi network, then run:

```bash
npm start
```

Scan the QR code with the iPhone camera. If LAN discovery is blocked, use
`npx expo start --tunnel`.

Other useful commands:

```bash
npm run typecheck
npm run lint
npm run android
```

The first screen is the welcome flow. The Profile tab contains **Restore sample
startup** for a presenter-ready NeighbourFix state and **Reset demo data** for a
clean first-run flow.

## Project shape

- `src/app/` contains Expo Router screens.
- `src/components/ui.tsx` contains the shared interface primitives.
- `src/data/demo.ts` contains local startup, roadmap, artifact, and metric data.
- `src/store/use-demo-store.ts` contains persisted demo state and transitions.

The mock Coach is intentionally deterministic. Keep provider keys and real AI
calls on a server when this prototype becomes a production application.
