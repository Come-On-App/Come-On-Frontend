import React, { useState } from 'react';
import { makeStyles } from '@rneui/themed';
import { View } from 'react-native';

import { ConfirmDisplay, GroupDisplay } from './CardDisplay';
import { InfoProps, LeftAreaProps, RightAreaProps } from '../../types';
import CardMenu from './CardMenu';

function LeftArea({ style, infoProps }: LeftAreaProps) {
  return (
    <View style={style}>
      <GroupDisplay people={infoProps.people} />
      <ConfirmDisplay isDecided={infoProps.isDecided} />
    </View>
  );
}

function RightArea({ style }: RightAreaProps) {
  const menuState = useState(false);

  return <CardMenu style={style} menuState={menuState} />;
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
    height: '100%',
    justifyContent: 'center',
  },
}));

export default CardTopInfo;
