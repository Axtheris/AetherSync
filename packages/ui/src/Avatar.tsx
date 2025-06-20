import React from 'react';
import { View, Text, Image } from 'react-native';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBorder?: boolean;
  borderColor?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  className = '',
  showBorder = false,
  borderColor = '#ffffff',
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-2xl',
  };

  const borderClasses = showBorder ? 'border-2' : '';
  
  // Generate initials from name
  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  // Generate a consistent background color based on name
  const getBackgroundColor = (name?: string) => {
    if (!name) return '#64748b';
    
    const colors = [
      '#6366f1', '#8b5cf6', '#ec4899', '#ef4444',
      '#f59e0b', '#10b981', '#06b6d4', '#84cc16'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <View 
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        items-center 
        justify-center 
        ${borderClasses}
        ${className}
      `}
      style={{
        borderColor: showBorder ? borderColor : undefined,
        backgroundColor: src ? 'transparent' : getBackgroundColor(name),
      }}
    >
      {src ? (
        <Image
          source={{ uri: src }}
          className={`${sizeClasses[size]} rounded-full`}
          resizeMode="cover"
        />
      ) : (
        <Text 
          className={`${textSizeClasses[size]} font-semibold text-white`}
        >
          {getInitials(name)}
        </Text>
      )}
    </View>
  );
};

// Avatar group component for showing multiple avatars
export interface AvatarGroupProps {
  avatars: Array<{ src?: string; name?: string; id: string }>;
  max?: number;
  size?: AvatarProps['size'];
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  size = 'md',
  className = '',
}) => {
  const displayAvatars = avatars.slice(0, max);
  const remainingCount = Math.max(0, avatars.length - max);

  return (
    <View className={`flex-row ${className}`}>
      {displayAvatars.map((avatar, index) => (
        <View
          key={avatar.id}
          className={index > 0 ? '-ml-2' : ''}
          style={{ zIndex: displayAvatars.length - index }}
        >
          <Avatar
            src={avatar.src}
            name={avatar.name}
            size={size}
            showBorder={true}
            borderColor="#ffffff"
          />
        </View>
      ))}
      
      {remainingCount > 0 && (
        <View
          className="-ml-2 bg-surface-200 rounded-full items-center justify-center border-2 border-white"
          style={{
            width: size === 'xs' ? 24 : size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 48 : 64,
            height: size === 'xs' ? 24 : size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 48 : 64,
          }}
        >
          <Text className={`
            ${size === 'xs' ? 'text-xs' : size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : size === 'lg' ? 'text-lg' : 'text-2xl'}
            font-semibold text-text-secondary
          `}>
            +{remainingCount}
          </Text>
        </View>
      )}
    </View>
  );
}; 