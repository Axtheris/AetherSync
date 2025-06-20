import { useEffect, useRef, useCallback } from 'react';
import { usePeerStore } from '../stores/peer-store';
// TODO: Import these once protocol package is built
// import { MDNSService, createMDNSService, generateDeviceId, getDeviceName, getDeviceType } from '@aethersync/protocol';

export interface UsePeerDiscoveryOptions {
  enabled?: boolean;
  discoveryInterval?: number;
  deviceName?: string;
}

export function usePeerDiscovery(options: UsePeerDiscoveryOptions = {}) {
  const {
    enabled = true,
    discoveryInterval = 5000,
    deviceName: customDeviceName,
  } = options;

  const mdnsServiceRef = useRef<any>(null); // TODO: Use MDNSService type
  const {
    peers,
    isDiscovering,
    deviceInfo,
    addPeer,
    removePeer,
    setIsDiscovering,
    setDeviceInfo,
    clearPeers,
  } = usePeerStore();

  // Initialize device info
  useEffect(() => {
    if (!deviceInfo) {
      // TODO: Use actual imports once protocol package is built
      const mockDeviceInfo = {
        deviceId: `mobile-${Date.now()}`, // generateDeviceId()
        deviceName: customDeviceName || 'Mobile Device', // getDeviceName()
        deviceType: 'mobile' as const, // getDeviceType()
      };
      setDeviceInfo(mockDeviceInfo);
    }
  }, [deviceInfo, customDeviceName, setDeviceInfo]);

  // Start discovery
  const startDiscovery = useCallback(async () => {
    if (!enabled || !deviceInfo || mdnsServiceRef.current) return;

    try {
      setIsDiscovering(true);
      
      // TODO: Use actual MDNSService once protocol package is built
      const mockService = {
        start: async () => {},
        stop: async () => {},
        discover: async () => {},
        on: (event: string, handler: Function) => {},
        off: (event: string, handler?: Function) => {},
      };

      mdnsServiceRef.current = mockService;

      // Mock peer discovery events
      // TODO: Replace with actual mDNS events
      mdnsServiceRef.current.on('peerDiscovered', (peer: any) => {
        addPeer(peer);
      });

      mdnsServiceRef.current.on('peerLost', (peer: any) => {
        removePeer(peer.deviceId);
      });

      await mdnsServiceRef.current.start();
      
      // Start periodic discovery
      const discoveryTimer = setInterval(() => {
        mdnsServiceRef.current?.discover();
      }, discoveryInterval);

      // Store timer for cleanup
      (mdnsServiceRef.current as any).discoveryTimer = discoveryTimer;

    } catch (error) {
      console.error('Failed to start peer discovery:', error);
      setIsDiscovering(false);
    }
  }, [enabled, deviceInfo, discoveryInterval, addPeer, removePeer, setIsDiscovering]);

  // Stop discovery
  const stopDiscovery = useCallback(async () => {
    if (!mdnsServiceRef.current) return;

    try {
      setIsDiscovering(false);
      
      // Clear discovery timer
      if ((mdnsServiceRef.current as any).discoveryTimer) {
        clearInterval((mdnsServiceRef.current as any).discoveryTimer);
      }

      await mdnsServiceRef.current.stop();
      mdnsServiceRef.current = null;
      clearPeers();
    } catch (error) {
      console.error('Failed to stop peer discovery:', error);
    }
  }, [setIsDiscovering, clearPeers]);

  // Restart discovery
  const restartDiscovery = useCallback(async () => {
    await stopDiscovery();
    await startDiscovery();
  }, [stopDiscovery, startDiscovery]);

  // Manual discovery trigger
  const triggerDiscovery = useCallback(async () => {
    if (mdnsServiceRef.current) {
      await mdnsServiceRef.current.discover();
    }
  }, []);

  // Auto-start discovery when enabled and device info is available
  useEffect(() => {
    if (enabled && deviceInfo && !mdnsServiceRef.current) {
      startDiscovery();
    }
  }, [enabled, deviceInfo, startDiscovery]);

  // Cleanup on unmount or when disabled
  useEffect(() => {
    return () => {
      if (mdnsServiceRef.current) {
        stopDiscovery();
      }
    };
  }, [stopDiscovery]);

  // Pause/resume discovery based on enabled state
  useEffect(() => {
    if (!enabled && mdnsServiceRef.current) {
      stopDiscovery();
    } else if (enabled && deviceInfo && !mdnsServiceRef.current) {
      startDiscovery();
    }
  }, [enabled, deviceInfo, startDiscovery, stopDiscovery]);

  return {
    // State
    peers,
    isDiscovering,
    deviceInfo,
    
    // Actions
    startDiscovery,
    stopDiscovery,
    restartDiscovery,
    triggerDiscovery,
    
    // Computed
    availablePeers: peers.filter(peer => peer.available),
    mobileDevices: peers.filter(peer => peer.deviceType === 'mobile'),
    desktopDevices: peers.filter(peer => peer.deviceType === 'desktop'),
  };
} 