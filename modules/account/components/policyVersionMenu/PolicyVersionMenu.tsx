import React from 'react';
import { View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Toast from 'react-native-toast-message';
import * as Updates from 'expo-updates';

import { useNavigation } from '@react-navigation/native';
import { PolicyNavigation } from '@account/navigation/type';
import PolicyInfo from '../policyInfo/PolicyInfo';
import { IpolicyInfo } from '../policyInfo/type';

const TOAST_CONFIG_UPDATE_SUCCESS = {
  type: 'success',
  text1: '수동 버전 업데이트를 성공하였습니다.',
};
const TOAST_CONFIG_UPDATE_FAIL = (error: unknown) => {
  return {
    type: 'error',
    text1: `Error fetching latest Expo update: ${error}`,
  };
};

export default function PolicyVersionMenu() {
  const navigation = useNavigation<PolicyNavigation>();
  const list: IpolicyInfo[] = [
    {
      title: '서비스 공식 페이지',
      iconName: 'language',
      onPress: async () => {
        const OFFICIAL_PAGE = 'https://jeongbaebang.com/come-on/';

        await WebBrowser.openBrowserAsync(OFFICIAL_PAGE);
      },
    },
    {
      title: '앱 피드백 & 기능 요청',
      iconName: 'language',
      onPress: async () => {
        const OFFICIAL_PAGE =
          'https://jeongbaebang.com/2023/10/14/%EC%95%B1-%ED%94%BC%EB%93%9C%EB%B0%B1-%EA%B8%B0%EB%8A%A5-%EC%9A%94%EC%B2%AD/';

        await WebBrowser.openBrowserAsync(OFFICIAL_PAGE);
      },
    },
    {
      title: '약관 및 정책',
      onPress: () => navigation.navigate('Policy', { screen: 'PolicyPages' }),
    },
    {
      title: '현재 버전 2.0.0 (u-1)',
      showIcon: false,
      onPress: async () => {
        try {
          const update = await Updates.checkForUpdateAsync();

          if (update.isAvailable) {
            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();
            Toast.show(TOAST_CONFIG_UPDATE_SUCCESS);
          }
        } catch (error) {
          Toast.show(TOAST_CONFIG_UPDATE_FAIL(error));
        }
      },
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
