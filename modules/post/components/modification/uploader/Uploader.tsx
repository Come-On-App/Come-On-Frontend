import React from 'react';

import PostUploader from '@post/components/imageUploader/PostImageUploader';
import usePostManagement from '@post/hooks/usePostManagement';
import { Iuploader } from './type';

const TITLE = '사진 수정';
const DESCRIPTION = '사진을 재등록해 주세요';

export default function Uploader({ isDataLoading }: Iuploader) {
  const {
    dispatchImage,
    postState: { image },
  } = usePostManagement();

  return (
    <PostUploader
      title={TITLE}
      description={DESCRIPTION}
      isDataLoading={isDataLoading}
      onImage={dispatchImage}
      prevImage={image.uri as string}
    />
  );
}
