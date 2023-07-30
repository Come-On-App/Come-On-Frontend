import React from 'react';

import { postCreatorPayload } from '@post/payload/postPayload';
import TimeRange from '@post/components/timeRange/TimeRange';
import updateDateRange from '@post/components/modification/util/updateDateRange';

const TITLE = '투표 기간';
const DESCRIPTION = '날짜 범위를 선택해 주세요';
const OVERWRITE = true;

export default function VotingTimeRangePicker() {
  return (
    <TimeRange
      payloadType="creator"
      title={TITLE}
      description={DESCRIPTION}
      onPressDay={(setRange) => {
        postCreatorPayload.observe(
          ({ meetingDateRange }) => updateDateRange(meetingDateRange, setRange),
          'post_observe_range',
          OVERWRITE,
        );
      }}
    />
  );
}
