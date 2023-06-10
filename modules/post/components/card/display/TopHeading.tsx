import { View } from 'react-native';
import React from 'react';

import GroupDisplay from './GroupDisplay';
import DecisionDisplay from './DecisionDisplay';
import CardMenu from '../menu/Menu';
import { ITopHeading } from './type';
import useStyles from './style';

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
