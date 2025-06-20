import { contextBridge, ipcRenderer } from 'electron'

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Settings management
  store: {
    get: (key: string) => ipcRenderer.invoke('store:get', key),
    set: (key: string, value: any) => ipcRenderer.invoke('store:set', key, value),
    delete: (key: string) => ipcRenderer.invoke('store:delete', key),
  },

  // File system operations
  fs: {
    selectDownloadFolder: () => ipcRenderer.invoke('fs:select-download-folder'),
    getDownloadPath: () => ipcRenderer.invoke('fs:get-download-path'),
    openFile: (filePath: string) => ipcRenderer.invoke('fs:open-file', filePath),
    showInFolder: (filePath: string) => ipcRenderer.invoke('fs:show-in-folder', filePath),
    getStorageInfo: () => ipcRenderer.invoke('fs:get-storage-info'),
    analyzeFiles: () => ipcRenderer.invoke('fs:analyze-files'),
  },

  // Window controls
  window: {
    minimize: () => ipcRenderer.invoke('window:minimize'),
    maximize: () => ipcRenderer.invoke('window:maximize'),
    close: () => ipcRenderer.invoke('window:close'),
  },

  // Event listeners
  onMainProcessMessage: (callback: (message: string) => void) => {
    ipcRenderer.on('main-process-message', (_, message) => callback(message))
  },

  // Remove listeners
  removeAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel)
  },
})

// Type definitions for TypeScript
declare global {
  interface Window {
    electronAPI: {
      store: {
        get: (key: string) => Promise<any>
        set: (key: string, value: any) => Promise<boolean>
        delete: (key: string) => Promise<boolean>
      }
      fs: {
        selectDownloadFolder: () => Promise<string | null>
        getDownloadPath: () => Promise<string>
        openFile: (filePath: string) => Promise<boolean>
        showInFolder: (filePath: string) => Promise<boolean>
        getStorageInfo: () => Promise<{
          used: number
          total: number
          free: number
          path: string
        }>
        analyzeFiles: () => Promise<{
          documents: { count: number; size: number }
          photos: { count: number; size: number }
          videos: { count: number; size: number }
          sound: { count: number; size: number }
          other: { count: number; size: number }
        }>
      }
      window: {
        minimize: () => Promise<void>
        maximize: () => Promise<void>
        close: () => Promise<void>
      }
      onMainProcessMessage: (callback: (message: string) => void) => void
      removeAllListeners: (channel: string) => void
    }
  }
} 