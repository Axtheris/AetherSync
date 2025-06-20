import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface FileTransfer {
  id: string;
  filename: string;
  fileSize: number;
  mimeType: string;
  direction: 'sending' | 'receiving';
  status: 'pending' | 'transferring' | 'completed' | 'error' | 'cancelled';
  progress: number; // 0-100
  transferredBytes: number;
  startTime: number;
  endTime?: number;
  speed?: number; // bytes per second
  peerId: string;
  peerName: string;
  errorMessage?: string;
  filePath?: string; // local path after completion
  thumbnail?: string; // base64 thumbnail for images
}

export interface TransferStore {
  // State
  activeTransfers: FileTransfer[];
  transferHistory: FileTransfer[];
  isTransferring: boolean;

  // Actions
  addTransfer: (transfer: FileTransfer) => void;
  updateTransfer: (id: string, updates: Partial<FileTransfer>) => void;
  removeTransfer: (id: string) => void;
  completeTransfer: (id: string, filePath?: string) => void;
  cancelTransfer: (id: string) => void;
  errorTransfer: (id: string, errorMessage: string) => void;
  clearHistory: () => void;
  removeFromHistory: (id: string) => void;
  updateProgress: (id: string, transferredBytes: number, speed?: number) => void;
}

export const useTransferStore = create<TransferStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    activeTransfers: [],
    transferHistory: [],
    isTransferring: false,

    // Actions
    addTransfer: (transfer) =>
      set((state) => ({
        activeTransfers: [...state.activeTransfers, transfer],
        isTransferring: true,
      })),

    updateTransfer: (id, updates) =>
      set((state) => ({
        activeTransfers: state.activeTransfers.map(t =>
          t.id === id ? { ...t, ...updates } : t
        ),
      })),

    removeTransfer: (id) =>
      set((state) => {
        const newActiveTransfers = state.activeTransfers.filter(t => t.id !== id);
        return {
          activeTransfers: newActiveTransfers,
          isTransferring: newActiveTransfers.length > 0,
        };
      }),

    completeTransfer: (id, filePath) =>
      set((state) => {
        const transfer = state.activeTransfers.find(t => t.id === id);
        if (!transfer) return state;

        const completedTransfer: FileTransfer = {
          ...transfer,
          status: 'completed',
          progress: 100,
          endTime: Date.now(),
          filePath,
        };

        return {
          activeTransfers: state.activeTransfers.filter(t => t.id !== id),
          transferHistory: [completedTransfer, ...state.transferHistory],
          isTransferring: state.activeTransfers.length > 1,
        };
      }),

    cancelTransfer: (id) =>
      set((state) => {
        const transfer = state.activeTransfers.find(t => t.id === id);
        if (!transfer) return state;

        const cancelledTransfer: FileTransfer = {
          ...transfer,
          status: 'cancelled',
          endTime: Date.now(),
        };

        return {
          activeTransfers: state.activeTransfers.filter(t => t.id !== id),
          transferHistory: [cancelledTransfer, ...state.transferHistory],
          isTransferring: state.activeTransfers.length > 1,
        };
      }),

    errorTransfer: (id, errorMessage) =>
      set((state) => {
        const transfer = state.activeTransfers.find(t => t.id === id);
        if (!transfer) return state;

        const errorTransfer: FileTransfer = {
          ...transfer,
          status: 'error',
          errorMessage,
          endTime: Date.now(),
        };

        return {
          activeTransfers: state.activeTransfers.filter(t => t.id !== id),
          transferHistory: [errorTransfer, ...state.transferHistory],
          isTransferring: state.activeTransfers.length > 1,
        };
      }),

    updateProgress: (id, transferredBytes, speed) =>
      set((state) => ({
        activeTransfers: state.activeTransfers.map(t => {
          if (t.id === id) {
            const progress = t.fileSize > 0 ? Math.min(100, (transferredBytes / t.fileSize) * 100) : 0;
            return {
              ...t,
              transferredBytes,
              progress: Math.round(progress),
              speed,
              status: transferredBytes >= t.fileSize ? 'completed' : 'transferring',
            };
          }
          return t;
        }),
      })),

    clearHistory: () => set({ transferHistory: [] }),

    removeFromHistory: (id) =>
      set((state) => ({
        transferHistory: state.transferHistory.filter(t => t.id !== id),
      })),
  }))
);

// Selectors
export const selectActiveTransfers = (state: TransferStore) => state.activeTransfers;

export const selectTransferById = (state: TransferStore, id: string) =>
  [...state.activeTransfers, ...state.transferHistory].find(t => t.id === id);

export const selectTransfersByDirection = (
  state: TransferStore,
  direction: 'sending' | 'receiving'
) => [...state.activeTransfers, ...state.transferHistory].filter(t => t.direction === direction);

export const selectCompletedTransfers = (state: TransferStore) =>
  state.transferHistory.filter(t => t.status === 'completed');

export const selectFailedTransfers = (state: TransferStore) =>
  state.transferHistory.filter(t => t.status === 'error' || t.status === 'cancelled'); 