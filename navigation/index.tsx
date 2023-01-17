import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import theme from '../constants/themed';

import { Avatar } from '../components/Avatar';
import MeetingRoom from '../screens/MeetingRoom';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import CreateMeeting from '../screens/CreateMeeting';
import TabThreeScreen from '../screens/TabThreeScreen';
import PlaceSelect from '../components/placeSelect/PlaceSelect';
import LogoutButton from '../components/myPage/MyPageLogoutButton';
import { createTabBarIcon, PressableIcon } from '../components/Icon';
import { RootStackParamList, RootTabParamList } from '../navigation';
import CancelIconButton from '../components/buttons/CancelIconButton';
import MyPageHeaderTitle from '../components/myPage/MyPageHeaderTitle';
import PlaceSelectHeaderTitle from '../components/placeSelect/PlaceSelectHeaderTitle';

function TabThreeIcon() {
  const testImage = 'https://randomuser.me/api/portraits/men/36.jpg'; // SERVER-API: 추후 서버로 사용자 프로필 요청
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
        options={({ navigation, route }) => ({
          title: '모임등록',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerStyle,
          headerRight: CancelIconButton,
          headerBackVisible: false,
        })}
      />
      <Stack.Screen
        name="PlaceSelect"
        component={PlaceSelect}
        options={({ navigation, route }) => ({
          title: route.name,
          headerTitleAlign: 'center',
          headerTitle: PlaceSelectHeaderTitle,
          headerShadowVisible: false,
          headerRight: CancelIconButton,
          headerBackVisible: false,
        })}
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
              onPress: () => navigation.navigate('CreateMeeting'),
            }),
          headerRight: () =>
            PressableIcon({
              name: 'map',
              size: 32,
              color: 'black',
              onPress: () =>
                navigation.navigate('CreateMeeting', { title: '모임생성' }),
            }),
          tabBarLabel: '모임입장',
          tabBarIcon: createTabBarIcon('meeting-room'),
        })}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabTwoScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: MyPageHeaderTitle,
          headerRight: LogoutButton,
          tabBarLabel: '마이페이지',
          tabBarIcon: TabThreeIcon,
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
