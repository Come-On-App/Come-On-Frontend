import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { makeStyles } from '@rneui/themed';

function CancelIconButton() {
  const navigation = useNavigation();
  const styles = useStyles();

  return (
    <MaterialIcons
      style={styles.cancelIcon}
      name="clear"
      onPress={() => navigation.goBack()}
    />
  );
}

export default CancelIconButton;

const useStyles = makeStyles(theme => ({
  cancelIcon: {
    color: 'black',
    fontSize: 24,
    justifyContent: 'center',
  },
}));
