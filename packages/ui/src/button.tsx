"use client";

import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';

export interface ButtonProps {
  title?: string;
  children?: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  fullWidth = false,
}) => {
  const baseClasses = 'rounded-button flex-row items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-primary-500 active:bg-primary-600 shadow-sm',
    secondary: 'bg-secondary-300 active:bg-secondary-400 shadow-sm',
    outline: 'border-2 border-primary-500 bg-transparent active:bg-primary-50',
    ghost: 'bg-transparent active:bg-surface-100',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 min-h-[36px]',
    md: 'px-4 py-3 min-h-[44px]',
    lg: 'px-6 py-4 min-h-[52px]',
  };

  const textVariantClasses = {
    primary: 'text-white font-semibold',
    secondary: 'text-primary-700 font-semibold',
    outline: 'text-primary-500 font-semibold',
    ghost: 'text-text-primary font-medium',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const disabledClasses = disabled ? 'opacity-50' : '';
  const widthClasses = fullWidth ? 'w-full' : '';

  const handlePress = () => {
    if (!disabled && !loading) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabledClasses}
        ${widthClasses}
        ${className}
      `}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? '#ffffff' : '#6366f1'} 
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <View className="mr-2">{icon}</View>
          )}
          
          {title && (
            <Text className={`
              ${textVariantClasses[variant]}
              ${textSizeClasses[size]}
            `}>
              {title}
            </Text>
          )}
          
          {children}
          
          {icon && iconPosition === 'right' && (
            <View className="ml-2">{icon}</View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};
