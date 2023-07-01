import { View } from 'react-native';
import React, { useState } from 'react';

import { ScreenTitle } from '@shared/components/font/Font';
import TextLengthCounter from '@shared/components/textLengthCounter/TextLengthCounter';
import Input from '@shared/components/input/Input';
import { truncateText } from '@shared/utils/utils';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import useStyles from './style';

const TITLE = '모임 이름';
const placeholder = '모임 이름을 입력해 주세요!';
const LENGTH_MAX = 30;

export default function MeetingNameInput() {
  const { top, screenLayout } = useStyles();
  const [input, setInput] = useState('');
  const textTruncator = truncateText(LENGTH_MAX);
  const onChnageHandler = (text: string) => {
    setInput(textTruncator(text));
  };

  return (
    <DividerWrapper>
      <ScreenLayout containerStyle={screenLayout}>
        <View style={top}>
          <ScreenTitle>{TITLE}</ScreenTitle>
          <TextLengthCounter text={input} max={LENGTH_MAX} />
        </View>
        <Input
          text={input}
          placeholder={placeholder}
          onChangeText={onChnageHandler}
        />
      </ScreenLayout>
    </DividerWrapper>
  );
}
