import { ScrollView } from 'react-native';
import React, { useEffect } from 'react';

import TestId from '@shared/constants/testIds';
import Duration from '@post/components/detail/duration/Duration';
import Participants from '@post/components/detail/participants/Participants';
import Planner from '@post/components/detail/planner/Planner';
import mockVenueList from '@post/mocks/venueList';
import { PostNativeStack } from '@post/navigation/type';
import useDetailManagement from '@post/hooks/useDetailManagement';

export default function MeetingPostDetail({
  route: { params },
}: PostNativeStack<'MeetingPostDetail'>) {
  const { dispatchCurrentPostId } = useDetailManagement();

  useEffect(() => {
    dispatchCurrentPostId(params.id);
  }, [dispatchCurrentPostId, params.id]);

  return (
    <ScrollView testID={TestId.post.detail}>
      <Participants />
      <Duration />
      <Planner venueList={mockVenueList} />
    </ScrollView>
  );
}
