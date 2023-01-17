import React from 'react';
import { View, Text } from 'react-native';
import { makeStyles, Image } from '@rneui/themed';

import Logo from '../components/Logo';
import GoogleLogo from '../assets/images/logo/GoogleLogo';
import AppleLogo from '../assets/images/logo/AppleLogo';

function LoginScreen() {
  const styles = useStyles();

  // todo 임시, 정책에 따라 디자인을 변경해야함 현재 경진님한테 요청드림
  return (
    <View style={styles.container}>
      <Logo />
      <View
        style={{
          width: '100%',
          height: 30,
          alignItems: 'center',
        }}
      >
        <Text style={styles.label}>소셜 로그인</Text>
        <View style={styles.line} />
      </View>
      <View
        style={{
          width: '100%',
          height: '30%',
          alignItems: 'center',
          position: 'relative',
          top: -30,
          marginBottom: 30,
        }}
      >
        {/** 추후 Pressable 스타일링 추가해서 공통컴포넌트, apple/android에 따른 구분할것 */}
        <View style={styles.kakaoLogoStyle}>
          <Image
            containerStyle={styles.tempImageStyle}
            source={require('../assets/images/logo/kakaotalk_sharing_btn_small.png')}
          />
          <Text>카카오로 로그인</Text>
        </View>
        <View style={styles.appleLogoStyle}>
          <AppleLogo />
          <Text style={styles.appleText}>APPLE로 로그인</Text>
        </View>
        <View style={styles.googleLogoStyle}>
          <GoogleLogo />
          <Text>GOOGLE로 로그인</Text>
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  tempImageStyle: {
    width: 50,
    height: 50,
    marginTop: 15,
  },
  line: {
    width: '90%',
    height: 1.5,
    alignItems: 'center',
    position: 'relative',
    top: -50,
    backgroundColor: theme.grayscale[300],
  },
  label: {
    position: 'relative',
    top: -50,
    fontSize: 14,
    marginBottom: 3,
    color: theme.grayscale[400],
  },
  kakaoLogoStyle: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#FEE500',
    borderRadius: 12,
    margin: 5,
  },
  appleLogoStyle: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#000000',
    margin: 5,
    borderRadius: 12,
  },
  googleLogoStyle: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#ffffff',
    margin: 5,
    borderRadius: 12,
  },
  appleText: {
    color: 'white',
  },
  googleText: {
    color: 'white',
  },
  kakaoText: {
    color: 'white',
  },
}));
