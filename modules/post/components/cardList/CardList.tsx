import { ScrollView } from 'react-native';
import React from 'react';
import TestId from '@shared/constants/testIds';
import { ICardList } from './type';
import Card from '../card/Card';

export default function CardList({ payloads }: ICardList) {
  return (
    <ScrollView testID={TestId.post.cardList}>
      {payloads.map((payload) => {
        return (
          <Card
            payload={payload}
            key={`${payload.people}${payload.subTitle}`}
          />
        );
      })}
    </ScrollView>
  );
}
