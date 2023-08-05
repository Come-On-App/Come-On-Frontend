import React from 'react';

import DateRange from '@post/components/dateRange/DateRange';
import usePostManagement from '@post/hooks/usePostManagement';

const TITLE = '투표 기간 수정';
const DESCRIPTION = '날짜 범위 불러오는중...';
const DESCRIPTION2 = '날짜 범위를 선택해 주세요';

export interface IvotingTimeRangePicker {
  isDataLoading: boolean;
}

export default function VotingTimeRangePicker({
  isDataLoading,
}: IvotingTimeRangePicker) {
  const {
    postState: { dateRange },
  } = usePostManagement();

  return (
    <DateRange
      dateRange={dateRange}
      disabled={isDataLoading}
      title={TITLE}
      description={isDataLoading ? DESCRIPTION : DESCRIPTION2}
    />
  );
}
