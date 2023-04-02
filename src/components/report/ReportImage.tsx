import React, { useEffect } from 'react';

import ImageContent from '@components/Image';
import useImagePicker from '@hooks/useImagePicker';
import { Form } from '@type/component.report';
import { Title } from '@screens/meeting/detail/common';
import { SetState } from '@type/index';
import { reportConfig } from '@constants/config';
import { Content } from './common';

interface ReportImageProps {
  image: string;
  setForm: SetState<Form>;
}

const { text } = reportConfig;

function ReportImage({ setForm, image }: ReportImageProps) {
  const [assetState, pickImage] = useImagePicker();

  useEffect(() => {
    if (assetState) {
      setForm(prev => {
        return { ...prev, image: assetState.uri };
      });
    }
  }, [assetState, setForm]);

  return (
    <Content>
      <Title title={text.image} />
      <ImageContent onPress={pickImage} imageURL={image} />
    </Content>
  );
}

export default ReportImage;
