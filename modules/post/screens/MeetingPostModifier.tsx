import { ScrollView } from 'react-native';
import React from 'react';

import TestId from '@shared/constants/testIds';
import { MeetingPostListParamList } from '@post/navigation/type';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@app/api/type';
import { requestGetMeetingDetail } from '@post/api/v2';
import Uploader from '@post/components/modification/uploader/Uploader';
import MeetingName from '@post/components/modification/meetingName/MeetingName';
import VotingTimeRangePicker from '@post/components/modification/votingTimeRangePicker/VotingTimeRangePicker';
import { convertDateRangeToDateInfo } from '@shared/utils';

export default function MeetingPostModifier({
  route: {
    params: { id },
  },
}: NativeStackScreenProps<
  MeetingPostListParamList,
  'MeetingPostModification'
>) {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.post, id],
    queryFn: ({ signal }) => requestGetMeetingDetail(id, signal),
  });

  return (
    <ScrollView testID={TestId.post.modifier} bounces={false}>
      <Uploader
        isLoad={isLoading}
        imageUrl={data?.meetingMetaData.thumbnailImageUrl}
      />
      <MeetingName
        isLoad={isLoading}
        meetingName={data?.meetingMetaData.meetingName}
      />
      <VotingTimeRangePicker
        isLoad={isLoading}
        prevRange={convertDateRangeToDateInfo(data?.meetingMetaData.calendar)}
      />
    </ScrollView>
  );
}
