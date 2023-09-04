import { ScrollView } from 'react-native';
import React from 'react';
import { isEmpty } from 'lodash';

import TestId from '@shared/constants/testIds';
import { ICardList } from './type';
import Card from '../card/Card';
import { SEARCH_ADN_CREATE_HEIGHT } from '../search/searchAndCreate/style';
import EmptyCardList from '../emptyCardList/EmptyCardList';
import { ICardInfo } from '../card/type';

export default function CardList({ payload = [] }: ICardList) {
  if (isEmpty(payload)) {
    return <EmptyCardList />;
  }

  const renderCardItem = (cardInfo: ICardInfo) => (
    <Card payload={cardInfo} key={cardInfo.id} />
  );

  return (
    <ScrollView
      testID={TestId.post.cardList}
      contentContainerStyle={{ paddingBottom: SEARCH_ADN_CREATE_HEIGHT }} // 카드 리스트의 하단이 잘리는 이슈 방지
    >
      {payload.map(renderCardItem)}
    </ScrollView>
  );
}
