import React from 'react';
import { Card as RneCard, makeStyles, Skeleton } from '@rneui/themed';

import fn from '@utils/fn';
import { View } from 'react-native';
import CardTopInfo from './CardTop';
import type { CardProps } from '../../types';
import { CardSubTitle, CardTitle } from './CardText';

export default function Card({ cardItem }: CardProps) {
  const styles = useStyles();

  return (
    <RneCard
      wrapperStyle={styles.cardWrapper}
      containerStyle={styles.cardContainer}
    >
      <RneCard.Image
        style={styles.cardImage}
        source={{ uri: cardItem.meetingImageUrl }}
      >
        <CardTopInfo
          people={cardItem.memberCount}
          isDecided={!fn.isEmpty(cardItem.fixedDate)}
        />
      </RneCard.Image>
      <CardTitle titleText={cardItem.meetingName} />
      <CardSubTitle
        userText={cardItem.hostUser.nickname}
        dateRange={{
          calendarStartFrom: cardItem.calendarStartFrom,
          calendarEndTo: cardItem.calendarEndTo,
        }}
      />
    </RneCard>
  );
}

export function CardSkeleton() {
  const config = {
    title: {
      width: 115,
      height: 25,
    },
    subTitle: {
      width: 300,
      height: 20,
    },
    titleMargin: { marginBottom: 5 },
    cardMargin: { marginBottom: 10 },
  };
  const styles = useStyles();

  return (
    <View style={[styles.cardContainer, config.cardMargin]}>
      <Skeleton style={styles.cardImage} />
      <Skeleton
        width={config.title.width}
        height={config.title.height}
        style={config.titleMargin}
      />
      <Skeleton width={config.subTitle.width} height={config.subTitle.height} />
    </View>
  );
}

const useStyles = makeStyles(() => ({
  cardWrapper: {},
  cardContainer: {
    width: '100%',
    height: 255,
    marginBottom: 2.5,
    padding: 0,
    elevation: 0,
    borderWidth: 0,
    shadowOpacity: 0,
  },
  cardImage: {
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
}));
