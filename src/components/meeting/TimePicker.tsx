import React, { useState } from 'react';

import { Platform, TouchableWithoutFeedback, View } from 'react-native';
import Button from '@components/button/Buttons';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import type { TimePickerProps } from '@type/meeting.date';

import { createTimeFormat } from '@utils/fn';
import { makeStyles } from '@rneui/themed';

export default function TimePicker({
  meetingTime,
  onSubmit,
}: {
  meetingTime: Date;
  onSubmit: (meetingStartTime: string) => void;
}) {
  if (Platform.OS === 'android') {
    return <TimePickerAndroid onSubmit={onSubmit} time={meetingTime} />;
  }

  return (
    <TouchableWithoutFeedback onPress={() => undefined}>
      <TimePickerIos onSubmit={onSubmit} time={meetingTime} />
    </TouchableWithoutFeedback>
  );
}

function TimePickerIos({ onSubmit, time }: TimePickerProps) {
  return (
    <DateTimePicker
      value={time}
      mode="time"
      onChange={(event, selectedDate) => {
        if (selectedDate && event.type === 'set') {
          const timeFormat = createTimeFormat(selectedDate);

          onSubmit(timeFormat.payload);
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
