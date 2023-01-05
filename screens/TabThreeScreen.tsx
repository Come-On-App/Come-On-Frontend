import React from 'react';
import { View } from 'react-native';
import { makeStyles, Divider } from '@rneui/themed';

import { Font } from '../components/Font';
import Profile from '../components/myPage/Profile';
import NickName from '../components/myPage/NickName';

function ScreenTop() {
  const styles = useStyles();

  return (
    <View style={styles.myPageTopContainer}>
      <Profile />
      <NickName />
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

export default function TabThreeScreen() {
  const styles = useStyles();
  const { divider } = styles;

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
