import React from 'react';
import { View } from 'react-native';

import { ScreenTitle } from '@shared/components/font/Font';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import Map from './map/Map';
import VenueList from './venueList/VenueList';
import AddVenue from './addVenue/AddVenue';
import { Iplanner } from './type';
import ContentHeader from '../ContentHeader';
import useStyles from './style';

const TITLE = '모임 장소';

export default function Planner({ venueList }: Iplanner) {
  const { cVenueList } = useStyles();

  return (
    <DividerWrapper>
      <ScreenLayout>
        <ContentHeader>
          <ScreenTitle>{TITLE}</ScreenTitle>
        </ContentHeader>
        <Map />
        <View style={cVenueList}>
          <VenueList data={venueList} />
          <AddVenue />
        </View>
      </ScreenLayout>
    </DividerWrapper>
  );
}
