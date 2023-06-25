import { View } from 'react-native';
import React from 'react';

import Title from '../title/Title';
import SubTitle from '../title/SubTitle';
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
