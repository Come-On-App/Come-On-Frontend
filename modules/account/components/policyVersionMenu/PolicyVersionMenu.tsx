import React from 'react';
import { View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import { useNavigation } from '@react-navigation/native';
import { PolicyNavigation } from '@account/navigation/type';
import PolicyInfo from '../policyInfo/PolicyInfo';
import { IpolicyInfo } from '../policyInfo/type';

export default function PolicyVersionMenu() {
  const navigation = useNavigation<PolicyNavigation>();
  const list: IpolicyInfo[] = [
    {
      title: '서비스 공식 페이지',
      iconName: 'language',
      onPress: async () => {
        const OFFICIAL_PAGE = 'https://comeonmobile.tistory.com/1';

        await WebBrowser.openBrowserAsync(OFFICIAL_PAGE);
      },
    },
    {
      title: '앱 피드백 & 기능 요청',
      iconName: 'language',
      onPress: async () => {
        const OFFICIAL_PAGE = 'https://comeonmobile.tistory.com/3';

        await WebBrowser.openBrowserAsync(OFFICIAL_PAGE);
      },
    },
    {
      title: '약관 및 정책',
      onPress: () => navigation.navigate('Policy', { screen: 'PolicyPages' }),
    },
    {
      title: '현재 버전 2.0.0',
      showIcon: false,
    },
  ];

  return (
    <View>
      {list.map(({ title, onPress, showIcon, iconName }) => (
        <PolicyInfo
          title={title}
          onPress={onPress}
          showIcon={showIcon}
          key={title}
          iconName={iconName}
        />
      ))}
    </View>
  );
}
