import React, { useEffect } from 'react';

import ImageContent from '@components/Image';
import useImagePicker from '@hooks/useImagePicker';
import { Form, ReportImageAsset } from '@type/component.report';
import { Title } from '@screens/meeting/detail/common';
import { SetState } from '@type/index';
import { reportConfig } from '@constants/config';
import { Content } from './common';

interface ReportImageProps {
  image: ReportImageAsset;
  setForm: SetState<Form>;
}

const { text } = reportConfig;

function ReportImage({ setForm, image }: ReportImageProps) {
  const [assetState, pickImage] = useImagePicker();

  useEffect(() => {
    if (assetState) {
      setForm(prev => {
        return { ...prev, reportImageAsset: assetState };
      });
    }
  }, [assetState, setForm]);

  return (
    <Content>
      <Title title={text.image} />
      <ImageContent onPress={pickImage} imageURL={image?.uri} />
    </Content>
  );
}

export default ReportImage;
