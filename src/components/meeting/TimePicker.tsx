import React, { useState } from 'react';

import { Platform, View } from 'react-native';
import Button from '@components/button/Buttons';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import type { TimePickerProps } from '@type/meeting.date';
import { promiseFlow } from '@utils/promise';
import { requestPostMeetingTime } from '@api/meeting/meetings';
import type {
  PostMeetingTimePayalod,
  PostMeetingTimeResponse,
} from '@type/api.meeting';
import { successAlert } from '@utils/alert';
import { createTimeFormat } from '@utils/fn';
import { makeStyles } from '@rneui/themed';

const requestAPI = (meetingId: number) => (meetingStartTime: string) => {
  promiseFlow<PostMeetingTimePayalod, PostMeetingTimeResponse>(
    { meetingId, meetingStartTime },
    [requestPostMeetingTime],
    {
      onSuccess: () => {
        successAlert(`장소 시간이 변경되었습니다!`);
      },
    },
  );
};

export default function TimePicker({ meetingId }: { meetingId: number }) {
  const platform = Platform.OS;
  const onSubmitHandler = requestAPI(meetingId);

  if (platform === 'android') {
    return <TimePickerAndroid onSubmit={onSubmitHandler} />;
  }

  return <TimePickerIos onSubmit={onSubmitHandler} />;
}

function TimePickerIos({ onSubmit }: TimePickerProps) {
  const [date, setDate] = useState(new Date());

  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode="time"
      onChange={(event, selectedDate) => {
        if (selectedDate && event.type === 'set') {
          const time = createTimeFormat(selectedDate);

          setDate(selectedDate);
          onSubmit(time.payload);
        }
      }}
    />
  );
}

function TimePickerAndroid({ onSubmit }: TimePickerProps) {
  const styles = useStyles();
  const [date, setDate] = useState(new Date());
  const [timeFormat, setTimeFormat] = useState(
    createTimeFormat(date).formatted,
  );
  const onPressHandler = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (event, selectedDate) => {
        if (selectedDate && event.type === 'set') {
          const time = createTimeFormat(selectedDate);

          setDate(selectedDate);
          onSubmit(time.payload);
          setTimeFormat(time.formatted);
        }
      },
      mode: 'time',
      is24Hour: true,
    });
  };

  return (
    <View>
      <Button
        onPress={onPressHandler}
        text={timeFormat}
        buttonStyle={styles.timePickerAndroidButton}
        textStyle={styles.timePickerAndroidButtonText}
      />
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  timePickerAndroidButton: {
    height: 38,
    backgroundColor: theme.colors.primary,
  },
  timePickerAndroidButtonText: {
    fontSize: 14,
  },
}));
