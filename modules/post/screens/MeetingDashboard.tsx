import React from 'react';
import { View } from 'react-native';

import TestId from '@shared/constants/testIds';
import SearchAndCreateBar from '@post/components/searchAndCreate/SearchAndCreateBar';
import CardList from '@post/components/cardList/CardList';
import DB from './mockDB';

function MeetingDashboard() {
  return (
    <View testID={TestId.post.list}>
      <SearchAndCreateBar />
      <CardList payloads={DB} />
    </View>
  );
}

export default MeetingDashboard;
