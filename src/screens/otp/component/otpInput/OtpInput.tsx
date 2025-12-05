import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { ErrorText } from '../../../../component';
import colors from '../../../../constants/colors';
import type { OtpInputProps, OtpInputRef } from './otpInput.types';

const OtpInputBase = (
  { length = 4, initialValue = '', onChange }: OtpInputProps,
  ref: React.ForwardedRef<OtpInputRef>,
) => {
  const [digits, setDigits] = useState<string[]>(
    Array.from({ length }, (_, index) => initialValue[index] ?? ''),
  );
  const [error, setError] = useState<string>('');
  const inputsRef = React.useRef<Array<TextInput | null>>([]);

  const focusNext = React.useCallback(
    (index: number) => {
      if (index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    },
    [length],
  );

  const focusPrev = React.useCallback((index: number) => {
    if (index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }, []);

  const handleChange = React.useCallback(
    (text: string, index: number) => {
      const sanitized = text.replace(/[^0-9]/g, '').slice(-1);
      const hadValue = !!digits[index];
      const updated = [...digits];
      updated[index] = sanitized;
      setDigits(updated);
      onChange?.(updated.join(''));

      if (sanitized) {
        setError('');
        focusNext(index);
      } else if (hadValue) {
        focusPrev(index);
      }
    },
    [digits, focusNext, focusPrev, onChange],
  );

  const handleKeyPress = React.useCallback(
    (index: number, key: string) => {
      if (key === 'Backspace' && !digits[index]) {
        focusPrev(index);
      }
    },
    [digits, focusPrev],
  );

  const clear = React.useCallback(() => {
    setDigits(Array.from({ length }, () => ''));
    setError('');
    inputsRef.current[0]?.focus();
  }, [length]);

  const validate = React.useCallback(() => {
    const hasEmpty = digits.some(digit => !digit);
    if (hasEmpty) {
      setError('Enter Valide OTP');
      return false;
    }
    setError('');
    return true;
  }, [digits]);

  React.useImperativeHandle(
    ref,
    () => ({
      value: digits.join(''),
      validate,
      clear,
    }),
    [clear, digits, validate],
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputsWrapper}>
        {digits.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputRef => {
              inputsRef.current[index] = inputRef;
            }}
            value={digit}
            style={[styles.input, digit ? styles.filledInput : null]}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
            importantForAutofill="yes"
            maxLength={1}
            returnKeyType="next"
            accessible
            accessibilityLabel={`OTP digit ${index + 1}`}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
              handleKeyPress(index, nativeEvent.key)
            }
          />
        ))}
      </View>
      <View style={styles.errorContainer}>
        <ErrorText
          message={error}
          visible={Boolean(error)}
          style={styles.errorText}
        />
      </View>
    </View>
  );
};

const OtpInput = React.forwardRef<OtpInputRef, OtpInputProps>(OtpInputBase);
OtpInput.displayName = 'OtpInput';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 20,
  },
  inputsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  input: {
    width: 56,
    height: 56,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  filledInput: {
    borderColor: colors.textPrimary,
  },
  errorContainer: {
    minHeight: 30,
    width: '100%',
    paddingHorizontal: 45,
  },
  errorText: {
    color: colors.error,
  },
});

export default React.memo(OtpInput);
