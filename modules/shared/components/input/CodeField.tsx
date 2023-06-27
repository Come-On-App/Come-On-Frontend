import { Text } from 'react-native';
import React from 'react';
import {
  CodeField as CodeInput,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import TestId from '@shared/constants/testIds';
import useStyles from './style';
import { IcodeField } from './type';

export default function CodeField({
  value,
  cellCount,
  setValue,
  fontStyle: font,
  cursorSymbol,
}: IcodeField) {
  const ref = useBlurOnFulfill({
    value,
    cellCount,
  });
  const [{ onPressOut }, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const { cCodeField, codeFieldFont } = useStyles();

  return (
    <CodeInput
      testID={TestId.shared.input.codeInput.field}
      ref={ref}
      onPressOut={onPressOut}
      value={value}
      onChangeText={setValue}
      cellCount={cellCount}
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => {
        const cursor = isFocused ? (
          <Cursor cursorSymbol={cursorSymbol} />
        ) : null;

        return (
          <Text
            key={index}
            testID={TestId.shared.input.codeInput.cell}
            onLayout={getCellOnLayoutHandler(index)}
            style={[cCodeField, codeFieldFont, font]}
          >
            {symbol || cursor}
          </Text>
        );
      }}
    />
  );
}
