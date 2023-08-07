import { View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { ScreenTitle } from '@shared/components/font/Font';
import TextLengthCounter from '@shared/components/textLengthCounter/TextLengthCounter';
import Input from '@shared/components/input/Input';
import { EMPTY_STRING, truncateText } from '@shared/utils';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ContentHeader from '@shared/components/layout/ContentHeader';
import useStyles from './style';
import { ImeetingNameInput } from './type';

export default function PostInput({
  title,
  placeholder,
  lengthMax,
  onInput,
  isDataLoading,
  multiline,
  prevMeetingName,
}: ImeetingNameInput) {
  const { top, screenLayout } = useStyles();
  const [input, setInput] = useState(EMPTY_STRING);
  const textTruncator = truncateText(lengthMax);
  const onChnageHandler = (text: string) => {
    const truncatedText = textTruncator(text);

    setInput(truncatedText);
    onInput(truncatedText);
  };

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
          multiline={multiline}
          disabled={isDataLoading}
          text={input}
          placeholder={placeholder}
          onChangeText={onChnageHandler}
        />
      </ScreenLayout>
    </DividerWrapper>
  );
}
