import React, { useState, useEffect } from 'react'
import { X, Folder, Settings as SettingsIcon, Download } from 'lucide-react'
import toast from 'react-hot-toast'
import { useTransferStore } from '../stores/transfer-store'

interface SettingsProps {
  isOpen: boolean
  onClose: () => void
}

export const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const { downloadPath, setDownloadPath } = useTransferStore()
  const [autoAcceptTransfers, setAutoAcceptTransfers] = useState(false)
  const [deviceName, setDeviceName] = useState('')
  const [maxDownloads, setMaxDownloads] = useState(10)
  const [linkExpiry, setLinkExpiry] = useState(24)

  useEffect(() => {
    if (isOpen && window.electronAPI) {
      // Load settings from electron store
      Promise.all([
        window.electronAPI.store.get('autoAcceptTransfers'),
        window.electronAPI.store.get('deviceName'),
      ]).then(([autoAccept, name]) => {
        setAutoAcceptTransfers(autoAccept || false)
        setDeviceName(name || 'Desktop')
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-surface-200">
          <div className="flex items-center space-x-2">
            <SettingsIcon size={20} className="text-primary-500" />
            <h2 className="text-xl font-semibold text-text-primary">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-text-tertiary hover:text-text-secondary"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Download Settings */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">Download Settings</h3>
            
            <div className="space-y-4">
              {/* Download Folder */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Download Folder
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 px-3 py-2 bg-surface-50 border border-surface-300 rounded-lg text-sm text-text-primary truncate overflow-hidden min-w-0" title={downloadPath || 'No folder selected'}>
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
                  className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-text-tertiary mt-1">
                  This name will be visible to other devices
                </p>
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