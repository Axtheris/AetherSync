import React from 'react'
import { X, Minus, Square } from 'lucide-react'

const WindowControls: React.FC = () => {
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
    <div className="flex items-center justify-between h-12 drag-region bg-white/50 backdrop-blur-sm border-b border-surface-200">
      {/* Traffic Lights */}
      <div className="flex items-center space-x-2 pl-4 no-drag">
        <button
          onClick={handleClose}
          className="w-3 h-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors duration-150 flex items-center justify-center group"
        >
          <X size={8} className="text-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        <button
          onClick={handleMinimize}
          className="w-3 h-3 bg-yellow-500 hover:bg-yellow-600 rounded-full transition-colors duration-150 flex items-center justify-center group"
        >
          <Minus size={8} className="text-yellow-800 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        <button
          onClick={handleMaximize}
          className="w-3 h-3 bg-green-500 hover:bg-green-600 rounded-full transition-colors duration-150 flex items-center justify-center group"
        >
          <Square size={6} className="text-green-800 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* App Title */}
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-sm font-medium text-text-primary">AetherSync</h1>
      </div>

      {/* Right spacer */}
      <div className="w-20" />
    </div>
  )
}

export default WindowControls 