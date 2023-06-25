import { ScrollView } from 'react-native';
import React from 'react';

import TestId from '@shared/constants/testIds';
import Duration from '@post/components/detail/duration/Duration';
import Participants from '@post/components/detail/participants/Participants';
import Planner from '@post/components/detail/planner/Planner';
import mockMembers from '@post/mocks/members';
import mockVenueList from '@post/mocks/venueList';
import mockDuration from '@post/mocks/duration';

export default function MeetingPostViewer() {
  return (
    <ScrollView testID={TestId.post.detail}>
      <Participants users={mockMembers} />
      <Duration range={mockDuration.range} time={mockDuration.time} />
      <Planner venueList={mockVenueList} />
    </ScrollView>
  );
}
