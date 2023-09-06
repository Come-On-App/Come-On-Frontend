import { Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Font from '@shared/components/font/Font';
import TestId from '@shared/constants/testIds';
import Icon from '@shared/components/icon/Icon';
import { PostNativeStack } from '@post/navigation/type';
import useDetailManagement from '@post/hooks/useDetailManagement';
import useStyles from './style';

const DESCRIPTION = '새로운 장소를 추가해 보세요!';

export default function AddVenue() {
  const { container, font, icon } = useStyles();
  const { detailState } = useDetailManagement();
  const navigation =
    useNavigation<PostNativeStack<'MeetingPlanner'>['navigation']>();

  return (
    <Pressable
      testID={TestId.post.button.addVenue}
      style={container}
      onPress={() =>
        navigation.navigate('MeetingPlanner', { id: detailState.postId })
      }
    >
      <Icon name="place" size={icon.size} color={icon.color} />
      <Font style={font}>{DESCRIPTION}</Font>
    </Pressable>
  );
}
