import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import { PressableIcon } from '@components/Icon';
import { useNavigation } from '@react-navigation/native';

function SettingButton() {
  const navigaiton = useNavigation();
  const onPressHandler = () => {
    navigaiton.navigate('Setting');
  };
  const styles = useStyles();

  return (
    <View style={styles.containerStyle}>
      <PressableIcon
        size={20}
        name="settings"
        color="black"
        onPress={onPressHandler}
      />
    </View>
  );
}

export default SettingButton;

const useStyles = makeStyles(theme => ({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 20,
  },
}));
