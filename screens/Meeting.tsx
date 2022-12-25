import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';

import { RootStackScreenProps, InputTextProps } from '../types';
import CancelButton from '../components/buttons/CancelButton';
import ConfirmButton from '../components/buttons/ConfirmButton';
import InputForm from '../components/inputComponents/InputForm';

function Meeting(
  this: typeof Meeting,
  { navigation }: RootStackScreenProps<'Meeting'>,
) {
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandelr = () => {
    console.log('확인');
  };
  const [inputValues, setInputValues] = useState({
    meetingName: '',
    meetingMemo: '',
  });
  const InputChangeHandler = (
    inputIdentifier: string,
    enteredValue: string,
  ): void => {
    setInputValues(currInputValues => {
      return { ...currInputValues, [inputIdentifier]: enteredValue };
    });
  };
  const inputProps1: InputTextProps = {
    label: '모임이름',
    placeholder: '모임이름을 입력해주세요!',
    length: 30,
    value: inputValues.meetingName,
    onChangeText: InputChangeHandler.bind(this, 'meetingName'),
    isMultiline: false,
  };
  const inputProps2: InputTextProps = {
    label: '모임메모',
    placeholder: '모임장소에 대한 메모를 남겨보세요',
    length: 150,
    value: inputValues.meetingMemo,
    onChangeText: InputChangeHandler.bind(this, 'meetingMemo'),
    isMultiline: true,
  };

  return (
    <View style={styles.container}>
      <InputForm inputProps1={inputProps1} inputProps2={inputProps2} />
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

export default Meeting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  imageContainer: {
    overflow: 'hidden',
    margin: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  inputContainer: {},
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
