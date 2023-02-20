import { View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import fn from '@utils/fn';
import { mutateStateRefToast } from '@utils/alert';
import { promiseFlow } from '@utils/promise';
import useImagePath from '@hooks/useImagePicker';
import { requestImageUpload } from '@api/image/upload';
import { makeStyles, Skeleton } from '@rneui/themed';
import useUser from '@hooks/useUser';
import useMutateUser from '@hooks/useMutateUser';
import Font, { BoldFont } from '@components/Font';
import BadgedAvatar from '@components/member/BadgedAvatar';
import type { ProfileImageProps, ProfileNameProps } from '@type/mypage.profile';

export default function Profile() {
  const { user } = useUser();
  const styles = useStyles();

  if (fn.isEmpty(user)) {
    return <ProfileSkeleton />;
  }

  return (
    <View style={styles.container}>
      <ProfileImage
        image={user.profileImageUrl || ''}
        nickname={user.nickname}
      />
      <ProfileName name={user.name} email={user.email || ''} />
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

function ProfileImage({ image, nickname }: ProfileImageProps) {
  const [imagePath, setImagePath] = useState(image);
  const [assetState, pickImage] = useImagePath();
  const { profileImageIcon, profileAvatarImage, profileBadge } = useStyles();
  const isImageSubmit = useRef(false);
  const { mutate } = useMutateUser();
  const mutateFn = useCallback(
    (payalod: string) => mutate({ profileImageUrl: payalod, nickname }),
    [mutate, nickname],
  );
  const onPressHandler = () => {
    pickImage();
    isImageSubmit.current = false;
  };

  useEffect(() => {
    if (fn.isEmpty(assetState) || isImageSubmit.current) return;

    setImagePath(assetState.uri);
    promiseFlow(assetState, [requestImageUpload, mutateFn], {
      onSucess: () => {
        mutateStateRefToast(isImageSubmit, '이미지 업데이트 완료 ✏️');
      },
    });
  }, [assetState, mutateFn]);

  return (
    <BadgedAvatar
      onPress={onPressHandler}
      size={profileAvatarImage.size}
      path={imagePath}
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

  return (
    <View style={styles.container}>
      <Skeleton circle width={56} height={56} />
      <View style={styles.profileNameContainer}>
        <Skeleton width={49} height={24} style={styles.skeleton} />
        <Skeleton width={115} height={20} />
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
