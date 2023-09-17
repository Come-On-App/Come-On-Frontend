import React from 'react';
import { View } from 'react-native';

import Button from '@shared/components/button/Button';
import { EMPTY_STRING, createLengthValidator } from '@shared/utils';
import useLoadingText from '@account/hooks/useLoadingText';
import useMeetingJoinMutation from '@connection/hooks/useMeetingJoinMutation';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigation } from '@app/navigation/type';
import { Tab } from '@app/navigation/config';
import useStyles from './style';
import { ICodeEntryButton } from './type';

const TITLE = '입장하기';
const LOADING_TEXT = '코드 조회';
const CELL_COUNT = 6;
const isSixLength = createLengthValidator(CELL_COUNT);

export default function CodeEntryButton({
  code,
  dispatch,
  codeDispatch,
}: ICodeEntryButton) {
  const { container } = useStyles();
  const isDisabled = !isSixLength(code);
  const { navigate } = useNavigation<BottomTabNavigation>();
  const { mutate, isLoading } = useMeetingJoinMutation(dispatch);
  const loadingText = useLoadingText(LOADING_TEXT, isLoading);
  const onPressHandler = () =>
    mutate(
      { entryCode: code },
      {
        onSuccess: () => {
          codeDispatch(EMPTY_STRING);
          navigate(Tab.one);
        },
      },
    );

  return (
    <View style={container}>
      <Button
        bold
        title={isLoading ? loadingText : TITLE}
        onPress={onPressHandler}
        disabled={isLoading || isDisabled}
      />
    </View>
  );
}
