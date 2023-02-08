import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { InputTextProps } from '../types';

import CancelButton from '../components/buttons/CancelButton';
import ConfirmButton from '../components/buttons/ConfirmButton';
import InputForm from '../components/input/InputForm';
import { RootStackScreenProps } from '../navigation';
import { setMeetingName, setMeetingImageUrl } from '../slices/meetingSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import imageUpload from '../utils/imageUpload';
import apis from '../api';

function CreateMeeting(
  this: typeof CreateMeeting,
  { navigation }: RootStackScreenProps<'CreateMeeting'>,
) {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.meeting.meetingData);
  const imgPath = useAppSelector(state => state.meeting.meetingImgPath);
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandelr = async () => {
    const { meetingName, calendarStartFrom, calendarEndTo } = data;

    imageUpload(imgPath)
      .then(imgUrl => {
        console.log(imgUrl);
        dispatch(setMeetingImageUrl(imgUrl));
      })
      .catch(err => {
        console.log(err);
      });
    const { meetingImageUrl } = data;
    const meetingData = {
      meetingName,
      meetingImageUrl,
      calendarStartFrom,
      calendarEndTo,
    };

    await apis.createMeeting(meetingData).catch(err => err.response);
    console.log('전송?');
  };
  const [inputValues, setInputValues] = useState({
    meetingName: '',
  });

  function InputChangeHandler(
    inputIdentifier: string,
    enteredValue: string,
  ): void {
    setInputValues(currInputValues => {
      return { ...currInputValues, [inputIdentifier]: enteredValue };
    });
  }

  const inputProps: InputTextProps = {
    label: '모임이름',
    placeholder: '모임이름을 입력해주세요!',
    maxLength: 30,
    value: inputValues.meetingName,
    onChangeText: InputChangeHandler.bind(this, 'meetingName'),
    multiline: false,
  };

  useEffect(() => {
    dispatch(setMeetingName(inputValues.meetingName));
  }, [dispatch, inputValues]);

  return (
    <View style={styles.container}>
      <View>
        <InputForm inputProps={inputProps} />
      </View>
      <View style={styles.buttons}>
        <CancelButton
          title="취소"
          onPressHandler={cancelHandler}
          style={{
            marginRight: 12,
          }}
        />
        <ConfirmButton title="확인" onPressHandler={confirmHandelr} />
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

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
});
