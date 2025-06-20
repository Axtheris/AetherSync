import React, { useState, useEffect } from 'react'
import { X, Folder, Settings as SettingsIcon, Moon, Sun } from 'lucide-react'
import toast from 'react-hot-toast'
import { useTransferStore } from '../stores/transfer-store'

interface SettingsProps {
  isOpen: boolean
  onClose: () => void
}

export const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const { 
    downloadPath, 
    setDownloadPath, 
    storageInfo, 
    setFolderSizeLimit, 
    setFolderSizeLimitEnabled,
    isDarkMode,
    setDarkMode
  } = useTransferStore()
  const [autoAcceptTransfers, setAutoAcceptTransfers] = useState(false)
  const [deviceName, setDeviceName] = useState('')
  const [maxDownloads, setMaxDownloads] = useState(10)
  const [linkExpiry, setLinkExpiry] = useState(24)
  const [folderSizeLimit, setLocalFolderSizeLimit] = useState(10)
  const [folderSizeLimitEnabled, setLocalFolderSizeLimitEnabled] = useState(false)

  useEffect(() => {
    if (isOpen && window.electronAPI) {
      // Load settings from electron store
      Promise.all([
        window.electronAPI.store.get('autoAcceptTransfers'),
        window.electronAPI.store.get('deviceName'),
        window.electronAPI.store.get('folderSizeLimit'),
        window.electronAPI.store.get('enableFolderSizeLimit'),
      ]).then(([autoAccept, name, sizeLimit, limitEnabled]) => {
        setAutoAcceptTransfers(autoAccept || false)
        setDeviceName(name || 'Desktop')
        setLocalFolderSizeLimit((sizeLimit || 10 * 1024 * 1024 * 1024) / (1024 * 1024 * 1024)) // Convert to GB
        setLocalFolderSizeLimitEnabled(limitEnabled || false)
      })
    }
  }, [isOpen])

  const handleSelectDownloadFolder = async () => {
    if (window.electronAPI) {
      const newPath = await window.electronAPI.fs.selectDownloadFolder()
      if (newPath) {
        await setDownloadPath(newPath)
        toast.success('Download folder updated')
      }
    }
  }

  const handleSaveSetting = async (key: string, value: any) => {
    if (window.electronAPI) {
      try {
        await window.electronAPI.store.set(key, value)
        toast.success('Setting saved')
      } catch (error) {
        toast.error('Failed to save setting')
      }
    }
  }

  const handleFolderSizeLimitChange = async (limitGB: number) => {
    const limitBytes = limitGB * 1024 * 1024 * 1024
    await setFolderSizeLimit(limitBytes)
    setLocalFolderSizeLimit(limitGB)
  }

  const handleFolderSizeLimitEnabledChange = async (enabled: boolean) => {
    await setFolderSizeLimitEnabled(enabled)
    setLocalFolderSizeLimitEnabled(enabled)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-surface-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <SettingsIcon size={20} className="text-primary-500" />
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-text-tertiary hover:text-text-secondary dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Download Settings */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-3">Download Settings</h3>
            
            <div className="space-y-4">
              {/* Download Folder */}
              <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">
                  Download Folder
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 px-3 py-2 bg-surface-50 dark:bg-gray-700 border border-surface-300 dark:border-gray-600 rounded-lg text-sm text-text-primary dark:text-white truncate overflow-hidden min-w-0" title={downloadPath || 'No folder selected'}>
                    {downloadPath || 'No folder selected'}
                  </div>
                  <button
                    onClick={handleSelectDownloadFolder}
                    className="px-3 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm transition-colors"
                  >
                    <Folder size={16} />
                  </button>
                </div>
              </div>

              {/* Auto Accept Transfers */}
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={autoAcceptTransfers}
                    onChange={(e) => {
                      setAutoAcceptTransfers(e.target.checked)
                      handleSaveSetting('autoAcceptTransfers', e.target.checked)
                    }}
                    className="rounded border-surface-300 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-sm text-text-secondary">
                    Automatically accept incoming transfers
                  </span>
                </label>
              </div>

              {/* Folder Size Limit */}
              <div>
                <label className="flex items-center space-x-2 mb-3">
                  <input
                    type="checkbox"
                    checked={folderSizeLimitEnabled}
                    onChange={(e) => handleFolderSizeLimitEnabledChange(e.target.checked)}
                    className="rounded border-surface-300 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-sm text-text-secondary">
                    Enable folder size limit
                  </span>
                </label>
                
                {folderSizeLimitEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Folder Size Limit (GB)
                    </label>
                    <input
                      type="number"
                      value={folderSizeLimit}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 1
                        setLocalFolderSizeLimit(value)
                      }}
                      onBlur={() => handleFolderSizeLimitChange(folderSizeLimit)}
                      min="1"
                      max="1000"
                      step="0.1"
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                                         {storageInfo && (
                       <div className="mt-2 text-xs text-text-tertiary">
                         Current usage: {((storageInfo.folder.size || 0) / (1024 * 1024 * 1024)).toFixed(2)} GB
                         {storageInfo.folder.limitEnabled && (
                           <span className={`ml-2 ${(storageInfo.folder.percentUsed || 0) > 90 ? 'text-red-600' : (storageInfo.folder.percentUsed || 0) > 75 ? 'text-yellow-600' : 'text-green-600'}`}>
                             ({(storageInfo.folder.percentUsed || 0).toFixed(1)}% of limit)
                           </span>
                         )}
                       </div>
                     )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Device Settings */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">Device Settings</h3>
            
            <div className="space-y-4">
              {/* Device Name */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Device Name
                </label>
                <input
                  type="text"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  onBlur={() => handleSaveSetting('deviceName', deviceName)}
                  placeholder="Enter device name"
                  className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <p className="text-xs text-text-tertiary mt-1">
                  This name will be visible to other devices
                </p>
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">Appearance</h3>
            
            <div className="space-y-4">
              {/* Dark Mode Toggle */}
              <div>
                <label className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-surface-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      {isDarkMode ? (
                        <Moon size={16} className="text-text-secondary" />
                      ) : (
                        <Sun size={16} className="text-text-secondary" />
                      )}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-text-primary">Dark Mode</span>
                      <p className="text-xs text-text-secondary">
                        Switch between light and dark themes
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDarkMode(!isDarkMode)}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${isDarkMode ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </label>
              </div>
            </div>
          </div>

          {/* Share Link Settings */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">Share Link Settings</h3>
            
            <div className="space-y-4">
              {/* Max Downloads */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Default Max Downloads
                </label>
                <input
                  type="number"
                  value={maxDownloads}
                  onChange={(e) => setMaxDownloads(parseInt(e.target.value) || 10)}
                  min="1"
                  max="100"
                  className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Link Expiry */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Default Link Expiry (hours)
                </label>
                <select
                  value={linkExpiry}
                  onChange={(e) => setLinkExpiry(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value={1}>1 hour</option>
                  <option value={6}>6 hours</option>
                  <option value={24}>24 hours</option>
                  <option value={72}>3 days</option>
                  <option value={168}>1 week</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-surface-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings 