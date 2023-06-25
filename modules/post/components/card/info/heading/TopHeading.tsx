import { View } from 'react-native';
import React from 'react';

import GroupDisplay from '../display/GroupDisplay';
import DecisionDisplay from '../display/DecisionDisplay';
import CardMenu from '../../menu/Menu';
import useStyles from './style';
import { ITopHeading } from './type';

export default function TopHeading({ people, isDecided }: ITopHeading) {
  const { cTopHeading, cTopWrap } = useStyles();

  return (
    <View style={cTopWrap}>
      <View style={cTopHeading}>
        <GroupDisplay people={people} />
        <DecisionDisplay isDecided={isDecided} />
      </View>
      <CardMenu />
    </View>
  );
}
