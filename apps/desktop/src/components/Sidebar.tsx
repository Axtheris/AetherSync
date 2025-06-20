import { useState, useEffect } from 'react'
import { Settings, Folder, HardDrive } from 'lucide-react'
import { useTransferStore } from '../stores/transfer-store'
import { formatFileSize } from '../utils/file-utils'

export default function Sidebar() {
  const { 
    storageInfo, 
    fileAnalysis, 
    downloadPath, 
    updateStorageInfo, 
    updateFileAnalysis,
    setDownloadPath,
    initialize 
  } = useTransferStore()
  
  const [storageTimeframe, setStorageTimeframe] = useState<'week' | 'month' | 'year'>('month')

  useEffect(() => {
    initialize()
    
    // Refresh data every 30 seconds
    const interval = setInterval(() => {
      updateStorageInfo()
      updateFileAnalysis()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [initialize, updateStorageInfo, updateFileAnalysis])

  const handleSelectDownloadFolder = async () => {
    if (window.electronAPI) {
      const newPath = await window.electronAPI.fs.selectDownloadFolder()
      if (newPath) {
        await setDownloadPath(newPath)
      }
    }
  }

  // Generate mock historical data based on current analysis
  const generateHistoricalData = () => {
    if (!fileAnalysis) return []
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const currentMonth = new Date().getMonth()
    const data = []
    
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12
      const month = months[monthIndex]
      
      // Create realistic variations based on current data
      const factor = 0.7 + (Math.random() * 0.6) // 70% to 130% of current
      
      data.push({
        month,
        documents: Math.floor((fileAnalysis.documents.count / 6) * factor),
        photos: Math.floor((fileAnalysis.photos.count / 6) * factor),
        videos: Math.floor((fileAnalysis.videos.count / 6) * factor),
        sound: Math.floor((fileAnalysis.sound.count / 6) * factor),
      })
    }
    
    return data
  }

  const storageData = generateHistoricalData()
  const maxValue = Math.max(...storageData.map(item => 
    item.documents + item.photos + item.videos + item.sound
  ))

  return (
    <div className="w-80 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-r border-surface-200 dark:border-gray-700 p-6 overflow-y-auto">
      {/* Download Path Settings */}
      <div className="bg-primary-50 dark:bg-gray-700/50 border border-primary-200 dark:border-gray-600 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
              <Folder size={20} className="text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary dark:text-white mb-1">Download Location</h3>
            <p className="text-sm text-text-secondary dark:text-gray-300 mb-3 truncate overflow-hidden" title={downloadPath || 'No path selected'}>
              {downloadPath || 'No path selected'}
            </p>
            <button 
              onClick={handleSelectDownloadFolder}
              className="bg-primary-500 hover:bg-primary-600 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
            >
              Change Folder
            </button>
          </div>
        </div>
      </div>

      {/* Storage Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary dark:text-white">Storage Usage</h2>
          <select 
            value={storageTimeframe}
            onChange={(e) => setStorageTimeframe(e.target.value as 'week' | 'month' | 'year')}
            className="text-sm text-text-secondary dark:text-gray-300 bg-transparent border-none focus:outline-none cursor-pointer"
          >
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>

        {/* Storage Type Legend */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-chart-documents"></div>
            <span className="text-sm text-text-secondary dark:text-gray-300">Documents</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-chart-sound"></div>
            <span className="text-sm text-text-secondary dark:text-gray-300">Audio</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-chart-videos"></div>
            <span className="text-sm text-text-secondary dark:text-gray-300">Videos</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-chart-photos"></div>
            <span className="text-sm text-text-secondary dark:text-gray-300">Images</span>
          </div>
        </div>

        {/* Storage Chart */}
        <div className="h-48 p-4 bg-gradient-to-b from-surface-50 to-white rounded-lg">
          <div className="flex items-end justify-between h-full space-x-2">
            {storageData.map((item) => {
              const total = item.documents + item.photos + item.videos + item.sound
              const height = maxValue > 0 ? (total / maxValue) * 120 : 8
              
              return (
                <div key={item.month} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full rounded-t bg-gradient-to-t from-primary-600 to-primary-400"
                    style={{ 
                      height: `${Math.max(height, 8)}px`,
                      maxHeight: '120px'
                    }}
                    title={`${total} files`}
                  />
                  <span className="text-xs text-text-secondary mt-2">{item.month}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Storage Info */}
      <div className="bg-gradient-to-br from-surface-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl p-4 border border-surface-200 dark:border-gray-600 space-y-4">
        {/* Drive Usage */}
        <div>
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-8 h-8 bg-primary-100 dark:bg-primary-500/20 rounded-lg flex items-center justify-center">
              <HardDrive size={16} className="text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1 text-text-primary dark:text-white">Drive Usage</h3>
              {storageInfo && (
                <div className="space-y-2">
                  <div className="w-full bg-surface-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                      style={{ width: `${storageInfo.drive.total > 0 ? Math.min((storageInfo.drive.used / storageInfo.drive.total) * 100, 100) : 0}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-text-secondary dark:text-gray-300">
                    <span>{formatFileSize(storageInfo.drive.used)} used</span>
                    <span>{formatFileSize(storageInfo.drive.free)} free</span>
                  </div>
                  <div className="text-xs text-text-tertiary dark:text-gray-400">
                    Total: {formatFileSize(storageInfo.drive.total)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Folder Limit */}
        {storageInfo && storageInfo.folder.limitEnabled && (
          <div className="border-t border-surface-200 dark:border-gray-600 pt-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Folder size={16} className="text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1 text-text-primary dark:text-white">Folder Limit</h3>
                <div className="space-y-2">
                  <div className="w-full bg-surface-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-colors ${
                        (storageInfo.folder.percentUsed || 0) > 90 
                          ? 'bg-gradient-to-r from-red-500 to-red-600' 
                          : (storageInfo.folder.percentUsed || 0) > 75
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                          : 'bg-gradient-to-r from-green-500 to-green-600'
                      }`}
                      style={{ width: `${Math.min(storageInfo.folder.percentUsed || 0, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-text-secondary dark:text-gray-300">
                    <span>{formatFileSize(storageInfo.folder.size)} used</span>
                    <span>{formatFileSize(storageInfo.folder.limit - storageInfo.folder.size)} remaining</span>
                  </div>
                  <div className="text-xs text-text-tertiary dark:text-gray-400">
                    Limit: {formatFileSize(storageInfo.folder.limit)} ({(storageInfo.folder.percentUsed || 0).toFixed(1)}% used)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary dark:text-gray-300">Total Files</span>
          <span className="font-medium text-text-primary dark:text-white">
            {fileAnalysis ? 
              Object.values(fileAnalysis).reduce((acc, { count }) => acc + count, 0) : 
              0
            }
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary dark:text-gray-300">Storage Used</span>
          <span className="font-medium text-text-primary dark:text-white">
            {fileAnalysis ? 
              formatFileSize(Object.values(fileAnalysis).reduce((acc, { size }) => acc + size, 0)) :
              '0 B'
            }
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary dark:text-gray-300">Download Path</span>
          <button 
            onClick={handleSelectDownloadFolder}
            className="text-primary-500 hover:text-primary-600 text-xs"
          >
            <Settings size={14} />
          </button>
        </div>
      </div>
    </div>
  )
} 