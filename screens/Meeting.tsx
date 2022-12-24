import React, { useState } from 'react';
import { StyleSheet, Button, Image, Pressable } from 'react-native';
import { View } from '../components/Themed';
import InputText from '../components/inputComponents/InputText';
import InputImage from '../components/inputComponents/InputImage';

function Meeting(this: typeof Meeting) {
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
  const inputProps = {
    label: '모임이름',
    placeholder: '모임이름을 입력해주세요!',
    length: 30,
    value: inputValues.meetingName,
    onChangeText: InputChangeHandler.bind(this, 'meetingName'),
    isMultiline: false,
  };
  const inputProps2 = {
    label: '모임메모',
    placeholder: '모임장소에 대한 메모를 남겨보세요',
    length: 150,
    value: inputValues.meetingMemo,
    onChangeText: InputChangeHandler.bind(this, 'meetingMemo'),
    isMultiline: true,
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <InputImage />
        <InputText inputProps={inputProps} />
        <InputText inputProps={inputProps2} />
        <View>
          <Button title="취소" />
          <Button title="완료" />
        </View>
      </View>
    </View>
  );
}

export default Meeting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    overflow: 'hidden',
    margin: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
});
