import { View } from 'react-native';
import React from 'react';

import Title from '../title/Title';
import SubTitle from '../title/SubTitle';
import { IbottomHeading } from './type';

export default function BottomHeading({
  title,
  subTitle: { userName, range },
}: IbottomHeading) {
  return (
    <View>
      <Title text={title} />
      <SubTitle userName={userName} range={range} />
    </View>
  );
}
