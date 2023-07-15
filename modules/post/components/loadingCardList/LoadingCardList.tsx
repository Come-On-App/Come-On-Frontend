import { ScrollView } from 'react-native';
import React from 'react';
import Skeleton from '../card/skeleton/Skeleton';
import { SEARCH_ADN_CREATE_HEIGHT } from '../search/searchAndCreate/style';

export default function LoadingCardList() {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: SEARCH_ADN_CREATE_HEIGHT }}
    >
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </ScrollView>
  );
}
