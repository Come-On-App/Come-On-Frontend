import React from 'react';
import { Keyboard, Pressable, View } from 'react-native';
import { makeStyles, Divider } from '@rneui/themed';

import Profile from '@components/myPage/MyPageProfile';
import Nickname from '@components/myPage/MyPageNickName';

// 마이페이지 스크린
export default function TabThreeScreen() {
  const styles = useStyles();
  const { divider } = styles;

  return (
    <Pressable style={styles.screenContainer} onPress={Keyboard.dismiss}>
      <>
        <ScreenTop />
        <Divider
          width={divider.width}
          color={divider.color}
          style={{ marginVertical: divider.marginVertical }}
        />
        <ScreenMain />
      </>
    </Pressable>
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

// TODO: 캘린더 컴포넌트
function ScreenMain() {
  const styles = useStyles();

  return <View style={styles.myPageMainContainer} />;
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
