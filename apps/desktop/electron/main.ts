import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import Store from 'electron-store'
import { promisify } from 'node:util'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Install sharp for image thumbnail generation
let sharp: any
try {
  sharp = require('sharp')
} catch (error) {
  console.warn('Sharp not available for thumbnail generation')
}

// Install music-metadata for audio metadata extraction (ES module dynamic import)
let parseFile: any = null

const loadMusicMetadata = async () => {
  try {
    console.log('Attempting to load music-metadata via dynamic import...')
    const mm: any = await import('music-metadata')
    parseFile = mm.parseFile
    console.log('music-metadata loaded successfully via dynamic import:', typeof parseFile)
  } catch (error) {
    console.warn('Music-metadata not available for audio metadata extraction:', error)
    
    // Fallback: try node-id3 or music-metadata-browser as alternatives
    try {
      console.log('Trying fallback music library...')
      const NodeID3 = require('node-id3')
      if (NodeID3) {
        console.log('node-id3 available as fallback')
        // We'll implement this as a backup if needed
      }
    } catch (error2) {
      console.warn('No audio metadata libraries available')
    }
  }
}

// Load music-metadata when the module initializes
loadMusicMetadata()

// Install ffmpeg-static for video thumbnails
let ffmpegStatic: any
let ffmpeg: any
try {
  ffmpegStatic = require('ffmpeg-static')
  ffmpeg = require('fluent-ffmpeg')
  if (ffmpegStatic) {
    ffmpeg.setFfmpegPath(ffmpegStatic)
  }
  console.log('ffmpeg library loaded successfully')
} catch (error) {
  console.warn('ffmpeg not available for video thumbnail extraction:', error)
}

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

// Get recent files with thumbnails
ipcMain.handle('fs:get-recent-files', async (_, limit: number = 20) => {
  try {
    console.log('=== GET RECENT FILES CALLED ===')
    const downloadPath = store.get('downloadPath') as string
    console.log('Download path:', downloadPath)
    const recentFiles: Array<{
      id: string
      name: string
      type: 'file'
      size: number
      modified: string
      path: string
      mimeType: string
      thumbnail?: string
    }> = []
    
    const collectFiles = async (dirPath: string) => {
      try {
        const items = await fs.promises.readdir(dirPath, { withFileTypes: true })
        
        for (const item of items) {
          const itemPath = path.join(dirPath, item.name)
          if (item.isDirectory()) {
            await collectFiles(itemPath)
          } else {
            try {
              const stat = await fs.promises.stat(itemPath)
              const ext = path.extname(item.name).toLowerCase()
              
              // Only include common file types
              if ([
                '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg',
                '.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv',
                '.mp3', '.wav', '.flac', '.aac', '.ogg', '.m4a',
                '.pdf', '.doc', '.docx', '.txt', '.rtf'
              ].includes(ext)) {
                
                let mimeType = 'application/octet-stream'
                if (['.jpg', '.jpeg'].includes(ext)) mimeType = 'image/jpeg'
                else if (ext === '.png') mimeType = 'image/png'
                else if (ext === '.gif') mimeType = 'image/gif'
                else if (ext === '.webp') mimeType = 'image/webp'
                else if (['.mp4'].includes(ext)) mimeType = 'video/mp4'
                else if (['.mp3'].includes(ext)) mimeType = 'audio/mp3'
                else if (ext === '.pdf') mimeType = 'application/pdf'
                
                recentFiles.push({
                  id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                  name: item.name,
                  type: 'file',
                  size: stat.size,
                  modified: stat.mtime.toLocaleDateString(),
                  path: itemPath,
                  mimeType
                })
              }
            } catch (error) {
              // Skip files we can't access
            }
          }
        }
      } catch (error) {
        // Handle permission errors gracefully
      }
    }
    
    await collectFiles(downloadPath)
    
    // Sort by modification time (newest first) and limit results
    recentFiles.sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime())
    const limitedFiles = recentFiles.slice(0, limit)
    
    // Generate thumbnails for the limited set
    for (const file of limitedFiles) {
      console.log(`Generating thumbnail for: ${file.name}`)
      const thumbnail = await generateFileThumbnail(file.path)
      if (thumbnail) {
        console.log(`Thumbnail generated for ${file.name}, length: ${thumbnail.length}`)
        file.thumbnail = thumbnail
      } else {
        console.log(`No thumbnail generated for ${file.name}`)
      }
    }
    
    console.log('=== RETURNING FILES ===')
    console.log('Total files with thumbnails:', limitedFiles.filter(f => f.thumbnail).length)
    console.log('File details:', limitedFiles.map(f => ({ 
      name: f.name, 
      hasThumbnail: !!f.thumbnail,
      thumbnailLength: f.thumbnail?.length 
    })))
    
    return limitedFiles
  } catch (error) {
    console.error('Failed to get recent files:', error)
    return []
  }
})

