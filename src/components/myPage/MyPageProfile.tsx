import { View } from 'react-native';
import React, { memo, useCallback, useEffect } from 'react';

import type {
  ProfileImageProps,
  ProfileNameProps,
} from '@type/component.mypage';
import fn, { emptyString, pickSafelyBy } from '@utils/fn';
import { errorAlert, successAlert } from '@utils/alert';
import { promiseFlow } from '@utils/promise';
import useImagePicker from '@hooks/useImagePicker';
import { requestImageUpload } from '@api/image/upload';
import { makeStyles, Skeleton } from '@rneui/themed';
import useUserQuery from '@hooks/query/useUserQuery';
import useUserMutation from '@hooks/query/useUserMutation';
import Font, { BoldFont } from '@components/Font';
import BadgedAvatar from '@components/member/BadgedAvatar';
import { ErrorImageResponse } from '@type/api.image';

const MemoProfileImage = memo(ProfileImage);

export default function Profile() {
  const { user } = useUserQuery();
  const styles = useStyles();

  if (fn.isEmpty(user)) {
    return <ProfileSkeleton />;
  }

  return (
    <View style={styles.container}>
      <MemoProfileImage nickname={user.nickname} image={user.profileImageUrl} />
      <ProfileName
        name={user.name}
        email={pickSafelyBy(user, 'email', emptyString)}
      />
    </View>
  );
}

function ProfileName({ name, email }: ProfileNameProps) {
  const styles = useStyles();

  return (
    <View style={styles.profileNameContainer}>
      <BoldFont style={styles.profileWelcomeText}>{name}</BoldFont>
      <Font style={styles.profileEmailText}>{email}</Font>
    </View>
  );
}

const Label = {
  success: '이미지 업데이트 완료 ✏️',
};

function ProfileImage({ image, nickname }: ProfileImageProps) {
  const { mutate } = useUserMutation();
  const [assetState, pickImage] = useImagePicker();
  const { profileImageIcon, profileAvatarImage, profileBadge } = useStyles();
  const mutateFn = useCallback(
    (payalod: string) => mutate({ profileImageUrl: payalod, nickname }),
    [mutate, nickname],
  );

  useEffect(() => {
    if (fn.isEmpty(assetState)) return;

    promiseFlow(assetState, [requestImageUpload, mutateFn], {
      onSuccess: () => {
        successAlert(Label.success);
      },
      onError: (error: ErrorImageResponse) => {
        errorAlert(error.response.data.errorDescription);

        throw error;
      },
    });
  }, [assetState, mutateFn]);

  return (
    <BadgedAvatar
      onPress={pickImage}
      size={profileAvatarImage.size}
      path={image}
      badge={{
        icon: {
          iconName: 'photo-camera',
          size: profileImageIcon.size,
          color: profileImageIcon.color,
        },
        backgroundColor: profileBadge.backgroundColor,
      }}
    />
  );
}

function ProfileSkeleton() {
  const styles = useStyles();
  const config = {
    image: {
      width: 56,
      height: 56,
    },
    nickname: {
      width: 49,
      height: 18,
    },
    mail: {
      width: 115,
      height: 14,
    },
  };

  return (
    <View style={styles.container}>
      <Skeleton
        circle
        width={config.image.width}
        height={config.image.height}
      />
      <View style={styles.profileNameContainer}>
        <Skeleton
          width={config.nickname.width}
          height={config.nickname.height}
          style={styles.skeleton}
        />
        <Skeleton width={config.mail.width} height={config.mail.height} />
      </View>
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    alignItems: 'center',
  },
  profileBadge: {
    backgroundColor: theme.grayscale['100'],
  },
  profileImageIcon: {
    size: 20,
    color: theme.grayscale['500'],
  },
  profileAvatarImage: {
    size: 56,
    color: theme.grayscale['500'],
  },
  profileNameContainer: {
    marginTop: 4,
    alignItems: 'center',
  },
  profileWelcomeText: {
    fontSize: 18,
    lineHeight: 24,
  },
  profileEmailText: {
    color: theme.grayscale['500'],
    fontSize: 14,
    lineHeight: 20,
  },
  skeleton: {
    marginBottom: 2,
  },
}));
