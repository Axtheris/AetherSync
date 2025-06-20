import mdns from 'multicast-dns';
import { EventEmitter } from 'events';
import type { DiscoverPing, DiscoverPong } from './generated/transfer';

export interface PeerInfo {
  deviceId: string;
  deviceName: string;
  deviceType: 'mobile' | 'desktop';
  ipAddress: string;
  port: number;
  timestamp: number;
  available: boolean;
}

export interface MDNSOptions {
  serviceName?: string;
  domain?: string;
  port?: number;
  deviceId: string;
  deviceName: string;
  deviceType: 'mobile' | 'desktop';
}

export class MDNSService extends EventEmitter {
  private mdns: any;
  private options: Required<MDNSOptions>;
  private isRunning = false;
  private discoveredPeers = new Map<string, PeerInfo>();
  private heartbeatInterval?: NodeJS.Timeout;

  constructor(options: MDNSOptions) {
    super();
    this.options = {
      serviceName: '_aethersync._tcp',
      domain: 'local',
      port: 0,
      ...options,
    };
  }

  async start(): Promise<void> {
    if (this.isRunning) return;

    this.mdns = mdns();
    this.isRunning = true;

    // Listen for queries
    this.mdns.on('query', (query: any) => {
      this.handleQuery(query);
    });

    // Listen for responses
    this.mdns.on('response', (response: any) => {
      this.handleResponse(response);
    });

    // Start heartbeat for periodic discovery
    this.startHeartbeat();

    // Announce ourselves
    await this.announce();
  }

  async stop(): Promise<void> {
    if (!this.isRunning) return;

    this.isRunning = false;
    
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = undefined;
    }

    if (this.mdns) {
      this.mdns.destroy();
      this.mdns = null;
    }

    this.discoveredPeers.clear();
  }

  async announce(): Promise<void> {
    if (!this.isRunning || !this.mdns) return;

    const serviceName = `${this.options.deviceName}.${this.options.serviceName}.${this.options.domain}`;
    
    this.mdns.respond({
      answers: [
        {
          name: serviceName,
          type: 'PTR',
          ttl: 300,
          data: `${this.options.deviceId}.${this.options.serviceName}.${this.options.domain}`,
        },
        {
          name: `${this.options.deviceId}.${this.options.serviceName}.${this.options.domain}`,
          type: 'SRV',
          ttl: 300,
          data: {
            port: this.options.port,
            weight: 0,
            priority: 0,
            target: `${this.options.deviceId}.local`,
          },
        },
        {
          name: `${this.options.deviceId}.${this.options.serviceName}.${this.options.domain}`,
          type: 'TXT',
          ttl: 300,
          data: [
            `deviceId=${this.options.deviceId}`,
            `deviceName=${this.options.deviceName}`,
            `deviceType=${this.options.deviceType}`,
            `version=1.0.0`,
          ],
        },
      ],
    });
  }

  async discover(): Promise<void> {
    if (!this.isRunning || !this.mdns) return;

    this.mdns.query({
      questions: [
        {
          name: `${this.options.serviceName}.${this.options.domain}`,
          type: 'PTR',
        },
      ],
    });
  }

  getPeers(): PeerInfo[] {
    return Array.from(this.discoveredPeers.values());
  }

  getPeer(deviceId: string): PeerInfo | undefined {
    return this.discoveredPeers.get(deviceId);
  }

  private handleQuery(query: any): void {
    // Check if someone is looking for our service
    const questions = query.questions || [];
    for (const question of questions) {
      if (question.name === `${this.options.serviceName}.${this.options.domain}` && 
          question.type === 'PTR') {
        this.announce();
        break;
      }
    }
  }

  private handleResponse(response: any): void {
    const answers = response.answers || [];
    let peerInfo: Partial<PeerInfo> = {};
    let hasPeerInfo = false;

    for (const answer of answers) {
      if (answer.type === 'TXT' && answer.name.includes(this.options.serviceName)) {
        const txtData = answer.data || [];
        const txtMap = new Map<string, string>();
        
        txtData.forEach((txt: string) => {
          const [key, value] = txt.split('=');
          if (key && value) {
            txtMap.set(key, value);
          }
        });

        const deviceId = txtMap.get('deviceId');
        const deviceName = txtMap.get('deviceName');
        const deviceType = txtMap.get('deviceType') as 'mobile' | 'desktop';

        if (deviceId && deviceName && deviceType && deviceId !== this.options.deviceId) {
          peerInfo.deviceId = deviceId;
          peerInfo.deviceName = deviceName;
          peerInfo.deviceType = deviceType;
          peerInfo.timestamp = Date.now();
          peerInfo.available = true;
          hasPeerInfo = true;
        }
      } else if (answer.type === 'SRV' && answer.name.includes(this.options.serviceName)) {
        if (answer.data) {
          peerInfo.port = answer.data.port;
        }
      } else if (answer.type === 'A' && peerInfo.deviceId) {
        peerInfo.ipAddress = answer.data;
      }
    }

    if (hasPeerInfo && peerInfo.deviceId && peerInfo.ipAddress && peerInfo.port) {
      const completePeer = peerInfo as PeerInfo;
      const existingPeer = this.discoveredPeers.get(completePeer.deviceId);
      
      if (!existingPeer || existingPeer.timestamp < completePeer.timestamp) {
        this.discoveredPeers.set(completePeer.deviceId, completePeer);
        this.emit('peerDiscovered', completePeer);
      }
    }
  }

  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      this.discover();
      this.cleanupStalePreers();
    }, 5000); // Discover every 5 seconds
  }

  private cleanupStalePreers(): void {
    const now = Date.now();
    const staleThreshold = 30000; // 30 seconds

    for (const [deviceId, peer] of this.discoveredPeers.entries()) {
      if (now - peer.timestamp > staleThreshold) {
        this.discoveredPeers.delete(deviceId);
        this.emit('peerLost', peer);
      }
    }
  }
}

export function createMDNSService(options: MDNSOptions): MDNSService {
  return new MDNSService(options);
} 