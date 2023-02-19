import _ from 'lodash/fp';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import { GOOGLE_PLACES_API_KEY } from '@env';
import React, { useEffect, useRef } from 'react';

import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';

import { GooglePlacesOnPressHandler } from '@type/index';
import { PlaceSelectScreen } from '@type/navigation';
import Icon from '../../components/Icon';
import usePlace from '../../hooks/usePlace';
import { TestBox } from '../../experimental/MapContent';

import { SearchTitle } from '../../components/placeSelect/PlaceSelectSearchBar';

export default function PlaceSearch({ navigation }: PlaceSelectScreen) {
  const styles = useStyles();
  const googlePlaceStyle = useGooglePlaceStyles();
  const inputRef = useRef<GooglePlacesAutocompleteRef>(null);
  const { setPlaceSelectDispatch, placeState } = usePlace();
  const onPressHandler: GooglePlacesOnPressHandler = (_data, detail) => {
    if (!detail) return;

    const location = {
      latitude: detail.geometry.location.lat,
      longitude: detail.geometry.location.lng,
    };

    setPlaceSelectDispatch({
      ...placeState,
      address: detail.formatted_address,
      region: location,
      marker: location,
      name: detail.name,
      placeId: detail.place_id,
    });

    navigation.goBack();
  };
  const openKeyboard = () => {
    if (inputRef.current) inputRef.current.focus();
  };
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

  useEffect(() => {
    const timeoutId = _.delay(800, openKeyboard);

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
      <TestBox />
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
