import React from 'react';
import { View } from 'react-native';

import { ScreenTitle } from '@shared/components/font/Font';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ContentHeader from '@shared/components/layout/ContentHeader';
import VenueList from './venueList/VenueList';
import AddVenue from './addVenue/AddVenue';
import { Iplanner } from './type';

const TITLE = '모임 장소';

export default function Planner({ venueList }: Iplanner) {
  return (
    <DividerWrapper>
      <ScreenLayout>
        <ContentHeader>
          <ScreenTitle>{TITLE}</ScreenTitle>
        </ContentHeader>
        {/* <Map /> */}
        <View>
          <VenueList data={venueList} />
          <AddVenue />
        </View>
      </ScreenLayout>
    </DividerWrapper>
  );
}
