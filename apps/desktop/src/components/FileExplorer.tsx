import { useState, useEffect } from 'react'
import { Folder, Search, MoreHorizontal, ArrowLeft, Eye, Copy, Trash2, ExternalLink, FolderOpen } from 'lucide-react'
import toast from 'react-hot-toast'
import { useTransferStore } from '../stores/transfer-store'
import { 
  formatFileSize, 
  getFileIcon, 
  getFileColor,
  generateShareLink 
} from '../utils/file-utils'

interface FileItem {
  id: string
  name: string
  type: 'folder' | 'file'
  size?: number
  modified: string
  path: string
  mimeType?: string
}

export default function FileExplorer() {
  const [selectedView, setSelectedView] = useState<'files' | 'shares'>('files')
  const [searchQuery, setSearchQuery] = useState('')
  
  const { 
    shareLinks, 
    fileAnalysis, 
    downloadPath,
    deleteShareLink,
    createShareLink,
    initialize 
  } = useTransferStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  // Generate recent files based on file analysis
  const generateRecentFiles = (): FileItem[] => {
    if (!fileAnalysis) return []
    
    const files: FileItem[] = []
    const fileTypes = [
      { ext: 'jpg', type: 'image/jpeg', category: 'photos' },
      { ext: 'png', type: 'image/png', category: 'photos' },
      { ext: 'mp4', type: 'video/mp4', category: 'videos' },
      { ext: 'mp3', type: 'audio/mp3', category: 'sound' },
      { ext: 'pdf', type: 'application/pdf', category: 'documents' },
      { ext: 'docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', category: 'documents' },
    ]
    
    // Create sample files based on actual counts
    fileTypes.forEach((fileType, index) => {
      const category = fileType.category as keyof typeof fileAnalysis
      const count = fileAnalysis[category]?.count || 0
      
      if (count > 0) {
        // Create a few sample files for each category
        const sampleCount = Math.min(count, 3)
        for (let i = 0; i < sampleCount; i++) {
          files.push({
            id: `file-${index}-${i}`,
            name: `sample_file_${i + 1}.${fileType.ext}`,
            type: 'file',
            size: Math.floor(Math.random() * 50 * 1024 * 1024), // Random size up to 50MB
            modified: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            path: `${downloadPath}/sample_file_${i + 1}.${fileType.ext}`,
            mimeType: fileType.type
          })
        }
      }
    })
    
    return files.slice(0, 8) // Limit to 8 files
  }

  const recentFiles = generateRecentFiles()
  
  // Filter files based on search query
  const filteredFiles = recentFiles.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpenFile = async (file: FileItem) => {
    if (window.electronAPI) {
      const success = await window.electronAPI.fs.openFile(file.path)
      if (!success) {
        toast.error('Failed to open file')
      }
    }
  }

  const handleShowInFolder = async (file: FileItem) => {
    if (window.electronAPI) {
      const success = await window.electronAPI.fs.showInFolder(file.path)
      if (!success) {
        toast.error('Failed to show file in folder')
      }
    }
  }

  const handleCreateShareLink = async (file: FileItem) => {
    try {
      const shareLink = await createShareLink(file.path)
      const link = generateShareLink(shareLink.shareCode)
      
      await navigator.clipboard.writeText(link)
      toast.success('Share link copied to clipboard!')
    } catch (error) {
      toast.error('Failed to create share link')
    }
  }

  const handleCopyShareLink = async (shareCode: string) => {
    const link = generateShareLink(shareCode)
    await navigator.clipboard.writeText(link)
    toast.success('Share link copied to clipboard!')
  }

  const handleDeleteShareLink = (id: string) => {
    deleteShareLink(id)
    toast.success('Share link deleted')
  }

  const handleOpenDownloadFolder = async () => {
    if (window.electronAPI && downloadPath) {
      const success = await window.electronAPI.fs.showInFolder(downloadPath)
      if (!success) {
        toast.error('Failed to open download folder')
      }
    }
  }

  const formatShareExpiry = (expiresAt: Date) => {
    const now = new Date()
    const timeLeft = expiresAt.getTime() - now.getTime()
    
    if (timeLeft <= 0) return 'Expired'
    
    const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000))
    const hours = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
    
    if (days > 0) return `${days}d ${hours}h left`
    if (hours > 0) return `${hours}h left`
    
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000))
    return `${minutes}m left`
  }

  const activeShareLinks = shareLinks.filter(link => new Date(link.expiresAt) > new Date())
  const expiredShareLinks = shareLinks.filter(link => new Date(link.expiresAt) <= new Date())

  return (
    <div className="w-80 bg-white/50 backdrop-blur-sm border-l border-surface-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-surface-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">File Manager</h2>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search files..."
              className="pl-9 pr-3 py-1.5 text-sm border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white/50"
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-surface-100 rounded-lg p-1">
          <button
            onClick={() => setSelectedView('files')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              selectedView === 'files'
                ? 'bg-white text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Recent Files
          </button>
          <button
            onClick={() => setSelectedView('shares')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              selectedView === 'shares'
                ? 'bg-white text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Share Links
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {selectedView === 'files' ? (
          <div className="p-4">
            {/* Download Folder Access */}
            <div className="bg-surface-50 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FolderOpen size={16} className="text-primary-500" />
                  <span className="text-sm font-medium text-text-primary">Downloads</span>
                </div>
                <button
                  onClick={handleOpenDownloadFolder}
                  className="text-primary-500 hover:text-primary-600 text-xs"
                >
                  <ExternalLink size={14} />
                </button>
              </div>
              <p className="text-xs text-text-secondary mt-1 truncate">
                {downloadPath || 'No download path set'}
              </p>
            </div>

            {/* File Type Summary */}
            {fileAnalysis && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-text-primary">{fileAnalysis.documents.count}</div>
                  <div className="text-xs text-text-secondary">Documents</div>
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-text-primary">{fileAnalysis.photos.count}</div>
                  <div className="text-xs text-text-secondary">Images</div>
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-text-primary">{fileAnalysis.videos.count}</div>
                  <div className="text-xs text-text-secondary">Videos</div>
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-text-primary">{fileAnalysis.sound.count}</div>
                  <div className="text-xs text-text-secondary">Audio</div>
                </div>
              </div>
            )}

            {/* Recent Files */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-text-secondary mb-3">Recent Files</h3>
              {filteredFiles.length > 0 ? (
                filteredFiles.map((file) => (
                  <div key={file.id} className="group hover:bg-surface-50 rounded-lg p-2 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-medium"
                          style={{ backgroundColor: getFileColor(file.name) }}
                        >
                          {getFileIcon(file.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-text-primary text-sm truncate">{file.name}</h4>
                          <p className="text-xs text-text-secondary">
                            {file.size && formatFileSize(file.size)} • {file.modified}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenFile(file)}
                          className="text-text-tertiary hover:text-text-secondary p-1"
                          title="Open file"
                        >
                          <ExternalLink size={12} />
                        </button>
                        <button
                          onClick={() => handleCreateShareLink(file)}
                          className="text-text-tertiary hover:text-text-secondary p-1"
                          title="Create share link"
                        >
                          <Copy size={12} />
                        </button>
                        <button
                          onClick={() => handleShowInFolder(file)}
                          className="text-text-tertiary hover:text-text-secondary p-1"
                          title="Show in folder"
                        >
                          <Eye size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-text-tertiary mb-2">
                    {searchQuery ? 'No files found' : 'No recent files'}
                  </div>
                  <div className="text-xs text-text-tertiary">
                    {searchQuery ? 'Try a different search term' : 'Files will appear here after transfers'}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4">
            {/* Active Share Links */}
            {activeShareLinks.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-text-secondary mb-3">Active Links</h3>
                <div className="space-y-3">
                  {activeShareLinks.map((shareLink) => (
                    <div key={shareLink.id} className="bg-white rounded-lg p-3 border border-surface-200">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                          <div className="text-lg">{getFileIcon(shareLink.fileName)}</div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-text-primary text-sm truncate">
                              {shareLink.fileName}
                            </h4>
                            <p className="text-xs text-text-secondary">
                              Code: {shareLink.shareCode}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteShareLink(shareLink.id)}
                          className="text-text-tertiary hover:text-error p-1"
                          title="Delete share link"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-secondary">
                          {shareLink.downloadCount}/{shareLink.maxDownloads} downloads
                        </span>
                        <span className="text-text-secondary">
                          {formatShareExpiry(shareLink.expiresAt)}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => handleCopyShareLink(shareLink.shareCode)}
                        className="w-full mt-2 bg-primary-500 hover:bg-primary-600 text-white text-xs py-1.5 rounded transition-colors"
                      >
                        Copy Link
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Expired Share Links */}
            {expiredShareLinks.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-text-secondary mb-3">Expired Links</h3>
                <div className="space-y-2">
                  {expiredShareLinks.map((shareLink) => (
                    <div key={shareLink.id} className="bg-surface-50 rounded-lg p-3 opacity-60">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                          <div className="text-lg">{getFileIcon(shareLink.fileName)}</div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-text-primary text-sm truncate">
                              {shareLink.fileName}
                            </h4>
                            <p className="text-xs text-text-secondary">Expired</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteShareLink(shareLink.id)}
                          className="text-text-tertiary hover:text-error p-1"
                          title="Delete expired link"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {shareLinks.length === 0 && (
              <div className="text-center py-8">
                <div className="text-text-tertiary mb-2">No share links</div>
                <div className="text-xs text-text-tertiary">
                  Create share links from completed transfers
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 