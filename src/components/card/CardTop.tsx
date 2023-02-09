import React from 'react';
import { makeStyles } from '@rneui/themed';
import { View } from 'react-native';

import CardMenu from './CardMenu';
import { ConfirmDisplay, GroupDisplay } from './CardDisplay';
import type { InfoProps, LeftAreaProps, RightAreaProps } from '../../types';

export default function CardTopInfo(infoProps: InfoProps) {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <LeftArea style={styles.leftArea} infoProps={infoProps} />
      <RightArea style={styles.rightArea} />
    </View>
  );
}

function LeftArea({ style, infoProps }: LeftAreaProps) {
  return (
    <View style={style}>
      <GroupDisplay people={infoProps.people} />
      <ConfirmDisplay isDecided={infoProps.isDecided} />
    </View>
  );
}

function RightArea({ style }: RightAreaProps) {
  return <CardMenu style={style} />;
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
