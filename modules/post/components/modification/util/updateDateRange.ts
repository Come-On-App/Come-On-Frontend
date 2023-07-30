import { formatDateRange } from '@shared/utils';
import type { Dispatch, SetStateAction } from 'react';
import type { MeetingDateRange } from '@post/payload/postPayload';

export default function updateDateRange(
  { startFrom, endTo }: MeetingDateRange,
  setRange: Dispatch<SetStateAction<string | null>>,
) {
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
}
