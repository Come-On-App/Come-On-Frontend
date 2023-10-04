import React from 'react';
import { Card as RneCard } from '@rneui/themed';
import { View } from 'react-native';

import TestId from '@shared/constants/testIds';
import Thumbnail from './thumbnail/Thumbnail';
import TopHeading from './info/heading/TopHeading';
import BottomHeading from './info/heading/BottomHeading';
import useStyles from './style';
import { ICard } from './type';

export default function Card({
  payload: { uri, people, isDecided, title, subTitle, id, isHost },
}: ICard) {
  const { cCard } = useStyles();

  return (
    <View testID={TestId.post.card}>
      <RneCard containerStyle={cCard}>
        <Thumbnail id={id} uri={uri} title={title}>
          <TopHeading
            id={id}
            isHost={isHost}
            people={people}
            isDecided={isDecided}
          />
        </Thumbnail>
        <BottomHeading title={title} subTitle={subTitle} />
      </RneCard>
    </View>
  );
}
