import { useState } from 'react'
import { Settings as SettingsIcon } from 'lucide-react'
import Settings from './Settings'

export default function WindowControls() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const handleMinimize = () => {
    if (window.electronAPI) {
      window.electronAPI.window.minimize()
    }
  }

  const handleMaximize = () => {
    if (window.electronAPI) {
      window.electronAPI.window.maximize()
    }
  }

  const handleClose = () => {
    if (window.electronAPI) {
      window.electronAPI.window.close()
    }
  }

  return (
    <>
      <div className="flex items-center justify-between h-8 bg-white/20 dark:bg-black/20 backdrop-blur-sm border-b border-white/20 dark:border-gray-700/50 drag-handle">
        {/* macOS Traffic Light Buttons (Left) */}
        <div className="flex items-center space-x-2 pl-4">
          <button
            onClick={handleClose}
            className="w-3 h-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
            aria-label="Close"
          />
          <button
            onClick={handleMinimize}
            className="w-3 h-3 bg-yellow-500 hover:bg-yellow-600 rounded-full transition-colors"
            aria-label="Minimize"
          />
          <button
            onClick={handleMaximize}
            className="w-3 h-3 bg-green-500 hover:bg-green-600 rounded-full transition-colors"
            aria-label="Maximize"
          />
        </div>

        {/* App Title (Center) */}
        <div className="flex-1 text-center">
          <h1 className="text-sm font-medium text-text-primary dark:text-white">AetherSync</h1>
        </div>

        {/* Settings Button (Right) */}
        <div className="pr-4">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-1 text-text-tertiary hover:text-text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
            aria-label="Settings"
          >
            <SettingsIcon size={14} />
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  )
} 