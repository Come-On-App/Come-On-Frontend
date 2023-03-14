import { View } from 'react-native';
import React, { memo, useEffect, useRef, useState } from 'react';
import type { Dispatch, SetStateAction, RefObject } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { makeStyles } from '@rneui/themed';

import { defaultLocation } from '@components/placeSelect/data';
import usePlaceQuery from '@hooks/query/usePlaceQuery';
import usePlace from '@hooks/redux/usePlace';
import { MapRegion } from '@type/index';
import { emptyString, pickSafelyBy } from '@utils/fn';
import type { MarkerListProps, Places } from '@type/screen.meeting';

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

function useFirstRegion(
  places: Places,
  setRegion: Dispatch<SetStateAction<MapRegion>>,
) {
  const ZERO = 0;

  useEffect(() => {
    if (places && places.contentsCount !== ZERO) {
      const firstPlace = places.contents[ZERO];

      setRegion({
        latitude: firstPlace.lat,
        longitude: firstPlace.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [places, setRegion]);
}

function useMapAnimateToRegion(mapRef: RefObject<MapView>) {
  const { placeState } = usePlace();

  useEffect(() => {
    if (!placeState.meetingPlaceCardMarker || !mapRef.current) return;

    mapRef.current.animateToRegion(placeState.meetingPlaceCardMarker);
  }, [mapRef, placeState.meetingPlaceCardMarker]);
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
