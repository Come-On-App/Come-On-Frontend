import React, { useCallback, useState } from 'react';
import type { DateData } from 'react-native-calendars';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DividerWrapper from '@shared/components/layout/DividerWrapper';
import { PostDetailNativeStack } from '@post/navigation/type';
import { generateDateRange } from '@shared/utils';
import VoteCalendar from '@post/components/detail/duration/votingStatus/calendar/VoteCalendar';
import VotingStatus from '@post/components/detail/duration/votingStatus/VotingStatus';
import { hapticImpactLight } from '@shared/utils/haptics';
import VoteButton from '@post/components/detail/duration/votingStatus/voteButton/VoteButton';
import useDetailManagement from '@post/hooks/useDetailManagement';
import { useCustomMeetingDetail } from '@post/hooks/useMeetingDetailQuery';
import useDateVotingDetailsQuery from '@post/hooks/useDateVotingDetailsQuery';

const INCLUDE_START_END = true;

export default function MeetingVote({
  route: {
    params: { range, isHost, members },
  },
}: PostDetailNativeStack<'PostDetailVote'>) {
  const { startFrom, endTo } = range;
  const dateRange = generateDateRange(startFrom, endTo, INCLUDE_START_END);
  const [isShow, setShow] = useState(false);
  const [currentDate, setCurrentDate] = useState(startFrom);
  const {
    detailState: { postId },
  } = useDetailManagement();
  const {
    data: { memberCount, myVoting } = {
      date: startFrom,
      memberCount: 0,
      myVoting: false,
      votingUsers: [],
    },
  } = useDateVotingDetailsQuery(postId, currentDate);
  const { data: detail } = useCustomMeetingDetail(postId);
  const { fixedDate } = detail.meetingMetaData;
  const onDayPress = useCallback(
    ({ dateString }: DateData) => {
      if (!dateRange.includes(dateString)) {
        setShow(false);

        return;
      }

      hapticImpactLight();
      setCurrentDate(dateString);
      setShow(true);
    },
    [dateRange],
  );

  return (
    <ScrollView bounces={false}>
      <SafeAreaView>
        <DividerWrapper position="both">
          <VoteCalendar
            range={range}
            fixedDate={fixedDate}
            onDayPress={onDayPress}
          />
          <VotingStatus
            isEnabled={isShow}
            totalMember={members.length}
            myVoting={myVoting}
            voteCount={memberCount}
            dateString={currentDate}
          />
        </DividerWrapper>
        <VoteButton
          myVoting={myVoting}
          currentDate={currentDate}
          fixedDate={fixedDate}
          isFixed={Boolean(fixedDate)}
          isHost={isHost}
          isShow={isShow}
        />
      </SafeAreaView>
    </ScrollView>
  );
}
