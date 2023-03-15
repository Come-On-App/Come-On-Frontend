import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Avatar from '@components/member/Avatar';

import type {
  PlaceSelectParamList,
  RootStackParamList,
  RootTabParamList,
} from '@type/navigation';

import MeetingDetail from '@screens/meeting/detail';
import { getValueFor } from '@utils/secureStore';
import { useWebSocketConnect } from '@hooks/useWebSocket';
import useUserQuery from '@hooks/query/useUserQuery';
import fn from '@utils/fn';
import { Skeleton, makeStyles } from '@rneui/themed';
import theme from '../constants/themed';
import useAuth from '../hooks/useAuth';
// import MeetingRoom from '../screens/MeetingRoom';
import LoginScreen from '../screens/LoginScreen';
import TabOneScreen from '../screens/bottomTap/TabOneScreen';
import TabTwoScreen from '../screens/bottomTap/TabTwoScreen';
import CreateMeeting from '../screens/CreateMeeting';
import TabThreeScreen from '../screens/bottomTap/TabThreeScreen';
import CreateMeetingCalender from '../screens/CreateMeetingCalender';
import KakaoLoginWebView from '../screens/KakaoLoginView';
import MeetingRoomCalendar from '../screens/MeetingRoomCalendar';
import LogoutButton from '../components/myPage/MyPageLogoutButton';
import { createTabBarIcon } from '../components/Icon';

import CancelIconButton, {
  CancelPlaceSelectIconButton,
} from '../components/button/CancelIconButton';
import MyPageHeaderTitle from '../components/myPage/MyPageHeaderTitle';
import PlaceSelectHeaderTitle from '../components/placeSelect/PlaceSelectHeaderTitle';

import PlaceSelect from '../screens/place/Select';
import PlaceSearch from '../screens/place/Search';

function TabThreeIcon() {
  const size = 32;
  const { user } = useUserQuery();

  if (fn.isEmpty(user)) {
    return <Skeleton circle width={size} height={size} />;
  }

  return <Avatar size={size} path={user.profileImageUrl} />;
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
        options={{
          headerTitleAlign: 'center',
          headerTitle: PlaceSelectHeaderTitle,
          headerShadowVisible: false,
          headerLeft: () => null,
          headerBackVisible: false,
          headerRight: CancelPlaceSelectIconButton,
        }}
      />
      <PlaceSelectStack.Screen name="Map" component={PlaceSearch} />
    </PlaceSelectStack.Navigator>
  );
}

function RootNavigator() {
  const { isAuth: isLogin, isValidUser } = useAuth();
  const styles = useStyles();
  const [tk, stk] = useState<string>();

  // FIXME: 로직 수정 (임시 토큰 조회 로직)
  useEffect(() => {
    isValidUser(); // 토큰이 있는지 없는지 검사
  }, [isValidUser, isLogin]);

  useEffect(() => {
    if (!isLogin) return;

    (async () => {
      const info = await getValueFor('accessToken');

      if (info) {
        const { token } = JSON.parse(info);

        stk(token);
      }
    })();
  }, [isLogin]);

  useWebSocketConnect(tk);

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
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          {/* FIXME: 개발용 */}
          <Stack.Screen
            name="MeetingDetail"
            component={MeetingDetail}
            options={{
              headerShown: true,
              contentStyle: { backgroundColor: '#ffffff' },
            }}
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
          {/* <Stack.Screen
            name="MeetingRoom"
            component={MeetingRoom}
            options={({ navigation, route }) => ({
              title: '임시타이틀Room1',
              headerTitleAlign: 'center',
              headerTitleStyle: styles.headerStyle,
              headerRight: CancelIconButton,
              headerBackVisible: false,
            })}
          /> */}
          <Stack.Screen
            name="MeetingRoomCalendar"
            component={MeetingRoomCalendar}
            options={({ navigation, route }) => ({
              headerTitleAlign: 'center',
              headerTitleStyle: styles.headerStyle,
              headerRight: CancelIconButton,
              headerBackVisible: false,
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            })}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={navigation => ({
              title: '로그인',
              headerTitleAlign: 'center',
              headerTitleStyle: styles.headerStyle,
              headerBackVisible: false,
            })}
          />
          <Stack.Screen
            name="KakaoLoginWebView"
            component={KakaoLoginWebView}
          />
        </>
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
          options={() => ({
            headerShown: false,
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

const useStyles = makeStyles(() => ({
  headerStyle: {
    fontFamily: 'pretendard',
    fontWeight: 'bold',
    fontSize: theme.textStyles?.title3?.fontSize,
    lineHeight: theme.textStyles?.title3?.lineHeight,
  },
}));
