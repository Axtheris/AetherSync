import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts'
import { HardDrive, Users, Calendar, Sparkles, X } from 'lucide-react'

interface StorageData {
  month: string
  documents: number
  sound: number
  videos: number
  photos: number
}

interface FileAnalysis {
  documents: { count: number; size: number }
  photos: { count: number; size: number }
  videos: { count: number; size: number }
  sound: { count: number; size: number }
}

const Sidebar: React.FC = () => {
  const [showAIPopup, setShowAIPopup] = useState(true)
  const [fileAnalysis, setFileAnalysis] = useState<FileAnalysis>({
    documents: { count: 0, size: 0 },
    photos: { count: 0, size: 0 },
    videos: { count: 0, size: 0 },
    sound: { count: 0, size: 0 },
  })

  // Mock data for storage chart (matches the design)
  const storageData: StorageData[] = [
    { month: 'Jan', documents: 30, sound: 20, videos: 45, photos: 25 },
    { month: 'Feb', documents: 45, sound: 35, videos: 52, photos: 40 },
    { month: 'Mar', documents: 55, sound: 30, videos: 60, photos: 45 },
    { month: 'Apr', documents: 40, sound: 25, videos: 48, photos: 35 },
    { month: 'May', documents: 65, sound: 40, videos: 70, photos: 50 },
  ]

  const colors = {
    documents: '#3b82f6', // Blue
    sound: '#10b981',     // Green
    videos: '#8b5cf6',    // Purple
    photos: '#f59e0b',    // Orange
  }

  useEffect(() => {
    // Load file analysis from Electron
    if (window.electronAPI) {
      window.electronAPI.fs.analyzeFiles().then(setFileAnalysis)
    }
  }, [])

  const formatSize = (bytes: number) => {
    const gb = bytes / (1024 ** 3)
    if (gb < 1) {
      const mb = bytes / (1024 ** 2)
      return `${mb.toFixed(1)} MB`
    }
    return `${gb.toFixed(1)} GB`
  }

  return (
    <div className="w-80 bg-white/50 backdrop-blur-sm border-r border-surface-200 p-6 overflow-y-auto">
      {/* AI Assistant Popup */}
      {showAIPopup && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6 relative animate-fade-in">
          <button
            onClick={() => setShowAIPopup(false)}
            className="absolute top-2 right-2 text-text-tertiary hover:text-text-secondary"
          >
            <X size={16} />
          </button>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary mb-1">Connect with us!</h3>
              <p className="text-sm text-text-secondary mb-3">
                Join us in this dynamic group and grow together.
              </p>
              <button className="bg-primary-500 hover:bg-primary-600 text-white text-sm px-3 py-1.5 rounded-lg transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Storage Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Storage</h2>
          <select className="text-sm text-text-secondary bg-transparent border-none focus:outline-none cursor-pointer">
            <option>Month</option>
            <option>Week</option>
            <option>Year</option>
          </select>
        </div>

        {/* Storage Type Legend */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-chart-documents"></div>
            <span className="text-sm text-text-secondary">Documents</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-chart-sound"></div>
            <span className="text-sm text-text-secondary">Sound</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-chart-videos"></div>
            <span className="text-sm text-text-secondary">Videos</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-chart-photos"></div>
            <span className="text-sm text-text-secondary">Photo</span>
          </div>
        </div>

        {/* Storage Chart */}
        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={storageData}>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickFormatter={(value) => `${value}GB`}
              />
              <Bar dataKey="documents" stackId="a" fill={colors.documents} radius={[0, 0, 0, 0]} />
              <Bar dataKey="sound" stackId="a" fill={colors.sound} radius={[0, 0, 0, 0]} />
              <Bar dataKey="videos" stackId="a" fill={colors.videos} radius={[0, 0, 0, 0]} />
              <Bar dataKey="photos" stackId="a" fill={colors.photos} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Storage Labels */}
        <div className="grid grid-cols-5 text-center text-xs text-text-tertiary">
          <div>10GB</div>
          <div>20GB</div>
          <div>30GB</div>
          <div>40GB</div>
          <div>50GB</div>
        </div>
      </div>

      {/* AI Assistant Section */}
      <div className="bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl p-4 text-white">
        <div className="flex items-start space-x-3 mb-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Sparkles size={16} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">How AI assist your file?</h3>
          </div>
        </div>
        
        <p className="text-sm text-white/80 mb-4">
          AI can help organize, categorize, and optimize your file transfers automatically.
        </p>
        
        <button className="bg-white/20 hover:bg-white/30 text-white text-sm px-4 py-2 rounded-lg transition-colors backdrop-blur-sm">
          Learn More
        </button>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Total Files</span>
          <span className="font-medium text-text-primary">
            {Object.values(fileAnalysis).reduce((acc, { count }) => acc + count, 0)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Storage Used</span>
          <span className="font-medium text-text-primary">
            {formatSize(Object.values(fileAnalysis).reduce((acc, { size }) => acc + size, 0))}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar 