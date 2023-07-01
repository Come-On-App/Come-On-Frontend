import { View } from 'react-native';
import React, { useState } from 'react';

import Input from '@shared/components/input/Input';
import IconButton from '@shared/components/button/IconButton';
import TextLengthCounter from '@shared/components/textLengthCounter/TextLengthCounter';
import Font from '@shared/components/font/Font';
import useStyles from './style';
import { InickName } from './type';

const NICKNAME_TITLE = '닉네임';
const MAX_TEXT_LENGTH = 20;

export default function NickName({ name }: InickName) {
  const { iconButton, nickNameTitleFont, labelContainer } = useStyles();
  const [nickName, setNickName] = useState(name);
  // 아이콘 버튼 이벤트 핸들러
  const onPressHandler = () => {
    console.log('clicked icon button!');
  };

  return (
    <View>
      <Input
        text={nickName}
        onChangeText={setNickName}
        placeholder={name}
        maxLength={MAX_TEXT_LENGTH}
        rightIcon={
          nickName !== name ? (
            <IconButton
              name="edit"
              size={iconButton.fontSize}
              color={iconButton.color}
              onPress={onPressHandler}
            />
          ) : undefined
        }
        label={
          <View style={labelContainer}>
            <Font bold style={nickNameTitleFont}>
              {NICKNAME_TITLE}
            </Font>
            <TextLengthCounter text={nickName} max={MAX_TEXT_LENGTH} />
          </View>
        }
      />
    </View>
  );
}
