// Re-export protobuf generated types
export * from './generated/transfer';

// Export mDNS functionality
export * from './mdns';

// Export utility functions
export * from './utils';

// Protocol constants
export const PROTOCOL_VERSION = '1.0.0';
export const DEFAULT_CHUNK_SIZE = 64 * 1024; // 64KB chunks
export const MAX_FILE_SIZE = 10 * 1024 * 1024 * 1024; // 10GB max file size
export const DISCOVERY_INTERVAL = 5000; // 5 seconds
export const PEER_TIMEOUT = 30000; // 30 seconds

// Error codes
export enum ErrorCode {
  UNKNOWN = 'UNKNOWN',
  NETWORK_ERROR = 'NETWORK_ERROR',
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  INVALID_CHECKSUM = 'INVALID_CHECKSUM',
  PEER_DISCONNECTED = 'PEER_DISCONNECTED',
  TRANSFER_CANCELLED = 'TRANSFER_CANCELLED',
  STORAGE_FULL = 'STORAGE_FULL',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  UNSUPPORTED_FILE_TYPE = 'UNSUPPORTED_FILE_TYPE',
} 