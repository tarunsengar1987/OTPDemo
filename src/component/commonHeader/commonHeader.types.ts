import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type CommonHeaderProps = {
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  onBackPress?: () => void;
  iconColor?: string;
  iconSize?: number;
  iconStrokeWidth?: number;
};
