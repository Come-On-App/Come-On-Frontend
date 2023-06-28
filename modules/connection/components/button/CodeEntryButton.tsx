import React from 'react';
import { View } from 'react-native';

import Button from '@shared/components/button/Button';
import { createLengthValidator } from '@shared/utils/utils';
import useStyles from './style';

const TITLE = '입장하기';
const CELL_COUNT = 6;
const isSixLength = createLengthValidator(CELL_COUNT);

export default function CodeEntryButton({ code }: { code: string }) {
  const { container } = useStyles();
  const isDisabled = !isSixLength(code);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onPressHandler = () => {};

  return (
    <View style={container}>
      <Button
        bold
        title={TITLE}
        onPress={onPressHandler}
        disabled={isDisabled}
      />
    </View>
  );
}
