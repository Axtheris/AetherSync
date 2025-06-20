import { createHash, randomBytes } from 'crypto';

/**
 * Generate a unique device ID
 */
export function generateDeviceId(): string {
  return randomBytes(16).toString('hex');
}

/**
 * Calculate SHA-256 checksum of data
 */
export function calculateChecksum(data: Buffer | Uint8Array | string): string {
  const hash = createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
}

/**
 * Generate a unique file ID
 */
export function generateFileId(): string {
  return `${Date.now()}-${randomBytes(8).toString('hex')}`;
}

/**
 * Get device name based on platform
 */
export function getDeviceName(): string {
  if (typeof window !== 'undefined') {
    // Browser environment
    return `Web Browser`;
  } else if (typeof process !== 'undefined') {
    // Node.js environment
    const os = require('os');
    return os.hostname() || 'Desktop';
  }
  return 'Unknown Device';
}

/**
 * Get device type based on platform
 */
export function getDeviceType(): 'mobile' | 'desktop' {
  if (typeof window !== 'undefined') {
    // Browser - check if mobile
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    return isMobile ? 'mobile' : 'desktop';
  } else {
    // Node.js environment is desktop
    return 'desktop';
  }
}

/**
 * Validate file size against limits
 */
export function validateFileSize(size: number, maxSize: number = 10 * 1024 * 1024 * 1024): boolean {
  return size > 0 && size <= maxSize;
}

/**
 * Calculate number of chunks needed for a file
 */
export function calculateChunkCount(fileSize: number, chunkSize: number = 64 * 1024): number {
  return Math.ceil(fileSize / chunkSize);
}

/**
 * Validate checksum against expected value
 */
export function validateChecksum(data: Buffer | Uint8Array | string, expectedChecksum: string): boolean {
  const actualChecksum = calculateChecksum(data);
  return actualChecksum === expectedChecksum;
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

/**
 * Get MIME type from file extension
 */
export function getMimeType(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase();
  
  const mimeTypes: Record<string, string> = {
    // Images
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    bmp: 'image/bmp',
    ico: 'image/x-icon',
    
    // Videos
    mp4: 'video/mp4',
    avi: 'video/x-msvideo',
    mov: 'video/quicktime',
    wmv: 'video/x-ms-wmv',
    flv: 'video/x-flv',
    webm: 'video/webm',
    mkv: 'video/x-matroska',
    
    // Audio
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    m4a: 'audio/mp4',
    flac: 'audio/flac',
    aac: 'audio/aac',
    
    // Documents
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    txt: 'text/plain',
    
    // Archives
    zip: 'application/zip',
    rar: 'application/x-rar-compressed',
    '7z': 'application/x-7z-compressed',
    tar: 'application/x-tar',
    gz: 'application/gzip',
    
    // Code
    js: 'application/javascript',
    json: 'application/json',
    html: 'text/html',
    css: 'text/css',
    xml: 'application/xml',
  };

  return mimeTypes[extension || ''] || 'application/octet-stream';
}

/**
 * Check if file type is supported
 */
export function isSupportedFileType(mimeType: string): boolean {
  // For now, support all file types
  // This can be restricted based on requirements
  return true;
}

/**
 * Generate progress percentage
 */
export function calculateProgress(transferred: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.max(0, (transferred / total) * 100));
} 