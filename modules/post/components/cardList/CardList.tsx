import { ScrollView } from 'react-native';
import React from 'react';
import _ from 'lodash';

import TestId from '@shared/constants/testIds';
import { ICardList } from './type';
import Card from '../card/Card';
import { SEARCH_ADN_CREATE_HEIGHT } from '../search/searchAndCreate/style';

// TODO: key 속성 처리하기
export default function CardList({ payloads = [] }: ICardList) {
  return (
    <ScrollView
      testID={TestId.post.cardList}
      contentContainerStyle={{ paddingBottom: SEARCH_ADN_CREATE_HEIGHT }} // 카드 리스트의 하단이 잘리는 이슈 방지
    >
      {payloads.map((payload) => {
        return <Card payload={payload} key={`${_.random(true)}`} />;
      })}
    </ScrollView>
  );
}
