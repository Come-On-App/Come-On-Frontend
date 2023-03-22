import React, { useState } from 'react';

import { Platform } from 'react-native';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import type { TimePickerProps } from '@type/meeting.date';

import { createTimeFormat } from '@utils/fn';
import { Time } from '@screens/meeting/detail/common';

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

  return <TimePickerIos onSubmit={onSubmit} time={meetingTime} />;
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
  const [date, setDate] = useState(new Date());
  const onPressHandler = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (event, selectedDate) => {
        if (selectedDate && event.type === 'set') {
          const time = createTimeFormat(selectedDate);

          setDate(selectedDate);
          onSubmit(time.payload);
        }
      },
      mode: 'time',
      is24Hour: true,
    });
  };

  return <Time type="Pressable" onPress={onPressHandler} date={date} />;
}
