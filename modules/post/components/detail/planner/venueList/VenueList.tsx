import { View } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

import TestId from '@shared/constants/testIds';
import { requestMeetingPlaces } from '@post/api/v1';
import useDetailManagement from '@post/hooks/useDetailManagement';
import { QueryKeys } from '@app/api/type';
import Venue from '../venue/Venue';
import VenueListSkeleton from '../venue/skeleton/Skeleton';

export default function VenueList() {
  const {
    detailState: { postId },
  } = useDetailManagement();
  const { data: meetingPlaces } = useQuery({
    queryKey: QueryKeys.venueList(postId),
    queryFn: ({ signal }) => requestMeetingPlaces(postId, signal),
  });

  if (!meetingPlaces) {
    return <VenueListSkeleton />;
  }

  return (
    <View testID={TestId.post.venueList}>
      {meetingPlaces.contents.map((payload) => {
        return <Venue data={payload} key={payload.order} />;
      })}
    </View>
  );
}
