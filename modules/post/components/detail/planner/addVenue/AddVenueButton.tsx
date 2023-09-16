import { Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Font from '@shared/components/font/Font';
import TestId from '@shared/constants/testIds';
import Icon from '@shared/components/icon/Icon';
import { PostDetailNavigation } from '@post/navigation/type';
import useDetailManagement from '@post/hooks/useDetailManagement';
import useStyles from './style';

const DESCRIPTION = '새로운 모임 카드를 추가해 보세요!';

export default function AddVenue() {
  const { container, font, icon } = useStyles();
  const { dispatchPostStatus } = useDetailManagement();
  const navigation = useNavigation<PostDetailNavigation<'PostDetail'>>();

  return (
    <Pressable
      testID={TestId.post.button.addVenue}
      style={container}
      onPress={() => {
        dispatchPostStatus('CREATE');
        navigation.navigate('PostDetailPlanner');
      }}
    >
      <Icon name="place" size={icon.size} color={icon.color} />
      <Font style={font}>{DESCRIPTION}</Font>
    </Pressable>
  );
}
