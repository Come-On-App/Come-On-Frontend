import { View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { Input as RNInput } from '@rneui/themed';
import usePlannerManagement from '@post/hooks/usePlannerManagementByStatus';

import useStyles from './style';
import { ITitle } from './type';

export default function Title({
  metaData: { fieldType, label, itemKey },
  onFocus,
}: ITitle) {
  const style = useStyles();
  const [currentLabel, updateLabel] = useState(label);
  const { dispatchUpdateField } = usePlannerManagement();

  useEffect(() => {
    if (currentLabel === label) return;

    dispatchUpdateField({ label: currentLabel, itemKey });
  }, [currentLabel, dispatchUpdateField, itemKey, label]);

  return (
    <View style={style.inputOuterContainer}>
      <RNInput
        onFocus={onFocus}
        label={fieldType}
        value={currentLabel}
        onChangeText={updateLabel}
        containerStyle={style.inputContainer}
        inputStyle={style.inputFont}
        errorStyle={style.inputError}
        inputContainerStyle={style.inputInnerContainer}
        labelStyle={style.labelFont}
      />
    </View>
  );
}
