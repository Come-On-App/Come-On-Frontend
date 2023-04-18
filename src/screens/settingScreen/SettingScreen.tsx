import React, { useState } from 'react';
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
import Modal from '@components/Modal';
import FlexButtons from '@components/button/FlexButtons';
import { Title } from '../meeting/detail/common';
import IconTitle from './IconTitle';

function EmailTab({ children }: { children: string }) {
  const styles = useStyles();

  return (
    <View style={styles.defaultPress}>
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

function WithdrawButton() {
  const { setLogout } = useAuth();
  const { deactivate } = useWebSocket();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const styles = useStyles();
  const SUCCESSTEXT = '저희 앱을 이용해 주셔서 감사했습니다 🙇‍♀️🙇‍♂️!';
  const ERRORTEXT = '문제가 발생했습니다.';
  const CANCELTEXT = '아니요';
  const CONFIRMTEXT = '네';
  const WITHDRAWTEXT = '정말 탈퇴하시겠습니까? 😳';
  const WITHDRAWTEXT2 = '기존의 데이터는 모두 사라집니다';
  const onPressQuit = async () => {
    const data = await requestWithDraw();

    if (data.success === true) {
      successAlert(SUCCESSTEXT);
      deactivate();
      setLogout();
    } else {
      errorAlert(ERRORTEXT);
    }
  };
  const cancleHandler = () => {
    setIsVisible(false);
  };
  const onPressConfirm = () => {
    onPressQuit();
  };

  return (
    <>
      <PressableTextTab onPress={() => setIsVisible(!isVisible)}>
        <Font style={styles.textStyle}>{settingConfig.text.withdraw}</Font>
      </PressableTextTab>

      <Modal isVisible={isVisible} style={styles.ModalStyle}>
        <Font>{WITHDRAWTEXT}</Font>
        <Font>{WITHDRAWTEXT2}</Font>
        <FlexButtons
          cancelHandler={cancleHandler}
          onPressConfirm={onPressConfirm}
          options={{
            cancelText: CANCELTEXT,
            confirmText: CONFIRMTEXT,
            cancelButtonColor: styles.witchdrawCancelColors,
            confirmButtonColor: styles.withdrawColors,
          }}
        />
      </Modal>
    </>
  );
}

function LogoutButton() {
  const {
    setLogout,
    authSelector: { accessToken },
  } = useAuth();
  const { deactivate } = useWebSocket();
  const styles = useStyles();
  const callbackUrl = Linking.createURL('/logout/callback');
  const baseUrl = `${COMEON_API_URL}/logout?atk=${accessToken?.token}&redirect_uri=${callbackUrl}`;
  const onPressLogout = async () => {
    const result = await WebBrowser.openAuthSessionAsync(baseUrl, callbackUrl);

    if (result.type === 'success') {
      deactivate();
      setLogout();
    }
  };

  return (
    <PressableTextTab onPress={onPressLogout}>
      <Font style={styles.textStyle}>{settingConfig.text.logout}</Font>
    </PressableTextTab>
  );
}

function SettingScreen() {
  const styles = useStyles();
  const onClickSupportUrl = () => {
    WebBrowser.openBrowserAsync(settingConfig.urls.supportUrl);
  };
  const onClickPrivacyUrl = () => {
    WebBrowser.openBrowserAsync(settingConfig.urls.privacyUrl);
  };
  const onClickTosUrl = () => {
    WebBrowser.openBrowserAsync(settingConfig.urls.termOfService);
  };
  const iconConfig = {
    size: 24,
    color: 'black',
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleStyle}>
        <IconTitle
          iconName="account-circle"
          size={iconConfig.size}
          color={iconConfig.color}
          title={settingConfig.text.account}
        />
      </View>
      <LogoutButton />
      <WithdrawButton />
      <View style={styles.titleStyle}>
        <IconTitle
          iconName="email"
          size={iconConfig.size}
          color={iconConfig.color}
          title={settingConfig.text.supportEmail}
        />
      </View>
      {Object.values(settingConfig.supportEmail).map(key => (
        <EmailTab key={key}>{key}</EmailTab>
      ))}
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

export default SettingScreen;

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
  ModalStyle: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',

    paddingBottom: 0,
  },
  withdrawColors: {
    backgroundColor: theme.colors.warning,
  },
  witchdrawCancelColors: {
    backgroundColor: theme.colors.primary,
  },
}));
