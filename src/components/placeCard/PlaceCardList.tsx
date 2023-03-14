import React from 'react';
import { ScrollView } from 'react-native';

import type { PlaceCardListProps } from '@type/component.placecard';
import usePlaceQuery from '@hooks/query/usePlaceQuery';
import { makeStyles } from '@rneui/themed';
import PlaceCardItem, { PlaceCardItemSkeleton } from './PlaceCardItem';

function PlaceCardList({ meetingId }: PlaceCardListProps) {
  const { container } = useStyles();
  const { places } = usePlaceQuery(meetingId);

  if (!places) {
    return <PlaceCardItemSkeleton />;
  }

  return (
    <ScrollView nestedScrollEnabled style={container}>
      {places.contents.map(item => (
        <PlaceCardItem
          content={{ ...item, meetingId }}
          key={item.meetingPlaceId}
        />
      ))}
    </ScrollView>
  );
}

const useStyles = makeStyles(() => ({
  container: { maxHeight: 200, overflow: 'hidden' },
}));

export default PlaceCardList;
