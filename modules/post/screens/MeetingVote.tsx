import React, { useCallback, useState } from 'react';
import type { DateData } from 'react-native-calendars';

import DividerWrapper from '@shared/components/layout/DividerWrapper';
import { PostNativeStack } from '@post/navigation/type';
import { generateDateRange, indexByProperty } from '@shared/utils';
import VoteCalendar from '@post/components/detail/duration/votingStatus/calendar/VoteCalendar';
import VotingStatus from '@post/components/detail/duration/votingStatus/VotingStatus';
import { ScrollView } from 'react-native';
import { hapticImpactLight } from '@shared/utils/haptics';
import VoteButton from '@post/components/detail/duration/votingStatus/voteButton/VoteButton';
import useDetailManagement from '@post/hooks/useDetailManagement';

const INCLUDE_START_END = true;

export default function MeetingVote({
  route: {
    params: { range, isHost, members },
  },
}: PostNativeStack<'MeetingVote'>) {
  const { startFrom, endTo } = range;
  const [isShow, setShow] = useState(false);
  const [currentDate, setCurrentDate] = useState(startFrom);
  const {
    detailState: { fixedDate, votingStatus },
  } = useDetailManagement();
  const dateRange = generateDateRange(startFrom, endTo, INCLUDE_START_END);
  const { getByKey } = indexByProperty(votingStatus.contents, 'date');
  const { myVoting, memberCount } = getByKey(currentDate);
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
    </ScrollView>
  );
}
