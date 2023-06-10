import { ScrollView } from 'react-native';
import React from 'react';
import _ from 'lodash';

import TestId from '@shared/constants/testIds';
import { ICardList } from './type';
import Card from '../card/Card';

// TODO: key 속성 처리하기
export default function CardList({ payloads }: ICardList) {
  return (
    <ScrollView testID={TestId.post.cardList}>
      {payloads.map((payload) => {
        return <Card payload={payload} key={`${_.random(true)}`} />;
      })}
    </ScrollView>
  );
}
