import React, { memo, useState } from 'react';
import { View } from 'react-native';

import MeetingDetailPlaceCard from '@components/placeCard/PlaceCard';
import usePlaceLock from '@hooks/redux/usePlaceLock';
import Avatar from '@components/member/Avatar';
import { MeetingLayout } from '@components/Layout';
import type {
  PlaceMainProps,
  PlaceProps,
  PlaceTopProps,
} from '@type/screen.meeting';
import { makeStyles } from '@rneui/themed';
import { detailConfig } from '@constants/config';
import MeetingDetailMap from './Map';
import { getRandomColor, Title } from './common';

const { text } = detailConfig;

// 모임 장소
function Place({ meetingId, navigation }: PlaceProps) {
  const [color] = useState(getRandomColor());

  return (
    <MeetingLayout>
      <PlaceTop color={color} />
      <PlaceMain color={color} meetingId={meetingId} navigation={navigation} />
    </MeetingLayout>
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
    <View style={[styles.placeTopContainer, styles.commonHeight]}>
      <Title title={text.place} />
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
    borderColor: placeLockState.lockUserImage ? color : styles.default.color,
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
  default: {
    color: theme.grayscale['0'],
  },
}));

export default memo(Place);
