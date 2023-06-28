import { View } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';

import TestId from '@shared/constants/testIds';
import CodeField from '@shared/components/input/CodeField';
import { createLengthValidator, validateCode } from '@shared/utils/utils';
import useStyles from './style';

const CELL_COUNT = 6;
const INIT_CODE = '';
const isZeroLength = createLengthValidator(0);

interface IentranceInput {
  code: string;
  dispatch: Dispatch<SetStateAction<string>>;
}
export default function EntranceInput({ code, dispatch }: IentranceInput) {
  const { font, cCodeField } = useStyles();
  const onChnageHandler = (currentInput: string) => {
    if (validateCode(currentInput)) {
      dispatch(currentInput.toUpperCase());
    }

    // 마지막 텍스트 제거
    if (isZeroLength(currentInput)) {
      dispatch(INIT_CODE);
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
