import React, { useCallback, useState } from 'react';

import TestId from '@shared/constants/testIds';
import Calendar from '@shared/components/calendar/Calendar';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import { koFormattedDate } from '@shared/utils';
import { DateInfo } from '@shared/components/calendar/type';
import { postCreatorPayload } from '@post/payload/creatorPayload';
import VoteGuideRobot from '@post/components/creation/voteDateMessage/VoteDateMessage';

export default function MeetingDatePicker() {
  const [startingDate, setStartingDate] = useState<string | null>(null);
  const [endingDate, setEndingDate] = useState<string | null>(null);
  const setFormattedDateRange = useCallback(
    (starting: DateInfo, ending: DateInfo) => {
      postCreatorPayload.update(() => ({
        meetingDateRange: {
          startFrom: starting,
          endTo: ending,
        },
      }));

      if (starting && ending) {
        const [start, end] = koFormattedDate({
          startFrom: starting.dateString,
          endTo: ending.dateString,
        });

        setStartingDate(start);
        setEndingDate(end);

        return;
      }

      const formattedStart = starting
        ? koFormattedDate({ startFrom: starting.dateString })[0]
        : null;

      setStartingDate(formattedStart);
      setEndingDate(ending ? null : ending);
    },
    [],
  );
  const getPrevDateRange = useCallback(
    () => postCreatorPayload.get().meetingDateRange,
    [],
  );

  return (
    <ScreenLayout testID={TestId.post.dateSelector}>
      <Calendar onDayPress={setFormattedDateRange} onLoad={getPrevDateRange} />
      <VoteGuideRobot startingDate={startingDate} endingDate={endingDate} />
    </ScreenLayout>
  );
}
