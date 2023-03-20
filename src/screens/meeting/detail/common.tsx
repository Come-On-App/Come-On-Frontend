import React, { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

import fn from '@utils/fn';
import { BoldFont } from '@components/Font';
import { makeStyles } from '@rneui/themed';
import { Calendar } from '@type/meeting.date';
import type { Places } from '@type/screen.meeting';
import MapView from 'react-native-maps';
import usePlace from '@hooks/redux/usePlace';
import { MapRegion } from '@type/index';
import { RootStackScreenProps } from '@type/navigation';
import { GetMeetingDetailResponse } from '@type/api.meeting';
import { ScrollView, View } from 'react-native';

interface Title {
  title: TitleName;
}

interface Container {
  children: React.ReactNode;
  FixedItem: JSX.Element;
}

export function Title({ title }: Title) {
  const styles = useStyles();

  return <BoldFont style={styles.titleText}>{title}</BoldFont>;
}

export function Container({ children, FixedItem }: Container) {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {FixedItem}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>{children}</View>
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles(() => ({
  titleText: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 30,
  },
  content: {
    alignItems: 'center',
  },
}));

export enum TitleName {
  date = '모임기간',
  place = '모임장소',
}

export const text = {
  calendar: (calendar: Calendar) => `${calendar.startFrom} ~ ${calendar.endTo}`,
  voteBtn: '날짜 투표하기',
};

const colors = [
  '#fc5c65',
  '#fd9644',
  '#fed330',
  '#2bcbba',
  '#45aaf2',
  '#a55eea',
];

export const getRandomColor = () => colors[fn.random(0, 5)];

export function useFirstRegion(
  places: Places,
  setRegion: Dispatch<SetStateAction<MapRegion>>,
) {
  const ZERO = 0;

  useEffect(() => {
    if (places && places.contentsCount !== ZERO) {
      const firstPlace = places.contents[ZERO];

      setRegion({
        latitude: firstPlace.lat,
        longitude: firstPlace.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [places, setRegion]);
}

export function useMapAnimateToRegion(mapRef: RefObject<MapView>) {
  const { placeState } = usePlace();

  useEffect(() => {
    if (!placeState.meetingPlaceCardMarker || !mapRef.current) return;

    mapRef.current.animateToRegion(placeState.meetingPlaceCardMarker);
  }, [mapRef, placeState.meetingPlaceCardMarker]);
}

export function useSetTitle(
  navigation: RootStackScreenProps<'MeetingDetail'>['navigation'],
  meetingDetail: GetMeetingDetailResponse | undefined,
) {
  useEffect(() => {
    if (!meetingDetail) return;

    navigation.setOptions({
      title: meetingDetail.meetingMetaData.meetingName,
    });
  }, [meetingDetail, navigation]);
}
