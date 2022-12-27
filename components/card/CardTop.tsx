import React from 'react';
import { Button, makeStyles } from '@rneui/themed';
import { TouchableNativeFeedback, View } from 'react-native';

import Icon from '../Icon';
import { ConfirmDisplay, GroupDisplay } from './CardDisplay';
import { InfoProps, LeftAreaProps, RightAreaProps } from '../../types';

function LeftArea({ style, infoProps }: LeftAreaProps) {
  return (
    <View style={style}>
      <GroupDisplay people={infoProps.people} />
      <ConfirmDisplay isDecided={infoProps.isDecided} />
    </View>
  );
}

function RightArea({ style }: RightAreaProps) {
  const iconProps = {
    color: '#FFFFFF',
    size: 24,
  };

  return (
    <Button
      buttonStyle={style}
      type="clear"
      icon={
        <Icon name="more-vert" size={iconProps.size} color={iconProps.color} />
      }
      background={TouchableNativeFeedback.Ripple(iconProps.color, false, 12)}
    />
  );
}

function CardTopInfo(infoProps: InfoProps) {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <LeftArea style={styles.leftArea} infoProps={infoProps} />
      <RightArea style={styles.rightArea} />
    </View>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
    marginHorizontal: 12,
  },
  leftArea: {
    flexDirection: 'row',
  },
  rightArea: {
    padding: 0,
  },
}));

export default CardTopInfo;