// Generate thumbnail for a specific file
ipcMain.handle('fs:generate-thumbnail', async (_, filePath: string) => {
  try {
    return await generateFileThumbnail(filePath)
  } catch (error) {
    console.error('Failed to generate thumbnail:', error)
    return null
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

// Thumbnail generation for images
const generateImageThumbnail = async (filePath: string): Promise<string | null> => {
  try {
    if (sharp) {
      // Use sharp for high-quality thumbnails
      const thumbnailBuffer = await sharp(filePath)
        .resize(64, 64, { fit: 'cover' })
        .jpeg({ quality: 80 })
        .toBuffer()
      
      return `data:image/jpeg;base64,${thumbnailBuffer.toString('base64')}`
    } else {
      // Fallback: read the file and return a smaller version
      const fileBuffer = await fs.promises.readFile(filePath)
      const fileType = path.extname(filePath).toLowerCase()
      
      if (['.jpg', '.jpeg'].includes(fileType)) {
        return `data:image/jpeg;base64,${fileBuffer.toString('base64')}`
      } else if (fileType === '.png') {
        return `data:image/png;base64,${fileBuffer.toString('base64')}`
      } else if (fileType === '.gif') {
        return `data:image/gif;base64,${fileBuffer.toString('base64')}`
      } else if (fileType === '.webp') {
        return `data:image/webp;base64,${fileBuffer.toString('base64')}`
      }
    }
  } catch (error) {
    console.error('Failed to generate thumbnail for:', filePath, error)
  }
  return null
}

// Extract album art from audio files
const extractAudioThumbnail = async (filePath: string): Promise<string | null> => {
  try {
    console.log('Attempting to extract audio thumbnail for:', filePath)
    
    // Try music-metadata first
    if (parseFile) {
      try {
        console.log('Using music-metadata to parse file...')
        const metadata = await parseFile(filePath)
        console.log('Metadata parsed successfully:', {
          title: metadata.common.title,
          artist: metadata.common.artist,
          hasPicture: !!metadata.common.picture?.length
        })
        
        const picture = metadata.common.picture?.[0]
        
        if (picture) {
          console.log('Found album art:', {
            format: picture.format,
            dataSize: picture.data.length
          })
          
          const mimeType = picture.format || 'image/jpeg'
          const base64Data = picture.data.toString('base64')
          const dataUrl = `data:${mimeType};base64,${base64Data}`
          
          console.log('Generated thumbnail data URL for audio file via music-metadata')
          return dataUrl
        } else {
          console.log('No album art found in audio file')
        }
      } catch (error) {
        console.error('music-metadata failed, trying fallback:', error)
      }
    }
    
    // Fallback to node-id3
    try {
      console.log('Trying node-id3 as fallback...')
      const NodeID3 = require('node-id3')
      const tags = NodeID3.read(filePath)
      
      if (tags && tags.image) {
        console.log('Found album art via node-id3')
        const imageData = tags.image.imageBuffer
        const mimeType = tags.image.mime || 'image/jpeg'
        const base64Data = imageData.toString('base64')
        const dataUrl = `data:${mimeType};base64,${base64Data}`
        
        console.log('Generated thumbnail data URL for audio file via node-id3')
        return dataUrl
      } else {
        console.log('No album art found via node-id3')
      }
    } catch (error) {
      console.error('node-id3 fallback also failed:', error)
    }
    
  } catch (error) {
    console.error('Failed to extract audio metadata for:', filePath, error)
  }
  return null
}

// Extract thumbnail from video files
const extractVideoThumbnail = async (filePath: string): Promise<string | null> => {
  return new Promise((resolve) => {
    try {
      console.log('Attempting to extract video thumbnail for:', filePath)
      
      if (!ffmpeg) {
        console.warn('ffmpeg library not available')
        resolve(null)
        return
      }
      
      // Create a temporary file for the thumbnail
      const tempDir = require('os').tmpdir()
      const tempFile = path.join(tempDir, `thumb_${Date.now()}.jpg`)
      
      console.log('ffmpeg library is available, extracting frame...')
      
      ffmpeg(filePath)
        .seekInput(1) // Seek to 1 second into video
        .frames(1) // Extract 1 frame
        .size('64x64')
        .output(tempFile)
        .on('end', async () => {
          try {
            console.log('Video frame extracted successfully')
            
            // Read the generated thumbnail
            const thumbnailBuffer = await fs.promises.readFile(tempFile)
            const base64Data = thumbnailBuffer.toString('base64')
            const dataUrl = `data:image/jpeg;base64,${base64Data}`
            
            // Clean up temp file
            try {
              await fs.promises.unlink(tempFile)
            } catch (e) {
              console.warn('Failed to clean up temp file:', e)
            }
            
            console.log('Generated thumbnail data URL for video file')
            resolve(dataUrl)
          } catch (error) {
            console.error('Failed to read video thumbnail:', error)
            resolve(null)
          }
        })
        .on('error', (error: any) => {
          console.error('Failed to extract video thumbnail:', error)
          resolve(null)
        })
        .run()
    } catch (error) {
      console.error('Failed to process video thumbnail:', error)
      resolve(null)
    }
  })
}

// Generate thumbnail for any file type
const generateFileThumbnail = async (filePath: string): Promise<string | null> => {
  const ext = path.extname(filePath).toLowerCase()
  
  // Image thumbnails
  if (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'].includes(ext)) {
    return await generateImageThumbnail(filePath)
  }
  
  // Video file thumbnails
  if (['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv', '.m4v'].includes(ext)) {
    return await extractVideoThumbnail(filePath)
  }
  
  // Audio file album art
  if (['.mp3', '.wav', '.flac', '.aac', '.ogg', '.m4a'].includes(ext)) {
    return await extractAudioThumbnail(filePath)
  }
  
  return null
} 