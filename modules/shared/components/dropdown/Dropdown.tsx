import React, { memo } from 'react';
import { Dropdown as RNDropdown } from 'react-native-element-dropdown';

import useStyles from './style';
import { IDropdown } from './type';

const AUTO_SCROLL_DISABLE = false;
const FONT_FAMILY = 'Pretendard-SemiBold';
const [LABEL_FIELD, KEY_FIELD] = ['label', 'key'] as const;

function Dropdown({ list, placeholder, onChange, value }: IDropdown) {
  const style = useStyles();

  return (
    <RNDropdown
      autoScroll={AUTO_SCROLL_DISABLE}
      value={value}
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

export default memo(Dropdown);
