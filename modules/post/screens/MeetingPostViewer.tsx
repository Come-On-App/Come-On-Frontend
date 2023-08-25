import { ScrollView } from 'react-native';
import React from 'react';

import TestId from '@shared/constants/testIds';
import Duration from '@post/components/detail/duration/Duration';
import Participants from '@post/components/detail/participants/Participants';
import Planner from '@post/components/detail/planner/Planner';
import mockVenueList from '@post/mocks/venueList';
import { PostNativeStack } from '@post/navigation/type';

export default function MeetingPostViewer({
  route: { params },
}: PostNativeStack<'MeetingPostDetail'>) {
  return (
    <ScrollView testID={TestId.post.detail}>
      <Participants id={params.id} />
      <Duration id={params.id} />
      <Planner venueList={mockVenueList} />
    </ScrollView>
  );
}
