import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TestId from '@shared/constants/testIds';

import Logo from '@shared/components/logo/Logo';
import MeetingJoinForm from '@connection/components/MeetingJoinForm';

import { fullScreenContainer } from '@shared/constants/style';
import KeyboardDismissView from '@shared/components/keyboard/KeyboardDismissView';
import useStyles from './style';

function EnterMeeting() {
  const { container, content, cLogo } = useStyles();

  return (
    <SafeAreaView testID={TestId.connection.code} style={container}>
      <KeyboardAvoidingView
        style={fullScreenContainer}
        behavior={Platform.select({ ios: 'padding' })}
      >
        <KeyboardDismissView fullScreen>
          <View style={cLogo}>
            <Logo />
          </View>
          <View style={content}>
            <MeetingJoinForm />
          </View>
        </KeyboardDismissView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default React.memo(EnterMeeting);
