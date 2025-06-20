export const formatFileSize = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let size = bytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(size < 10 ? 1 : 0)} ${units[unitIndex]}`
}

export const formatStorageSize = (bytes: number): string => {
  if (bytes >= 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
  } else if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  } else if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  } else {
    return `${bytes} B`
  }
}

export const convertBytesToGB = (bytes: number): number => {
  return bytes / (1024 * 1024 * 1024)
}

export const convertGBToBytes = (gb: number): number => {
  return gb * 1024 * 1024 * 1024
}

export const getFileExtension = (fileName: string): string => {
  return fileName.split('.').pop()?.toLowerCase() || ''
}

export const getFileTypeFromExtension = (extension: string): string => {
  const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico']
  const videoTypes = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv', '3gp']
  const audioTypes = ['mp3', 'wav', 'flac', 'aac', 'ogg', 'wma', 'm4a']
  const documentTypes = ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt']
  const spreadsheetTypes = ['xls', 'xlsx', 'csv', 'ods']
  const presentationTypes = ['ppt', 'pptx', 'odp']
  const archiveTypes = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2']
  const codeTypes = ['js', 'ts', 'html', 'css', 'py', 'java', 'cpp', 'c', 'h', 'php', 'rb', 'go', 'rs']

  if (imageTypes.includes(extension)) return 'image'
  if (videoTypes.includes(extension)) return 'video'
  if (audioTypes.includes(extension)) return 'audio'
  if (documentTypes.includes(extension)) return 'document'
  if (spreadsheetTypes.includes(extension)) return 'spreadsheet'
  if (presentationTypes.includes(extension)) return 'presentation'
  if (archiveTypes.includes(extension)) return 'archive'
  if (codeTypes.includes(extension)) return 'code'
  
  return 'unknown'
}

export const getFileIcon = (fileName: string): string => {
  const extension = getFileExtension(fileName)
  const fileType = getFileTypeFromExtension(extension)

  switch (fileType) {
    case 'image': return '🖼️'
    case 'video': return '🎬'
    case 'audio': return '🎵'
    case 'document': return '📄'
    case 'spreadsheet': return '📊'
    case 'presentation': return '📈'
    case 'archive': return '🗜️'
    case 'code': return '💻'
    default: return '📁'
  }
}

export const getFileColor = (fileName: string): string => {
  const extension = getFileExtension(fileName)
  const fileType = getFileTypeFromExtension(extension)

  switch (fileType) {
    case 'image': return '#10b981'
    case 'video': return '#f59e0b'
    case 'audio': return '#ef4444'
    case 'document': return '#dc2626'
    case 'spreadsheet': return '#059669'
    case 'presentation': return '#d97706'
    case 'archive': return '#7c3aed'
    case 'code': return '#3b82f6'
    default: return '#64748b'
  }
}

export const generateShareLink = (shareCode: string): string => {
  return `aethersync://share/${shareCode}`
}

export const parseShareLink = (link: string): string | null => {
  const match = link.match(/aethersync:\/\/share\/([A-Z0-9]+)/)
  return match ? match[1] : null
}

export const isValidShareLink = (link: string): boolean => {
  return /^aethersync:\/\/share\/[A-Z0-9]+$/.test(link)
}

export const formatTransferSpeed = (bytesPerSecond: number): string => {
  return `${formatFileSize(bytesPerSecond)}/s`
}

export const estimateTimeRemaining = (totalBytes: number, completedBytes: number, bytesPerSecond: number): string => {
  if (bytesPerSecond === 0 || completedBytes >= totalBytes) return '0s'
  
  const remainingBytes = totalBytes - completedBytes
  const seconds = Math.ceil(remainingBytes / bytesPerSecond)
  
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.ceil(seconds / 60)}m`
  if (seconds < 86400) return `${Math.ceil(seconds / 3600)}h`
  
  return `${Math.ceil(seconds / 86400)}d`
}

export const createThumbnail = async (file: File): Promise<string | null> => {
  if (!file.type.startsWith('image/')) return null
  
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        const maxSize = 64
        const ratio = Math.min(maxSize / img.width, maxSize / img.height)
        
        canvas.width = img.width * ratio
        canvas.height = img.height * ratio
        
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.8))
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  })
} 