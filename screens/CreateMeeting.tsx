import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { InputTextProps } from '../types';

import CancelButton from '../components/buttons/CancelButton';
import ConfirmButton from '../components/buttons/ConfirmButton';
import InputForm from '../components/input/InputForm';
import { RootStackScreenProps } from '../navigation';

function CreateMeeting(
  this: typeof CreateMeeting,
  { navigation }: RootStackScreenProps<'CreateMeeting'>,
) {
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandelr = () => {
    console.log('확인');
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

  return (
    <View style={styles.container}>
      <InputForm inputProps={inputProps} />
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
    justifyContent: 'center',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
});
