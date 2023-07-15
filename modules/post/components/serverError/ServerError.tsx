import { View } from 'react-native';
import React from 'react';

import Description from '@shared/components/description/Description';
import ErrorLogo from '@shared/components/logo/ErrorLogo';
import useStyles from './style';
import { SEARCH_ADN_CREATE_HEIGHT } from '../search/searchAndCreate/style';

const DESCRIPTION = 'Oops, something went wrong';

export default function ServerError() {
  const { container, iconContainer } = useStyles();

  return (
    <View style={[container, { paddingBottom: SEARCH_ADN_CREATE_HEIGHT }]}>
      <View style={iconContainer}>
        <ErrorLogo />
      </View>
      <Description description={DESCRIPTION} />
    </View>
  );
}
