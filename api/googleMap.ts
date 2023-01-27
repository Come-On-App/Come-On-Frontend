import axios from 'axios';
import { GOOGLE_PLACES_API_KEY } from '@env';

import type {
  Location,
  PlaceDetail,
  ReverseGeocode,
  GoogleMapResult,
} from '../types';

const BASE_URL = 'https://maps.googleapis.com/maps/api';
const getReverseGeocodeURL = (location: Location) => {
  const config = {
    resultType: 'food|restaurant|bar|point_of_interest|route|street_address',
    locationType: 'ROOFTOP',
  };

  return `${BASE_URL}/geocode/json?latlng=${location.latitude},${location.longitude}&result_type=${config.resultType}&location_type=${config.locationType}&key=${GOOGLE_PLACES_API_KEY}`;
};
const getPlaceDetailURL = (placeId: string) => {
  const config = {
    language: 'ko',
    fields: 'formatted_address,name,geometry,place_id',
  };

  return `${BASE_URL}/place/details/json?place_id=${placeId}&language=${config.language}&fields=${config.fields}&key=${GOOGLE_PLACES_API_KEY}`;
};
const errorHandler = (location: Location) => {
  return {
    formatted_address:
      '네트워크 에러가 발생하였습니다. 잠시후 재시도 해주세요.',
    geometry: {
      location: {
        lat: location.latitude,
        lng: location.longitude,
      },
    },
    name: '에러 발생',
    place_id: '',
  };
};

export const requestReverseGeocode = async (location: Location) => {
  const url = getReverseGeocodeURL(location);

  return axios
    .get<ReverseGeocode>(url)
    .then(({ data }) => data.results[0].place_id);
};

export const requestPlaceDetail = async (placeId: string) => {
  const url = getPlaceDetailURL(placeId);

  return axios.get<PlaceDetail>(url).then(({ data }) => data.result);
};

export const getAddress = async (
  location: Location,
): Promise<GoogleMapResult & { name: string }> => {
  return requestReverseGeocode(location)
    .then(requestPlaceDetail)
    .then(address => {
      return {
        ...address,
        name: `${address.name}*`,
        geometry: {
          location: {
            lat: location.latitude,
            lng: location.longitude,
          },
        },
      };
    })
    .catch(() => errorHandler(location));
};
