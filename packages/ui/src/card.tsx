import React from 'react';
import { View, ViewStyle } from 'react-native';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  style,
  padding = 'md',
  shadow = 'md'
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-card',
    lg: 'shadow-card-hover'
  };

  return (
    <View 
      className={`
        bg-surface-50 
        rounded-card 
        ${paddingClasses[padding]} 
        ${shadowClasses[shadow]}
        ${className}
      `}
      style={style}
    >
      {children}
    </View>
  );
};
