import React from 'react';

import { postCreatorPayload } from '@post/payload/creatorPayload';
import PostUploader from '@post/components/postUploader/PostUploader';

const TITLE = '사진 등록';
const DESCRIPTION = '사진을 등록해 주세요';

export default function Uploader() {
  return (
    <PostUploader
      title={TITLE}
      description={DESCRIPTION}
      onImage={(image) =>
        postCreatorPayload.update(() => ({
          meetingImage: image,
        }))
      }
    />
  );
}
