import React from 'react';
import { Platform } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import RNDateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import {
  formatTime,
  formatTimeWithAMPM,
  formatTimeWithDate,
} from '@shared/utils';
import Font from '@shared/components/font/Font';
import { Button } from '@rneui/themed';
import { requestPostMeetingTime } from '@post/api/v1';
import useDetailManagement from '@post/hooks/useDetailManagement';
import useStyles from './style';
import { ItimePickerButton } from './type';

export default function TimePickerButton({ time, isHost }: ItimePickerButton) {
  const { button, font } = useStyles(isHost);

  if (!isHost) {
    return (
      <Button
        disabled
        accessibilityHint="TimePickerButtonContainer"
        buttonStyle={button}
        title={<Font style={font}>{formatTimeWithAMPM(time)}</Font>}
      />
    );
  }

  return <DateTimePicker time={time} />;
}

function DateTimePicker({ time }: { time: string }) {
  const { detailState } = useDetailManagement();
  const { button, font } = useStyles();
  const formatedDate = formatTimeWithDate(time);
  const { mutate } = useMutation(requestPostMeetingTime);
  const updateMeetingTime = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    if (selectedDate && event.type === 'set') {
      mutate({
        meetingId: detailState.postId,
        meetingStartTime: formatTime(selectedDate),
      });
    }
  };

  if (Platform.OS === 'android') {
    return (
      <Button
        buttonStyle={button}
        title={<Font style={font}>{formatTimeWithAMPM(time)}</Font>}
        onPress={() => {
          DateTimePickerAndroid.open({
            value: formatedDate,
            onChange: updateMeetingTime,
            mode: 'time',
            is24Hour: true,
          });
        }}
      />
    );
  }

  // iOS 플랫폼
  return (
    <RNDateTimePicker
      value={formatedDate}
      mode="time"
      onChange={updateMeetingTime}
    />
  );
}
