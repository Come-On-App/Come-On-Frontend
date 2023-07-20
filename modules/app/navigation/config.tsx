import React from 'react';
import Avatar from '@shared/components/avatar/Avatar';

import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { relativeSizeConverter } from '@shared/utils';
import createTabBarLabel from '@app/components/tabBarLabel/TabBarLabel';
import createTabBarIcon from '../components/tabBarIcon/TabBarIcon';

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
  },
  [Tab.three]: {
    tabBarLabel: createTabBarLabel('마이페이지'),
    tabBarIcon: () => {
      const AVATAR_SIZE = 32;

      return (
        <Avatar
          path="https://picsum.photos/200/300"
          size={relativeSizeConverter(AVATAR_SIZE)}
        />
      );
    },
  },
} as const;
