import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { ScreenTitle } from '@shared/components/font/Font';
import ImageUploader from '@shared/components/imageUploader/ImageUploader';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ContentHeader from '@shared/components/layout/ContentHeader';

const TITLE = '사진 등록';
const DESCRIPTION = '사진을 등록해 주세요';

function useImagePicker(): [string | undefined, () => Promise<void>, boolean] {
  const [image, setImage] = useState<string>();
  const [loading, setLoading] = useState(false);
  const pickImage = async () => {
    setLoading(true);

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

    setLoading(false);
  };

  return [image, pickImage, loading];
}

export default function Uploader() {
  const [image, pickImage, loading] = useImagePicker();

  return (
    <DividerWrapper>
      <ScreenLayout>
        <ContentHeader>
          <ScreenTitle>{TITLE}</ScreenTitle>
        </ContentHeader>
        <ImageUploader
          isLoading={loading}
          uri={image}
          description={DESCRIPTION}
          onPress={pickImage}
        />
      </ScreenLayout>
    </DividerWrapper>
  );
}
