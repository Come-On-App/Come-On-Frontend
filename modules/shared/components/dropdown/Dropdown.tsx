import React from 'react';
import { Dropdown as RNDropdown } from 'react-native-element-dropdown';

import useStyles from './style';
import { IDropdown } from './type';

const FONT_FAMILY = 'Pretendard-SemiBold';
const [LABEL_FIELD, KEY_FIELD] = ['label', 'key'] as const;

export default function Dropdown({ list, placeholder, onChange }: IDropdown) {
  const style = useStyles();

  return (
    <RNDropdown
      data={list}
      labelField={LABEL_FIELD}
      valueField={KEY_FIELD}
      placeholder={placeholder}
      onChange={onChange}
      style={style.dropdown}
      selectedTextStyle={style.dropdwonSelectedText}
      placeholderStyle={style.dropdwonPlaceholder}
      containerStyle={style.dropdwonContainer}
      itemTextStyle={style.dropdwonItemText}
      fontFamily={FONT_FAMILY}
    />
  );
}
