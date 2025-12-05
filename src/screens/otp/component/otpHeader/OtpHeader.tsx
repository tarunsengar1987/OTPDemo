import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../../../../constants/colors';
import type { OtpHeaderProps } from './otpHeader.types';

const OtpHeader: React.FC<OtpHeaderProps> = ({
  title = 'OTP Verification',
  subtitle = 'Enter the verification code we just sent you on',
  contact = 'example@gmail.com',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.subtitleWrapper}>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.contact}>{contact}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitleWrapper: {
    gap: 4,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 60,
  },
  contact: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
});

export default React.memo(OtpHeader);
