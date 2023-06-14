import { View, Pressable } from 'react-native';
import React from 'react';

import useStyles from './style';
import Icon from '../icon/Icon';
import Font from '../font/Font';
import { IpressableInput } from './type';

const defaultIconSize = 20;
const defaultFontSize = 14;

export default function PressableInput({
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
        <Icon name={icon.name} color={icon.color} size={defaultIconSize} />
      </View>
    );
  }

  return (
    <Pressable testID={testID} onPress={onPress}>
      <View style={[cPressableInput, containerStyle]}>
        <View style={cPressableInnerInput}>
          {IconComponent}
          <Font style={{ fontSize: defaultFontSize, color: fontColor }}>
            {text}
          </Font>
        </View>
      </View>
    </Pressable>
  );
}
