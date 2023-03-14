import React, { useState } from 'react';
import { makeStyles, Text } from '@rneui/themed';
import { Keyboard, Platform, View } from 'react-native';
import {
  Cursor,
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { emptyString, getSize } from '@utils/fn';
import { requestMeetingJoin } from '@api/meeting/meetings';
import { usePromiseFlow } from '@utils/promise';
import {
  ErrorMeetingResponse,
  PostJoinPayload,
  PostJoinResponse,
} from '@type/api.meeting';
import { errorAlert, successAlert } from '@utils/alert';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabScreenNavigation } from '@type/navigation';
import type { CodeButtonProps, CodeInputProps, SetState } from '@type/index';
import { Font } from './Font';
import Button from './button/Buttons';

const config = {
  successText: '가입 성공',
  instructionText: '전달받은 코드를 입력해주세요',
  cursorSymbol: '🍕',
  cellCount: 6,
  entryText: '입장하기',
};

export default function InviteCode() {
  const { isLoading, promiseFlow } = usePromiseFlow<
    PostJoinPayload,
    PostJoinResponse
  >();
  const navigation = useNavigation<BottomTabScreenNavigation>();
  const [codeText, setCodeText] = useState(emptyString);
  const onPressHandler = () => {
    promiseFlow({ entryCode: codeText }, [requestMeetingJoin], {
      onSuccess: () => {
        setCodeText(emptyString);
        successAlert(config.successText);
        navigation.navigate('TabOne');
      },
      onError: (error: ErrorMeetingResponse) => {
        errorAlert(error.response.data.errorDescription);
      },
    });
  };

  return (
    <View>
      <CodeTitle />
      <CodeInput codeText={codeText} setCodeText={setCodeText} showKeyboard />
      <CodeButton
        codeText={codeText}
        onPress={onPressHandler}
        isLoading={isLoading}
      />
    </View>
  );
}

function CodeTitle() {
  const styles = useStyles();

  return (
    <View style={styles.titleContainer}>
      <Font style={styles.instructionText}>{config.instructionText}</Font>
    </View>
  );
}

const codeValidation = (stateAction: SetState<string>) => {
  return (text: string) => {
    const isEnglish = /^[a-zA-Z0-9]+$/.test(text);

    // 마지막 텍스트 제거
    if (getSize(text) === 0) {
      stateAction(emptyString);
    }

    stateAction(prevCode => (isEnglish ? text.toUpperCase() : prevCode));
  };
};

export function CodeInput(props: CodeInputProps) {
  const { style, codeText, setCodeText, showKeyboard } = props;
  const styles = useStyles();
  const ref = useBlurOnFulfill({
    value: codeText,
    cellCount: config.cellCount,
  });
  const [{ onPressOut }, getCellOnLayoutHandler] = useClearByFocusCell({
    value: codeText,
    setValue: setCodeText,
  });

  return (
    <View>
      <CodeField
        ref={ref}
        onPressOut={onPressOut}
        showSoftInputOnFocus={showKeyboard}
        onSubmitEditing={Keyboard.dismiss}
        value={codeText}
        onChangeText={codeValidation(setCodeText)}
        cellCount={config.cellCount}
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => {
          const cursor = isFocused ? (
            <Cursor cursorSymbol={config.cursorSymbol} />
          ) : null;

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
              {symbol || cursor}
            </Text>
          );
        }}
      />
    </View>
  );
}

function CodeButton({ codeText, onPress, isLoading }: CodeButtonProps) {
  const styles = useStyles();
  const isDisabled = getSize(codeText) !== config.cellCount;

  return (
    <View style={styles.buttonContainer}>
      <Button
        bold
        loading={isLoading}
        disabled={isDisabled}
        text={config.entryText}
        onPress={onPress}
        buttonStyle={styles.button}
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
    marginTop: 60,
    alignItems: 'center',
  },
  button: {
    width: 192,
    height: 56,
  },
}));
