import React from 'react';
import { Pressable } from 'react-native';

import Icon from '@shared/components/icon/Icon';
import Font from '@shared/components/font/Font';
import { Image } from '@rneui/themed';
import { ImageSkeleton } from '@post/components/card/skeleton/Skeleton';
import useStyles from './style';
import { IimageUploader } from './type';

export default function ImageUploader({
  onPress,
  description,
  uri,
  isLoading,
  iconName = 'camera-alt',
}: IimageUploader) {
  const { imageContainer, imageUploader, font, icon } = useStyles();

  if (isLoading) {
    return <ImageSkeleton />;
  }

  if (!isLoading && uri) {
    return <Image source={{ uri }} onPress={onPress} style={imageContainer} />;
  }

  return (
    <Pressable onPress={onPress} style={[imageContainer, imageUploader]}>
      <Icon name={iconName} size={icon.size} color={icon.color} />
      <Font style={font}>{description}</Font>
    </Pressable>
  );
}
