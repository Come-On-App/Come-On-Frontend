import React from 'react';
import { makeStyles } from '@rneui/themed';
import { Pressable, View } from 'react-native';
import useAuth from '@hooks/useAuth';
import useWebSocket from '@hooks/useWebSocket';
import * as Linking from 'expo-linking';
import { COMEON_API_URL } from '@env';
import * as WebBrowser from 'expo-web-browser';
import Font from '@components/Font';
import { requestWithDraw } from '@api/user/user';
import { errorAlert, successAlert } from '@utils/alert';
import { settingConfig } from '@constants/config';
import { Title } from '../meeting/detail/common';
import IconTitle from './IconTitle';

function EmailTab({ children }: { children: string }) {
  const styles = useStyles();

  return (
    <View style={styles.tabStyle}>
      <Font style={styles.textStyle}>{children}</Font>
    </View>
  );
}

function PressableTextTab({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress: () => void;
}) {
  const styles = useStyles();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.onPress, styles.defaultPress]}
    >
      {children}
    </Pressable>
  );
}

function QuitButtion() {
  const { setLogout } = useAuth();
  const { deactivate } = useWebSocket();
  const styles = useStyles();
  const onPressQuit = async () => {
    const data = await requestWithDraw();

    if (data.success === true) {
      successAlert('저희 앱을 이용해 주셔서 감사했습니다 🙇‍♀️🙇‍♂️!');
      setLogout();
      deactivate();
    } else {
      errorAlert('문제가 발생했습니다.');
    }
  };

  return (
    <PressableTextTab onPress={onPressQuit}>
      <Font style={styles.textStyle}>{settingConfig.text.withdraw}</Font>
    </PressableTextTab>
  );
}

function LogoutButton() {
  const { setLogout, authSelector } = useAuth();
  const { deactivate } = useWebSocket();
  const { accessToken } = authSelector;
  const styles = useStyles();
  const callbackUrl = Linking.createURL('/logout/callback');
  const baseUrl = `${COMEON_API_URL}/logout?atk=${accessToken?.token}&redirect_uri=${callbackUrl}`;
  const onPressLogout = async () => {
    const result = await WebBrowser.openAuthSessionAsync(baseUrl, callbackUrl);

    if (result.type === 'success') {
      setLogout();
      deactivate();
    }
  };

  return (
    <PressableTextTab onPress={onPressLogout}>
      <Font style={styles.textStyle}>{settingConfig.text.logout}</Font>
    </PressableTextTab>
  );
}

function SettingButton() {
  const styles = useStyles();
  const onClickSupportUrl = () => {
    WebBrowser.openBrowserAsync(urlConfig.supportUrl);
  };
  const onClickPrivacyUrl = () => {
    WebBrowser.openBrowserAsync(urlConfig.privacyUrl);
  };
  const onClickTosUrl = () => {
    WebBrowser.openBrowserAsync(urlConfig.termOfService);
  };
  const urlConfig = {
    supportUrl:
      'https://comeonmobile.notion.site/ComeOn-Mobile-1a0d0f02319347de8e905ac4cf5fcba1',
    privacyUrl: 'https://sites.google.com/view/come-on-privacy/%ED%99%88',
    termOfService:
      'https://sites.google.com/view/come-on-terms-of-service/%ED%99%88',
  };
  const iconConfig = {
    size: 24,
    color: 'black',
    title1: '계정관리',
    title2: '개발자 연락처',
  };
  const emailLink = {
    email1: 'bananana0118@gmail.com',
    email2: 'yoo971202@naver.com',
    email3: 'jeongbaebangdev@gmail.com',
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleStyle}>
        <IconTitle
          iconName="account-circle"
          size={iconConfig.size}
          color={iconConfig.color}
          title={iconConfig.title1}
        />
      </View>
      <LogoutButton />
      <QuitButtion />
      <View style={styles.titleStyle}>
        <IconTitle
          iconName="email"
          size={iconConfig.size}
          color={iconConfig.color}
          title={iconConfig.title2}
        />
      </View>
      <EmailTab>{emailLink.email1}</EmailTab>
      <EmailTab>{emailLink.email2}</EmailTab>
      <EmailTab>{emailLink.email3}</EmailTab>
      <View style={styles.thirdTabStyle}>
        <PressableTextTab onPress={onClickSupportUrl}>
          <Title title={settingConfig.text.supportUrl} />
        </PressableTextTab>
        <PressableTextTab onPress={onClickPrivacyUrl}>
          <Title title={settingConfig.text.privacy} />
        </PressableTextTab>
        <PressableTextTab onPress={onClickTosUrl}>
          <Title title={settingConfig.text.termsOfService} />
        </PressableTextTab>
      </View>
    </View>
  );
}

export default SettingButton;

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  iconTitle: {
    flexDirection: 'row',
  },

  textStyle: {
    fontSize: theme.textStyles.body1.fontSize,
    lineHeight: theme.textStyles.body1.lineHeight,
    color: theme.grayscale[700],
  },
  textContainer: {
    marginLeft: 6,
  },
  tabStyle: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  titleStyle: {
    marginTop: 35,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  thirdTabStyle: {
    marginTop: 35,
    marginBottom: 10,
  },
  onPress: {
    backgroundColor: `rgba(0,0,0,${0.1})`,
  },
  defaultPress: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
}));
