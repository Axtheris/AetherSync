import React from 'react';
import { View, Text } from 'react-native';

export interface FileIconProps {
  mimeType: string;
  fileName?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showExtension?: boolean;
}

export const FileIcon: React.FC<FileIconProps> = ({
  mimeType,
  fileName,
  size = 'md',
  className = '',
  showExtension = false,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  // Get file extension from filename or mime type
  const getExtension = () => {
    if (fileName) {
      const ext = fileName.split('.').pop()?.toLowerCase() || '';
      return ext;
    }
    
    // Fallback to mime type mapping
    const mimeTypeMap: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'video/mp4': 'mp4',
      'video/avi': 'avi',
      'audio/mp3': 'mp3',
      'audio/wav': 'wav',
      'application/pdf': 'pdf',
      'application/zip': 'zip',
      'text/plain': 'txt',
    };
    
    return mimeTypeMap[mimeType] || 'file';
  };

  // Get color and icon based on file type
  const getFileTypeStyle = () => {
    const ext = getExtension();
    
    // Image files
    if (mimeType.startsWith('image/')) {
      return {
        backgroundColor: '#10b981',
        icon: '🖼️',
        color: '#ffffff'
      };
    }
    
    // Video files
    if (mimeType.startsWith('video/')) {
      return {
        backgroundColor: '#f59e0b',
        icon: '🎬',
        color: '#ffffff'
      };
    }
    
    // Audio files
    if (mimeType.startsWith('audio/')) {
      return {
        backgroundColor: '#ef4444',
        icon: '🎵',
        color: '#ffffff'
      };
    }
    
    // Document files
    if (mimeType.includes('pdf')) {
      return {
        backgroundColor: '#dc2626',
        icon: '📄',
        color: '#ffffff'
      };
    }
    
    if (mimeType.includes('word') || mimeType.includes('document')) {
      return {
        backgroundColor: '#2563eb',
        icon: '📝',
        color: '#ffffff'
      };
    }
    
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) {
      return {
        backgroundColor: '#059669',
        icon: '📊',
        color: '#ffffff'
      };
    }
    
    if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) {
      return {
        backgroundColor: '#d97706',
        icon: '📊',
        color: '#ffffff'
      };
    }
    
    // Archive files
    if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('7z')) {
      return {
        backgroundColor: '#7c3aed',
        icon: '🗜️',
        color: '#ffffff'
      };
    }
    
    // Default
    return {
      backgroundColor: '#64748b',
      icon: '📄',
      color: '#ffffff'
    };
  };

  const fileStyle = getFileTypeStyle();
  const extension = getExtension().toUpperCase();

  return (
    <View className={`items-center ${className}`}>
      <View 
        className={`
          ${sizeClasses[size]} 
          rounded-lg 
          items-center 
          justify-center
        `}
        style={{ backgroundColor: fileStyle.backgroundColor }}
      >
        {showExtension ? (
          <Text 
            className={`${textSizeClasses[size]} font-bold`}
            style={{ color: fileStyle.color }}
          >
            {extension}
          </Text>
        ) : (
          <Text className={textSizeClasses[size]}>
            {fileStyle.icon}
          </Text>
        )}
      </View>
    </View>
  );
};

// Progress indicator for file transfers
export interface FileTransferItemProps {
  fileName: string;
  fileSize: number;
  mimeType: string;
  progress: number;
  status: 'pending' | 'transferring' | 'completed' | 'error';
  className?: string;
}

export const FileTransferItem: React.FC<FileTransferItemProps> = ({
  fileName,
  fileSize,
  mimeType,
  progress,
  status,
  className = '',
}) => {
  const formatFileSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'error': return '#ef4444';
      case 'transferring': return '#3b82f6';
      default: return '#64748b';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed': return '✓';
      case 'error': return '✗';
      case 'transferring': return '↻';
      default: return '⏸️';
    }
  };

  return (
    <View className={`flex-row items-center p-3 bg-surface-50 rounded-lg ${className}`}>
      <FileIcon mimeType={mimeType} fileName={fileName} size="md" />
      
      <View className="flex-1 ml-3">
        <Text className="text-text-primary font-medium" numberOfLines={1}>
          {fileName}
        </Text>
        <Text className="text-text-secondary text-sm">
          {formatFileSize(fileSize)}
        </Text>
        
        {status === 'transferring' && (
          <View className="mt-2">
            <View className="h-1 bg-surface-200 rounded-full">
              <View 
                className="h-1 bg-primary-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </View>
          </View>
        )}
      </View>
      
      <View 
        className="w-6 h-6 rounded-full items-center justify-center ml-2"
        style={{ backgroundColor: getStatusColor() }}
      >
        <Text className="text-white text-xs font-bold">
          {getStatusIcon()}
        </Text>
      </View>
    </View>
  );
}; 