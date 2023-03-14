import React from 'react';
import { View } from 'react-native';

import Button from '@components/button/Buttons';
import { ListItem, makeStyles, Skeleton } from '@rneui/themed';
import usePlaceMutation from '@hooks/query/usePlaceMutation';
import {
  common,
  PlaceCardItemProps,
  SwipeableDelateButtonProps,
} from '@type/component.placecard';
import usePlaceLock from '@hooks/redux/usePlaceLock';
import { errorAlert } from '@utils/alert';
import PlaceCardContent from './PlaceCardContent';
import PlaceCardOrder from './PlaceCardOrder';

function SwipeableDelateButton(
  reset: () => void,
  { meetingId, placeId }: SwipeableDelateButtonProps,
) {
  const styles = useStyles();
  const { deleteMeetingPlace } = usePlaceMutation();
  const { meetingResourceType } = usePlaceLock();
  const onPressHandler = () => {
    if (meetingResourceType === 'MEETING_PLACE_LOCK') {
      errorAlert('다른 유저가 수정중 입니다!');

      return;
    }

    reset();
    deleteMeetingPlace({ meetingId, placeId });
  };

  return (
    <Button
      bold
      text="삭제"
      onPress={onPressHandler}
      buttonStyle={styles.delateButton}
    />
  );
}

function PlaceCardItem({ content }: PlaceCardItemProps) {
  const style = useStyles();

  return (
    <ListItem.Swipeable
      rightWidth={style.rightWidth.width}
      rightStyle={style.rightStyle}
      rightContent={reset =>
        SwipeableDelateButton(reset, {
          meetingId: content.meetingId,
          placeId: content.meetingPlaceId,
        })
      }
      containerStyle={style.swipeable}
    >
      <PlaceCardOrder order={content.order} />
      <PlaceCardContent data={content} />
    </ListItem.Swipeable>
  );
}

export function PlaceCardItemSkeleton() {
  const style = useStyles();
  const config = {
    height: 80,
  };

  return (
    <View style={style.skeletonWrap}>
      <Skeleton height={config.height} style={style.skeleton} />
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  swipeable: {
    paddingVertical: 7,
  },
  rightWidth: {
    width: 50,
  },
  rightStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  delateButton: {
    height: common.Height,
    backgroundColor: theme.colors.warning,
  },
  skeletonWrap: {
    margin: 10,
  },
  skeleton: { borderRadius: 4, marginBottom: 5 },
}));

export default PlaceCardItem;
