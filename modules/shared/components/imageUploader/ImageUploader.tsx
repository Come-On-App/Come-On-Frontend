import React from 'react';
import { ActivityIndicator, Pressable } from 'react-native';

import Icon from '@shared/components/icon/Icon';
import Font from '@shared/components/font/Font';
import { Image } from '@rneui/themed';
import useStyles from './style';
import { IimageUploader } from './type';

export default function ImageUploader({
  onPress,
  description,
  uri,
  isLoading,
  iconName = 'camera-alt',
}: IimageUploader) {
  const { wrap, imageUploader, font, icon } = useStyles();

  if (isLoading) {
    return (
      <Image
        accessibilityHint="loading"
        source={{ uri: undefined }}
        PlaceholderContent={<ActivityIndicator />}
        style={wrap}
      />
    );
  }

  if (!isLoading && uri) {
    return <Image source={{ uri }} onPress={onPress} style={wrap} />;
  }

  return (
    <Pressable onPress={onPress} style={[wrap, imageUploader]}>
      <Icon name={iconName} size={icon.size} color={icon.color} />
      <Font style={font}>{description}</Font>
    </Pressable>
  );
}
