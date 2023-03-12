import React from 'react';
import { Card as RneCard, makeStyles, Skeleton } from '@rneui/themed';

import fn from '@utils/fn';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { CardProps } from '@type/component.card';
import CardTopInfo from './CardTop';
import { CardSubTitle, CardTitle } from './CardText';

function Card({ cardItem }: CardProps) {
  const {
    meetingImageUrl,
    meetingId,
    memberCount,
    fixedDate,
    myMeetingRole,
    meetingName,
    hostUser,
    calendarStartFrom,
    calendarEndTo,
  } = cardItem;
  const styles = useStyles();
  const navigation = useNavigation();
  const onPressHandler = () => {
    return navigation.navigate('MeetingDetail', {
      meetingId,
    });
  };
  const isDecided = !fn.isEmpty(fixedDate);

  return (
    <RneCard containerStyle={styles.cardContainer}>
      <RneCard.Image
        style={styles.cardImage}
        source={{ uri: meetingImageUrl }}
        onPress={onPressHandler}
      >
        <CardTopInfo
          people={memberCount}
          isDecided={isDecided}
          role={myMeetingRole}
          meetingId={meetingId}
        />
      </RneCard.Image>
      <CardTitle titleText={meetingName} />
      <CardSubTitle
        userText={hostUser.nickname}
        dateRange={{
          calendarStartFrom,
          calendarEndTo,
        }}
      />
    </RneCard>
  );
}

export function CardSkeleton() {
  const styles = useStyles();
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
    cardMargin: { marginBottom: 10, marginTop: 15 },
  };

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

export default React.memo(Card);
