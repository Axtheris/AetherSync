import { useState } from 'react'
import { Folder, Search, MoreHorizontal, ArrowLeft, Eye, Copy } from 'lucide-react'

interface FileItem {
  id: string
  name: string
  type: 'folder' | 'file'
  size?: string
  modified: string
  shared?: boolean
  thumbnail?: string
}

interface SharedUser {
  id: string
  name: string
  email: string
  avatar?: string
}

export default function FileExplorer() {
  const [currentPath, setCurrentPath] = useState('/')
  const [selectedView, setSelectedView] = useState<'folders' | 'shared'>('folders')
  
  // Mock data for folders and files
  const folders: FileItem[] = [
    { id: '1', name: 'Photos', type: 'folder', modified: '16 Sep', size: '123' },
    { id: '2', name: 'Videos', type: 'folder', modified: '09 Feb', size: '236' },
    { id: '3', name: 'Documents', type: 'folder', modified: '12 May', size: '89' },
  ]

  const files: FileItem[] = [
    { id: '4', name: 'image.jpg', type: 'file', modified: '16 Sep', size: '2.1', thumbnail: '🖼️' },
    { id: '5', name: 'leo.mp4', type: 'file', modified: '14 May', size: '45.2', thumbnail: '🎬' },
    { id: '6', name: 'worst.mp3', type: 'file', modified: '12 Mar', size: '3.8', thumbnail: '��' },
    { id: '7', name: 'By Me.mp3', type: 'file', modified: '10 Jan', size: '4.2', thumbnail: '🎵' },
  ]

  const sharedUsers: SharedUser[] = [
    { id: '1', name: 'Simon Hempe', email: 'no.simon@gmail.com', avatar: '👨' },
    { id: '2', name: 'Alberta Kimber', email: 'realAlberta@gmail.com', avatar: '👩' },
    { id: '3', name: 'Sigit Nurochman', email: 'sigitnas33@gmail.com', avatar: '👨' },
  ]

  const formatFileSize = (sizeInMB: number) => {
    if (sizeInMB > 1024) {
      return `${(sizeInMB / 1024).toFixed(1)} GB`
    }
    return `${sizeInMB.toFixed(1)} MB`
  }

  const formatFileCount = (count: number) => {
    return `${count} file${count !== 1 ? 's' : ''}`
  }

  return (
    <div className="w-80 bg-white/50 backdrop-blur-sm border-l border-surface-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-surface-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Manage Storage</h2>
          <button className="text-text-tertiary hover:text-text-secondary">
            <Search size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-surface-100 rounded-lg p-1">
          <button
            onClick={() => setSelectedView('folders')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              selectedView === 'folders'
                ? 'bg-white text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            File Types
          </button>
          <button
            onClick={() => setSelectedView('shared')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              selectedView === 'shared'
                ? 'bg-white text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Shared File
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {selectedView === 'folders' ? (
          <div className="p-4">
            {/* Folder Navigation */}
            {currentPath !== '/' && (
              <button 
                onClick={() => setCurrentPath('/')}
                className="flex items-center space-x-2 text-text-secondary hover:text-text-primary mb-4"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            )}

            {/* Folders */}
            <div className="space-y-3 mb-6">
              {folders.map((folder) => (
                <div key={folder.id} className="flex items-center justify-between group hover:bg-surface-50 rounded-lg p-2 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Folder size={20} className="text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">{folder.name}</h4>
                      <p className="text-sm text-text-secondary">
                        {formatFileCount(folder.size ? parseInt(folder.size) : 0)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-tertiary">Last Modified: {folder.modified}</span>
                    <button className="opacity-0 group-hover:opacity-100 text-text-tertiary hover:text-text-secondary">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Files */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-text-secondary mb-3">Recent Files</h3>
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between group hover:bg-surface-50 rounded-lg p-2 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="text-xl">{file.thumbnail}</div>
                    <div>
                      <h4 className="font-medium text-text-primary text-sm">{file.name}</h4>
                      <p className="text-xs text-text-secondary">
                        {file.size && formatFileSize(parseInt(file.size))}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-success"></div>
                    <button className="opacity-0 group-hover:opacity-100 text-text-tertiary hover:text-text-secondary">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4">
            {/* Shared Files Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-primary">Shared File</h3>
              <button className="text-primary-500 text-sm font-medium">See All</button>
            </div>

            {/* Shared Users */}
            <div className="space-y-3 mb-6">
              {sharedUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between group hover:bg-surface-50 rounded-lg p-3 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white">
                      {user.avatar}
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary text-sm">{user.name}</h4>
                      <p className="text-xs text-text-secondary">{user.email}</p>
                    </div>
                  </div>
                  <button className="text-text-tertiary hover:text-text-secondary">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Shared Link Section */}
            <div className="bg-surface-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Eye size={16} className="text-text-secondary" />
                  <span className="text-sm font-medium text-text-primary">Public Link</span>
                </div>
                <button className="text-primary-500 hover:text-primary-600">
                  <Copy size={16} />
                </button>
              </div>
              
              <div className="bg-white rounded border border-surface-200 p-2 mb-3">
                <p className="text-xs text-text-secondary truncate">
                  odsrnis.io/landing-page
                </p>
              </div>
              
              <button className="w-full bg-primary-500 hover:bg-primary-600 text-white text-sm py-2 rounded-lg transition-colors">
                Copy
              </button>
            </div>

            {/* Clean Junk Button */}
            <div className="mt-6">
              <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors">
                Clean Junk
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 