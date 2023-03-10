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
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { setVotingUpdateEnd } from '@features/socketSlice';
import Label from '../components/input/Label';
import MemberBox from '../components/member/MemberBox';

function MeetingRoomCalendar() {
  const styles = useStyles();
  const meetingId = 130;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const VOTING_UPDATE = useAppSelector(state => state.socket.votingUpdate);
  const [meetingData, setMeetingData] = useState<GetMeetingDetailResponse>();
  const [votingData, setVotingData] = useState<GetDateVotingResponse>();
  const getMeetingData = () => {
    requestGetMeetingDetail(meetingId).then(data => setMeetingData(data));
  };
  const getVotingData = () => {
    requestGetDateVoting(meetingId).then(data => setVotingData(data));
  };
  const startFrom = meetingData?.meetingMetaData.calendar.startFrom;
  const endTo = meetingData?.meetingMetaData.calendar.endTo;
  const totalUsers = meetingData?.members.length;

  useEffect(() => {
    getMeetingData();
    getVotingData();
  }, []);

  useEffect(() => {
    if (VOTING_UPDATE) {
      getMeetingData();
      getVotingData();
      dispatch(setVotingUpdateEnd());
    }
  }, [VOTING_UPDATE, dispatch]);

  useEffect(() => {
    if (meetingData) {
      navigation.setOptions({
        title: meetingData.meetingMetaData.meetingName,
      });
    }
  }, [meetingData, navigation]);

  return meetingData ? (
    <View style={styles.container}>
      <View>
        <MemberBox
          hostId={meetingData.meetingMetaData.hostUser.userId}
          meetingUsers={meetingData.members}
        />
      </View>

      <Label>????????????</Label>
      <Calendar
        type="DEFAULT"
        data={votingData}
        totalUsers={totalUsers}
        startFrom={startFrom}
        endTo={endTo}
        hostId={meetingData.meetingMetaData.hostUser.userId}
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
