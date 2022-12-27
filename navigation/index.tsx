/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Avatar from '../components/Avatar';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import { createTabBarIcon } from '../components/Icon';
import { RootStackParamList, RootTabParamList } from '../types';

function TabBarIcon() {
  const testImage = 'https://randomuser.me/api/portraits/men/36.jpg';
  const size = 32;

  return <Avatar size={size} path={testImage} />;
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={{
          headerShown: false,
          tabBarLabel: '모임관리',
          tabBarIcon: createTabBarIcon('groups'),
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          tabBarLabel: '모임입장',
          tabBarIcon: createTabBarIcon('meeting-room'),
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThreeScreen}
        options={{
          tabBarLabel: '마이페이지',
          tabBarIcon: TabBarIcon,
        }}
      />
    </BottomTab.Navigator>
  );
}
