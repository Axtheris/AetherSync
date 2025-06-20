// Generated TypeScript types for transfer.proto
// This replaces the protobuf generated code with hand-written TypeScript types

export interface DiscoverPing {
  device_id: string;
  device_name: string;
  device_type: string; // "mobile", "desktop"
  timestamp: number;
  protocol_version: string;
}

export interface DiscoverPong {
  device_id: string;
  device_name: string;
  device_type: string;
  timestamp: number;
  protocol_version: string;
  available: boolean;
  ip_address: string;
  port: number;
}

export interface FileMeta {
  file_id: string;
  filename: string;
  file_size: number;
  mime_type: string;
  timestamp: number;
  checksum: string; // SHA-256 hash for integrity
  total_chunks: number;
  chunk_size: number;
  sender_id: string;
  sender_name: string;
}

export interface FileChunk {
  file_id: string;
  chunk_index: number;
  total_chunks: number;
  data: Uint8Array;
  checksum: string; // SHA-256 hash of this chunk
  timestamp: number;
}

export interface Ack {
  file_id: string;
  chunk_index: number; // -1 for file-level acknowledgment
  success: boolean;
  message: string;
  timestamp: number;
}

export interface Error {
  error_code: string;
  error_message: string;
  file_id?: string; // optional, if error relates to specific file
  timestamp: number;
  details: Record<string, string>; // additional error context
}

export interface TransferMessage {
  message: {
    discover_ping?: DiscoverPing;
    discover_pong?: DiscoverPong;
    file_meta?: FileMeta;
    file_chunk?: FileChunk;
    ack?: Ack;
    error?: Error;
  };
}

// Helper functions for creating messages
export function createDiscoverPing(data: DiscoverPing): TransferMessage {
  return { message: { discover_ping: data } };
}

export function createDiscoverPong(data: DiscoverPong): TransferMessage {
  return { message: { discover_pong: data } };
}

export function createFileMeta(data: FileMeta): TransferMessage {
  return { message: { file_meta: data } };
}

export function createFileChunk(data: FileChunk): TransferMessage {
  return { message: { file_chunk: data } };
}

export function createAck(data: Ack): TransferMessage {
  return { message: { ack: data } };
}

export function createError(data: Error): TransferMessage {
  return { message: { error: data } };
}

// Type guards
export function isDiscoverPing(msg: TransferMessage): msg is TransferMessage & { message: { discover_ping: DiscoverPing } } {
  return msg.message.discover_ping !== undefined;
}

export function isDiscoverPong(msg: TransferMessage): msg is TransferMessage & { message: { discover_pong: DiscoverPong } } {
  return msg.message.discover_pong !== undefined;
}

export function isFileMeta(msg: TransferMessage): msg is TransferMessage & { message: { file_meta: FileMeta } } {
  return msg.message.file_meta !== undefined;
}

export function isFileChunk(msg: TransferMessage): msg is TransferMessage & { message: { file_chunk: FileChunk } } {
  return msg.message.file_chunk !== undefined;
}

export function isAck(msg: TransferMessage): msg is TransferMessage & { message: { ack: Ack } } {
  return msg.message.ack !== undefined;
}

export function isError(msg: TransferMessage): msg is TransferMessage & { message: { error: Error } } {
  return msg.message.error !== undefined;
} 