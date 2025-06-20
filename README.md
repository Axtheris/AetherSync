# AetherSync

A local-network file transfer tool that allows iOS/Android (Expo) devices and Windows/macOS/Linux (Electron) computers to discover each other automatically over the same Wi-Fi network and transfer files without needing the cloud, cables, or internet.

## 🚀 Project Overview

AetherSync is built using a modern TypeScript monorepo with Turborepo, featuring:

- **Zero-config peer discovery** using mDNS (Bonjour)
- **Encrypted P2P transfers** via WebRTC DataChannels with HTTP fallback
- **Cross-platform support** for mobile (iOS/Android/Web) and desktop (Windows/macOS/Linux)
- **Type-safe protocol** using Protocol Buffers
- **Modern UI** with TailwindCSS and NativeWind

## 📁 Project Structure

```
AetherSync/
├── apps/
│   ├── mobile/          # Expo app (iOS/Android/Web)
│   └── desktop/         # Electron app (Windows/macOS/Linux)
├── packages/
│   ├── protocol/        # Protobuf definitions & mDNS helpers
│   ├── ui/             # Shared UI components
│   ├── utils/          # Shared utility functions
│   ├── eslint-config/  # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
└── README.md
```

## 🛠 Technology Stack

### Core Technologies
- **TypeScript** - Strict type safety across all packages
- **Turborepo** - Monorepo build system with caching
- **Protocol Buffers** - Type-safe message serialization
- **mDNS** - Zero-config peer discovery

### Mobile App (`apps/mobile`)
- **Expo Router** - File-based routing for React Native
- **React Native** - Cross-platform mobile development
- **NativeWind** - TailwindCSS for React Native
- **Zustand** - Lightweight state management
- **expo-document-picker** - File selection
- **expo-file-system** - File operations
- **react-native-webrtc** - P2P connections

### Desktop App (`apps/desktop`)
- **Electron** - Cross-platform desktop apps
- **React + Vite** - Fast development and builds
- **TailwindCSS** - Utility-first CSS
- **electron-store** - Persistent settings
- **node-webrtc** - WebRTC for desktop

## 📋 Current Implementation Status

### ✅ Completed Features

1. **Monorepo Foundation**
   - Turborepo configuration with optimized build pipeline
   - Shared TypeScript and ESLint configurations
   - Proper workspace dependencies

2. **Protocol Package** (`packages/protocol`)
   - Complete protobuf schema with 6 message types:
     - `DiscoverPing` / `DiscoverPong` - Device discovery
     - `FileMeta` - File metadata
     - `FileChunk` - File data chunks
     - `Ack` - Transfer acknowledgments
     - `Error` - Error handling
   - mDNS service implementation for peer discovery
   - Protocol utilities (checksum, device ID generation, etc.)

3. **Utilities Package** (`packages/utils`)
   - File size formatting
   - MIME type detection
   - File type categorization
   - Debounce/throttle utilities
   - Progress calculation helpers

4. **Mobile App Foundation** (`apps/mobile`)
   - Expo Router setup with TailwindCSS/NativeWind
   - Zustand stores for state management:
     - `PeerStore` - Peer discovery and device management
     - `TransferStore` - File transfer state and history
   - Custom hooks:
     - `usePeerDiscovery()` - mDNS peer discovery
     - `useFileTransfer()` - File transfer operations
   - Configured for all required Expo dependencies

### 🚧 Next Steps

1. **Complete Desktop App** (Electron + React)
2. **Implement WebRTC DataChannels** with HTTP fallback
3. **Build UI Component Library** (`packages/ui`)
4. **Add Testing** (Jest + Testing Library + Playwright)
5. **Set up CI/CD** (GitHub Actions)
6. **Build & Release Configuration** (EAS Build + electron-builder)

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- npm 10+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd AetherSync

# Install dependencies
npm install

# Generate protocol buffers (once implemented)
npm run generate

# Build all packages
npm run build
```

### Development Commands

```bash
# Start development mode for all apps
npm run dev

# Build all packages and apps
npm run build

# Run linting
npm run lint

# Type checking
npm run type-check

# Format code
npm run format
```

### Mobile Development

```bash
cd apps/mobile

# Start Expo development server
npm start

# Run on iOS simulator (macOS only)
npm run ios

# Run on Android emulator
npm run android

# Run in web browser
npm run web
```

## 🎯 Core Features (Planned)

### Mobile App Screens
- **`/send`** - Pick files, discover peers, initiate transfers
- **`/receive`** - Accept incoming transfers, show progress
- **`/history`** - View transfer history with thumbnails

### Desktop App Pages
- **Home** - Drag & drop files, peer list, quick transfer
- **Transfers** - Active and completed transfer management
- **Settings** - Storage directory configuration

### File Transfer Protocol
1. **Discovery Phase** - mDNS announces device availability
2. **Connection** - WebRTC peer connection establishment
3. **Transfer** - Chunked file transfer with progress tracking
4. **Verification** - SHA-256 checksum validation

## 🔒 Security Features

- **Encrypted transfers** via WebRTC DTLS
- **Checksum verification** for data integrity
- **Local network only** - no internet/cloud dependency
- **Selective file access** on iOS 17+ with PHPicker

## 📱 Platform Support

### Mobile (Expo)
- ✅ iOS 13+
- ✅ Android 8+
- ✅ Web browsers

### Desktop (Electron)
- ✅ Windows 10+
- ✅ macOS 10.15+
- ✅ Linux (Ubuntu 18.04+)

## 🧪 Testing Strategy

- **Unit tests** for utilities and hooks (Jest + Testing Library)
- **Integration tests** for file transfer simulation
- **E2E tests** for desktop app (Playwright)
- **Performance tests** for 50MB+ file transfers

## 📦 Build & Release

### Mobile App
- **Expo EAS Build** for iOS/Android
- **Static web export** for hosting

### Desktop App
- **electron-builder** for Windows/macOS packages
- **GitHub Releases** for distribution

## 🤝 Contributing

This project follows modern TypeScript best practices with:
- Strict type checking
- Prettier code formatting
- ESLint code quality checks
- Conventional commit messages
- Automated testing

## 📄 License

[Add your license here]

---

**AetherSync** - Seamless file sharing across your local network 🚀
