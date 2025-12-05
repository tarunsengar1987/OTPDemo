import React from 'react';
import { StyleSheet, Text } from 'react-native';

import colors from '../../constants/colors';
import type { ErrorTextProps } from './errorText.types';

const ErrorText: React.FC<ErrorTextProps> = ({
  message,
  visible = true,
  style,
}) => {
  if (!message || !visible) {
    return null;
  }

  return <Text style={[styles.text, style]}>{message}</Text>;
};

const styles = StyleSheet.create({
  text: {
    marginTop: 8,
    fontSize: 14,
    color: colors.error,
    fontWeight: '500',
  },
});

export default React.memo(ErrorText);
