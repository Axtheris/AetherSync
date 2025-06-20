import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export interface TransferFile {
  id: string
  name: string
  size: number
  progress: number
  status: 'pending' | 'uploading' | 'downloading' | 'completed' | 'error' | 'cancelled'
  type: string
  path?: string
  thumbnail?: string
  shareLink?: string
  createdAt: Date
  completedAt?: Date
  speed?: number
}

export interface ShareLink {
  id: string
  fileName: string
  fileSize: number
  filePath: string
  shareCode: string
  expiresAt: Date
  downloadCount: number
  maxDownloads: number
  createdAt: Date
}

export interface StorageInfo {
  drive: {
    total: number
    used: number
    free: number
  }
  folder: {
    size: number
    limit: number
    limitEnabled: boolean
    percentUsed: number
  }
  path: string
}

export interface FileAnalysis {
  documents: { count: number; size: number }
  photos: { count: number; size: number }
  videos: { count: number; size: number }
  sound: { count: number; size: number }
  other: { count: number; size: number }
}

interface TransferStore {
  // State
  transfers: TransferFile[]
  shareLinks: ShareLink[]
  storageInfo: StorageInfo | null
  fileAnalysis: FileAnalysis | null
  downloadPath: string
  isInitialized: boolean
  isDarkMode: boolean
  
  // Actions
  addTransfer: (file: File, type: 'upload' | 'download') => Promise<string>
  updateTransferProgress: (id: string, progress: number, speed?: number) => void
  completeTransfer: (id: string, path?: string) => void
  cancelTransfer: (id: string) => void
  removeTransfer: (id: string) => void
  
  createShareLink: (filePath: string, maxDownloads?: number, expiresInHours?: number) => Promise<ShareLink>
  deleteShareLink: (id: string) => void
  
  updateStorageInfo: () => Promise<void>
  updateFileAnalysis: () => Promise<void>
  setDownloadPath: (path: string) => Promise<void>
  setFolderSizeLimit: (limit: number) => Promise<void>
  setFolderSizeLimitEnabled: (enabled: boolean) => Promise<void>
  toggleDarkMode: () => Promise<void>
  setDarkMode: (isDark: boolean) => Promise<void>
  
  initialize: () => Promise<void>
}

