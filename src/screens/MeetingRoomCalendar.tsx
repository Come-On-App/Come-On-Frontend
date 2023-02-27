import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
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
import Label from '../components/input/Label';
import MemberBox from '../components/member/MemberBox';

function MeetingRoomCalendar() {
  const styles = useStyles();
  const navigation = useNavigation();
  const [closeTime, setCloseTime] = useState(false);
  const [meetingData, setMeetingData] = useState<GetMeetingDetailResponse>();
  const [votingData, setVotingData] = useState<GetDateVotingResponse>();
  const getMeetingData = () => {
    requestGetMeetingDetail(10).then(data => setMeetingData(data));
  };
  const getVotingData = () => {
    requestGetDateVoting(10).then(data => setVotingData(data));
  };
  const startFrom = meetingData?.meetingMetaData.calendar.startFrom;
  const endTo = meetingData?.meetingMetaData.calendar.endTo;
  const totalUsers = meetingData?.members.length;

  useEffect(() => {
    getMeetingData();
  }, []);

  useEffect(() => {
    getVotingData();
  }, []);

  useEffect(() => {
    if (meetingData) {
      navigation.setOptions({
        title: meetingData.meetingMetaData.meetingName,
      });
    }
  }, [meetingData, navigation]);

  return meetingData ? (
    <TouchableWithoutFeedback onPress={() => setCloseTime(!closeTime)}>
      <View style={styles.container}>
        <View>
          <MemberBox
            hostId={meetingData.meetingMetaData.hostUser.userId}
            meetingUsers={meetingData.members}
          />
        </View>

        <Label>모임기간</Label>
        <Calendar
          type="DEFAULT"
          data={votingData}
          totalUsers={totalUsers}
          startFrom={startFrom}
          endTo={endTo}
        />
      </View>
    </TouchableWithoutFeedback>
  ) : (
    <LoadingComponent />
  );
}

export default MeetingRoomCalendar;

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
}));
