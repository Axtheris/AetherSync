import React, { useState, useCallback } from 'react'
import { Upload, Download, FileText, X, CheckCircle, AlertCircle } from 'lucide-react'

interface TransferFile {
  id: string
  name: string
  size: number
  progress: number
  status: 'uploading' | 'downloading' | 'completed' | 'error'
  type: string
}

const MainContent: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [activeTab, setActiveTab] = useState<'upload' | 'download'>('upload')
  const [transfers, setTransfers] = useState<TransferFile[]>([
    {
      id: '1',
      name: 'file_format.fig',
      size: 16 * 1024 * 1024, // 16MB
      progress: 74,
      status: 'uploading',
      type: 'design'
    }
  ])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    files.forEach(file => {
      const newTransfer: TransferFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'uploading',
        type: file.type || 'unknown'
      }
      setTransfers(prev => [...prev, newTransfer])
    })
  }, [])

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    if (['jpg', 'png', 'gif', 'svg'].includes(ext || '')) return '🖼️'
    if (['mp4', 'avi', 'mov'].includes(ext || '')) return '🎬'
    if (['mp3', 'wav', 'flac'].includes(ext || '')) return '🎵'
    if (['pdf', 'doc', 'txt'].includes(ext || '')) return '📄'
    if (['fig', 'sketch'].includes(ext || '')) return '🎨'
    return '📁'
  }

  const removeTransfer = (id: string) => {
    setTransfers(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="flex-1 flex flex-col bg-white/30 backdrop-blur-sm">
      {/* Header Tabs */}
      <div className="flex items-center border-b border-surface-200 px-6 py-4">
        <div className="flex space-x-1 bg-surface-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'upload'
                ? 'bg-white text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Upload
          </button>
          <button
            onClick={() => setActiveTab('download')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'download'
                ? 'bg-white text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Download
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Drop Zone */}
        <div
          className={`
            border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 mb-6
            ${isDragOver 
              ? 'border-primary-500 bg-primary-50 scale-105' 
              : 'border-surface-300 hover:border-surface-400'
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {activeTab === 'upload' ? (
              <Upload size={32} className="text-primary-500" />
            ) : (
              <Download size={32} className="text-primary-500" />
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            {activeTab === 'upload' ? 'Drag & drop to share files' : 'Ready to receive files'}
          </h3>
          
          <p className="text-text-secondary mb-4">
            {activeTab === 'upload' 
              ? 'or click to choose files' 
              : 'Files will appear here when received'
            }
          </p>

          {activeTab === 'upload' && (
            <>
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors mb-4">
                Choose Files
              </button>
              
              <div className="text-sm text-text-tertiary">
                <p>Supported formats: XLS, XLSX</p>
                <p>Max 25MB</p>
              </div>
            </>
          )}
        </div>

        {/* Progress Section */}
        {transfers.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">
                Transfer Progress
              </h3>
              <span className="text-sm text-text-secondary">
                {transfers.filter(t => t.status === 'completed').length} of {transfers.length} completed
              </span>
            </div>

            <div className="space-y-3">
              {transfers.map((transfer) => (
                <div key={transfer.id} className="bg-white rounded-lg p-4 shadow-sm border border-surface-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getFileIcon(transfer.name)}</div>
                      <div>
                        <h4 className="font-medium text-text-primary">{transfer.name}</h4>
                        <p className="text-sm text-text-secondary">{formatFileSize(transfer.size)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {transfer.status === 'completed' && (
                        <CheckCircle size={20} className="text-success" />
                      )}
                      {transfer.status === 'error' && (
                        <AlertCircle size={20} className="text-error" />
                      )}
                      <button
                        onClick={() => removeTransfer(transfer.id)}
                        className="text-text-tertiary hover:text-text-secondary"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  {transfer.status === 'uploading' || transfer.status === 'downloading' ? (
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-text-secondary">
                          {transfer.status === 'uploading' ? 'Uploading...' : 'Downloading...'}
                        </span>
                        <span className="font-medium text-text-primary">{transfer.progress}%</span>
                      </div>
                      <div className="w-full bg-surface-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-secondary-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${transfer.progress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm">
                      {transfer.status === 'completed' && (
                        <span className="text-success font-medium">Transfer completed</span>
                      )}
                      {transfer.status === 'error' && (
                        <span className="text-error font-medium">Transfer failed</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">23,65%</div>
            <div className="text-sm text-text-secondary">Ready to delete</div>
            <div className="text-xs text-text-tertiary">Up to 44 GB</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">12</div>
            <div className="text-sm text-text-secondary">Active transfers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">98 MB</div>
            <div className="text-sm text-text-secondary">Transfer speed</div>
            <div className="text-xs text-text-tertiary">64MB/s</div>
          </div>
        </div>

        {/* Clean Up Section */}
        <div className="mt-6 flex justify-center">
          <button className="bg-error hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainContent 