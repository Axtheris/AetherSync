import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import Store from 'electron-store'
import { promisify } from 'node:util'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

// Electron Store for persistent settings
const store = new Store({
  defaults: {
    downloadPath: app.getPath('downloads'),
    autoAcceptTransfers: false,
    theme: 'light',
    windowBounds: { width: 1200, height: 800 },
    deviceName: require('os').hostname() || 'Desktop',
    folderSizeLimit: 10 * 1024 * 1024 * 1024, // 10GB default limit
    enableFolderSizeLimit: false,
  }
})

let win: BrowserWindow | null = null

function createWindow() {
  const { width, height } = store.get('windowBounds') as { width: number, height: number }
  
  win = new BrowserWindow({
    width,
    height,
    minWidth: 900,
    minHeight: 600,
    icon: path.join(process.env.VITE_PUBLIC || __dirname, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 20, y: 20 },
    backgroundColor: '#f0f8ff',
    show: false, // Don't show until ready
  })

  // Show window when ready to prevent visual flash
  win.once('ready-to-show', () => {
    win?.show()
  })

  // Save window bounds on resize/move
  win.on('resize', () => {
    if (win) {
      store.set('windowBounds', win.getBounds())
    }
  })

  win.on('move', () => {
    if (win) {
      store.set('windowBounds', win.getBounds())
    }
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
  createWindow()
})

// IPC Handlers for file operations and settings

// Settings management
ipcMain.handle('store:get', (_, key: string) => {
  return store.get(key)
})

ipcMain.handle('store:set', (_, key: string, value: any) => {
  store.set(key, value)
  return true
})

ipcMain.handle('store:delete', (_, key: 'autoAcceptTransfers' | 'theme' | 'downloadPath' | 'windowBounds' | 'deviceName') => {
  store.delete(key)
  return true
})

// File system operations
ipcMain.handle('fs:select-download-folder', async () => {
  if (!win) return null
  
  const result = await dialog.showOpenDialog(win, {
    properties: ['openDirectory'],
    title: 'Select Download Folder',
  })
  
  if (!result.canceled && result.filePaths.length > 0) {
    const selectedPath = result.filePaths[0]
    store.set('downloadPath', selectedPath)
    return selectedPath
  }
  
  return null
})

ipcMain.handle('fs:get-download-path', () => {
  return store.get('downloadPath')
})

ipcMain.handle('fs:open-file', async (_, filePath: string) => {
  try {
    await shell.openPath(filePath)
    return true
  } catch (error) {
    console.error('Failed to open file:', error)
    return false
  }
})

ipcMain.handle('fs:show-in-folder', async (_, filePath: string) => {
  try {
    shell.showItemInFolder(filePath)
    return true
  } catch (error) {
    console.error('Failed to show file in folder:', error)
    return false
  }
})

// Get real disk usage information
const getDiskUsage = async (dirPath: string) => {
  try {
    // Try Windows implementation first since that's most common
    if (process.platform === 'win32') {
      try {
        const { exec } = require('child_process')
        const execPromise = promisify(exec)
        
        const driveLetter = path.parse(dirPath).root.replace('\\', '')
        const { stdout } = await execPromise(`wmic logicaldisk where caption="${driveLetter}" get size,freespace /value`)
        const lines: string[] = stdout.split('\n').filter((line: string) => line.trim().includes('='))
        
        let total = 0, free = 0
        for (const line of lines) {
          const trimmedLine = line.trim()
          if (trimmedLine.startsWith('Size=')) {
            total = parseInt(trimmedLine.split('=')[1]) || 0
          } else if (trimmedLine.startsWith('FreeSpace=')) {
            free = parseInt(trimmedLine.split('=')[1]) || 0
          }
        }
        
        if (total > 0) {
          return { total, free, used: total - free }
        }
      } catch (error) {
        console.log('Windows disk space detection failed:', error)
      }
    }
    
    // Try Unix/macOS statvfs if available
    try {
      const stats = await (fs as any).promises?.statfs?.(dirPath)
      if (stats && stats.blocks && stats.frsize) {
        const total = stats.blocks * stats.frsize
        const free = stats.bavail * stats.frsize
        const used = total - free
        
        if (total > 0) {
          return { total, free, used }
        }
      }
    } catch (error) {
      console.log('Unix disk space detection failed:', error)
    }
    
    // Default fallback - estimate based on common drive sizes
    console.log('Using fallback disk space values')
    return { 
      total: 500 * 1024 * 1024 * 1024, // 500GB
      free: 250 * 1024 * 1024 * 1024,  // 250GB
      used: 250 * 1024 * 1024 * 1024   // 250GB
    }
  } catch (error) {
    console.error('Failed to get disk usage:', error)
    return { 
      total: 500 * 1024 * 1024 * 1024, 
      free: 250 * 1024 * 1024 * 1024, 
      used: 250 * 1024 * 1024 * 1024 
    }
  }
}

// Get directory size recursively
const getDirectorySize = async (dirPath: string): Promise<number> => {
  let totalSize = 0
  try {
    const items = await fs.promises.readdir(dirPath, { withFileTypes: true })
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item.name)
      if (item.isDirectory()) {
        totalSize += await getDirectorySize(itemPath)
      } else {
        try {
          const stat = await fs.promises.stat(itemPath)
          totalSize += stat.size
        } catch {
          // Skip files we can't access
        }
      }
    }
  } catch (error) {
    // Handle permission errors gracefully
  }
  
  return totalSize
}

ipcMain.handle('fs:get-storage-info', async () => {
  try {
    const downloadPath = store.get('downloadPath') as string
    const folderSizeLimit = (store.get('folderSizeLimit') as number) || (10 * 1024 * 1024 * 1024)
    const enableFolderSizeLimit = store.get('enableFolderSizeLimit') as boolean
    
    console.log('Getting storage info for:', downloadPath)
    
    // Get actual disk usage
    const diskUsage = await getDiskUsage(downloadPath)
    console.log('Disk usage:', diskUsage)
    
    // Get download folder size
    const folderSize = await getDirectorySize(downloadPath)
    console.log('Folder size:', folderSize)
    
    // Calculate percentage safely
    const percentUsed = enableFolderSizeLimit && folderSizeLimit > 0 
      ? Math.min((folderSize / folderSizeLimit) * 100, 100) 
      : 0
    
    const result = {
      drive: {
        total: diskUsage.total || 0,
        used: diskUsage.used || 0,
        free: diskUsage.free || 0,
      },
      folder: {
        size: folderSize || 0,
        limit: folderSizeLimit,
        limitEnabled: enableFolderSizeLimit || false,
        percentUsed: Math.round(percentUsed * 10) / 10, // Round to 1 decimal place
      },
      path: downloadPath,
    }
    
    console.log('Storage info result:', result)
    return result
  } catch (error) {
    console.error('Failed to get storage info:', error)
    const defaultLimit = 10 * 1024 * 1024 * 1024 // 10GB
    return {
      drive: {
        total: 500 * 1024 * 1024 * 1024,
        used: 250 * 1024 * 1024 * 1024,
        free: 250 * 1024 * 1024 * 1024,
      },
      folder: {
        size: 0,
        limit: (store.get('folderSizeLimit') as number) || defaultLimit,
        limitEnabled: (store.get('enableFolderSizeLimit') as boolean) || false,
        percentUsed: 0,
      },
      path: (store.get('downloadPath') as string) || app.getPath('downloads'),
    }
  }
})

// File type analysis
ipcMain.handle('fs:analyze-files', async () => {
  try {
    const downloadPath = store.get('downloadPath') as string
    const analysis = {
      documents: { count: 0, size: 0 },
      photos: { count: 0, size: 0 },
      videos: { count: 0, size: 0 },
      sound: { count: 0, size: 0 },
      other: { count: 0, size: 0 },
    }
    
    const analyzeDirectory = async (dirPath: string) => {
      try {
        const items = await fs.promises.readdir(dirPath, { withFileTypes: true })
        
        for (const item of items) {
          const itemPath = path.join(dirPath, item.name)
          if (item.isDirectory()) {
            await analyzeDirectory(itemPath)
          } else {
            const stat = await fs.promises.stat(itemPath)
            const ext = path.extname(item.name).toLowerCase()
            
            if (['.pdf', '.doc', '.docx', '.txt', '.rtf'].includes(ext)) {
              analysis.documents.count++
              analysis.documents.size += stat.size
            } else if (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'].includes(ext)) {
              analysis.photos.count++
              analysis.photos.size += stat.size
            } else if (['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm'].includes(ext)) {
              analysis.videos.count++
              analysis.videos.size += stat.size
            } else if (['.mp3', '.wav', '.flac', '.aac', '.ogg'].includes(ext)) {
              analysis.sound.count++
              analysis.sound.size += stat.size
            } else {
              analysis.other.count++
              analysis.other.size += stat.size
            }
          }
        }
      } catch (error) {
        // Handle permission errors gracefully
      }
    }
    
    await analyzeDirectory(downloadPath)
    return analysis
  } catch (error) {
    console.error('Failed to analyze files:', error)
    return {
      documents: { count: 0, size: 0 },
      photos: { count: 0, size: 0 },
      videos: { count: 0, size: 0 },
      sound: { count: 0, size: 0 },
      other: { count: 0, size: 0 },
    }
  }
})

// Window controls
ipcMain.handle('window:minimize', () => {
  win?.minimize()
})

ipcMain.handle('window:maximize', () => {
  if (win?.isMaximized()) {
    win.unmaximize()
  } else {
    win?.maximize()
  }
})

ipcMain.handle('window:close', () => {
  win?.close()
}) 