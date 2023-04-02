import React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { makeStyles } from '@rneui/themed';

import fn from '@utils/fn';
import useRefreshBy from '@hooks/query/useRefresh';
import useMeetingQuery from '@hooks/query/useMeetingQuery';
import useRefreshOnFocus from '@hooks/query/useRefreshOnFocus';
import Font from '@components/Font';
import Button from '@components/button/Buttons';
import useGoToScreen from '@hooks/useGoTo';
import { MeetingMode } from '@features/meetingSlice';
import { emptyConfig } from '@constants/config';
import Card, { CardSkeleton } from './Card';

const { text } = emptyConfig;

// 모임 관리 리스트
function CardList() {
  const styles = useStyles();
  const { sliceResponse, refetch } = useMeetingQuery();
  const { isRefetching, onRefresh } = useRefreshBy(refetch);

  useRefreshOnFocus(refetch);

  if (fn.isEmpty(sliceResponse)) {
    return <CardListSkeleton />;
  }

  if (fn.isEmpty(sliceResponse.contents)) {
    return <CardEmpty />;
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

function CardEmpty() {
  const styles = useStyles();
  const { goToCreateMeetingScreen } = useGoToScreen();

  return (
    <View style={[styles.cardContianer, styles.cardEmptyContianer]}>
      <View style={styles.cardEmptyContent}>
        <Button
          bold
          text={text.button.create}
          onPress={() => goToCreateMeetingScreen(MeetingMode.create)}
          buttonStyle={styles.cardEmptyButton}
          height={emptyConfig.height}
        />
        <Font>{text.description}</Font>
      </View>
    </View>
  );
}

const useStyles = makeStyles(() => ({
  cardContianer: {
    alignItems: 'center',
  },
  cardEmptyContianer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardEmptyContent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardEmptyButton: {
    marginBottom: 12,
    width: 190,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default CardList;