export const useTransferStore = create<TransferStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    transfers: [],
    shareLinks: [],
    storageInfo: null,
    fileAnalysis: null,
    downloadPath: '',
    isInitialized: false,
    isDarkMode: false,

    // Actions
    addTransfer: async (file: File, _type: 'upload' | 'download') => {
      const id = Math.random().toString(36).substr(2, 9)
      const newTransfer: TransferFile = {
        id,
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'pending',
        type: file.type || 'unknown',
        createdAt: new Date(),
      }
      
      set(state => ({
        transfers: [...state.transfers, newTransfer]
      }))
      
      return id
    },

    updateTransferProgress: (id: string, progress: number, speed?: number) => {
      set(state => ({
        transfers: state.transfers.map(transfer =>
          transfer.id === id
            ? { 
                ...transfer, 
                progress, 
                speed,
                status: progress === 100 ? 'completed' : transfer.status
              }
            : transfer
        )
      }))
    },

    completeTransfer: (id: string, path?: string) => {
      set(state => ({
        transfers: state.transfers.map(transfer =>
          transfer.id === id
            ? { 
                ...transfer, 
                status: 'completed', 
                progress: 100,
                path,
                completedAt: new Date()
              }
            : transfer
        )
      }))
    },

    cancelTransfer: (id: string) => {
      set(state => ({
        transfers: state.transfers.map(transfer =>
          transfer.id === id
            ? { ...transfer, status: 'cancelled' }
            : transfer
        )
      }))
    },

    removeTransfer: (id: string) => {
      set(state => ({
        transfers: state.transfers.filter(transfer => transfer.id !== id)
      }))
    },

    createShareLink: async (filePath: string, maxDownloads = 10, expiresInHours = 24) => {
      const shareCode = Math.random().toString(36).substr(2, 8).toUpperCase()
      const shareLink: ShareLink = {
        id: Math.random().toString(36).substr(2, 9),
        fileName: filePath.split('/').pop() || 'Unknown',
        fileSize: 0, // Would get from file system
        filePath,
        shareCode,
        expiresAt: new Date(Date.now() + expiresInHours * 60 * 60 * 1000),
        downloadCount: 0,
        maxDownloads,
        createdAt: new Date(),
      }
      
      set(state => ({
        shareLinks: [...state.shareLinks, shareLink]
      }))
      
      return shareLink
    },

    deleteShareLink: (id: string) => {
      set(state => ({
        shareLinks: state.shareLinks.filter(link => link.id !== id)
      }))
    },

    updateStorageInfo: async () => {
      if (window.electronAPI) {
        try {
          const storageInfo = await window.electronAPI.fs.getStorageInfo()
          set({ storageInfo })
        } catch (error) {
          console.error('Failed to update storage info:', error)
        }
      }
    },

    updateFileAnalysis: async () => {
      if (window.electronAPI) {
        try {
          const fileAnalysis = await window.electronAPI.fs.analyzeFiles()
          set({ fileAnalysis })
        } catch (error) {
          console.error('Failed to update file analysis:', error)
        }
      }
    },

    setDownloadPath: async (path: string) => {
      if (window.electronAPI) {
        try {
          await window.electronAPI.store.set('downloadPath', path)
          set({ downloadPath: path })
          // Refresh storage info and file analysis
          get().updateStorageInfo()
          get().updateFileAnalysis()
        } catch (error) {
          console.error('Failed to set download path:', error)
        }
      }
    },

    setFolderSizeLimit: async (limit: number) => {
      if (window.electronAPI) {
        try {
          await window.electronAPI.store.set('folderSizeLimit', limit)
          // Refresh storage info to update the limit
          get().updateStorageInfo()
        } catch (error) {
          console.error('Failed to set folder size limit:', error)
        }
      }
    },

    setFolderSizeLimitEnabled: async (enabled: boolean) => {
      if (window.electronAPI) {
        try {
          await window.electronAPI.store.set('enableFolderSizeLimit', enabled)
          // Refresh storage info to update the enabled state
          get().updateStorageInfo()
        } catch (error) {
          console.error('Failed to set folder size limit enabled state:', error)
        }
      }
    },

    toggleDarkMode: async () => {
      const currentMode = get().isDarkMode
      await get().setDarkMode(!currentMode)
    },

    setDarkMode: async (isDark: boolean) => {
      if (window.electronAPI) {
        try {
          await window.electronAPI.store.set('theme', isDark ? 'dark' : 'light')
          set({ isDarkMode: isDark })
          
          // Apply theme to document
          if (isDark) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        } catch (error) {
          console.error('Failed to set dark mode:', error)
        }
      } else {
        // Fallback for when electronAPI isn't available
        set({ isDarkMode: isDark })
        if (isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    },

    initialize: async () => {
      if (window.electronAPI && !get().isInitialized) {
        try {
          const [downloadPath, theme] = await Promise.all([
            window.electronAPI.fs.getDownloadPath(),
            window.electronAPI.store.get('theme')
          ])
          
          const isDarkMode = theme === 'dark'
          set({ downloadPath, isDarkMode, isInitialized: true })
          
          // Apply initial theme to document
          if (isDarkMode) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          
          // Load initial data with error handling
          try {
            await get().updateStorageInfo()
          } catch (error) {
            console.error('Failed to update storage info during initialization:', error)
          }
          
          try {
            await get().updateFileAnalysis()
          } catch (error) {
            console.error('Failed to update file analysis during initialization:', error)
          }
        } catch (error) {
          console.error('Failed to initialize store:', error)
          // Set initialized to true anyway so the app can function
          set({ isInitialized: true })
        }
      }
    },
  }))
) 