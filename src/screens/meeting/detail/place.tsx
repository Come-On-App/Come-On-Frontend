import React, { memo, useState } from 'react';
import { View } from 'react-native';

import fn from '@utils/fn';
import { BoldFont } from '@components/Font';
import MeetingDetailPlaceCard from '@components/placeCard/PlaceCard';
import usePlaceLock from '@hooks/redux/usePlaceLock';
import Avatar from '@components/member/Avatar';
import Layout from '@components/Layout';
import type {
  PlaceMainProps,
  PlaceProps,
  PlaceTopProps,
} from '@type/screen.meeting';
import { makeStyles } from '@rneui/themed';
import { renderingLog } from '@utils/log';
import MeetingDetailMap from './Map';

const colors = [
  '#fc5c65',
  '#fd9644',
  '#fed330',
  '#2bcbba',
  '#45aaf2',
  '#a55eea',
];

// 모임 장소
function Place({ meetingId, navigation }: PlaceProps) {
  const [color] = useState(colors[fn.random(0, 5)]);

  renderingLog('Place');

  return (
    <Layout>
      <PlaceTop color={color} />
      <PlaceMain color={color} meetingId={meetingId} navigation={navigation} />
    </Layout>
  );
}

// 모임 장소 상단 (타이틀, 락/언락 아바타 표시)
function PlaceTop({ color }: PlaceTopProps) {
  const styles = useStyles();
  const { placeLockState } = usePlaceLock();
  const borderColor = {
    borderColor: color,
  };

  return (
    <View style={styles.placeTopContainer}>
      <BoldFont>모임 장소</BoldFont>
      {placeLockState.lockUserImage && (
        <Avatar
          size={styles.commonHeight.height}
          path={placeLockState.lockUserImage}
          containerStyle={[
            styles.placeTopAvatar,
            styles.commonHeight,
            borderColor,
          ]}
        />
      )}
    </View>
  );
}

// 모임 장소 메인 (맵뷰, 장소 카드 리스트, 코스 추가 버튼)
function PlaceMain({ color, meetingId, navigation }: PlaceMainProps) {
  const styles = useStyles();
  const { placeLockState } = usePlaceLock();
  const borderColor = {
    borderColor: placeLockState.lockUserImage
      ? color
      : styles.defaultColor.color,
  };

  return (
    <View style={[styles.placeMainContainer, borderColor]}>
      <MeetingDetailMap meetingId={meetingId} />
      <MeetingDetailPlaceCard meetingId={meetingId} navigation={navigation} />
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  commonHeight: {
    height: 35,
  },
  placeTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  placeTopAvatar: {
    borderWidth: 2,
  },
  placeMainContainer: {
    borderRadius: 8,
    borderWidth: 2,
    overflow: 'hidden',
  },
  defaultColor: {
    color: theme.grayscale['0'],
  },
}));

export default memo(Place);
