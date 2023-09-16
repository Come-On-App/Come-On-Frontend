import React from 'react';
import { View } from 'react-native';

import { ScreenTitle } from '@shared/components/font/Font';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ContentHeader from '@shared/components/layout/ContentHeader';
import VenueList from './venueList/VenueList';
import AddVenue from './addVenue/AddVenueButton';

const TITLE = '모임 카드';

export default function Planner() {
  return (
    <DividerWrapper>
      <ScreenLayout>
        <ContentHeader>
          <ScreenTitle>{TITLE}</ScreenTitle>
        </ContentHeader>
        {/* <Map /> */}
        <View>
          <VenueList />
          <AddVenue />
        </View>
      </ScreenLayout>
    </DividerWrapper>
  );
}
