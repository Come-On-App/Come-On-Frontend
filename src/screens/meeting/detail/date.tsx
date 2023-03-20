import React, { memo, useEffect, useState } from 'react';
import { View } from 'react-native';

import Layout from '@components/Layout';
import Font from '@components/Font';
import Button from '@components/button/Buttons';
import Icon from '@components/Icon';
import { makeStyles } from '@rneui/themed';
import type {
  DateProps,
  DateMainProps,
  DateMainLeftProps,
  DateBottomProps,
} from '@type/meeting.date';
import TimePicker from '@components/meeting/TimePicker';
import useMeetingTimeQuery from '@hooks/query/useMeetingTimeQuery';
import useMeetingTimeMutation from '@hooks/query/useMeetingTimeMutation';
import { TitleName, Title, text } from './common';

// 모임 기간
function MeetingDate({ calendar, meetingId, navigation }: DateProps) {
  return (
    <Layout>
      <DateTop />
      <DateMain calendar={calendar} meetingId={meetingId} />
      <DateBottom meetingId={meetingId} navigation={navigation} />
    </Layout>
  );
}

function DateTop() {
  return <Title title={TitleName.date} />;
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
          {text.calendar(calendar)}
        </Font>
      </View>
    </View>
  );
}

const requestAPI =
  (
    request: (test: { meetingId: number; meetingStartTime: string }) => void,
    meetingId: number,
  ) =>
  (payload: string) => {
    request({ meetingId, meetingStartTime: payload });
  };

function DateMainRight({ meetingId }: { meetingId: number }) {
  const styles = useStyles();
  const { meetingTime } = useMeetingTimeQuery(meetingId);
  const { postMeetingTime } = useMeetingTimeMutation(meetingId);
  const onSubmitHandler = requestAPI(postMeetingTime, meetingId);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (meetingTime) {
      setDate(new Date(meetingTime));
    }
  }, [meetingTime]);

  return (
    <View style={styles.dateMainRightLayout}>
      <View style={styles.dateMainRightContainer}>
        <TimePicker meetingTime={date} onSubmit={onSubmitHandler} />
        {/* <View
          style={{
            width: 90,
            height: 35,
            backgroundColor: '#DEDEE0',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Font style={{ color: 'white' }}>
            {createTimeFormat(date).formatted}
          </Font>
        </View> */}
      </View>
    </View>
  );
}

function DateBottom({ meetingId, navigation }: DateBottomProps) {
  const styles = useStyles();
  const onPressHandler = () => {
    navigation.navigate('MeetingRoomCalendar', { meetingId });
  };

  return (
    <View style={styles.dateBottomLayout}>
      <Button
        bold
        text={text.voteBtn}
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
