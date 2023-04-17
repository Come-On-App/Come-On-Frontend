import { makeStyles } from '@rneui/themed';
import React from 'react';
import { ColorValue, StyleProp, View, ViewStyle } from 'react-native';
import CancelButton from './CancelButton';
import ConfirmButton from './ConfirmButton';

interface FlexButtonProps {
  cancelHandler: () => void;
  onPressConfirm: () => void;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  options?: {
    cancelButtonColor?: { backgroundColor: string };
    confirmButtonColor?: { backgroundColor: string };
    cancelText?: string;
    confirmText?: string;
  };
}

function FlexButtons({
  cancelHandler,
  onPressConfirm,
  loading,
  style,
  options,
}: FlexButtonProps) {
  const styles = useStyles();
  const cancelText = options?.cancelText ? options?.cancelText : '취소';
  const confirmText = options?.confirmText ? options?.confirmText : '확인';

  return (
    <View style={[styles.container, style]}>
      <View style={styles.buttons}>
        <View style={{ flex: 0.4 }}>
          <CancelButton
            title={cancelText}
            onPressHandler={cancelHandler}
            color={options?.cancelButtonColor}
          />
        </View>
        <View style={{ flex: 0.57, marginLeft: 10 }}>
          <ConfirmButton
            title={confirmText}
            onPressHandler={onPressConfirm}
            loading={loading}
            color={options?.confirmButtonColor}
          />
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
    justifyContent: 'center',
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
