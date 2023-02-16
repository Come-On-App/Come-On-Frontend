import { makeStyles } from '@rneui/themed';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import type { MapPressEvent, PoiClickEvent } from 'react-native-maps';

import usePlace from '@hooks/usePlace';
import { requestGetAddress } from '@api/map/googleMap';
import useCurrentPosition from '@hooks/useCurrentPosition';
import type { MapLocation } from '@type/api.map';
import type { MapRegion, PlaceSelect } from '@type/index';

const getCurrentLocation = (currentLocation: MapLocation | null): MapRegion => {
  // 대한민국 위치
  const defaultLocation = {
    latitude: 36.25654399290141,
    latitudeDelta: 6.84299583157118,
    longitude: 127.64758983626962,
    longitudeDelta: 7.5761303678154945,
  };

  if (!currentLocation) {
    return defaultLocation;
  }

  return {
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
};

function getRegion(placeSelectState: PlaceSelect): MapRegion {
  const { region, currentLocation } = placeSelectState;

  if (!region) {
    return getCurrentLocation(currentLocation);
  }

  return {
    latitude: region.latitude,
    longitude: region.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
}

export function Map() {
  const styles = useStyles();
  const firstLoad = useRef(true);
  const mapRef = useRef<MapView>(null);
  const [marker, setMarker] = useState<MapLocation | null>(null);
  const currentLocation = useCurrentPosition();
  const { placeState, setPlaceSelectDispatch } = usePlace();
  const region = getRegion(placeState);
  const changeHandler = useCallback(
    async (event: PoiClickEvent | MapPressEvent) => {
      const location = event.nativeEvent.coordinate;

      setMarker(location);

      const data = await requestGetAddress(location);

      setPlaceSelectDispatch({
        ...placeState,
        name: data.name,
        address: data.formatted_address,
        placeId: data.place_id,
        marker: {
          latitude: data.geometry.location.lat,
          longitude: data.geometry.location.lng,
        },
      });
    },
    [placeState, setPlaceSelectDispatch],
  );

  useEffect(() => {
    if (currentLocation && firstLoad.current) {
      setPlaceSelectDispatch({
        ...placeState,
        currentLocation,
      });
      firstLoad.current = false;
    }
  }, [currentLocation, placeState, setPlaceSelectDispatch]);

  useEffect(() => {
    setMarker(placeState.marker);
  }, [placeState.marker]);

  return (
    <MapView
      ref={mapRef}
      onPress={changeHandler}
      onPoiClick={changeHandler}
      region={region}
      style={styles.map}
      showsUserLocation
      showsMyLocationButton
      provider={PROVIDER_GOOGLE}
    >
      {marker && <Marker coordinate={marker} pinColor="#337FFE" />}
    </MapView>
  );
}

const useStyles = makeStyles(() => ({
  map: {
    width: '100%',
    height: '100%',
  },
}));

export default Map;
