import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import Calendar from '@components/calendar/Calendar';

import {
  GetMeetingDetailResponse,
  GetDateVotingResponse,
} from '@type/api.meeting';

import { requestGetMeetingDetail } from '@api/meeting/meetings';
import { useNavigation } from '@react-navigation/native';
import { requestGetDateVoting } from '@api/meeting/voting';
import LoadingComponent from '@components/calendar/LoadingComponent';

import { useAppDispatch, useAppSelector } from '@hooks/redux/hooks';
import { useQuery } from 'react-query';
import { RootStackScreenProps } from '@type/navigation';
import Label from '../components/input/Label';
import MemberBox from '../components/member/MemberBox';

function MeetingRoomCalendar({
  route: {
    params: { meetingId },
  },
}: RootStackScreenProps<'MeetingRoomCalendar'>) {
  const styles = useStyles();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  // const [meetingDetail, setMeetingData] = useState<GetMeetingDetailResponse>();
  const [votingData, setVotingData] = useState<GetDateVotingResponse>();
  const { data: meetingDetail } = useQuery(['meetingDetail'], () =>
    requestGetMeetingDetail(meetingId),
  );
  const { data: votingDetail } = useQuery(['voting', meetingId], () =>
    requestGetDateVoting(meetingId),
  );
  // useEffect(() => {
  //   setMeetingData(MeetingDetail.data);
  // }, [MeetingDetail]);
  // const getMeetingData = () => {
  //   requestGetMeetingDetail(meetingId).then(data => setMeetingData(data));
  // };
  // const getVotingData = () => {
  //   requestGetDateVoting(meetingId).then(data => setVotingData(data));
  // };
  const startFrom = meetingDetail?.meetingMetaData.calendar.startFrom;
  const endTo = meetingDetail?.meetingMetaData.calendar.endTo;
  const totalUsers = meetingDetail?.members.length;

  // useEffect(() => {
  //   setVotingData(VotingDetail.data);
  // }, [VotingDetail.data]);

  useEffect(() => {
    if (meetingDetail) {
      navigation.setOptions({
        title: meetingDetail.meetingMetaData.meetingName,
      });
    }
  }, [meetingDetail, navigation]);

  if (!votingDetail) {
    return null;
  }

  return meetingDetail ? (
    <View style={styles.container}>
      <View>
        <MemberBox
          hostId={meetingDetail.meetingMetaData.hostUser.userId}
          meetingUsers={meetingDetail.members}
          meetingId={meetingId}
        />
      </View>

      <Label>모임기간</Label>
      <Calendar
        type="DEFAULT"
        data={votingDetail}
        totalUsers={totalUsers}
        startFrom={startFrom}
        endTo={endTo}
        hostId={meetingDetail.meetingMetaData.hostUser.userId}
        meetingId={meetingId}
      />
    </View>
  ) : (
    <LoadingComponent />
  );
}

export default MeetingRoomCalendar;

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
}));
