import { View } from 'react-native';
import React from 'react';

import TestId from '@shared/constants/testIds';
import Venue from '../venue/Venue';
import { IvenueList } from './type';

export default function VenueList({ payloads }: IvenueList) {
  return (
    <View testID={TestId.post.venueList}>
      {payloads.map(({ order, info }) => {
        return <Venue order={order} info={info} key={order} />;
      })}
    </View>
  );
}
