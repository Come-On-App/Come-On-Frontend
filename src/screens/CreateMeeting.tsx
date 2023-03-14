import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import useMeeting from '@hooks/useMeeting';
import { usePromiseFlow } from '@utils/promise';
import { RootStackScreenProps } from '@type/navigation';
import { InputTextProps } from '@type/index';
import apis from '../api';
import { setMeetingName } from '../features/meetingSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
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
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.meeting.meetingData);
  const imgPath = useAppSelector(state => state.meeting.meetingImgPath);
  const { meetingName, calendarStartFrom, calendarEndTo } = data;
  const { resetMeetingData } = useMeeting();
  const cancelHandler = () => {
    navigation.goBack();
  };
  const inputProps: InputTextProps = {
    label: '모임이름',
    placeholder: '모임이름을 입력해주세요!',
    maxLength: 30,
    value: name,
    onChangeText: setName,
    multiline: false,
  };
  const then2 = (imgUrl: string) => {
    const meetingData = {
      meetingName,
      meetingImageUrl: imgUrl,
      calendarStartFrom,
      calendarEndTo,
    };

    return meetingData;
  };
  const {
    error,
    isSuccess,
    promiseFlow,
    isError,
    data: datas,
  } = usePromiseFlow<AssetState, MeetingId>();

  useEffect(() => {
    dispatch(setMeetingName(name));
  }, [dispatch, name]);

  useEffect(() => {
    if (isSuccess && datas) {
      resetMeetingData();
      navigation.navigate('MeetingRoom');
    }
  }, [datas, error, isError, isSuccess, navigation, resetMeetingData]);

  return (
    <View style={styles.container}>
      <View>
        <InputForm inputProps={inputProps} />
      </View>
      <View style={styles.buttons}>
        <CancelButton
          title="취소"
          onPressHandler={cancelHandler}
          style={styles.buttonStyle}
        />
        <ConfirmButton
          title="확인"
          onPressHandler={() => {
            if (!imgPath) return;

            promiseFlow(imgPath, [imageUpload, then2, apis.createMeeting]);
          }}
        />
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
