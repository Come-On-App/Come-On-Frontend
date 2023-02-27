/* eslint-disable padding-line-between-statements */
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import useMeeting from '@hooks/useMeeting';
import { usePromiseFlow } from '@utils/promise';
import { RootStackScreenProps } from '@type/navigation';

import useAnimationBounce from '@hooks/useAnim';
import { requestCreateMeetings } from '@api/meeting/meetings';
import GenerateLog from '@utils/GenerateLog';
import { useAppSelector } from '../app/hooks';
import imageUpload, { AssetState } from '../utils/imageUpload';

import CancelButton from '../components/buttons/CancelButton';
import ConfirmButton from '../components/buttons/ConfirmButton';
import InputForm from '../components/input/InputForm';

type MeetingId = {
  meetingId: number;
};

function CreateMeeting(
  this: typeof CreateMeeting,
  { navigation }: RootStackScreenProps<'CreateMeeting'>,
) {
  const log2 = GenerateLog('log', { time: true, hidden: false });
  const data = useAppSelector(state => state.meeting.meetingData);
  const imgPath = useAppSelector(state => state.meeting.meetingImgPath);
  const { meetingName, calendarStartFrom, calendarEndTo } = data;
  const { resetMeetingData } = useMeeting();
  const cancelHandler = () => {
    navigation.goBack();
  };

  const {
    error,
    isSuccess,
    promiseFlow,
    isError,
    data: datas,
  } = usePromiseFlow<AssetState, MeetingId>();

  useEffect(() => {
    if (isSuccess && datas) {
      resetMeetingData();
      navigation.reset({
        index: 1,
        routes: [{ name: 'Root' }, { name: 'MeetingRoom' }],
      });
    }
  }, [datas, error, isError, isSuccess, navigation, resetMeetingData]);

  const ids = ['name', 'image', 'date'];
  const { trigger, AnimationBounceView } = useAnimationBounce([
    'name',
    'image',
    'date',
  ]);

  const onPressConfirm = useCallback(() => {
    if (imgPath?.uri == null) {
      trigger('image');
    } else if (meetingName === '') {
      trigger('name');
    } else if (calendarStartFrom === '' && calendarEndTo === '') {
      trigger('date');
    } else {
      const then2 = (imgUrl: string) => {
        const meetingData = {
          meetingName,
          meetingImageUrl: imgUrl,
          calendarStartFrom,
          calendarEndTo,
        };

        return meetingData;
      };
      promiseFlow(imgPath!, [imageUpload, then2, requestCreateMeetings]);
    }
  }, [
    calendarEndTo,
    calendarStartFrom,
    imgPath,
    meetingName,
    promiseFlow,
    trigger,
  ]);
  // 이름

  return (
    <View style={[styles.container]}>
      <View>
        <InputForm AnimationView={AnimationBounceView} />
      </View>
      <View style={styles.buttons}>
        <CancelButton
          title="취소"
          onPressHandler={cancelHandler}
          style={styles.buttonStyle}
        />
        <ConfirmButton title="확인" onPressHandler={onPressConfirm} />
      </View>
    </View>
  );
}

export default CreateMeeting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    marginRight: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
});
