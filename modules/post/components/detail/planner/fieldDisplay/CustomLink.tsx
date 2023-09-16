import { Pressable, View } from 'react-native';
import React from 'react';

import Icon from '@shared/components/icon/Icon';
import Font from '@shared/components/font/Font';
import { StyledDivider } from '@shared/components/layout/DividerWrapper';
import {
  handleLinking,
  isUrl,
} from '../customField/field/util/inputFieldUtils';
import { ContentField } from './type';
import useStyles from './style';

const DIVIDER_WIDTH = 2;
const FONT_LINES = 1;
const LINKING_TYPE = 'https';

export default function CustomLink({ content }: ContentField) {
  const isValidUrl = isUrl(content);
  const { icon, container, linkContainer, linkFont } = useStyles(isValidUrl);
  const iconType = isUrl(content) ? 'link' : 'link-off';
  const handleOpenURL = () => {
    handleLinking(LINKING_TYPE, content, isUrl);
  };

  return (
    <Pressable onPress={handleOpenURL} style={container}>
      <Icon name={iconType} size={icon.size} color={icon.color} />
      <View style={linkContainer}>
        <Font numberOfLines={FONT_LINES} style={linkFont}>
          {content}
        </Font>
        <StyledDivider width={DIVIDER_WIDTH} />
      </View>
    </Pressable>
  );
}
