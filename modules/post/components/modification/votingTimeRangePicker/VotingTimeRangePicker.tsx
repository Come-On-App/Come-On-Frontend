import React, { useEffect } from 'react';

import {
  MeetingDateRange,
  postModifierPayload,
} from '@post/payload/postPayload';
import TimeRange from '@post/components/timeRange/TimeRange';
import updateDateRange from '../util/updateDateRange';

const TITLE = '투표 기간 수정';
const DESCRIPTION = '날짜 범위 불러오는중...';
const DESCRIPTION2 = '날짜 범위를 선택해 주세요';
const OVERWRITE = true;

export interface IvotingTimeRangePicker {
  isLoad: boolean;
  prevRange: MeetingDateRange;
}

export default function VotingTimeRangePicker({
  isLoad,
  prevRange,
}: IvotingTimeRangePicker) {
  useEffect(() => {
    if (!isLoad) {
      postModifierPayload.update(() => ({
        meetingDateRange: prevRange,
      }));
    }
  }, [isLoad, prevRange]);

  return (
    <TimeRange
      prevRange={prevRange}
      payloadType="modifier"
      disabled={isLoad}
      title={TITLE}
      description={isLoad ? DESCRIPTION : DESCRIPTION2}
      onPressDay={(setRange) => {
        postModifierPayload.observe(
          ({ meetingDateRange }) => updateDateRange(meetingDateRange, setRange),
          'post_observe_range',
          OVERWRITE,
        );
      }}
    />
  );
}
