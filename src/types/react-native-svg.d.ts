declare module 'react-native-svg' {
  import type * as React from 'react';
  import type { ViewProps } from 'react-native';

  export interface SvgProps extends ViewProps {
    width?: number | string;
    height?: number | string;
    viewBox?: string;
    fill?: string;
  }

  export type PathProps = {
    d: string;
    stroke?: string;
    strokeWidth?: number | string;
    strokeLinecap?: 'butt' | 'round' | 'square';
    strokeLinejoin?: 'miter' | 'bevel' | 'round';
    fill?: string;
  };

  export const Path: React.ComponentType<PathProps>;
  const Svg: React.ComponentType<SvgProps>;

  export default Svg;
}
