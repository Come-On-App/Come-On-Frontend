import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Inavigator, PolicyParamList } from '@account/navigation/type';
import PolicyPages from '@account/screens/PolicyPages';
import TermsOfUse from '@account/screens/TermsOfUse';
import PrivacyPolicy from '@account/screens/PrivacyPolicy';

const { Screen, Navigator } = createNativeStackNavigator<PolicyParamList>();

function PolicyNavigator({ children }: Inavigator) {
  return (
    <Navigator
      initialRouteName="PolicyPages"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      {children}
    </Navigator>
  );
}

export default function Navigation() {
  return (
    <PolicyNavigator>
      <Screen name="PolicyPages" component={PolicyPages} />
      <Screen name="TermsOfUse" component={TermsOfUse} />
      <Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </PolicyNavigator>
  );
}
