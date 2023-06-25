import React from 'react';
import { View } from 'react-native';

import Font from '@shared/components/font/Font';
import Icon from '@shared/components/icon/Icon';
import { Divider } from '@rneui/themed';
import { formatDateRange } from '@shared/utils/utils';
import useStyles from './style';
import { IsubTitle } from './type';

export default function SubTitle({ userName, range }: IsubTitle) {
  const { cSubTitle, subTitleIcon, subTitleFont, divider, dividerBorder } =
    useStyles();

  return (
    <View style={cSubTitle}>
      <Icon
        name="account-circle"
        size={subTitleIcon.size}
        color={subTitleIcon.color}
      />
      <Font style={subTitleFont}>{userName}</Font>
      <Divider
        orientation="vertical"
        color={dividerBorder.color}
        width={dividerBorder.width}
        style={divider}
      />
      <Icon
        name="date-range"
        size={subTitleIcon.size}
        color={subTitleIcon.color}
      />
      <Font style={subTitleFont}>{formatDateRange(range)}</Font>
    </View>
  );
}
