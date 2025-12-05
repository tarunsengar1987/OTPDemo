import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import colors from '../../constants/colors';
import type { ButtonProps, ButtonVariant } from './button.types';

const VARIANT_MAP: Record<ButtonVariant, { background: string; text: string }> =
  {
    primary: {
      background: colors.textPrimary,
      text: colors.surface,
    },
    secondary: {
      background: colors.border,
      text: colors.textPrimary,
    },
  };

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  containerStyle,
  labelStyle,
}) => {
  const palette = VARIANT_MAP[variant];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: palette.background },
        pressed && !isDisabled ? styles.pressed : null,
        isDisabled ? styles.disabled : null,
        containerStyle,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color={palette.text} />
      ) : (
        <Text style={[styles.label, { color: palette.text }, labelStyle]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default React.memo(Button);
