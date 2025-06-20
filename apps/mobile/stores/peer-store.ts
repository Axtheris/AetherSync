import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { PeerInfo } from '@aethersync/protocol';

export interface PeerStore {
  // State
  peers: PeerInfo[];
  isDiscovering: boolean;
  selectedPeer: PeerInfo | null;
  deviceInfo: {
    deviceId: string;
    deviceName: string;
    deviceType: 'mobile' | 'desktop';
  } | null;

  // Actions
  setPeers: (peers: PeerInfo[]) => void;
  addPeer: (peer: PeerInfo) => void;
  removePeer: (deviceId: string) => void;
  updatePeer: (deviceId: string, updates: Partial<PeerInfo>) => void;
  setSelectedPeer: (peer: PeerInfo | null) => void;
  setIsDiscovering: (isDiscovering: boolean) => void;
  setDeviceInfo: (deviceInfo: PeerStore['deviceInfo']) => void;
  clearPeers: () => void;
}

export const usePeerStore = create<PeerStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    peers: [],
    isDiscovering: false,
    selectedPeer: null,
    deviceInfo: null,

    // Actions
    setPeers: (peers) => set({ peers }),

    addPeer: (peer) => 
      set((state) => {
        const existingIndex = state.peers.findIndex(p => p.deviceId === peer.deviceId);
        if (existingIndex >= 0) {
          // Update existing peer
          const updatedPeers = [...state.peers];
          updatedPeers[existingIndex] = peer;
          return { peers: updatedPeers };
        } else {
          // Add new peer
          return { peers: [...state.peers, peer] };
        }
      }),

    removePeer: (deviceId) =>
      set((state) => ({
        peers: state.peers.filter(p => p.deviceId !== deviceId),
        selectedPeer: state.selectedPeer?.deviceId === deviceId ? null : state.selectedPeer,
      })),

    updatePeer: (deviceId, updates) =>
      set((state) => ({
        peers: state.peers.map(p => 
          p.deviceId === deviceId ? { ...p, ...updates } : p
        ),
      })),

    setSelectedPeer: (peer) => set({ selectedPeer: peer }),

    setIsDiscovering: (isDiscovering) => set({ isDiscovering }),

    setDeviceInfo: (deviceInfo) => set({ deviceInfo }),

    clearPeers: () => set({ peers: [], selectedPeer: null }),
  }))
);

// Selectors
export const selectAvailablePeers = (state: PeerStore) => 
  state.peers.filter(peer => peer.available);

export const selectPeersByType = (state: PeerStore, type: 'mobile' | 'desktop') => 
  state.peers.filter(peer => peer.deviceType === type);

export const selectPeerById = (state: PeerStore, deviceId: string) => 
  state.peers.find(peer => peer.deviceId === deviceId); 