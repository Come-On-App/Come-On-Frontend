import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

import Input from '@shared/components/input/Input';
import IconButton from '@shared/components/button/IconButton';
import TextLengthCounter from '@shared/components/textLengthCounter/TextLengthCounter';
import Font from '@shared/components/font/Font';
import { invert } from '@shared/utils';
import useStyles from './style';
import { InickName, IrenderIcon } from './type';

const LOADING_PLACEHOLDER = '닉네임 불러오는 중';
const NICKNAME_TITLE = '닉네임';
const MAX_TEXT_LENGTH = 20;

export default function NickName({ name, isLoaindg }: InickName) {
  const { nickNameTitleFont, labelContainer } = useStyles();
  const [nickName, setNickName] = useState(name);

  useEffect(() => {
    if (!isLoaindg) {
      setNickName(name);
    }
  }, [isLoaindg, name]);

  return (
    <View>
      <Input
        disabled={isLoaindg}
        text={nickName}
        onChangeText={setNickName}
        placeholder={isLoaindg ? LOADING_PLACEHOLDER : name}
        maxLength={MAX_TEXT_LENGTH}
        rightIcon={
          <RenderIcon
            currentInput={nickName}
            prevName={name}
            onPressRefresh={() => setNickName(name)}
            onPressSubmit={() => setNickName(name)}
          />
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

/**
 * 문자열 상태에 따라서 아이콘의 렌더링을 결정한다.
 */
function RenderIcon({
  currentInput,
  prevName,
  onPressRefresh,
  onPressSubmit,
}: IrenderIcon) {
  const { iconButton } = useStyles();
  const isNotEmpty = invert(isEmpty(currentInput.trim()));
  const isDifferentInput = currentInput !== prevName;
  const isShowIcon = isNotEmpty && isDifferentInput;

  if (isShowIcon) {
    return (
      <IconButton
        name="edit"
        size={iconButton.fontSize}
        color={iconButton.color}
        onPress={onPressSubmit}
      />
    );
  }

  if (isDifferentInput) {
    return (
      <IconButton
        name="refresh"
        size={iconButton.fontSize}
        color={iconButton.color}
        onPress={onPressRefresh}
      />
    );
  }

  return undefined;
}
