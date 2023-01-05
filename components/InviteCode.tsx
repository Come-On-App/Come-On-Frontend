import React, { useState } from 'react';
import { Keyboard, Platform, View } from 'react-native';
import { Button, makeStyles, Text } from '@rneui/themed';
import {
  Cursor,
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import Font from './Font';
import { CodeInputProps } from '../types';

function InviteCode() {
  const [codeText, setCodeText] = useState('');

  return (
    <View>
      <CodeTitle />
      <CodeInput codeText={codeText} setCodeText={setCodeText} showKeyboard />
      <CodeButton />
    </View>
  );
}

function CodeTitle() {
  const styles = useStyles();
  const INSTRUCTION_TEXT = '전달받은 코드를 입력해주세요';

  return (
    <View style={styles.titleContainer}>
      <Font style={styles.instructionText}>{INSTRUCTION_TEXT}</Font>
    </View>
  );
}

export function CodeInput({
  style,
  codeText,
  setCodeText,
  showKeyboard,
}: CodeInputProps) {
  const CELL_COUNT = 6;
  const styles = useStyles();
  const ref = useBlurOnFulfill({ value: codeText, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: codeText,
    setValue: setCodeText,
  });
  const onChangeHandler = (text: string) => {
    const isEnglish = /^[a-zA-Z0-9]+$/.test(text);

    // 마지막 텍스트 제거
    if (text.length === 0) {
      setCodeText('');
    }

    setCodeText(prevCode => (isEnglish ? text.toUpperCase() : prevCode));
  };

  return (
    <View>
      <CodeField
        ref={ref}
        onPressOut={props.onPressOut}
        showSoftInputOnFocus={showKeyboard}
        onSubmitEditing={Keyboard.dismiss}
        value={codeText}
        onChangeText={onChangeHandler}
        cellCount={CELL_COUNT}
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => {
          return (
            <Text
              key={index}
              onLayout={getCellOnLayoutHandler(index)}
              style={[
                styles.codeCell,
                styles.codeText,
                isFocused && styles.codeFocusCell,
                style,
              ]}
            >
              {symbol || (isFocused ? <Cursor cursorSymbol="🍕" /> : null)}
            </Text>
          );
        }}
      />
    </View>
  );
}

function CodeButton() {
  const styles = useStyles();
  const ENTER_TEXT = '입장하기';

  return (
    <View>
      <Button
        title={ENTER_TEXT}
        radius={4}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  titleContainer: {
    marginBottom: 20,
  },
  instructionText: {
    color: theme.grayscale['900'],
    fontSize: theme.textStyles.title4.fontSize,
    lineHeight: theme.textStyles.title4.lineHeight,
    fontWeight: '400',
    textAlign: 'center',
  },
  codeCell: {
    overflow: Platform.OS === 'ios' ? 'hidden' : 'visible',
    backgroundColor: theme.grayscale['100'],
    borderRadius: 4,
    width: 50,
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    marginHorizontal: 2,
  },
  codeText: {
    fontFamily: 'pretendard-regular',
    fontSize: theme.textStyles.title1.fontSize,
    fontWeight: '400',
    color: theme.grayscale['900'],
  },
  codeFocusCell: {
    backgroundColor: theme.grayscale['200'],
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  button: {
    backgroundColor: theme.colors.primary,
    width: 192,
    height: 56,
  },
  buttonText: {
    fontFamily: 'pretendard-regular',
    fontSize: theme.textStyles.title4.fontSize,
    color: theme.grayscale['0'],
  },
}));

export default InviteCode;
