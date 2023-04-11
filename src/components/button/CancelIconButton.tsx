import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { CancelIconButtonWithActionProps } from '@type/component.button';
import usePlace from '@hooks/redux/usePlace';
import { unLockMeeting } from '@utils/fn';

export default function CancelIconButton() {
  const navigation = useNavigation();

  return (
    <MaterialIcons
      style={styles.cancelIcon}
      name="clear"
      onPress={() => navigation.goBack()}
    />
  );
}

export function CancelIconButtonWithAction({
  actionFn,
}: CancelIconButtonWithActionProps) {
  const navigation = useNavigation();
  const onPressHandler = useCallback(() => {
    actionFn();
    navigation.goBack();
  }, [actionFn, navigation]);

  return (
    <MaterialIcons
      style={styles.cancelIcon}
      name="clear"
      onPress={onPressHandler}
    />
  );
}

export function CancelPlaceSelectIconButton() {
  const { placeResetDispatch, placeState } = usePlace();
  const actionFn = () => unLockMeeting(placeState, placeResetDispatch);

  return <CancelIconButtonWithAction actionFn={actionFn} />;
}

const styles = StyleSheet.create({
  cancelIcon: {
    color: 'black',
    fontSize: 24,
    justifyContent: 'center',
  },
});
