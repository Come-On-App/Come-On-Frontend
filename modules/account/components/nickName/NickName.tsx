import { ActivityIndicator, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

import Input from '@shared/components/input/Input';
import IconButton from '@shared/components/button/IconButton';
import TextLengthCounter from '@shared/components/textLengthCounter/TextLengthCounter';
import Font from '@shared/components/font/Font';
import { EMPTY_STRING, invert } from '@shared/utils';
import useUserManagement from '@account/hooks/useUserManagement';
import { useQueryDataByUser } from '@account/hooks/useMyInfoQuery';
import useMyInfoMutation from '@account/hooks/useMyInfoMutation';
import useStyles from './style';
import { IrenderIcon } from './type';

const LOADING_PLACEHOLDER = '닉네임 불러오는 중';
const NICKNAME_TITLE = '닉네임';
const MAX_TEXT_LENGTH = 20;

export default function NickName() {
  const { nickNameTitleFont, labelContainer } = useStyles();
  const {
    userState: { isLoading },
  } = useUserManagement();
  const userQueryData = useQueryDataByUser();
  const name = userQueryData?.nickname ?? EMPTY_STRING;
  const { mutateUserNickname, isLoading: isSubmit } = useMyInfoMutation();
  const [currentInput, setNickName] = useState(name);

  useEffect(() => {
    if (!isLoading) setNickName(name);
  }, [isLoading, name]);

  return (
    <View>
      <Input
        disabled={isLoading || isSubmit}
        text={currentInput}
        onChangeText={setNickName}
        placeholder={isLoading ? LOADING_PLACEHOLDER : name}
        maxLength={MAX_TEXT_LENGTH}
        rightIcon={
          <RenderIcon
            isSubmit={isSubmit}
            prevName={name}
            currentInput={currentInput}
            onPressRefresh={() => setNickName(name)}
            onPressSubmit={() => mutateUserNickname(currentInput)}
          />
        }
        label={
          <View style={labelContainer}>
            <Font bold style={nickNameTitleFont}>
              {NICKNAME_TITLE}
            </Font>
            <TextLengthCounter text={currentInput} max={MAX_TEXT_LENGTH} />
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
  isSubmit,
}: IrenderIcon) {
  const { iconButton } = useStyles();
  const isNotEmpty = invert(isEmpty(currentInput.trim()));
  const isDifferentInput = currentInput !== prevName;
  const isShowIcon = isNotEmpty && isDifferentInput;

  if (isSubmit) return <ActivityIndicator />;

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
