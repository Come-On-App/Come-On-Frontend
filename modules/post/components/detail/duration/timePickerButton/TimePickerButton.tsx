import React from 'react';
import { Platform } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import RNDateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';

import {
  formatTime,
  formatTimeWithAMPM,
  formatTimeWithDate,
} from '@shared/utils';
import Font from '@shared/components/font/Font';
import { Button } from '@rneui/themed';
import { requestPostMeetingTime } from '@post/api/v1';
import useDetailManagement from '@post/hooks/useDetailManagement';
import { setQueryData } from '@app/api/queryClient';
import { GetMeetingDetailResponse } from '@post/api/v2/type';
import { QueryKeys } from '@app/api/type';
import { PostMeetingTimePayalod } from '@post/api/v1/type';
import { ItimePickerButton } from './type';
import useStyles from './style';

const TOAST_CONFIG = {
  type: 'success',
  text1: '모임 시간이 성공적으로 업데이트 되었습니다 🎉',
};

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
  const { mutate } = useMutation(requestPostMeetingTime, {
    onMutate: (payload) => {
      setQueryData<GetMeetingDetailResponse>(
        QueryKeys.postDetail(payload.meetingId),
        (oldData) => updateMeetingStartTime(oldData, payload),
      );
    },
    onSuccess: () => {
      Toast.show(TOAST_CONFIG);
    },
  });
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

const updateMeetingStartTime = (
  oldData: GetMeetingDetailResponse | undefined,
  payload: PostMeetingTimePayalod,
): GetMeetingDetailResponse | undefined => {
  if (!oldData) return oldData;

  return {
    ...oldData,
    meetingMetaData: {
      ...oldData.meetingMetaData,
      meetingStartTime: payload.meetingStartTime,
    },
  };
};
