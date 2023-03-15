import React from 'react';
import Layout from '@components/Layout';
import Label from '@components/input/Label';
import DateContainer from '@components/meeting/DateContainer';
import { useQuery } from 'react-query';
import { requestGetMeetingDetail } from '@api/meeting/meetings';
// 모임 기간
export default function Date({
  meetingId,
  onPressOut,
  onPressLabel,
}: {
  meetingId: number;
  onPressLabel: () => void;
  onPressOut: (
    openTime: boolean,
    setOpenTime: React.Dispatch<React.SetStateAction<boolean>>,
    time: string,
  ) => void;
}) {
  const { data } = useQuery(['meetingDetail'], () =>
    requestGetMeetingDetail(meetingId),
  );

  if (!data) return null;

  return (
    <Layout>
      <Label>모임기간</Label>
      <DateContainer
        startTime={data.meetingMetaData.meetingStartTime}
        startFrom={data.meetingMetaData.calendar.startFrom}
        endTo={data.meetingMetaData.calendar.endTo}
        onPressOut={onPressOut}
        onPressLabel={onPressLabel}
      />
    </Layout>
  );
}
