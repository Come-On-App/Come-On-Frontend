/* eslint-disable padding-line-between-statements */
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import useMeetings from '@hooks/useMeetings';
import { usePromiseFlow } from '@utils/promise';
import { RootStackScreenProps } from '@type/navigation';

import useAnimationBounce from '@hooks/useAnim';
import { requestCreateMeetings } from '@api/meeting/meetings';
import { MeetingId } from '@type/meeting.create';
import imageUpload, { AssetState } from '../utils/imageUpload';

import CancelButton from '../components/button/CancelButton';
import ConfirmButton from '../components/button/ConfirmButton';
import InputForm from '../components/input/InputForm';

enum AnimKey {
  name = 'name',
  image = 'image',
  date = 'date',
}

function CreateMeeting(
  this: typeof CreateMeeting,
  { navigation }: RootStackScreenProps<'CreateMeeting'>,
) {
  const { meetingData, meetingImgPath } = useMeeting();
  const { meetingName, calendarStartFrom, calendarEndTo } = meetingData;
  const { resetMeetingData } = useMeeting();
  const cancelHandler = () => {
    navigation.goBack();
  };

  const { trigger, AnimationBounceView } = useAnimationBounce([
    'name',
    'image',
    'date',
  ]);

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

  const onPressConfirm = useCallback(() => {
    if (meetingImgPath?.uri == null) {
      trigger(AnimKey.image);
    } else if (meetingName === '') {
      trigger(AnimKey.name);
    } else if (calendarStartFrom === '' && calendarEndTo === '') {
      trigger(AnimKey.date);
    } else {
      const then2 = (imgUrl: string) => {
        const data = {
          meetingName,
          meetingImageUrl: imgUrl,
          calendarStartFrom,
          calendarEndTo,
        };

        return data;
      };
      promiseFlow(meetingImgPath!, [imageUpload, then2, requestCreateMeetings]);
    }
  }, [
    calendarEndTo,
    calendarStartFrom,
    meetingImgPath,
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
