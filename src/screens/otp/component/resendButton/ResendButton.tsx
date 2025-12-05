import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';

import colors from '../../../../constants/colors';
import type { ResendButtonProps } from './resendButton.types';

const ResendButton: React.FC<ResendButtonProps> = ({
  initialSeconds = 60,
  onResend,
}) => {
  const [secondsRemaining, setSecondsRemaining] =
    useState<number>(initialSeconds);

  useEffect(() => {
    if (secondsRemaining === 0) {
      return;
    }

    const timerId = setTimeout(() => {
      setSecondsRemaining(prev => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearTimeout(timerId);
  }, [secondsRemaining]);

  const handleResend = useCallback(() => {
    onResend?.();
    setSecondsRemaining(initialSeconds);
  }, [initialSeconds, onResend]);

  if (secondsRemaining > 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.timerText}>Resend code in {secondsRemaining}s</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Didn't receive the code?{' '}
        <Text style={styles.link} onPress={handleResend}>
          Resend
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  text: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  link: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  timerText: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.textSecondary,
  },
});

export default React.memo(ResendButton);
