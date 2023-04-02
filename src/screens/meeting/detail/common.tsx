import React, { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

import fn, { createTimeFormat } from '@utils/fn';
import Font, { BoldFont } from '@components/Font';
import { makeStyles } from '@rneui/themed';
import type { Places } from '@type/screen.meeting';
import MapView from 'react-native-maps';
import usePlace from '@hooks/redux/usePlace';
import { MapRegion } from '@type/index';
import {
  BottomTabScreenNavigation,
  PlaceSelectNavigation,
  RootNavigation,
  RootStackScreenProps,
} from '@type/navigation';
import { GetMeetingDetailResponse } from '@type/api.meeting';
import { Pressable, ScrollView, View } from 'react-native';
import { ScrrenLayout } from '@components/Layout';

interface Title {
  title: string;
}

interface Container {
  children: React.ReactNode;
  FixedItem: JSX.Element;
}

interface TimeProps {
  date: Date;
  type?: 'View' | 'Pressable';
  onPress?: () => void;
  style?: {
    color: string;
  };
}

export function Title({ title }: Title) {
  const styles = useStyles();

  return <BoldFont style={styles.titleText}>{title}</BoldFont>;
}

export function Container({ children, FixedItem }: Container) {
  const styles = useStyles();

  return (
    <ScrrenLayout>
      {FixedItem}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>{children}</View>
      </ScrollView>
    </ScrrenLayout>
  );
}

export function Time({ date, type = 'View', onPress, style }: TimeProps) {
  const styles = useStyles();
  const Component = type === 'View' ? View : Pressable;

  return (
    <Component onPress={onPress} style={styles.timeContainer}>
      <Font style={[styles.timeText, style]}>
        {createTimeFormat(date).formatted}
      </Font>
    </Component>
  );
}

const useStyles = makeStyles(() => ({
  titleText: {
    fontSize: 16,
  },

  content: {
    alignItems: 'center',
  },
  timeContainer: {
    width: 90,
    height: 35,
    backgroundColor: '#DEDEE0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    color: 'white',
  },
}));
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

export function useSetTitleCommon(
  navigation:
    | BottomTabScreenNavigation
    | PlaceSelectNavigation
    | RootNavigation,
  title: string,
) {
  useEffect(() => {
    if (!title) return;

    navigation.setOptions({
      title,
    });
  }, [navigation, title]);
}

export const requestAPI =
  (
    request: (fn: { meetingId: number; meetingStartTime: string }) => void,
    meetingId: number,
  ) =>
  (payload: string) => {
    request({ meetingId, meetingStartTime: payload });
  };
