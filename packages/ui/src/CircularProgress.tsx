import React from 'react';
import { View, Text } from 'react-native';

export interface CircularProgressProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showText?: boolean;
  centerText?: string;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color = '#6366f1',
  backgroundColor = '#e2e8f0',
  showText = true,
  centerText,
  className = '',
}) => {
  return (
    <View className={`items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Simplified circular progress using View */}
      <View 
        className="rounded-full border items-center justify-center"
        style={{ 
          width: size, 
          height: size, 
          borderWidth: strokeWidth,
          borderColor: backgroundColor,
        }}
      >
        {/* Progress indicator - simplified to a quarter circle for demo */}
        <View 
          className="absolute rounded-full border-l-0 border-b-0"
          style={{ 
            width: size, 
            height: size, 
            borderWidth: strokeWidth,
            borderColor: color,
            borderLeftColor: 'transparent',
            borderBottomColor: 'transparent',
            transform: [{ rotate: `${(progress / 100) * 360}deg` }],
          }}
        />
        
        {showText && (
          <View className="absolute items-center justify-center">
            {centerText ? (
              <Text className="text-text-primary text-center font-medium">
                {centerText}
              </Text>
            ) : (
              <Text className="text-2xl font-bold text-text-primary">
                {Math.round(progress)}%
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

// Preset variations for common use cases
export const StorageProgress: React.FC<{ used: number; total: number; className?: string }> = ({ 
  used, 
  total, 
  className 
}) => {
  const percentage = (used / total) * 100;
  const usedGB = (used / (1024 * 1024 * 1024)).toFixed(1);
  const totalGB = (total / (1024 * 1024 * 1024)).toFixed(0);
  
  return (
    <View className={`items-center ${className}`}>
      <CircularProgress
        progress={percentage}
        color="#6366f1"
        size={100}
        strokeWidth={6}
        centerText={`${Math.round(percentage)}%`}
      />
      <Text className="text-sm text-text-secondary mt-2 text-center">
        {usedGB}GB of {totalGB}GB used
      </Text>
    </View>
  );
};

export const TransferProgress: React.FC<{ 
  progress: number; 
  size?: number; 
  className?: string;
  showPercentage?: boolean;
}> = ({ 
  progress, 
  size = 80, 
  className,
  showPercentage = true 
}) => {
  return (
    <CircularProgress
      progress={progress}
      size={size}
      strokeWidth={4}
      color="#00d4ff"
      backgroundColor="#e2e8f0"
      showText={showPercentage}
      className={className}
    />
  );
}; 