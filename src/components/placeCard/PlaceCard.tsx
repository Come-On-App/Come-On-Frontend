import React, { memo } from 'react';

import type { PlaceCardProps } from '@type/component.placecard';
import PlaceAddButton from './PlaceAddButton';
import PlaceCardList from './PlaceCardList';

function PlaceCard({ meetingId, navigation }: PlaceCardProps) {
  return (
    <>
      <PlaceCardList meetingId={meetingId} />
      <PlaceAddButton meetingId={meetingId} navigation={navigation} />
    </>
  );
}

export default memo(PlaceCard);
