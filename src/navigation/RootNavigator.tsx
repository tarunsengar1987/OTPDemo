import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { OtpScreen } from '../screens/otp';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Otp" component={OtpScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
