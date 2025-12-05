import { StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import colors from '../../constants/colors';
import { Button, CommonHeader } from '../../component';
import { OtpHeader, OtpInput, ResendButton } from './component';
import type { OtpInputRef } from './component/otpInput/otpInput.types';

const OtpScreen: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const otpInputRef = useRef<OtpInputRef>(null);

  const handleOtpChange = useCallback((value: string) => {
    return value;
  }, []);

  const handleVerify = useCallback(() => {
    if (isSubmitting) {
      return;
    }

    const isValid = otpInputRef.current?.validate() ?? false;
    if (!isValid) {
      return;
    }

    const currentOtp = otpInputRef.current?.value ?? '';
    console.log('Entered OTP:', currentOtp);

    setIsSubmitting(true);
    timeoutRef.current = setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  }, [isSubmitting]);

  const handleResend = React.useCallback(() => {
    console.log('Resend OTP requested');
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <CommonHeader />
      <View style={styles.content}>
        <OtpHeader />
        <OtpInput ref={otpInputRef} onChange={handleOtpChange} />
        <Button
          label="Verify"
          loading={isSubmitting}
          onPress={handleVerify}
          containerStyle={styles.verifyBtn}
        />
        <ResendButton onResend={handleResend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
  },
  verifyBtn: {
    marginTop: 24,
  },
});

export default OtpScreen;
