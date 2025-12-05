import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import colors from '../../constants/colors';
import { BackIcon } from '../../assets/icons';
import type { CommonHeaderProps } from './commonHeader.types';
import type { RootStackParamList } from '../../navigation/types';

const CommonHeader: React.FC<CommonHeaderProps> = ({
  title,
  containerStyle,
  titleStyle,
  onBackPress,
  iconColor = colors.textPrimary,
  iconSize = 24,
  iconStrokeWidth = 2,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleBackPress = React.useCallback(() => {
    if (onBackPress) {
      onBackPress();
      return;
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation, onBackPress]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={12}
        style={styles.backButton}
        onPress={handleBackPress}
      >
        <BackIcon
          size={iconSize}
          strokeColor={iconColor}
          strokeWidth={iconStrokeWidth}
        />
      </Pressable>
      {title ? (
        <Text numberOfLines={1} style={[styles.title, titleStyle]}>
          {title}
        </Text>
      ) : (
        <View style={styles.titlePlaceholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },
  titlePlaceholder: {
    flex: 1,
  },
});

export default React.memo(CommonHeader);
