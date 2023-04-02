import React, { memo, useEffect, useState } from 'react';
import { View } from 'react-native';

import { MeetingLayout } from '@components/Layout';
import Font from '@components/Font';
import Button from '@components/button/Buttons';
import Icon from '@components/Icon';
import { makeStyles } from '@rneui/themed';
import type {
  DateProps,
  DateMainProps,
  DateMainLeftProps,
  DateBottomProps,
  DateMainRightProps,
} from '@type/meeting.date';
import TimePicker from '@components/meeting/TimePicker';
import useMeetingTimeQuery from '@hooks/query/useMeetingTimeQuery';
import useMeetingTimeMutation from '@hooks/query/useMeetingTimeMutation';
import useMemberQuery, { isHostUser } from '@hooks/query/useMemberQuery';
import useUserQuery from '@hooks/query/useUserQuery';
import { detailConfig } from '@constants/config';
import { Title, Time, requestAPI } from './common';

const { vote } = detailConfig.text;

// 모임 기간
export function MeetingDate({ calendar, meetingId, navigation }: DateProps) {
  return (
    <MeetingLayout>
      <DateTop />
      <DateMain calendar={calendar} meetingId={meetingId} />
      <DateBottom meetingId={meetingId} navigation={navigation} />
    </MeetingLayout>
  );
}

function DateTop() {
  return <Title title={detailConfig.text.date} />;
}

function DateMain({ calendar, meetingId }: DateMainProps) {
  const styles = useStyles();

  return (
    <View style={styles.dateMainContainer}>
      <DateMainLeft calendar={calendar} />
      <DateMainRight meetingId={meetingId} />
    </View>
  );
}

function DateMainLeft({ calendar }: DateMainLeftProps) {
  const styles = useStyles();
  const { color, size } = styles.dateMainLeftIcon;

  return (
    <View style={styles.dateMainLeftLayout}>
      <View style={styles.dateMainLeftContainer}>
        <Icon name="calendar-today" size={size} color={color} />
        <Font style={styles.dateMainLeftCalendar}>
          {detailConfig.text.vote.range(calendar)}
        </Font>
      </View>
    </View>
  );
}

function DateMainRight({ meetingId }: DateMainRightProps) {
  const styles = useStyles();
  const [date, setDate] = useState(new Date());
  const [isHost, setIsHost] = useState(false);
  const { user } = useUserQuery();
  const { members } = useMemberQuery(meetingId);
  const { meetingTime } = useMeetingTimeQuery(meetingId);
  const { postMeetingTime } = useMeetingTimeMutation(meetingId);
  const onSubmitHandler = requestAPI(postMeetingTime, meetingId);

  useEffect(() => {
    if (meetingTime) {
      setDate(new Date(meetingTime));
    }
  }, [meetingTime]);

  useEffect(() => {
    if (members && user) {
      setIsHost(isHostUser(members.contents, user.userId));
    }
  }, [members, user]);

  return (
    <View style={styles.dateMainRightLayout}>
      <View style={styles.dateMainRightContainer}>
        {isHost ? (
          <TimePicker meetingTime={date} onSubmit={onSubmitHandler} />
        ) : (
          <Time date={date} />
        )}
      </View>
    </View>
  );
}

function DateBottom({ meetingId, navigation }: DateBottomProps) {
  const styles = useStyles();
  const onPressHandler = () => {
    navigation.navigate('SelectCalendar', { meetingId });
  };

  return (
    <View style={styles.dateBottomLayout}>
      <Button
        bold
        text={vote.button}
        onPress={onPressHandler}
        buttonStyle={styles.dateBottomButton}
      />
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  dateTopTitle: {
    fontSize: 18,
  },
  dateMainContainer: {
    height: 48,
    flexDirection: 'row',
    marginVertical: 5,
    flex: 1,
  },
  dateMainLeftLayout: {
    flex: 0.7,
  },
  dateMainLeftContainer: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateMainLeftCalendar: {
    fontSize: 16,
    marginLeft: 5,
  },
  dateMainLeftIcon: {
    size: 18,
    color: theme.grayscale['500'],
  },
  dateMainRightLayout: {
    flex: 0.3,
    height: '100%',
    justifyContent: 'center',
  },
  dateMainRightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBottomLayout: {
    marginHorizontal: 5,
  },
  dateBottomButton: {
    backgroundColor: theme.colors.secondary,
  },
}));

export default memo(MeetingDate);
