import React, { useEffect } from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import Calendar from '@components/calendar/Calendar';

import { requestGetMeetingDetail } from '@api/meeting/meetings';
import { useNavigation } from '@react-navigation/native';
import { requestGetDateVoting } from '@api/meeting/voting';
import LoadingComponent from '@components/calendar/LoadingComponent';

import { useQuery } from 'react-query';
import { RootStackScreenProps } from '@type/navigation';
import { QueryKeys } from '@api/queryClient';

import MemberBox from '../components/member/MemberBox';
import { Title, TitleName } from './meeting/detail/common';

function SelectCalendar({
  route: {
    params: { meetingId },
  },
}: RootStackScreenProps<'SelectCalendar'>) {
  const styles = useStyles();
  const navigation = useNavigation();
  const { data: meetingDetail } = useQuery(
    [QueryKeys.meetingDetail, meetingId],
    () => requestGetMeetingDetail(meetingId),
  );
  const { data: votingDetail } = useQuery([QueryKeys.voting, meetingId], () =>
    requestGetDateVoting(meetingId),
  );
  const startFrom = meetingDetail?.meetingMetaData.calendar.startFrom;
  const endTo = meetingDetail?.meetingMetaData.calendar.endTo;
  const totalUsers = meetingDetail?.members.length;

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

      <Title title={TitleName.date} />
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

export default SelectCalendar;

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
}));
