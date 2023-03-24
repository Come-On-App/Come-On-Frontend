import { makeStyles } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import CancelButton from './CancelButton';
import ConfirmButton from './ConfirmButton';

interface FlexButtonProps {
  cancelHandler: () => void;
  onPressConfirm: () => void;
}

function FlexButtons({ cancelHandler, onPressConfirm }: FlexButtonProps) {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <View style={{ flex: 0.4 }}>
          <CancelButton title="취소" onPressHandler={cancelHandler} />
        </View>
        <View style={{ flex: 0.57 }}>
          <ConfirmButton title="확인" onPressHandler={onPressConfirm} />
        </View>
      </View>
    </View>
  );
}

export default FlexButtons;

const useStyles = makeStyles(theme => ({
  container: { height: 48, marginTop: 20, marginBottom: 20 },

  buttons: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  InputFormontainer: {
    width: '100%',
  },
  title: {
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 12,
  },
}));
