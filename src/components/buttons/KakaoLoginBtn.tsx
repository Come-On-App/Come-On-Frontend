import React, { SetStateAction } from 'react';
import { makeStyles } from '@rneui/themed';
import { Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import KakaoLogo from '../../assets/images/logo/KakaoLogo';

export default function KakaoLoginBtn() {
  const styles = useStyles();
  const navigation = useNavigation();

  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed, styles.btnStyle]}
      onPress={() => navigation.navigate('KakaoLoginWebView')}
    >
      <KakaoLogo />
    </Pressable>
  );
}

const useStyles = makeStyles(() => ({
  btnStyle: {
    marginBottom: 12,
  },
  pressed: {
    opacity: 0.7,
  },
}));
