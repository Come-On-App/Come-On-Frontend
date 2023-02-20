import React, { useState } from 'react';
import { makeStyles, Text } from '@rneui/themed';
import { Keyboard, Platform, View } from 'react-native';
import {
  Cursor,
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { getSize } from '@utils/fn';
import { requestMeetingJoin } from '@api/meeting/meetings';
import { promiseFlow } from '@utils/promise';
import { ErrorMeetingResponse } from '@type/api.meeting';
import { errorAlert, sucessAlert } from '@utils/alert';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabScreenNavigation } from '@type/navigation';
import type { CodeInputProps } from '@type/index';
import { invalidateQueries, QueryKeys } from '@api/queryClient';
import { Font } from './Font';
import Button from './buttons/Buttons';

export default function InviteCode() {
  const navigation = useNavigation<BottomTabScreenNavigation>();
  const successFn = () => {
    invalidateQueries([QueryKeys.meeting]);
    sucessAlert('가입 성공');
    navigation.navigate('TabOne');
  };
  const errorFn = (error: ErrorMeetingResponse) => {
    if (error.response.data.errorCode === 3000) {
      return errorAlert('이미 해당 모임에 가입하셨습니다.');
    }

    if (error.response.data.errorCode === 3001) {
      return errorAlert('입력한 입장코드와 일치하는 모임이 없습니다.');
    }

    throw error;
  };
  const [codeText, setCodeText] = useState('');
  const onPressHandler = async () => {
    promiseFlow({ entryCode: codeText }, [requestMeetingJoin], {
      onSuccess: successFn,
      onError: errorFn,
    });
  };

  return (
    <View>
      <CodeTitle />
      <CodeInput codeText={codeText} setCodeText={setCodeText} showKeyboard />
      <CodeButton codeText={codeText} onPress={onPressHandler} />
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
    if (getSize(text) === 0) {
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

function CodeButton({
  codeText,
  onPress,
}: {
  codeText: string;
  onPress: () => void;
}) {
  const styles = useStyles();
  const ENTER_TEXT = '입장하기';
  const MAX_NUM = 6;
  const isDisabled = getSize(codeText) !== MAX_NUM;

  return (
    <View style={styles.buttonContainer}>
      <Button
        bold
        disabled={isDisabled}
        text={ENTER_TEXT}
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
