import React from 'react';
import { Card as RneCard, makeStyles } from '@rneui/themed';

import CardTopInfo from './CardTop';
import { CardProps } from '../../types';
import { CardSubTitle, CardTitle } from './CardText';

function Card({ cardItem }: CardProps) {
  const styles = useStyles();

  return (
    <RneCard
      wrapperStyle={styles.cardWrapper}
      containerStyle={styles.cardContainer}
    >
      <RneCard.Image style={styles.cardImage} source={{ uri: cardItem.path }}>
        <CardTopInfo
          people={cardItem.people.member}
          isDecided={cardItem.people.isDecided}
        />
      </RneCard.Image>
      <CardTitle titleText={cardItem.title} />
      <CardSubTitle
        userText={cardItem.subTitle.user}
        dateText={cardItem.subTitle.date}
      />
    </RneCard>
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

export default Card;
