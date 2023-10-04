import React from 'react';

import { Image } from '@rneui/themed';
import { relativeSizeConverter } from '@shared/utils';
import Title from '@post/components/card/info/title/Title';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import useStyles from './style';
import { ITopImage } from './type';

const SCROLL_THRESHOLD = relativeSizeConverter(300);

export const SCROLL_BASELINE = SCROLL_THRESHOLD - 100;

export const SCROLL_THROTTLE_VALUE = 100;

export default function TopImage({ imagePath, title }: ITopImage) {
  const { titleContainer, image } = useStyles(SCROLL_THRESHOLD);

  return (
    <Image
      transition
      style={image}
      source={{
        uri: imagePath,
        cache: 'force-cache',
      }}
    >
      <ScreenLayout containerStyle={titleContainer}>
        <Title text={title} customTextStyle="white" />
      </ScreenLayout>
    </Image>
  );
}
