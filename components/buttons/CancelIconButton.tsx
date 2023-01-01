import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from '../../types';

function CancelIconButton() {
  const navigation = useNavigation();

  return (
    <MaterialIcons
      style={styles.cancelIcon}
      name="clear"
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
