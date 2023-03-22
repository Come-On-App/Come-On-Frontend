import { View } from 'react-native';
import React, { memo, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { makeStyles } from '@rneui/themed';

import { defaultLocation } from '@components/placeSelect/data';
import usePlaceQuery from '@hooks/query/usePlaceQuery';
import { emptyString, pickSafelyBy } from '@utils/fn';
import type { MarkerListProps } from '@type/screen.meeting';
import { useFirstRegion, useMapAnimateToRegion } from './common';

const MemoMarkerList = memo(MarkerList);

export default function MeetingDetailMap({ meetingId }: { meetingId: number }) {
  const styles = useStyles();
  const [region, setRegion] = useState(defaultLocation);
  const { places } = usePlaceQuery(meetingId);
  const mapRef = useRef<MapView>(null);

  useFirstRegion(places, setRegion);
  useMapAnimateToRegion(mapRef);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        region={region}
        showsUserLocation
        provider={PROVIDER_GOOGLE}
        style={styles.map}
      >
        <MemoMarkerList places={places} />
      </MapView>
    </View>
  );
}

function MarkerList({ places }: MarkerListProps) {
  const styles = useStyles();

  if (!places) return null;

  return (
    <>
      {places.contents.map(place => {
        return (
          <Marker
            pinColor={styles.pinColor.color}
            key={place.meetingPlaceId}
            coordinate={{
              latitude: place.lat,
              longitude: place.lng,
            }}
            title={place.placeName}
            description={pickSafelyBy(place, 'memo', emptyString)}
          />
        );
      })}
    </>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    height: 200,
    margin: 5,
    borderRadius: 4,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  pinColor: {
    color: theme.colors.primary,
  },
}));
