/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Avatar from '../components/Avatar';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import CreateMeeting from '../screens/CreateMeeting';
import CancelIconButton from '../components/buttons/CancelIconButton';
import {
  RootStackParamList,
  RootStackScreenProps,
  RootTabParamList,
} from '../types';
import TabThreeScreen from '../screens/TabThreeScreen';
import Icon, { createTabBarIcon, PressableIcon } from '../components/Icon';
import theme from '../constants/themed';
import MeetingRoom from '../screens/MeetingRoom';

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
      <Stack.Screen
        name="CreateMeeting"
        component={CreateMeeting}
        options={{
          title: '모임등록',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerStyle,
          headerRight: CancelIconButton,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="MeetingRoom"
        component={MeetingRoom}
        options={({ navigation, route }) => ({
          title: '임시타이틀Room1',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerStyle,
          headerRight: CancelIconButton,
          headerBackVisible: false,
        })}
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
        options={({ navigation }) => ({
          headerLeft: () =>
            PressableIcon({
              name: 'sensor-door',
              size: 32,
              color: 'black',
              onPress: () => navigation.navigate('MeetingRoom'),
            }),
          headerRight: () =>
            PressableIcon({
              name: 'add',
              size: 32,
              color: 'black',
              onPress: () => navigation.navigate('CreateMeeting'),
            }),

          tabBarLabel: '모임입장',
          tabBarIcon: createTabBarIcon('meeting-room'),
        })}
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

const styles = StyleSheet.create({
  headerStyle: {
    fontFamily: 'pretendard',
    fontWeight: 'bold',
    fontSize: theme.textStyles?.title3?.fontSize,
    lineHeight: theme.textStyles?.title3?.lineHeight,
  },
});
