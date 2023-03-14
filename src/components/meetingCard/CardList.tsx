import React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { makeStyles } from '@rneui/themed';

import fn from '@utils/fn';
import useRefreshBy from '@hooks/query/useRefresh';
import useMeetingQuery from '@hooks/query/useMeetingQuery';
import useRefreshOnFocus from '@hooks/query/useRefreshOnFocus';
import Card, { CardSkeleton } from './Card';

// 모임 관리 리스트
function CardList() {
  const styles = useStyles();
  const { sliceResponse, refetch } = useMeetingQuery();
  const { isRefetching, onRefresh } = useRefreshBy(refetch);

  useRefreshOnFocus(refetch);

  if (fn.isEmpty(sliceResponse)) {
    return <CardListSkeleton />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
      }
    >
      <View style={styles.cardContianer}>
        {sliceResponse.contents.map(item => {
          return <Card cardItem={item} key={item.meetingId} />;
        })}
      </View>
    </ScrollView>
  );
}

export function CardListSkeleton() {
  const styles = useStyles();

  return (
    <ScrollView>
      <View style={styles.cardContianer}>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </View>
    </ScrollView>
  );
}

const useStyles = makeStyles(() => ({
  cardContianer: {
    alignItems: 'center',
  },
}));

export default CardList;
