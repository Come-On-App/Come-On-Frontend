import React from 'react';

import { formatDateRange } from '@shared/utils';
import { postCreatorPayload } from '@post/payload/postPayload';
import TimeRange from '@post/components/timeRange/TimeRange';

const TITLE = '투표 기간';
const DESCRIPTION = '날짜 범위를 선택해 주세요';
const OVERWRITE = true;

export default function VotingTimeRangePicker() {
  return (
    <TimeRange
      prevRange={null}
      title={TITLE}
      description={DESCRIPTION}
      onPressDay={(setRange) => {
        postCreatorPayload.observe(
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
