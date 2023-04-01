import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type {
  PlaceSelectParamList,
  RootStackParamList,
  RootTabParamList,
} from '@type/navigation';

import fn from '@utils/fn';
import { Skeleton, makeStyles } from '@rneui/themed';
import { MeetingMode } from '@features/meetingSlice';

import useAuth from '@hooks/useAuth';
import useUserQuery from '@hooks/query/useUserQuery';
import { useWebSocketConnect } from '@hooks/useWebSocket';

import MeetingDetail from '@screens/meeting/detail';
import PlaceSelect from '@screens/place/Select';
import PlaceSearch from '@screens/place/Search';
import CreateMeeting from '@screens/CreateMeeting';
import CreateMeetingCalender from '@screens/CreateMeetingCalender';
import MeetingRoomCalendar from '@screens/MeetingRoomCalendar';
import LoginScreen from '@screens/LoginScreen';
import TabOneScreen from '@screens/bottomTap/TabOneScreen';
import TabThreeScreen from '@screens/bottomTap/TabThreeScreen';
import TabTwoScreen from '@screens/bottomTap/TabTwoScreen';

import CancelIconButton, {
  CancelPlaceSelectIconButton,
} from '@components/button/CancelIconButton';
import Avatar from '@components/member/Avatar';
import { createTabBarIcon } from '@components/Icon';
import LogoutButton from '@components/myPage/MyPageLogoutButton';
import MyPageHeaderTitle from '@components/myPage/MyPageHeaderTitle';
import PlaceSelectHeaderTitle from '@components/placeSelect/PlaceSelectHeaderTitle';

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
  const { isAuth: isLogin, autoLogin, accessToken } = useAuth();
  const styles = useStyles();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  useEffect(() => {
    if (!accessToken) return;

    setToken(accessToken.token);
  }, [accessToken]);

  useWebSocketConnect(token);

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
              contentStyle: styles.background,
            }}
          />
          <Stack.Screen
            name="CreateMeeting"
            component={CreateMeeting}
            initialParams={{ mode: MeetingMode.create }}
            options={() => ({
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
            options={() => ({
              title: '모임등록',
              headerTitleAlign: 'center',
              headerTitleStyle: styles.headerStyle,
              headerRight: CancelIconButton,
              headerBackVisible: false,
            })}
          />
          <Stack.Screen
            name="MeetingRoomCalendar"
            component={MeetingRoomCalendar}
            options={() => ({
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
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={() => ({
            headerShown: false,
            contentStyle: styles.background,
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
    </BottomTab.Navigator>
  );
}

const useStyles = makeStyles(theme => ({
  background: {
    backgroundColor: theme.grayscale['0'],
  },
  headerStyle: {
    fontFamily: 'pretendard-regular',
    fontWeight: 'bold',
    fontSize: theme.textStyles.title3.fontSize,
    lineHeight: theme.textStyles.title3.lineHeight,
  },
}));
