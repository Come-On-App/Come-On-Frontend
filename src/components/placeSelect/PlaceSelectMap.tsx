import React, { memo, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@rneui/themed';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import type { MapPressEvent, PoiClickEvent } from 'react-native-maps';

import usePlace from '@hooks/redux/usePlace';
import { requestGetAddress } from '@api/map/googleMap';
import type { MapLocation } from '@type/api.map';
import useCurrentLocation from '@hooks/useCurrentLocation';
import { promiseFlow } from '@utils/promise';
import {
  createPlaceMapPayload,
  getRegion,
  onRegionChangeHandler,
} from './data';

const MemoMapView = memo(MapView);

export function Map() {
  const styles = useStyles();
  const firstLoad = useRef(true);
  const mapRef = useRef<MapView>(null);
  const [currentLocation] = useCurrentLocation();
  const { placeState, placeDispatch } = usePlace();
  const [marker, setMarker] = useState<MapLocation | null>(null);
  const onPressHandler = async (event: PoiClickEvent | MapPressEvent) => {
    const location = event.nativeEvent.coordinate;

    setMarker(location);
    promiseFlow(location, [
      requestGetAddress,
      createPlaceMapPayload(placeState),
      placeDispatch,
    ]);
  };

  useEffect(() => {
    if (currentLocation && firstLoad.current) {
      placeDispatch({
        ...placeState,
        currentLocation,
      });
      firstLoad.current = false;
    }
  }, [currentLocation, placeDispatch, placeState]);

  useEffect(() => {
    setMarker(placeState.marker);
  }, [placeState.marker]);

  return (
    <MemoMapView
      ref={mapRef}
      onPress={onPressHandler}
      onPoiClick={onPressHandler}
      region={getRegion(placeState)}
      style={styles.map}
      showsUserLocation
      showsMyLocationButton
      provider={PROVIDER_GOOGLE}
      onRegionChangeComplete={onRegionChangeHandler(placeDispatch, placeState)}
    >
      {marker && (
        <Marker coordinate={marker} pinColor={styles.pinColor.color} />
      )}
    </MemoMapView>
  );
}

const useStyles = makeStyles(theme => ({
  map: {
    width: '100%',
    height: '100%',
  },
  pinColor: {
    color: theme.colors.primary,
  },
}));

export default Map;
