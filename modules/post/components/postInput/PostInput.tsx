import React, { forwardRef, useEffect, useState } from 'react';
import { View } from 'react-native';

import { ScreenTitle } from '@shared/components/font/Font';
import TextLengthCounter from '@shared/components/textLengthCounter/TextLengthCounter';
import Input from '@shared/components/input/Input';
import { EMPTY_STRING, truncateText } from '@shared/utils';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ContentHeader from '@shared/components/layout/ContentHeader';
import { RNEInputRef } from '@shared/components/input/type';
import useStyles from './style';
import { IPostInput } from './type';

const PostInput = forwardRef<RNEInputRef, IPostInput>(
  (
    {
      title,
      errorMessage,
      placeholder,
      lengthMax,
      onInput,
      isDataLoading,
      multiline,
      prevPayload,
      inputStyle,
      dividerPosition,
      onSubmitEditing,
      returnKeyType,
      blurOnSubmit,
    },
    ref,
  ) => {
    const { top, screenLayout } = useStyles();
    const [input, setInput] = useState(EMPTY_STRING);
    const textTruncator = truncateText(lengthMax);
    const onChnageHandler = (text: string) => {
      const truncatedText = textTruncator(text);

      setInput(truncatedText);
      onInput(truncatedText);
    };

    useEffect(() => {
      if (prevPayload) setInput(prevPayload);
    }, [prevPayload]);

    return (
      <DividerWrapper position={dividerPosition}>
        <ScreenLayout containerStyle={screenLayout}>
          <ContentHeader>
            <View style={top}>
              <ScreenTitle>{title}</ScreenTitle>
              <TextLengthCounter text={input} max={lengthMax} />
            </View>
          </ContentHeader>
          <Input
            blurOnSubmit={blurOnSubmit}
            ref={ref}
            onSubmitEditing={onSubmitEditing}
            multiline={multiline}
            disabled={isDataLoading}
            text={input}
            placeholder={placeholder}
            onChangeText={onChnageHandler}
            errorMessage={errorMessage}
            inputStyle={[inputStyle, multiline && { alignSelf: 'flex-start' }]}
            returnKeyType={returnKeyType}
          />
        </ScreenLayout>
      </DividerWrapper>
    );
  },
);

export default PostInput;
