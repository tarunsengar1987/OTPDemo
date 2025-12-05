import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

type BackIconProps = SvgProps & {
  size?: number;
  strokeColor?: string;
  strokeWidth?: number;
};

const BackIcon: React.FC<BackIconProps> = ({
  size = 24,
  strokeColor = '#0F172A',
  strokeWidth = 2,
  ...rest
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...rest}>
      <Path
        d="M15.5 5.5L8.5 12L15.5 18.5"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default BackIcon;
