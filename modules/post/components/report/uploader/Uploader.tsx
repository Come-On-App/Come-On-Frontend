import React from 'react';

import PostImageUploader from '@post/components/imageUploader/PostImageUploader';
import { OnImage } from '@post/components/imageUploader/type';

const TITLE = '캡처 이미지 (선택)';
const DESCRIPTION = '사진을 등록해 주세요';

export default function Uploader({ onImage }: { onImage: OnImage }) {
  return (
    <PostImageUploader
      title={TITLE}
      description={DESCRIPTION}
      onImage={onImage}
    />
  );
}
