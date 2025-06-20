import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import WindowControls from './components/WindowControls'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import FileExplorer from './components/FileExplorer'
import { useTransferStore } from './stores/transfer-store'
import './App.css'

function App() {
  const { initialize } = useTransferStore()

  useEffect(() => {
    // Initialize the app when it loads
    initialize()
  }, [initialize])

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-background-from to-background-to">
      {/* Window Controls (macOS style) */}
      <WindowControls />
      
      {/* Main App Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Storage Analytics */}
        <Sidebar />
        
        {/* Center Content - Upload/Download Area */}
        <MainContent />
        
        {/* Right Sidebar - File Explorer */}
        <FileExplorer />
      </div>

      {/* Global Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#1e293b',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            boxShadow: '0 4px 20px -4px rgba(0, 0, 0, 0.08)',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </div>
  )
}

export default App 