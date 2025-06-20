import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

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
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View className={`items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <Svg width={size} height={size} className="absolute">
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      
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