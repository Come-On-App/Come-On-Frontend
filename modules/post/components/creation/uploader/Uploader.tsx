import React from 'react';

import PostUploader from '@post/components/imageUploader/PostImageUploader';
import usePostManagement from '@post/hooks/usePostManagement';

const TITLE = '사진 등록';
const DESCRIPTION = '사진을 등록해 주세요';

export default function Uploader() {
  const { dispatchImage } = usePostManagement();

  return (
    <PostUploader
      title={TITLE}
      description={DESCRIPTION}
      onImage={dispatchImage}
    />
  );
}
