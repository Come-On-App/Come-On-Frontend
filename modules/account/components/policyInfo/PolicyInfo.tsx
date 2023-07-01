import React from 'react';

import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import Font from '@shared/components/font/Font';
import Icon from '@shared/components/icon/Icon';
import { Pressable } from 'react-native';
import useStyles from './style';
import { IpolicyInfo, IpressedStyle } from './type';

export default function PolicyInfo({
  title,
  onPress,
  showIcon = true,
}: IpolicyInfo) {
  const { cContent, font, icon } = useStyles();
  const pressedStyle = ({ pressed }: IpressedStyle) => ({
    backgroundColor: pressed ? '#F5F5F5' : 'transparent',
  });

  return (
    <DividerWrapper width={1} position="bottom">
      <Pressable onPress={onPress} style={pressedStyle}>
        <ScreenLayout containerStyle={cContent}>
          <Font bold style={font}>
            {title}
          </Font>
          {showIcon ? (
            <Icon
              size={icon.fontSize}
              color={icon.color}
              name="arrow-forward-ios"
            />
          ) : null}
        </ScreenLayout>
      </Pressable>
    </DividerWrapper>
  );
}
