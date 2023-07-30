import { View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { ScreenTitle } from '@shared/components/font/Font';
import TextLengthCounter from '@shared/components/textLengthCounter/TextLengthCounter';
import Input from '@shared/components/input/Input';
import { truncateText } from '@shared/utils';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ContentHeader from '@shared/components/layout/ContentHeader';
import useStyles from './style';
import { ImeetingNameInput } from './type';

export default function MeetingNameInput({
  title,
  placeholder,
  lengthMax,
  onInput,
  isLoad,
  prevMeetingName = '',
}: ImeetingNameInput) {
  const { top, screenLayout } = useStyles();
  const [input, setInput] = useState(prevMeetingName);
  const textTruncator = truncateText(lengthMax);
  const onChnageHandler = (text: string) => {
    setInput(textTruncator(text));
  };

  useEffect(() => {
    onInput(input);
  }, [onInput, input]);

  useEffect(() => {
    if (prevMeetingName) setInput(prevMeetingName);
  }, [prevMeetingName]);

  return (
    <DividerWrapper>
      <ScreenLayout containerStyle={screenLayout}>
        <ContentHeader>
          <View style={top}>
            <ScreenTitle>{title}</ScreenTitle>
            <TextLengthCounter text={input} max={lengthMax} />
          </View>
        </ContentHeader>
        <Input
          disabled={isLoad}
          text={input}
          placeholder={placeholder}
          onChangeText={onChnageHandler}
        />
      </ScreenLayout>
    </DividerWrapper>
  );
}
