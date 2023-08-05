import { View, Pressable } from 'react-native';
import React from 'react';

import { applyRelativeSizes } from '@shared/utils';
import useStyles from './style';
import Icon from '../icon/Icon';
import Font from '../font/Font';
import { IpressableInput } from './type';

const [DEFAULT_ICON_SIZE, DEFAULT_FONT_SIZE] = applyRelativeSizes({
  defaultIconSize: 20,
  defaultFontSize: 14,
});

export default function PressableInput({
  disabled,
  text,
  icon,
  testID,
  onPress,
  fontColor,
  containerStyle,
}: IpressableInput) {
  const { cPressableInput, cPressableInnerInput, cPressableInputIcon } =
    useStyles();
  let IconComponent: React.ReactNode;

  if (icon) {
    IconComponent = (
      <View style={cPressableInputIcon}>
        <Icon name={icon.name} color={icon.color} size={DEFAULT_ICON_SIZE} />
      </View>
    );
  }

  return (
    <Pressable testID={testID} onPress={onPress} disabled={disabled}>
      <View style={[cPressableInput, containerStyle]}>
        <View style={cPressableInnerInput}>
          {IconComponent}
          <Font style={{ fontSize: DEFAULT_FONT_SIZE, color: fontColor }}>
            {text}
          </Font>
        </View>
      </View>
    </Pressable>
  );
}
