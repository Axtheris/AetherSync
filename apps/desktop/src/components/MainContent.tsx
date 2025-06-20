import React, { useState, useCallback, useEffect } from 'react'
import { Upload, Download, X, CheckCircle, Link2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useTransferStore } from '../stores/transfer-store'
import { 
  formatFileSize, 
  getFileIcon, 
  formatTransferSpeed, 
  estimateTimeRemaining,
  generateShareLink,
  parseShareLink,
  isValidShareLink 
} from '../utils/file-utils'

const MainContent: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [activeTab, setActiveTab] = useState<'upload' | 'download'>('upload')
  const [shareInput, setShareInput] = useState('')
  
  const { 
    transfers, 
    addTransfer, 
    removeTransfer, 
    createShareLink,
    updateTransferProgress,
    completeTransfer,
    cancelTransfer
  } = useTransferStore()

  // Simulate transfer progress for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      transfers.forEach(transfer => {
        if (transfer.status === 'uploading' || transfer.status === 'downloading') {
          if (transfer.progress < 100) {
            const newProgress = Math.min(transfer.progress + Math.random() * 10, 100)
            const speed = 1024 * 1024 * (2 + Math.random() * 8) // 2-10 MB/s
            updateTransferProgress(transfer.id, newProgress, speed)
            
            if (newProgress >= 100) {
              completeTransfer(transfer.id, `/downloads/${transfer.name}`)
            }
          }
        }
      })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [transfers, updateTransferProgress, completeTransfer])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    for (const file of files) {
      const transferId = await addTransfer(file, 'upload')
      // Start upload simulation
      setTimeout(() => {
        updateTransferProgress(transferId, 1)
      }, 100)
    }
    
    toast.success(`Added ${files.length} file${files.length > 1 ? 's' : ''} to upload queue`)
  }, [addTransfer, updateTransferProgress])

  const handleFileSelect = useCallback(async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.onchange = async (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || [])
      for (const file of files) {
        const transferId = await addTransfer(file, 'upload')
        // Start upload simulation
        setTimeout(() => {
          updateTransferProgress(transferId, 1)
        }, 100)
      }
      toast.success(`Added ${files.length} file${files.length > 1 ? 's' : ''} to upload queue`)
    }
    input.click()
  }, [addTransfer, updateTransferProgress])

  const handleCreateShareLink = async (transfer: any) => {
    try {
      const shareLink = await createShareLink(transfer.path || `/uploads/${transfer.name}`)
      const link = generateShareLink(shareLink.shareCode)
      
      navigator.clipboard.writeText(link)
      toast.success('Share link copied to clipboard!')
    } catch (error) {
      toast.error('Failed to create share link')
    }
  }

  const handlePasteShareLink = () => {
    if (isValidShareLink(shareInput.trim())) {
      const shareCode = parseShareLink(shareInput.trim())
      if (shareCode) {
        // In a real app, this would fetch the file info and start download
        toast.success(`Starting download for share code: ${shareCode}`)
        setShareInput('')
      }
    } else {
      toast.error('Invalid share link format')
    }
  }

  const completedTransfers = transfers.filter(t => t.status === 'completed')
  const activeTransfers = transfers.filter(t => 
    t.status === 'uploading' || t.status === 'downloading' || t.status === 'pending'
  )

  const totalSpeed = activeTransfers.reduce((sum, t) => sum + (t.speed || 0), 0)
  const avgSpeed = activeTransfers.length > 0 ? totalSpeed / activeTransfers.length : 0

  return (
    <div className="flex-1 flex flex-col bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm">
      {/* Header Tabs */}
      <div className="flex items-center border-b border-surface-200 dark:border-gray-700 px-6 py-4">
        <div className="flex space-x-1 bg-surface-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'upload'
                ? 'bg-white dark:bg-gray-600 text-text-primary dark:text-white shadow-sm'
                : 'text-text-secondary dark:text-gray-300 hover:text-text-primary dark:hover:text-white'
            }`}
          >
            Upload
          </button>
          <button
            onClick={() => setActiveTab('download')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'download'
                ? 'bg-white dark:bg-gray-600 text-text-primary dark:text-white shadow-sm'
                : 'text-text-secondary dark:text-gray-300 hover:text-text-primary dark:hover:text-white'
            }`}
          >
            Download
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeTab === 'upload' ? (
          <>
            {/* Upload Drop Zone */}
            <div
              className={`
                border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 mb-6
                ${isDragOver 
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 scale-105' 
                  : 'border-surface-300 dark:border-gray-600 hover:border-surface-400 dark:hover:border-gray-500'
                }
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload size={32} className="text-primary-500 dark:text-primary-400" />
              </div>
              
              <h3 className="text-xl font-semibold text-text-primary dark:text-white mb-2">
                Drag & drop files to share
              </h3>
              
              <p className="text-text-secondary dark:text-gray-300 mb-4">
                or click to choose files
              </p>

              <button 
                onClick={handleFileSelect}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors mb-4"
              >
                Choose Files
              </button>
              
              <div className="text-sm text-text-tertiary dark:text-gray-400">
                <p>All file types supported</p>
                <p>Max 10GB per file</p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Download Area */}
            <div className="border-2 border-dashed border-surface-300 dark:border-gray-600 rounded-xl p-12 text-center mb-6">
              <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download size={32} className="text-secondary-500 dark:text-secondary-400" />
              </div>
              
              <h3 className="text-xl font-semibold text-text-primary dark:text-white mb-2">
                Paste share link to download
              </h3>
              
              <p className="text-text-secondary dark:text-gray-300 mb-4">
                Enter or paste an AetherSync share link
              </p>

              <div className="flex max-w-md mx-auto space-x-2">
                <input
                  type="text"
                  value={shareInput}
                  onChange={(e) => setShareInput(e.target.value)}
                  placeholder="aethersync://share/ABC123XY"
                  className="flex-1 px-4 py-2 border border-surface-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                />
                <button
                  onClick={handlePasteShareLink}
                  disabled={!shareInput.trim()}
                  className="px-4 py-2 bg-secondary-500 hover:bg-secondary-600 disabled:bg-surface-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Download
                </button>
              </div>
            </div>
          </>
        )}

        {/* Active Transfers */}
        {activeTransfers.length > 0 && (
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary dark:text-white">
                Active Transfers
              </h3>
              <span className="text-sm text-text-secondary dark:text-gray-300">
                {activeTransfers.length} in progress
              </span>
            </div>

            <div className="space-y-3">
              {activeTransfers.map((transfer) => (
                <div key={transfer.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-surface-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getFileIcon(transfer.name)}</div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-text-primary truncate" title={transfer.name}>{transfer.name}</h4>
                        <p className="text-sm text-text-secondary">{formatFileSize(transfer.size)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => cancelTransfer(transfer.id)}
                        className="text-text-tertiary hover:text-text-secondary"
                        title="Cancel transfer"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-text-secondary dark:text-gray-300">
                        {transfer.status === 'uploading' ? 'Uploading...' : 
                         transfer.status === 'downloading' ? 'Downloading...' : 'Pending...'}
                      </span>
                      <div className="flex items-center space-x-4">
                        {transfer.speed && (
                          <>
                            <span className="text-text-tertiary dark:text-gray-400">
                              {formatTransferSpeed(transfer.speed)}
                            </span>
                            <span className="text-text-tertiary dark:text-gray-400">
                              {estimateTimeRemaining(transfer.size, (transfer.progress * transfer.size) / 100, transfer.speed)}
                            </span>
                          </>
                        )}
                        <span className="font-medium text-text-primary dark:text-white">{transfer.progress.toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-surface-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-secondary-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${transfer.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Transfers */}
        {completedTransfers.length > 0 && (
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary dark:text-white">
                Recent Transfers
              </h3>
              <span className="text-sm text-text-secondary dark:text-gray-300">
                {completedTransfers.length} completed
              </span>
            </div>

            <div className="space-y-3">
              {completedTransfers.slice(0, 5).map((transfer) => (
                <div key={transfer.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-surface-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getFileIcon(transfer.name)}</div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-text-primary truncate" title={transfer.name}>{transfer.name}</h4>
                        <p className="text-sm text-text-secondary dark:text-gray-300">
                          {formatFileSize(transfer.size)} • Completed {transfer.completedAt?.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={20} className="text-success" />
                      <button
                        onClick={() => handleCreateShareLink(transfer)}
                        className="text-primary-500 hover:text-primary-600 p-1"
                        title="Create share link"
                      >
                        <Link2 size={16} />
                      </button>
                      <button
                        onClick={() => removeTransfer(transfer.id)}
                        className="text-text-tertiary hover:text-text-secondary p-1"
                        title="Remove from list"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transfer Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary dark:text-white">
              {completedTransfers.length}
            </div>
            <div className="text-sm text-text-secondary dark:text-gray-300">Completed</div>
            <div className="text-xs text-text-tertiary dark:text-gray-400">
              {formatFileSize(completedTransfers.reduce((sum, t) => sum + t.size, 0))}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary dark:text-white">
              {activeTransfers.length}
            </div>
            <div className="text-sm text-text-secondary dark:text-gray-300">Active transfers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary dark:text-white">
              {avgSpeed > 0 ? formatTransferSpeed(avgSpeed).split('/')[0] : '0 B'}
            </div>
            <div className="text-sm text-text-secondary dark:text-gray-300">Avg speed</div>
            <div className="text-xs text-text-tertiary dark:text-gray-400">
              {avgSpeed > 0 ? formatTransferSpeed(avgSpeed) : '0 B/s'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainContent 