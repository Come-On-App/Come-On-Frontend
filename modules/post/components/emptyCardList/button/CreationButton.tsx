import { View } from 'react-native';
import React from 'react';

import Button from '@shared/components/button/Button';
import { useNavigation } from '@react-navigation/native';
import { PostNavigation } from '@post/navigation/type';
import useStyles from './style';

const TITLE = '모임 등록하러 가기';

export default function CreationButton() {
  const { container } = useStyles();
  const navigation = useNavigation<PostNavigation<'MeetingPostCreation'>>();
  const onPressHandler = () => {
    navigation.navigate('MeetingPostCreation');
  };

  return (
    <View style={container}>
      <Button bold title={TITLE} onPress={onPressHandler} />
    </View>
  );
}
