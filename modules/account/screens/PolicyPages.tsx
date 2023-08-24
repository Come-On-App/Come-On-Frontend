import { View } from 'react-native';
import React from 'react';

import { IpolicyInfo } from '@account/components/policyInfo/type';
import PolicyInfo from '@account/components/policyInfo/PolicyInfo';
import { useNavigation } from '@react-navigation/native';
import { PolicyNavigation } from '@account/navigation/type';

export default function PolicyPages() {
  const navigation = useNavigation<PolicyNavigation>();
  const list: IpolicyInfo[] = [
    {
      title: '이용약관',
      iconName: 'library-books',
      onPress: () => navigation.navigate('Policy', { screen: 'TermsOfUse' }),
    },
    {
      title: '개인정보처리방침',
      iconName: 'library-books',
      onPress: () => navigation.navigate('Policy', { screen: 'PrivacyPolicy' }),
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
