import React from 'react';
import { View } from 'react-native';

import TestId from '@shared/constants/testIds';

import Logo from '@shared/components/logo/Logo';
import MeetingJoinForm from '@connection/components/MeetingJoinForm';

import useStyles from './style';

function EnterMeeting() {
  const { container, content, cLogo } = useStyles();

  return (
    <View testID={TestId.connection.code} style={container}>
      <View style={cLogo}>
        <Logo />
      </View>
      <View style={content}>
        <MeetingJoinForm />
      </View>
    </View>
  );
}

export default EnterMeeting;
