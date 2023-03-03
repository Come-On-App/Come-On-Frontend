import React, { useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { makeStyles } from '@rneui/themed';
import { Client, ActivationState } from '@stomp/stompjs';
import { WebSocketContext } from '../../WebSocketProvider';

function CancelIconButton() {
  const navigation = useNavigation();
  const styles = useStyles();
  const client =
    useContext<React.MutableRefObject<Client | undefined>>(WebSocketContext);
  const onPressHandler = () => {
    const temp = navigation.getState().routes.pop();
    const { name } = temp!;

    if (
      (name === 'MeetingRoom' &&
        client !== undefined &&
        client!.current?.state) === ActivationState.ACTIVE
    ) {
      client?.current?.deactivate();
    }

    navigation.goBack();
  };

  return (
    <MaterialIcons
      style={styles.cancelIcon}
      name="clear"
      onPress={onPressHandler}
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
