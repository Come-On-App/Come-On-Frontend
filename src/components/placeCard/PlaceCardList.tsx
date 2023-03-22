import React from 'react';
import { View } from 'react-native';

import type { PlaceCardListProps } from '@type/component.placecard';
import usePlaceQuery from '@hooks/query/usePlaceQuery';
import PlaceCardItem, { PlaceCardItemSkeleton } from './PlaceCardItem';

function PlaceCardList({ meetingId }: PlaceCardListProps) {
  const { places } = usePlaceQuery(meetingId);

  if (!places) {
    return <PlaceCardItemSkeleton />;
  }

  return (
    <View>
      {places.contents.map(item => (
        <PlaceCardItem
          content={{ ...item, meetingId }}
          key={item.meetingPlaceId}
        />
      ))}
    </View>
  );
}

export default PlaceCardList;
