import React from 'react';
import { ListItem, makeStyles } from '@rneui/themed';
import { Pressable, View } from 'react-native';

import {
  Address,
  Description,
  SubAddress,
} from '@components/placeSelect/PlaceSelectAddress';
import { emptyString, pickSafelyBy } from '@utils/fn';
import { useNavigation } from '@react-navigation/native';
import usePlace from '@hooks/redux/usePlace';
import type { PlaceSelect } from '@type/index';
import type {
  CardItem,
  PlaceCardContentProps,
  PlaceCardMainProps,
  PlaceCardRightIconProps,
} from '@type/component.placecard';
import usePlaceLock from '@hooks/redux/usePlaceLock';
import { errorAlert } from '@utils/alert';

const createPlacePayload = (
  placeState: PlaceSelect,
  cardItem: CardItem,
): PlaceSelect => {
  return {
    ...placeState,
    address: cardItem.address,
    marker: {
      latitude: cardItem.lat,
      longitude: cardItem.lng,
    },
    mapRegion: {
      latitude: cardItem.lat,
      longitude: cardItem.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    placeName: cardItem.placeName,
    googlePlaceId: cardItem.googlePlaceId,
    category: cardItem.category,
    description: pickSafelyBy(cardItem, 'memo', emptyString),
    meetingId: cardItem.meetingId,
    meetingPlaceId: cardItem.meetingPlaceId,
    state: 'Modify',
    isLock: true,
  };
};

function PlaceCardContent({ data }: PlaceCardContentProps) {
  const styles = useStyles();
  const navigation = useNavigation();
  const { placeDispatch, placeState } = usePlace();
  const { meetingResourceType } = usePlaceLock();
  const payload = createPlacePayload(placeState, data);
  const onPressRightIcon = () => {
    if (meetingResourceType === 'MEETING_PLACE_LOCK') {
      errorAlert('다른 유저가 수정중 입니다!');

      return;
    }

    placeDispatch(payload);
    navigation.navigate('PlaceSelect', { screen: 'Main' });
  };
  const onPressCardItem = () => {
    placeDispatch({
      ...placeState,
      meetingPlaceId: payload.meetingPlaceId,
      meetingPlaceCardMarker: payload.mapRegion,
    });
  };

  return (
    <View style={styles.cardContentContainer}>
      <PlaceCardMain data={data} onPress={onPressCardItem} />
      <PlaceCardRightIcon onPress={onPressRightIcon} />
    </View>
  );
}

function PlaceCardMain({ data, onPress }: PlaceCardMainProps) {
  const styles = useStyles();
  const cardContent = {
    address: {
      category: data.category,
      title: data.placeName,
    },
    description: {
      text: pickSafelyBy(data, 'memo', emptyString),
    },
    subAddress: {
      title: data.address,
    },
  };

  return (
    <ListItem.Content>
      <Pressable style={styles.cardMainContainer} onPress={onPress}>
        <Address info={cardContent.address} />
        <Description info={cardContent.description} />
        <SubAddress info={cardContent.subAddress} />
      </Pressable>
    </ListItem.Content>
  );
}

function PlaceCardRightIcon({ onPress }: PlaceCardRightIconProps) {
  const {
    cardBodyRightIcon: { color, name, size, type },
  } = useStyles();

  return (
    <ListItem.Chevron
      size={size}
      name={name}
      color={color}
      type={type}
      onPress={onPress}
    />
  );
}

const useStyles = makeStyles(theme => ({
  cardBodyRightIcon: {
    size: 24,
    name: 'mode-edit',
    color: theme.grayscale['400'],
    type: 'material',
  },
  cardMainContainer: {
    width: '95%',
  },
  cardContentContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.grayscale['200'],
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
}));

export default PlaceCardContent;
