import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import { Card, Button } from '@aethersync/ui'
import { useTransferStore } from '../../stores/transfer-store'
import { X, CheckCircle, AlertCircle, Clock, FileText, Image, Video, Music } from 'lucide-react-native'

export default function TransfersScreen() {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active')
  const { activeTransfers, transferHistory, cancelTransfer, clearHistory } = useTransferStore()

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    if (['jpg', 'png', 'gif', 'svg', 'webp'].includes(ext || '')) {
      return <Image size={24} className="text-green-500" />
    }
    if (['mp4', 'avi', 'mov', 'mkv'].includes(ext || '')) {
      return <Video size={24} className="text-purple-500" />
    }
    if (['mp3', 'wav', 'flac', 'aac'].includes(ext || '')) {
      return <Music size={24} className="text-orange-500" />
    }
    return <FileText size={24} className="text-blue-500" />
  }

  const formatBytes = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    if (mb < 1024) {
      return `${mb.toFixed(1)} MB`
    }
    const gb = mb / 1024
    return `${gb.toFixed(1)} GB`
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-background-from to-background-to">
      <View className="flex-1">
        {/* Header */}
        <View className="px-4 py-6 border-b border-surface-200">
          <Text className="text-2xl font-bold text-text-primary mb-4">Transfers</Text>
          
          {/* Tab Navigation */}
          <View className="flex-row bg-surface-100 rounded-lg p-1">
            <TouchableOpacity
              onPress={() => setActiveTab('active')}
              className={`flex-1 py-2 px-4 rounded-md ${
                activeTab === 'active' 
                  ? 'bg-white shadow-sm' 
                  : 'bg-transparent'
              }`}
            >
              <Text className={`text-center font-medium ${
                activeTab === 'active' 
                  ? 'text-text-primary' 
                  : 'text-text-secondary'
              }`}>
                Active ({activeTransfers.length})
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => setActiveTab('history')}
              className={`flex-1 py-2 px-4 rounded-md ${
                activeTab === 'history' 
                  ? 'bg-white shadow-sm' 
                  : 'bg-transparent'
              }`}
            >
              <Text className={`text-center font-medium ${
                activeTab === 'history' 
                  ? 'text-text-primary' 
                  : 'text-text-secondary'
              }`}>
                History ({transferHistory.length})
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <ScrollView className="flex-1 px-4 py-6">
          {activeTab === 'active' ? (
            <View className="space-y-4">
              {activeTransfers.length > 0 ? (
                activeTransfers.map((transfer) => (
                  <Card key={transfer.id} className="p-4">
                    <View className="flex-row items-start justify-between mb-3">
                      <View className="flex-row items-center space-x-3 flex-1">
                        {getFileIcon(transfer.fileName)}
                        <View className="flex-1">
                          <Text className="font-medium text-text-primary" numberOfLines={1}>
                            {transfer.fileName}
                          </Text>
                          <Text className="text-sm text-text-secondary">
                            {transfer.type === 'sending' ? 'Sending to' : 'Receiving from'} {transfer.peer}
                          </Text>
                          <Text className="text-xs text-text-tertiary">
                            {formatBytes(transfer.fileSize)}
                          </Text>
                        </View>
                      </View>
                      
                      <TouchableOpacity
                        onPress={() => cancelTransfer(transfer.id)}
                        className="w-8 h-8 items-center justify-center"
                      >
                        <X size={18} className="text-text-tertiary" />
                      </TouchableOpacity>
                    </View>

                    {/* Progress Bar */}
                    <View className="mb-2">
                      <View className="flex-row justify-between items-center mb-1">
                        <Text className="text-sm text-text-secondary">
                          {transfer.status === 'transferring' ? 'Transferring...' : 'Preparing...'}
                        </Text>
                        <Text className="text-sm font-medium text-text-primary">
                          {Math.round(transfer.progress)}%
                        </Text>
                      </View>
                      <View className="w-full bg-surface-200 rounded-full h-2">
                        <View 
                          className="bg-gradient-to-r from-primary-500 to-secondary-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${transfer.progress}%` }}
                        />
                      </View>
                    </View>

                    {/* Transfer Info */}
                    <View className="flex-row justify-between items-center">
                      <Text className="text-xs text-text-tertiary">
                        {formatBytes(transfer.transferred)} / {formatBytes(transfer.fileSize)}
                      </Text>
                      <Text className="text-xs text-text-tertiary">
                        {transfer.speed} MB/s
                      </Text>
                    </View>
                  </Card>
                ))
              ) : (
                <View className="py-12 items-center">
                  <Clock size={48} className="text-text-tertiary mb-4" />
                  <Text className="text-lg font-medium text-text-primary mb-2">
                    No active transfers
                  </Text>
                  <Text className="text-text-secondary text-center">
                    Start a file transfer to see progress here
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View className="space-y-4">
              {/* Clear History Button */}
              {transferHistory.length > 0 && (
                <View className="flex-row justify-end mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onPress={clearHistory}
                  >
                    Clear History
                  </Button>
                </View>
              )}

              {transferHistory.length > 0 ? (
                transferHistory.map((transfer) => (
                  <Card key={transfer.id} className="p-4">
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center space-x-3 flex-1">
                        {getFileIcon(transfer.fileName)}
                        <View className="flex-1">
                          <Text className="font-medium text-text-primary" numberOfLines={1}>
                            {transfer.fileName}
                          </Text>
                          <Text className="text-sm text-text-secondary">
                            {transfer.type === 'sent' ? 'Sent to' : 'Received from'} {transfer.peer}
                          </Text>
                          <Text className="text-xs text-text-tertiary">
                            {formatBytes(transfer.fileSize)} • {formatTime(transfer.timestamp)}
                          </Text>
                        </View>
                      </View>
                      
                      <View className="items-center">
                        {transfer.status === 'completed' && (
                          <CheckCircle size={24} className="text-success" />
                        )}
                        {transfer.status === 'failed' && (
                          <AlertCircle size={24} className="text-error" />
                        )}
                        {transfer.status === 'cancelled' && (
                          <X size={24} className="text-text-tertiary" />
                        )}
                      </View>
                    </View>
                  </Card>
                ))
              ) : (
                <View className="py-12 items-center">
                  <FileText size={48} className="text-text-tertiary mb-4" />
                  <Text className="text-lg font-medium text-text-primary mb-2">
                    No transfer history
                  </Text>
                  <Text className="text-text-secondary text-center">
                    Completed transfers will appear here
                  </Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
