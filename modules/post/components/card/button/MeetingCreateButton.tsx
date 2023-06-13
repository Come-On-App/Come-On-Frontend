import { View } from 'react-native';
import React from 'react';

import TestId from '@shared/constants/testIds';
import IconButton from '@shared/components/button/IconButton';
import { useNavigation } from '@react-navigation/native';
import { postListNavigationProps } from '@post/navigation/type';
import useStyles from './style';

export default function MeetingCreateButton() {
  const navigation = useNavigation<postListNavigationProps>();
  const {
    buttonIcon: { color, size },
    cButtonIcon,
  } = useStyles();
  const onPressHandler = () => {
    navigation.navigate('MeetingPostCreation');
  };

  return (
    <View testID={TestId.post.button.create} style={cButtonIcon}>
      <IconButton
        onPress={onPressHandler}
        name="add"
        color={color}
        size={size}
      />
    </View>
  );
}
