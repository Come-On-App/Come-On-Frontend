/* eslint-disable react/jsx-props-no-spreading */
import { StyleSheet } from 'react-native';
import React from 'react';
import { Button } from '@rneui/base';
import { View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'pretendard',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default function TabOneScreen({
  navigation,
  route,
}: RootStackScreenProps<'Meeting'>) {
  const pressHandler = () => {
    navigation.navigate('Meeting');
  };

  return (
    <View style={styles.container}>
      <Button title="모임생성" onPress={pressHandler} />
    </View>
  );
}
