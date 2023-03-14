import React from 'react';
import { ScrollView, View } from 'react-native';
import { makeStyles } from '@rneui/themed';

import Card, { CardSkeleton } from './Card';
import type { CardListProps } from '../../types';

function CardList({ cardItems }: CardListProps) {
  const styles = useStyles();

  return (
    <ScrollView>
      <View style={styles.cardContianer}>
        {cardItems.map(item => {
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
