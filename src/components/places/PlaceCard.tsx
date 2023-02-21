import { makeStyles } from '@rneui/themed';
import { Places } from '@type/api.meeting';

import React from 'react';
import { View, Pressable } from 'react-native';
import PlaceCardBody from './PlaceCardBody';
import PlaceNumber from './PlaceNumber';

type PlaceCardProps = {
  data: Places[] | null | undefined;
};

function PlaceCard({ data }: PlaceCardProps) {
  const styles = useStyles();
  const places = data;

  return (
    <View>
      {places &&
        places.map(item => {
          return (
            <Pressable
              key={item.meetingPlaceId}
              style={({ pressed }) => [pressed && styles.pressed]}
            >
              <View style={styles.wrapContainer}>
                <PlaceNumber>{item.order}</PlaceNumber>
                <PlaceCardBody data={item} />
              </View>
            </Pressable>
          );
        })}
    </View>
  );
}

export default PlaceCard;

const useStyles = makeStyles(() => ({
  wrapContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  pressed: {
    opacity: 0.7,
  },
}));
