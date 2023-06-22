import { View } from 'react-native';
import React from 'react';

import { ScreenTitle } from '@shared/components/font/Font';
import ImageUploader from '@shared/components/imageUploader/ImageUploader';
import { Iuploader } from './type';

const TITLE = '사진 등록';
const DESCRIPTION = '사진을 등록해 주세요';

export default function Uploader({ containerStyle }: Iuploader) {
  return (
    <View style={containerStyle}>
      <ScreenTitle>{TITLE}</ScreenTitle>
      <ImageUploader description={DESCRIPTION} onPress={() => null} />
    </View>
  );
}
