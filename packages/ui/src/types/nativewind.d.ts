/// <reference types="nativewind/types" />

import { ReactNode } from 'react';

declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
  
  interface TextProps {
    className?: string;
  }
  
  interface ImageProps {
    className?: string;
  }
  
  interface TouchableOpacityProps {
    className?: string;
  }
  
  interface ScrollViewProps {
    className?: string;
  }
  
  interface SafeAreaViewProps {
    className?: string;
  }
  
  interface PressableProps {
    className?: string;
  }
}

declare module 'react-native-svg' {
  interface SvgProps {
    className?: string;
  }
  
  interface CircleProps {
    className?: string;
  }
  
  interface PathProps {
    className?: string;
  }
  
  interface RectProps {
    className?: string;
  }
  
  interface LineProps {
    className?: string;
  }
} 