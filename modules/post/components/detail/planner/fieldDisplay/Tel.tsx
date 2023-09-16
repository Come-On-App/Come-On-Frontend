import { View, Pressable } from 'react-native';
import React from 'react';

import Icon from '@shared/components/icon/Icon';
import Font from '@shared/components/font/Font';
import { StyledDivider } from '@shared/components/layout/DividerWrapper';
import {
  handleLinking,
  isPhoneNumber,
} from '../customField/field/util/inputFieldUtils';
import { ContentField } from './type';
import useStyles from './style';

const DIVIDER_WIDTH = 2;
const LINKING_TYPE = 'tel';

export default function Tel({ content }: ContentField) {
  const isValidPhoneNumber = isPhoneNumber(content);
  const { container, fontContainer, icon, telfont } =
    useStyles(isValidPhoneNumber);
  const iconType = isValidPhoneNumber ? 'phone' : 'phone-disabled';
  const makePhoneCall = () => {
    handleLinking(LINKING_TYPE, content, isPhoneNumber);
  };

  return (
    <Pressable onPress={makePhoneCall} style={container}>
      <Icon name={iconType} size={icon.size} color={icon.color} />
      <View style={fontContainer}>
        <Font style={telfont}>{content}</Font>
        <StyledDivider width={DIVIDER_WIDTH} />
      </View>
    </Pressable>
  );
}
