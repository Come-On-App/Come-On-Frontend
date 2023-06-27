import { View } from 'react-native';
import React, { useState } from 'react';

import TestId from '@shared/constants/testIds';
import CodeField from '@shared/components/input/CodeField';
import { isZeroLength, validateCode } from '@shared/utils/utils';
import useStyles from './style';

const CELL_COUNT = 6;
const INIT_CODE = '';

export default function EntranceInput() {
  const { font, cCodeField } = useStyles();
  const [code, setCode] = useState(INIT_CODE);
  const onChnageHandler = (currentInput: string) => {
    if (validateCode(currentInput)) {
      setCode(currentInput.toUpperCase());
    }

    // 마지막 텍스트 제거
    if (isZeroLength(currentInput)) {
      setCode(INIT_CODE);
    }
  };

  return (
    <View testID={TestId.connection.codeField} style={cCodeField}>
      <CodeField
        cellCount={CELL_COUNT}
        value={code}
        setValue={onChnageHandler}
        fontStyle={font}
      />
    </View>
  );
}
