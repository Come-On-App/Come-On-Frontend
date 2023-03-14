import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import { GOOGLE_PLACES_API_KEY } from '@env';
import React, { useEffect, useRef } from 'react';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';

import fn from '@utils/fn';
import { GooglePlacesOnPressHandler, MapRegion } from '@type/index';
import { PlaceSelectScreenProps } from '@type/navigation';
import usePlace from '@hooks/redux/usePlace';
import { SearchTitle } from '@components/placeSelect/PlaceSelectSearchBar';
import Icon from '@components/Icon';

const config = {
  debounce: 200,
  placeholder: 'Search',
  query: {
    key: GOOGLE_PLACES_API_KEY,
    language: 'ko',
    components: 'country:kr',
  },
  detailsQuery: {
    key: GOOGLE_PLACES_API_KEY,
    fields: 'formatted_address,name,geometry,place_id',
  },
};

export default function PlaceSearch({ navigation }: PlaceSelectScreenProps) {
  const styles = useStyles();
  const googlePlaceStyle = useGooglePlaceStyles();
  const inputRef = useRef<GooglePlacesAutocompleteRef>(null);
  const { placeDispatch, placeState } = usePlace();
  const onPressHandler: GooglePlacesOnPressHandler = (_data, detail) => {
    if (!detail) return;

    const location = {
      latitude: detail.geometry.location.lat,
      longitude: detail.geometry.location.lng,
    };
    const region: MapRegion = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: placeState.mapRegion?.latitudeDelta || 0.01,
      longitudeDelta: placeState.mapRegion?.longitudeDelta || 0.01,
    };

    placeDispatch({
      ...placeState,
      address: detail.formatted_address,
      mapRegion: region,
      marker: location,
      placeName: detail.name,
      googlePlaceId: detail.place_id,
      isChanged: true,
    });

    navigation.goBack();
  };
  const openKeyboard = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  useEffect(() => {
    navigation.setOptions({ headerTitle: '' });

    const timeoutId = fn.delay(800, openKeyboard);

    return () => clearTimeout(timeoutId);
  }, [navigation]);

  return (
    <View style={styles.placeSearchContainer}>
      <SearchTitle style={styles.placeSearchTitle} />
      <GooglePlacesAutocomplete
        ref={inputRef}
        onPress={onPressHandler}
        disableScroll
        fetchDetails
        query={config.query}
        isRowScrollable={false}
        debounce={config.debounce}
        renderLeftButton={LeftButton}
        placeholder={config.placeholder}
        styles={googlePlaceStyle}
        GooglePlacesDetailsQuery={config.detailsQuery}
      />
    </View>
  );
}

function LeftButton() {
  const styles = useStyles();

  return (
    <View style={styles.leftButtonContainer}>
      <View style={styles.leftButtonInnerContainer}>
        <Icon
          name="search"
          color={styles.leftButtonIcon.color}
          size={styles.leftButtonIcon.size}
        />
      </View>
    </View>
  );
}

const useGooglePlaceStyles = makeStyles(theme => ({
  container: {
    marginHorizontal: 20,
    zIndex: 1,
  },
  textInputContainer: {
    height: 46,
  },
  textInput: {
    height: '100%',
    backgroundColor: theme.grayscale[200],
    borderRadius: 0,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    color: theme.grayscale[900],
    fontSize: 14,
    fontFamily: 'pretendard-regular',
  },
  description: {
    color: theme.grayscale[900],
    fontSize: 14,
    fontFamily: 'pretendard-regular',
  },
}));
const useStyles = makeStyles(theme => ({
  placeSearchContainer: {
    backgroundColor: theme.grayscale[0],
    flex: 1,
  },
  placeSearchTitle: {
    marginHorizontal: 20,
  },
  leftButtonContainer: {
    backgroundColor: theme.grayscale[200],
    justifyContent: 'center',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  leftButtonInnerContainer: {
    marginVertical: 4,
    marginLeft: 9,
    paddingRight: 4,
  },
  leftButtonIcon: {
    color: theme.grayscale[700],
    size: 20,
  },
}));
