import React, { useEffect } from 'react';

import { formatDateRange } from '@shared/utils';
import {
  MeetingDateRange,
  postModifierPayload,
} from '@post/payload/postPayload';
import TimeRange from '@post/components/timeRange/TimeRange';

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
      payloadType="modifier"
      disabled={isLoad}
      title={TITLE}
      description={isLoad ? DESCRIPTION : DESCRIPTION2}
      onPressDay={(setRange) => {
        postModifierPayload.observe(
          ({ meetingDateRange: { startFrom, endTo } }) => {
            if (!startFrom) {
              setRange(null);

              return;
            }

            // startFrom이 존재하는 경우, startFrom.dateString을 포맷하여 범위 설정
            if (startFrom) {
              const formattedStartDate = formatDateRange({
                startFrom: startFrom.dateString,
              });

              setRange(formattedStartDate);
            }

            // startFrom과 endTo가 모두 존재하는 경우, 두 날짜를 포맷하여 범위 설정
            if (startFrom && endTo) {
              const formatedDate = formatDateRange({
                startFrom: startFrom.dateString,
                endTo: endTo.dateString,
              });

              setRange(formatedDate);
            }
          },
          'post_observe_range',
          OVERWRITE,
        );
      }}
    />
  );
}
