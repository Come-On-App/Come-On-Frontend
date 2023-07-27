import React from 'react';

import { postModifierPayload } from '@post/payload/postPayload';
import PostUploader from '@post/components/imageUploader/PostImageUploader';
import { Iuploader } from './type';

const TITLE = '사진 수정';
const DESCRIPTION = '사진을 재등록해 주세요';

export default function Uploader({ imageUrl, isLoad }: Iuploader) {
  return (
    <PostUploader
      title={TITLE}
      description={DESCRIPTION}
      prevImage={imageUrl}
      isLoad={isLoad}
      onImage={(image) =>
        postModifierPayload.update(() => ({
          meetingImage: image,
        }))
      }
    />
  );
}
