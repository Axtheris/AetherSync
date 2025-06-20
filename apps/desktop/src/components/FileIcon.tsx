import React from 'react'
import { 
  getFileIcon, 
  getFileColor, 
  getFileExtension, 
  getFileTypeFromExtension 
} from '../utils/file-utils'

interface FileIconProps {
  fileName: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showExtension?: boolean
  className?: string
  thumbnail?: string
}

export const FileIcon: React.FC<FileIconProps> = ({
  fileName,
  size = 'md',
  showExtension = false,
  className = '',
  thumbnail,
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
    xl: 'w-12 h-12 text-lg',
  }

  const extension = getFileExtension(fileName).toUpperCase()
  const fileType = getFileTypeFromExtension(extension.toLowerCase())
  const color = getFileColor(fileName)
  const icon = getFileIcon(fileName)

  // Show thumbnail for images if available
  if (thumbnail && fileType === 'image') {
    return (
      <div className={`${sizeClasses[size]} ${className} relative`}>
        <img
          src={thumbnail}
          alt={fileName}
          className="w-full h-full object-cover rounded"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 rounded" />
      </div>
    )
  }

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        ${className}
        rounded flex items-center justify-center font-medium text-white
      `}
      style={{ backgroundColor: color }}
    >
      {showExtension && extension ? (
        <span className="font-bold">
          {extension.length > 4 ? extension.slice(0, 3) : extension}
        </span>
      ) : (
        <span>{icon}</span>
      )}
    </div>
  )
}

interface FilePreviewProps {
  fileName: string
  filePath?: string
  fileSize?: number
  className?: string
  onPreview?: () => void
}

export const FilePreview: React.FC<FilePreviewProps> = ({
  fileName,
  filePath,
  fileSize,
  className = '',
  onPreview,
}) => {
  const extension = getFileExtension(fileName)
  const fileType = getFileTypeFromExtension(extension)
  
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return ''
    const units = ['B', 'KB', 'MB', 'GB']
    let size = bytes
    let unitIndex = 0
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`
  }

  const isPreviewable = ['image', 'video', 'audio'].includes(fileType)

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <FileIcon fileName={fileName} size="lg" />
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-text-primary truncate">{fileName}</h3>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <span>{extension.toUpperCase()}</span>
          {fileSize && (
            <>
              <span>•</span>
              <span>{formatFileSize(fileSize)}</span>
            </>
          )}
        </div>
      </div>

      {isPreviewable && onPreview && (
        <button
          onClick={onPreview}
          className="px-3 py-1 text-xs bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors"
        >
          Preview
        </button>
      )}
    </div>
  )
}

export default FileIcon 