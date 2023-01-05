import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';

import { Font, BoldFont } from '../Font';
import { BadgedAvatar } from '../Avatar';

function ProfileName() {
  const styles = useStyles();
  const WELCOME_TEXT = '어서오세요. @@님!';
  const EMAIL = 'asdf@zxc.com';

  return (
    <View style={styles.profileNameContainer}>
      <BoldFont style={styles.profileWelcomeText}>{WELCOME_TEXT}</BoldFont>
      <Font style={styles.profileEmailText}>{EMAIL}</Font>
    </View>
  );
}

function ProfileImage() {
  const TEST_IMG = 'https://randomuser.me/api/portraits/men/36.jpg'; // SERVER-API: 추후 서버 처리
  const { profileImageIcon, profileAvatarImage, profileBadge } = useStyles();

  return (
    <BadgedAvatar
      size={profileAvatarImage.size}
      path={TEST_IMG}
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

function Profile() {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <ProfileImage />
      <ProfileName />
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
}));

export default Profile;
