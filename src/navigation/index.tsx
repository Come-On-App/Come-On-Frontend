import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Avatar from '@components/member/Avatar';

import type {
  PlaceSelectParamList,
  RootStackParamList,
  RootTabParamList,
} from '@type/navigation';
import { useUser } from '@hooks/useUser';
import { makeStyles } from '@rneui/themed';

import apis from '../api';
import useAuth from '../hooks/useAuth';
import MeetingRoom from '../screens/MeetingRoom';
import LoginScreen from '../screens/LoginScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import CreateMeeting from '../screens/CreateMeeting';
import TabThreeScreen from '../screens/TabThreeScreen';
import CreateMeetingCalender from '../screens/CreateMeetingCalender';

import LogoutButton from '../components/myPage/MyPageLogoutButton';
import { createTabBarIcon, PressableIcon } from '../components/Icon';

import CancelIconButton from '../components/buttons/CancelIconButton';
import MyPageHeaderTitle from '../components/myPage/MyPageHeaderTitle';
import PlaceSelectHeaderTitle from '../components/placeSelect/PlaceSelectHeaderTitle';

import PlaceSelect from '../screens/place/PlaceSelect';
import PlaceSearch from '../screens/place/PlaceSearch';

function TabThreeIcon() {
  const { user } = useUser();
  const size = 32;

  return <Avatar size={size} path={user?.profileImageUrl} />;
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const PlaceSelectStack = createNativeStackNavigator<PlaceSelectParamList>();

function PlaceSelectNavigator() {
  return (
    <PlaceSelectStack.Navigator>
      <PlaceSelectStack.Screen
        name="Main"
        component={PlaceSelect}
        options={() => ({
          headerTitleAlign: 'center',
          headerTitle: PlaceSelectHeaderTitle,
          headerShadowVisible: false,
          headerRight: CancelIconButton,
          headerBackVisible: false,
        })}
      />
      <PlaceSelectStack.Screen name="Map" component={PlaceSearch} />
    </PlaceSelectStack.Navigator>
  );
}

function RootNavigator() {
  const { isAuth: isLogin, setLogoin } = useAuth();
  const styles = useStyles();

  useEffect(() => {
    setLogoin(); // 토큰이 있는지 없는지 검사
    apis.getUser();
  }, [setLogoin, isLogin]);

  return (
    <Stack.Navigator>
      {isLogin ? (
        <>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PlaceSelect"
            component={PlaceSelectNavigator}
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
            name="CreateMeetingCalender"
            component={CreateMeetingCalender}
            options={({ navigation, route }) => ({
              title: '모임등록',
              headerTitleAlign: 'center',
              headerTitleStyle: styles.headerStyle,
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
        </>
      ) : (
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={navigation => ({
            title: '로그인',
            headerTitleAlign: 'center',
            headerTitleStyle: styles.headerStyle,
            headerRight: CancelIconButton,
            headerBackVisible: false,
          })}
        />
      )}
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
      <>
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
                onPress: () =>
                  navigation.navigate('CreateMeeting', { title: '모임생성' }),
              }),
            tabBarLabel: '모임입장',
            tabBarIcon: createTabBarIcon('meeting-room'),
          })}
        />
        <BottomTab.Screen
          name="TabThree"
          component={TabThreeScreen}
          options={{
            headerTitleAlign: 'center',
            headerTitle: MyPageHeaderTitle,
            headerRight: LogoutButton,
            tabBarLabel: '마이페이지',
            tabBarIcon: TabThreeIcon,
          }}
        />
      </>
    </BottomTab.Navigator>
  );
}

const useStyles = makeStyles(theme => ({
  headerStyle: {
    fontFamily: 'pretendard',
    fontWeight: 'bold',
    fontSize: theme.textStyles?.title3?.fontSize,
    lineHeight: theme.textStyles?.title3?.lineHeight,
  },
}));
