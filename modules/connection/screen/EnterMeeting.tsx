import React, { useState } from 'react';
import { View } from 'react-native';

import Description from '@connection/components/description/Description';
import Logo from '@connection/components/logo/Logo';
import TestId from '@shared/constants/testIds';
import EntranceInput from '@connection/components/entranceInput/EntranceInput';
import CodeEntryButton from '@connection/components/button/CodeEntryButton';
import useStyles from './style';

const INIT_CODE = '';

function EnterMeeting() {
  const { contianer, content, cLogo } = useStyles();
  const [code, setCode] = useState(INIT_CODE);

  return (
    <View testID={TestId.connection.code} style={contianer}>
      <View style={cLogo}>
        <Logo />
      </View>
      <View style={content}>
        <Description />
        <EntranceInput code={code} dispatch={setCode} />
        <CodeEntryButton code={code} />
      </View>
    </View>
  );
}

export default EnterMeeting;
