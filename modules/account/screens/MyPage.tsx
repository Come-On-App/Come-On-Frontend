import React from 'react';
import { Text, View } from 'react-native';

import TestId from '@shared/constants/testIds';

function MyPage() {
  return (
    <View testID={TestId.account.myPage}>
      <Text>MyPage</Text>
    </View>
  );
}

export default MyPage;
