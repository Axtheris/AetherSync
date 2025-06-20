import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import { Card, Button, CircularProgress, Avatar } from '@aethersync/ui'
import { usePeerDiscovery } from '../../hooks/usePeerDiscovery'
import { useFileTransfer } from '../../hooks/useFileTransfer'
import { usePeerStore } from '../../stores/peer-store'
import { useTransferStore } from '../../stores/transfer-store'
import { Upload, Download, Wifi, Users, Clock } from 'lucide-react-native'

const STORAGE_TOTAL = 128 * 1024 * 1024 * 1024 // 128GB
const STORAGE_USED = 89 * 1024 * 1024 * 1024 // 89GB

export default function HomeScreen() {
  const [isConnected, setIsConnected] = useState(false)
  const { startDiscovery, stopDiscovery } = usePeerDiscovery()
  const { sendFile } = useFileTransfer()
  const peers = usePeerStore(state => state.peers)
  const transferHistory = useTransferStore(state => state.history)

  useEffect(() => {
    startDiscovery()
    return () => stopDiscovery()
  }, [])

  const storagePercentage = (STORAGE_USED / STORAGE_TOTAL) * 100

  const formatBytes = (bytes: number) => {
    const gb = bytes / (1024 ** 3)
    return `${gb.toFixed(0)} GB`
  }

  const recentPeers = peers.slice(0, 5)

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-background-from to-background-to">
      <ScrollView className="flex-1 px-4 py-6">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-2xl font-bold text-text-primary">AetherSync</Text>
            <Text className="text-text-secondary">
              {isConnected ? `${peers.length} devices nearby` : 'Looking for devices...'}
            </Text>
          </View>
          <View className="flex-row items-center space-x-2">
            <Wifi size={20} className={isConnected ? "text-success" : "text-text-tertiary"} />
            <TouchableOpacity className="w-10 h-10 bg-primary-500 rounded-full items-center justify-center">
              <Users size={20} className="text-white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Storage Card */}
        <Card className="mb-6 p-6">
          <View className="items-center">
            <View className="relative mb-4">
              <CircularProgress
                size={120}
                strokeWidth={8}
                progress={storagePercentage}
                color="#6366f1"
                backgroundColor="#e2e8f0"
              />
              <View className="absolute inset-0 items-center justify-center">
                <Text className="text-2xl font-bold text-text-primary">
                  {storagePercentage.toFixed(0)}%
                </Text>
                <Text className="text-sm text-text-secondary">Used</Text>
              </View>
            </View>
            
            <Text className="text-lg font-semibold text-text-primary mb-1">
              Storage
            </Text>
            <Text className="text-text-secondary text-center">
              {formatBytes(STORAGE_USED)} of {formatBytes(STORAGE_TOTAL)} used
            </Text>
          </View>
        </Card>

        {/* Action Buttons */}
        <View className="flex-row space-x-4 mb-6">
          <View className="flex-1">
            <Button
              variant="primary"
              size="lg"
              onPress={() => sendFile()}
              className="h-14"
            >
              <View className="flex-row items-center space-x-2">
                <Upload size={20} className="text-white" />
                <Text className="text-white font-semibold">Send</Text>
              </View>
            </Button>
          </View>
          
          <View className="flex-1">
            <Button
              variant="secondary"
              size="lg"
              className="h-14"
            >
              <View className="flex-row items-center space-x-2">
                <Download size={20} className="text-primary-500" />
                <Text className="text-primary-500 font-semibold">Receive</Text>
              </View>
            </Button>
          </View>
        </View>

        {/* Nearby Devices */}
        {recentPeers.length > 0 && (
          <Card className="mb-6 p-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold text-text-primary">Friends</Text>
              <TouchableOpacity>
                <Text className="text-primary-500 font-medium">See All</Text>
              </TouchableOpacity>
            </View>
            
            <View className="flex-row space-x-3">
              {recentPeers.map((peer, index) => (
                <View key={peer.id} className="items-center">
                  <Avatar
                    size={48}
                    name={peer.name}
                    className="mb-2"
                  />
                  <Text className="text-xs text-text-secondary text-center" numberOfLines={1}>
                    {peer.name}
                  </Text>
                </View>
              ))}
              
              {/* Add more button */}
              <View className="items-center">
                <TouchableOpacity className="w-12 h-12 border-2 border-dashed border-surface-300 rounded-full items-center justify-center mb-2">
                  <Text className="text-surface-400 text-xl">+</Text>
                </TouchableOpacity>
                <Text className="text-xs text-text-tertiary">More</Text>
              </View>
            </View>
          </Card>
        )}

        {/* Activity Feed */}
        <Card className="p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-text-primary">Activity</Text>
            <Clock size={16} className="text-text-tertiary" />
          </View>
          
          {transferHistory.length > 0 ? (
            <View className="space-y-3">
              {transferHistory.slice(0, 5).map((transfer) => (
                <View key={transfer.id} className="flex-row items-center justify-between py-2">
                  <View className="flex-row items-center space-x-3">
                    <View className="w-10 h-10 bg-primary-100 rounded-lg items-center justify-center">
                      <Text className="text-xl">{transfer.type === 'sent' ? '📤' : '📥'}</Text>
                    </View>
                    <View>
                      <Text className="font-medium text-text-primary" numberOfLines={1}>
                        {transfer.fileName}
                      </Text>
                      <Text className="text-sm text-text-secondary">
                        {transfer.type === 'sent' ? 'Sent to' : 'Received from'} {transfer.peer}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-xs text-text-tertiary">
                      {new Date(transfer.timestamp).toLocaleDateString()}
                    </Text>
                    <View className={`px-2 py-1 rounded-full ${
                      transfer.status === 'completed' 
                        ? 'bg-success-100' 
                        : transfer.status === 'failed'
                        ? 'bg-error-100'
                        : 'bg-primary-100'
                    }`}>
                      <Text className={`text-xs font-medium ${
                        transfer.status === 'completed' 
                          ? 'text-success' 
                          : transfer.status === 'failed'
                          ? 'text-error'
                          : 'text-primary-500'
                      }`}>
                        {transfer.status}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View className="py-8 items-center">
              <Text className="text-text-tertiary text-center mb-2">No recent activity</Text>
              <Text className="text-sm text-text-tertiary text-center">
                Transfer files to see them here
              </Text>
            </View>
          )}
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}
