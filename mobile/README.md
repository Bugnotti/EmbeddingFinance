# Startup Companion mobile mockup

This is the Expo/React Native UI prototype for the Startup Companion concept.
It currently targets Expo SDK 54 because physical-device Expo Go supports the
SDK 54 project during the SDK 57 transition. Do not upgrade Expo independently
without checking the Expo Go compatibility notes first.
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
npm run start:tunnel
```

Scan the QR code with the iPhone camera. Tunnel mode is the recommended path
when the Wi-Fi router or iPhone tethering blocks LAN discovery. It is slower than
LAN mode, but does not require the phone to reach the laptop directly.

If Expo Go reports that the project is incompatible or that the protocols differ,
check that `npm ls expo` reports `54.x`, stop any old Expo server, and restart
with `npx expo start --clear`. The App Store Expo Go client cannot install an
older client version on a physical iPhone.

Other useful commands:

```bash
npm run typecheck
npm run lint
npm test
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

See [PRESENTER.md](./PRESENTER.md) for the five-minute demo flow, one-minute
version, and recovery steps.
