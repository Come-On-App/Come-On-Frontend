import React from 'react';
import { ScrollView, View } from 'react-native';
import { makeStyles } from '@rneui/themed';

import Card from './Card';
import type { CardListProps } from '../../types';

function CardList({ cardItems }: CardListProps) {
  const styles = useStyles();

  return (
    <ScrollView>
      <View style={styles.cardContianer}>
        <Card cardItem={cardItems[0]} />
        <Card cardItem={cardItems[1]} />
        <Card cardItem={cardItems[2]} />
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
