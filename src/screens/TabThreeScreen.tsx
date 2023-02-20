import React from 'react';
import { View } from 'react-native';
import { makeStyles, Divider } from '@rneui/themed';

import { Font } from '@components/Font';
import Profile from '@components/myPage/MyPageProfile';
import Nickname from '@components/myPage/MyPageNickName';
import useImagePath from '@hooks/useImagePicker';

export default function TabThreeScreen() {
  const styles = useStyles();
  const { divider } = styles;
  const [path, pickImage] = useImagePath();

  return (
    <View style={styles.screenContainer}>
      <ScreenTop />
      <Divider
        width={divider.width}
        color={divider.color}
        style={{ marginVertical: divider.marginVertical }}
      />
      <ScreenMain />
    </View>
  );
}

function ScreenTop() {
  const styles = useStyles();

  return (
    <View style={styles.myPageTopContainer}>
      <Profile />
      <Nickname />
    </View>
  );
}

// TODO: 캘린더 컴포넌트 도입예정
function ScreenMain() {
  const styles = useStyles();

  return (
    <View style={styles.myPageMainContainer}>
      <Font>캘린더 컴포넌트</Font>
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  screenContainer: {
    flex: 1,
  },
  myPageTopContainer: {
    marginTop: 16,
  },
  myPageMainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 12,
    color: theme.grayscale['100'],
    marginVertical: 24,
  },
}));
