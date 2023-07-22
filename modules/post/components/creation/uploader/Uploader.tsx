import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { ScreenTitle } from '@shared/components/font/Font';
import ImageUploader from '@shared/components/imageUploader/ImageUploader';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ContentHeader from '@shared/components/layout/ContentHeader';
import { postCreatorPayload } from '@post/payload/creatorPayload';

const TITLE = '사진 등록';
const DESCRIPTION = '사진을 등록해 주세요';

export default function Uploader() {
  const [image, pickImage, isLoading] = useImagePicker();

  useEffect(() => {
    if (image) {
      postCreatorPayload.update(() => ({
        meetingImage: image,
      }));
    }
  }, [image]);

  return (
    <DividerWrapper>
      <ScreenLayout>
        <ContentHeader>
          <ScreenTitle>{TITLE}</ScreenTitle>
        </ContentHeader>
        <ImageUploader
          isLoading={isLoading}
          uri={image}
          description={DESCRIPTION}
          onPress={pickImage}
        />
      </ScreenLayout>
    </DividerWrapper>
  );
}

function useImagePicker(): [string | undefined, () => Promise<void>, boolean] {
  const [image, setImage] = useState<string>();
  const [isLoading, setLoading] = useState(false);
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

  return [image, pickImage, isLoading];
}
