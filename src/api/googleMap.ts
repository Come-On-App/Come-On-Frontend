import _ from 'lodash/fp';
import axios from 'axios';
import { GOOGLE_PLACES_API_KEY } from '@env';

import type {
  Location,
  PlaceDetail,
  ReverseGeocode,
  Address,
} from '../screens/types';

const BASE_URL = 'https://maps.googleapis.com/maps/api';

function getReverseGeocodeURL(location: Location) {
  const config = {
    resultType: 'food|restaurant|bar|point_of_interest|route|street_address',
    locationType: 'ROOFTOP',
  };
  const url = `${BASE_URL}/geocode/json?latlng=${location.latitude},${location.longitude}&result_type=${config.resultType}&location_type=${config.locationType}&key=${GOOGLE_PLACES_API_KEY}`;

  return url;
}

function getPlaceDetailURL(placeId: string) {
  const config = {
    language: 'ko',
    fields: 'formatted_address,name,geometry,place_id',
  };
  const url = `${BASE_URL}/place/details/json?place_id=${placeId}&language=${config.language}&fields=${config.fields}&key=${GOOGLE_PLACES_API_KEY}`;

  return url;
}

function errorHandler(location: Location) {
  // TODO: 커스텀 에러 핸들링으로 처리하고, 네트워크 에러 이외에는 reThrow 시키기
  return {
    formatted_address: '에러가 발생하였습니다. 잠시후 재시도 해주세요.',
    geometry: {
      location: {
        lat: location.latitude,
        lng: location.longitude,
      },
    },
    name: '에러 발생',
    place_id: '',
  };
}

async function requestReverseGeocode(url: string) {
  return axios
    .get<ReverseGeocode>(url)
    .then(({ data }) => data.results[0].place_id);
}

async function requestPlaceDetail(url: string) {
  return axios.get<PlaceDetail>(url).then(({ data }) => data.result);
}

export const getPlaceId = _.flow(getReverseGeocodeURL, requestReverseGeocode);

export const getPlaceDetailResult = _.flow(
  getPlaceDetailURL,
  requestPlaceDetail,
);

export const getAddress = async (location: Location): Promise<Address> => {
  return (
    getPlaceId(location)
      .then(getPlaceDetailResult)
      .then(placeDetail => {
        return {
          ...placeDetail,
          name: `${placeDetail.name}*`,
          geometry: {
            location: {
              lat: location.latitude,
              lng: location.longitude,
            },
          },
        };
      })
      // .catch(() => errorHandler(location))
      .catch(console.log)
  );
};
