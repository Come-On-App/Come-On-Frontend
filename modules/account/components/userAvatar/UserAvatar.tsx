import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { asyncWave } from 'async-wave';
import { isNull } from 'lodash';

import { BadgedAvatar } from '@shared/components/avatar/Avatar';
import TestId from '@shared/constants/testIds';
import { applyRelativeSizes } from '@shared/utils';
import useImagePicker from '@shared/hooks/useImagePicker';
import useUserManagement from '@account/hooks/useUserManagement';
import { requestImageURL } from '@post/api/v1';
import { useQueryDataByUser } from '@account/hooks/useMyInfoQuery';
import useMyInfoMutation from '@account/hooks/useMyInfoMutation';
import SubmitStatus from '../submitStatus/SubmitStatus';

const SUBMIT_LODING_TITLE = '이미지 업데이트 중';
const BADGE_NAME = 'photo-camera';
const [AVATAR_SIZE, AVATAR_BADEG_SIZE] = applyRelativeSizes({
  avatarSize: 80,
  badgeSize: 30,
});

export default function UserAvatar() {
  const { userState } = useUserManagement();
  const userQueryData = useQueryDataByUser();
  const { image, pickImage, initImage } = useImagePicker();
  const { mutateUserImage } = useMyInfoMutation();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isNull(image)) return;

    setLoading(true);
    asyncWave([image, requestImageURL, mutateUserImage, initImage], {
      onSettled: () => {
        setLoading(false);
      },
    });
  }, [image, initImage, mutateUserImage]);

  return (
    <>
      <SubmitStatus isLoading={isLoading} title={SUBMIT_LODING_TITLE} />
      <View testID={TestId.account.avatar}>
        <BadgedAvatar
          isLoading={userState.isLoading}
          badgeName={BADGE_NAME}
          path={userQueryData?.profileImageUrl}
          size={AVATAR_SIZE}
          badgeSize={AVATAR_BADEG_SIZE}
          onPress={pickImage}
        />
      </View>
    </>
  );
}
