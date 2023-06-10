import React from 'react';
import { Card as RneCard } from '@rneui/themed';

import Thumbnail from './thumbnail/Thumbnail';
import TopHeading from './display/TopHeading';
import BottomHeading from './display/BottomHeading';
import useStyles from './style';
import { Icard } from './type';

export default function Card({
  payload: { uri, people, isDecided, title, subTitle },
}: Icard) {
  const { cCard } = useStyles();

  return (
    <RneCard containerStyle={cCard}>
      <Thumbnail uri={uri}>
        <TopHeading people={people} isDecided={isDecided} />
      </Thumbnail>
      <BottomHeading title={title} subTitle={subTitle} />
    </RneCard>
  );
}
