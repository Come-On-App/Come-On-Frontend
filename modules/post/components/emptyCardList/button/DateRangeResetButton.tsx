import { View } from 'react-native';
import React from 'react';

import Button from '@shared/components/button/Button';

import useSearchManagement from '@post/hooks/useSearchManagement';
import useStyles from './style';

const TITLE = '모든 게시물 조회하기';

export default function DateRangeResetButton() {
  const { initSearchState } = useSearchManagement();
  const { container } = useStyles();
  const onPressHandler = () => {
    initSearchState();
  };

  return (
    <View style={container}>
      <Button bold title={TITLE} onPress={onPressHandler} />
    </View>
  );
}
