# AetherSync

[![License: CC BY-NC 4.0](https://img.shields.io/badge/license-CC%20BY--NC%204.0-blue.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
[![Platform](https://img.shields.io/badge/platform-Expo%20%2B%20Electron-2ea44f)](https://expo.dev/)
[![Built with TypeScript](https://img.shields.io/badge/built%20with-TypeScript-informational)](https://www.typescriptlang.org/)
[![Status: Alpha](https://img.shields.io/badge/status-Alpha-orange)](https://github.com/Axtheris/AetherSync)
[![Repo](https://img.shields.io/badge/GitHub-Axtheris%2FAetherSync-6e40c9?logo=github)](https://github.com/Axtheris/AetherSync)

---

AetherSync is a blazing-fast, zero-setup file transfer tool that connects mobile and desktop devices over your local Wi-Fi network—no internet, cables, or accounts required.

Built with a fullstack TypeScript monorepo, AetherSync enables encrypted peer-to-peer (P2P) transfers between iOS, Android, Windows, macOS, Linux, and the Web.

---

## 🚀 Key Features

* 🔍 **Automatic Device Discovery** — via mDNS (Bonjour)
* 🔐 **Encrypted P2P Transfers** — using WebRTC DataChannels
* 🧠 **Protocol Buffers** — type-safe, cross-platform communication
* 💻📱 **Cross-Platform Support** — Expo (iOS/Android/Web) + Electron (Desktop)
* 🧩 **Modular Architecture** — powered by Turborepo
* 🎨 **Modern UI** — TailwindCSS + NativeWind

---

## 📁 Project Structure

```
AetherSync/
├── apps/
│   ├── mobile/          # Expo app (iOS/Android/Web)
│   └── desktop/         # Electron app (Windows/macOS/Linux)
├── packages/
│   ├── protocol/        # Protobuf schema + mDNS helpers
│   ├── ui/              # Shared UI components (planned)
│   ├── utils/           # Cross-platform utility functions
│   ├── eslint-config/   # Shared ESLint rules
│   └── typescript-config/ # Shared TS config
```

---

## 🧪 Current Status

### ✅ Completed

* Monorepo scaffold (Turborepo)
* Protocol buffers with 6 message types
* mDNS peer discovery implementation
* Shared utility functions
* Mobile app foundation (Expo + Zustand)

### 🚧 In Progress

* Electron desktop UI
* WebRTC DataChannel + HTTP fallback
* Shared component library
* CI/CD + automated tests

---

## 🛠 Tech Stack

### Core

* **TypeScript** – Strictly typed across all packages
* **Turborepo** – Monorepo tooling + build caching
* **Protocol Buffers** – Efficient type-safe messaging
* **mDNS** – Local device discovery

### Mobile (`apps/mobile`)

* **Expo Router**
* **React Native + NativeWind**
* **Zustand** for global state
* **expo-document-picker**, **expo-file-system**
* **react-native-webrtc**

### Desktop (`apps/desktop`)

* **Electron + Vite**
* **React + TailwindCSS**
* **electron-store**
* **node-webrtc**

---

## 📲 Mobile App Routes

* `/send` — Pick files → Show available peers → Initiate transfer
* `/receive` — Accept incoming transfer, show progress
* `/history` — Transfer logs with preview thumbnails

---

## 💻 Desktop App Views (Planned)

* **Home** — Drag & drop interface + quick peer list
* **Transfers** — Manage active/completed transfers
* **Settings** — Choose default storage directory

---

## 🔐 Security

* End-to-end encrypted WebRTC transfers (DTLS)
* SHA-256 checksums for file integrity
* Local-only (LAN) communication
* Explicit file permission requests (iOS 17+ compatible)

---

## ⚙️ Install & Run

### Prerequisites

* Node.js `18+`
* npm `10+`

### Setup

```bash
git clone https://github.com/Axtheris/AetherSync.git
cd AetherSync
npm install
npm run build
```

### Start Dev Mode

```bash
# Start all apps
npm run dev

# Run linters and formatters
npm run lint
npm run format
npm run type-check
```

### Mobile Dev (Expo)

```bash
cd apps/mobile
npm start        # Open Expo Dev Tools
npm run ios      # macOS only
npm run android
npm run web
```

---

## 🧪 Testing Plan

* **Jest** + **React Testing Library** for unit tests
* **Playwright** for desktop UI E2E
* Simulated LAN transfers for integration testing
* Large file performance profiling (100MB+)

---

## 📦 Build & Release

### Mobile

* **EAS Build** for iOS/Android
* **Static Export** for web version

### Desktop

* **electron-builder** for generating `.exe` / `.dmg` / `.AppImage`
* Released via GitHub Releases

---

## 🧠 Future Roadmap

* Fallback QR-based pairing (for mDNS-less setups)
* Optional WebSocket relay for fallback connectivity
* Resumable transfers + auto-retry
* Batch transfers
* LAN-based messaging (light chat)
* Transfer previews & notifications

---

## 🤝 Contributing

We welcome issues, feature requests, and pull requests.

### Guidelines

* Use [Conventional Commits](https://www.conventionalcommits.org/)
* Run `npm run format && npm run lint` before pushing
* Include tests for new features
* Include screenshots/recordings for visual/UI updates

---

## 📄 License

AetherSync is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International](https://creativecommons.org/licenses/by-nc/4.0/).

See [`LICENSE.md`](./LICENSE.md) for full legal terms.

---

> ✨ AetherSync is built for people who miss when sharing files just... worked.

---
