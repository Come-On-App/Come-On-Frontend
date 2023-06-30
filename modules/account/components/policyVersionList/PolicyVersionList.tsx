import React from 'react';
import { View } from 'react-native';

import PolicyInfo from '../policyInfo/PolicyInfo';
import { IpolicyInfo } from '../policyInfo/type';

const list: IpolicyInfo[] = [
  {
    title: '약관 및 정책',
  },
  {
    title: '현재 버전 2.0.0',
    showIcon: false,
  },
];

export default function PolicyVersionList() {
  return (
    <View>
      {list.map(({ title, onPress, showIcon }) => (
        <PolicyInfo
          title={title}
          onPress={onPress}
          showIcon={showIcon}
          key={title}
        />
      ))}
    </View>
  );
}
