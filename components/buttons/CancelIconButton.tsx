import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackScreenProps } from '../../types';

function CancelIconButton({
  navigation,
  route,
}: RootStackScreenProps<'Meeting'>) {
  return (
    <Ionicons
      style={styles.cancelIcon}
      name="close-outline"
      onPress={() => navigation.goBack()}
    />
  );
}

export default CancelIconButton;

const styles = StyleSheet.create({
  cancelIcon: {
    color: 'black',
    fontSize: 24,
    justifyContent: 'center',
  },
});
