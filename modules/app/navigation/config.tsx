import React from 'react';
import Avatar from '@shared/components/avatar/Avatar';

import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { applyRelativeSizes, relativeSizeConverter } from '@shared/utils';
import createTabBarLabel from '@app/components/tabBarLabel/TabBarLabel';
import useMyInfoQuery from '@account/hooks/useMyInfoQuery';
import createTabBarIcon from '../components/tabBarIcon/TabBarIcon';

const [TAB_BAR_HEIGHT, TAB_BAR_PADDING_BOTTOM] = applyRelativeSizes({
  tabBarHeight: 75,
  tabBarPaddingBottom: 20,
});

export const bottomTabStyle = {
  height: TAB_BAR_HEIGHT,
  paddingBottom: TAB_BAR_PADDING_BOTTOM,
};

export enum Tab {
  one = 'TabOne',
  two = 'TabTwo',
  three = 'TabThree',
}

export const options: {
  [key in Tab]: BottomTabNavigationOptions;
} = {
  [Tab.one]: {
    tabBarLabel: createTabBarLabel('모임 관리'),
    tabBarIcon: createTabBarIcon('groups'),
  },
  [Tab.two]: {
    tabBarLabel: createTabBarLabel('모임 입장'),
    tabBarIcon: createTabBarIcon('meeting-room'),
    tabBarHideOnKeyboard: false,
  },
  [Tab.three]: {
    tabBarLabel: createTabBarLabel('마이페이지'),
    tabBarIcon: TabThreeIcon,
  } as const,
};

function TabThreeIcon() {
  const AVATAR_SIZE = 32;
  const { data, isLoading } = useMyInfoQuery();

  return (
    <Avatar
      isLoading={isLoading}
      path={data?.profileImageUrl}
      size={relativeSizeConverter(AVATAR_SIZE)}
    />
  );
}
