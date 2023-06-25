import { View } from 'react-native';
import React from 'react';

import Icon from '@shared/components/icon/Icon';
import Font from '@shared/components/font/Font';
import { IDisplay, IDisplayIcon } from './type';
import useStyles from './style';

function DisplayIcon({ name }: IDisplayIcon) {
  const { icon, cIcon } = useStyles();

  return (
    <View style={cIcon}>
      <Icon name={name} size={icon.size} color={icon.color} />
    </View>
  );
}

export default function Display({
  name,
  children,
  disabled = false,
}: IDisplay) {
  const { cDisplay: contianer, font } = useStyles(disabled);

  return (
    <View style={contianer}>
      {disabled ? null : <DisplayIcon name={name} />}
      <Font style={font} bold>
        {children}
      </Font>
    </View>
  );
}
