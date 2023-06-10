import { View } from 'react-native';
import React from 'react';

import Title from './Title';
import SubTitle from './SubTitle';
import { IBottomHeading } from './type';

export default function BottomHeading({
  title,
  subTitle: { userName, range },
}: IBottomHeading) {
  return (
    <View>
      <Title text={title} />
      <SubTitle userName={userName} range={range} />
    </View>
  );
}
