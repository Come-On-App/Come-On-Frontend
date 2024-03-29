import React from 'react';

import TestId from '@shared/constants/testIds';
import { useNavigation } from '@react-navigation/native';
import { PostNavigation } from '@post/navigation/type';
import { StyledIconButton } from '@shared/components/button/Button';

export default function MeetingCreateButton() {
  const navigation = useNavigation<PostNavigation<'MeetingPostCreation'>>();
  const onPressHandler = () => {
    navigation.navigate('MeetingPostCreation');
  };

  return (
    <StyledIconButton
      testID={TestId.post.button.create}
      onPress={onPressHandler}
    />
  );
}
