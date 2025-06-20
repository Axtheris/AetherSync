import { useCallback, useRef } from 'react';
import { useTransferStore, FileTransfer } from '../stores/transfer-store';
import { usePeerStore } from '../stores/peer-store';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
// TODO: Import WebRTC types once react-native-webrtc is available
// import { RTCPeerConnection, RTCDataChannel } from 'react-native-webrtc';

export interface FilePickerResult {
  uri: string;
  name: string;
  size: number;
  mimeType: string;
}

export interface SendFileOptions {
  peerId: string;
  files: FilePickerResult[];
}

export interface ReceiveFileOptions {
  acceptTypes?: string[];
  maxFileSize?: number;
}

export function useFileTransfer() {
  const dataChannelRef = useRef<any>(null); // TODO: Use RTCDataChannel type
  const peerConnectionRef = useRef<any>(null); // TODO: Use RTCPeerConnection type
  
  const {
    addTransfer,
    updateTransfer,
    removeTransfer,
    completeTransfer,
    cancelTransfer,
    errorTransfer,
    updateProgress,
    activeTransfers,
    transferHistory,
    isTransferring,
  } = useTransferStore();

  const { selectedPeer, deviceInfo } = usePeerStore();

  // Pick files using Expo DocumentPicker
  const pickFiles = useCallback(async (): Promise<FilePickerResult[]> => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return [];
      }

      return result.assets.map(asset => ({
        uri: asset.uri,
        name: asset.name,
        size: asset.size || 0,
        mimeType: asset.mimeType || 'application/octet-stream',
      }));
    } catch (error) {
      console.error('Error picking files:', error);
      throw new Error('Failed to pick files');
    }
  }, []);

  // Generate file transfer ID
  const generateTransferId = useCallback(() => {
    return `transfer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Create WebRTC peer connection
  const createPeerConnection = useCallback(async () => {
    // TODO: Implement actual WebRTC peer connection
    const mockPeerConnection = {
      createDataChannel: (label: string) => ({
        send: (data: ArrayBuffer) => {},
        close: () => {},
        addEventListener: (event: string, handler: Function) => {},
        removeEventListener: (event: string, handler: Function) => {},
      }),
      createOffer: async () => ({ sdp: 'mock-offer', type: 'offer' }),
      createAnswer: async () => ({ sdp: 'mock-answer', type: 'answer' }),
      setLocalDescription: async (desc: any) => {},
      setRemoteDescription: async (desc: any) => {},
      close: () => {},
      addEventListener: (event: string, handler: Function) => {},
    };

    return mockPeerConnection;
  }, []);

  // Send files to a peer
  const sendFiles = useCallback(async (options: SendFileOptions) => {
    const { peerId, files } = options;
    
    if (!deviceInfo) {
      throw new Error('Device info not available');
    }

    const peer = selectedPeer || { deviceId: peerId, deviceName: 'Unknown Device' };

    try {
      // Create transfers for each file
      const transfers: FileTransfer[] = files.map(file => ({
        id: generateTransferId(),
        filename: file.name,
        fileSize: file.size,
        mimeType: file.mimeType,
        direction: 'sending',
        status: 'pending',
        progress: 0,
        transferredBytes: 0,
        startTime: Date.now(),
        peerId: peer.deviceId,
        peerName: peer.deviceName,
      }));

      // Add transfers to store
      transfers.forEach(transfer => {
        addTransfer(transfer);
      });

      // TODO: Implement actual WebRTC file transfer
      for (const transfer of transfers) {
        try {
          // Update status to transferring
          updateTransfer(transfer.id, { status: 'transferring' });

          // Read file data
          const fileData = await FileSystem.readAsStringAsync(
            files.find(f => f.name === transfer.filename)!.uri,
            { encoding: FileSystem.EncodingType.Base64 }
          );

          // Simulate file transfer progress
          const chunks = Math.ceil(transfer.fileSize / (64 * 1024)); // 64KB chunks
          for (let i = 0; i < chunks; i++) {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const transferredBytes = Math.min((i + 1) * 64 * 1024, transfer.fileSize);
            updateProgress(transfer.id, transferredBytes, 64 * 1024 * 10); // 640 KB/s speed
          }

          // Complete transfer
          completeTransfer(transfer.id);
        } catch (error) {
          console.error(`Error sending file ${transfer.filename}:`, error);
          errorTransfer(transfer.id, error instanceof Error ? error.message : 'Unknown error');
        }
      }
    } catch (error) {
      console.error('Error sending files:', error);
      throw error;
    }
  }, [
    deviceInfo,
    selectedPeer,
    generateTransferId,
    addTransfer,
    updateTransfer,
    updateProgress,
    completeTransfer,
    errorTransfer,
  ]);

  // Cancel a transfer
  const cancelFileTransfer = useCallback((transferId: string) => {
    const transfer = activeTransfers.find(t => t.id === transferId);
    if (transfer) {
      cancelTransfer(transferId);
      
      // TODO: Close data channel for this transfer
      if (dataChannelRef.current) {
        dataChannelRef.current.close();
        dataChannelRef.current = null;
      }
    }
  }, [activeTransfers, cancelTransfer]);

  // Accept incoming file transfer
  const acceptFileTransfer = useCallback(async (transferId: string) => {
    const transfer = [...activeTransfers, ...transferHistory].find(t => t.id === transferId);
    if (!transfer || transfer.direction !== 'receiving') {
      throw new Error('Invalid transfer or not a receiving transfer');
    }

    try {
      updateTransfer(transferId, { status: 'transferring' });
      
      // TODO: Implement actual file reception via WebRTC
      // For now, just simulate progress
      const chunks = Math.ceil(transfer.fileSize / (64 * 1024));
      for (let i = 0; i < chunks; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        const transferredBytes = Math.min((i + 1) * 64 * 1024, transfer.fileSize);
        updateProgress(transferId, transferredBytes, 64 * 1024 * 20); // 1.28 MB/s speed
      }

      // Create file path in downloads directory
      const downloadsDir = FileSystem.documentDirectory + 'downloads/';
      await FileSystem.makeDirectoryAsync(downloadsDir, { intermediates: true });
      const filePath = downloadsDir + transfer.filename;

      // Complete transfer
      completeTransfer(transferId, filePath);
    } catch (error) {
      console.error('Error accepting file transfer:', error);
      errorTransfer(transferId, error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }, [activeTransfers, transferHistory, updateTransfer, updateProgress, completeTransfer, errorTransfer]);

  // Reject incoming file transfer
  const rejectFileTransfer = useCallback((transferId: string) => {
    cancelFileTransfer(transferId);
  }, [cancelFileTransfer]);

  // Open/share completed file
  const openFile = useCallback(async (transferId: string) => {
    const transfer = transferHistory.find(t => t.id === transferId && t.filePath);
    if (!transfer || !transfer.filePath) {
      throw new Error('File not found or transfer not completed');
    }

    try {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(transfer.filePath);
      } else {
        throw new Error('Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Error opening file:', error);
      throw error;
    }
  }, [transferHistory]);

  // Get transfer speed in human-readable format
  const getTransferSpeed = useCallback((speed?: number) => {
    if (!speed) return '0 B/s';
    
    const units = ['B/s', 'KB/s', 'MB/s', 'GB/s'];
    let size = speed;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
  }, []);

  // Calculate estimated time remaining
  const getTimeRemaining = useCallback((transfer: FileTransfer) => {
    if (!transfer.speed || transfer.speed === 0 || transfer.status !== 'transferring') {
      return 'Unknown';
    }

    const remainingBytes = transfer.fileSize - transfer.transferredBytes;
    const secondsRemaining = remainingBytes / transfer.speed;

    if (secondsRemaining < 60) {
      return `${Math.round(secondsRemaining)}s`;
    } else if (secondsRemaining < 3600) {
      return `${Math.round(secondsRemaining / 60)}m`;
    } else {
      return `${Math.round(secondsRemaining / 3600)}h`;
    }
  }, []);

  return {
    // State
    activeTransfers,
    transferHistory,
    isTransferring,

    // Actions
    pickFiles,
    sendFiles,
    sendFile: sendFiles,
    cancelFileTransfer,
    acceptFileTransfer,
    rejectFileTransfer,
    openFile,

    // Utilities
    getTransferSpeed,
    getTimeRemaining,
    generateTransferId,

    // Computed
    sendingTransfers: activeTransfers.filter(t => t.direction === 'sending'),
    receivingTransfers: activeTransfers.filter(t => t.direction === 'receiving'),
    completedTransfers: transferHistory.filter(t => t.status === 'completed'),
    failedTransfers: transferHistory.filter(t => t.status === 'error' || t.status === 'cancelled'),
  };
} 