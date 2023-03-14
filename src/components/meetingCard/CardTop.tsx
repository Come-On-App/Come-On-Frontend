import React, { memo } from 'react';
import { makeStyles } from '@rneui/themed';
import { View } from 'react-native';

import type {
  TopInfoProps,
  LeftAreaProps,
  RightAreaProps,
} from '@type/component.card';
import CardMenu from './CardMenu';
import { ConfirmDisplay, GroupDisplay } from './CardDisplay';

function CardTopInfo(info: TopInfoProps) {
  const { role, meetingId } = info;
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <LeftArea info={info} />
      <RightArea role={role} meetingId={meetingId} />
    </View>
  );
}

// 모임 인원수, 확정 여부 표시
function LeftArea({ info }: LeftAreaProps) {
  const styles = useStyles();

  return (
    <View style={styles.leftArea}>
      <GroupDisplay people={info.people} />
      <ConfirmDisplay isDecided={info.isDecided} />
    </View>
  );
}

// 카드 메뉴
function RightArea({ role, meetingId }: RightAreaProps) {
  return <CardMenu role={role} meetingId={meetingId} />;
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
}));

export default memo(CardTopInfo);
