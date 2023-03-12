import fn, { pickSafelyBy } from '@utils/fn';
import type { MapRegion, PlaceSelect } from '@type/index';
import type {
  CategoryData,
  CategoryKey,
  PostAddMeetingPlacesPayload,
  PostMeetingPlacesLockPayload,
  PutUpdateMeetingPlacesPayload2,
} from '@type/api.meeting';
import type { Address, MapLocation } from '@type/api.map';
import { Dispatch } from '@type/component.placeselect';
import { Details, Region } from 'react-native-maps';

export const CATEGORY_DATA: CategoryData[] = [
  { key: 'SCHOOL', value: '학교' },
  { key: 'CAFE', value: '카페' },
  { key: 'BAR', value: '술집' },
  { key: 'SPORT', value: '스포츠' },
  { key: 'SHOPPING', value: '쇼핑' },
  { key: 'ATTRACTION', value: '관광명소' },
  { key: 'RESTAURANT', value: '음식점' },
  { key: 'ACCOMMODATION', value: '숙박' },
  { key: 'CULTURE', value: '문화시설' },
  { key: 'ACTIVITY', value: '액티비티' },
  { key: 'ETC', value: '기타' },
];

// 대한민국 위치
export const defaultLocation: MapRegion = {
  latitude: 36.25654399290141,
  latitudeDelta: 6.84299583157118,
  longitude: 127.64758983626962,
  longitudeDelta: 7.5761303678154945,
};

export const convertKeyToValue = (
  key: CategoryKey | null,
  fallback = '미지정',
) => {
  return (
    fn.find(category => category.key === key, CATEGORY_DATA)?.value || fallback
  );
};

export const checkIsRequestReady = (placeState: PlaceSelect) => {
  const result =
    fn.isEmpty(placeState.marker) ||
    fn.isEmpty(placeState.googlePlaceId) ||
    fn.isNull(placeState.category) ||
    placeState.isChanged === false;

  return !result;
};

export const createPlacePayload = (
  placeState: PlaceSelect,
): {
  addPlacePayload: PostAddMeetingPlacesPayload;
  updatePlacePayload: PutUpdateMeetingPlacesPayload2;
  LockPlacePayload: PostMeetingPlacesLockPayload;
} => {
  const marker: MapLocation = pickSafelyBy(placeState, 'marker', {
    latitude: 0,
    longitude: 0,
  });
  const payload = {
    placeName: placeState.placeName,
    memo: placeState.description,
    address: placeState.address,
    category: pickSafelyBy(placeState, 'category', 'ETC') as CategoryKey,
    googlePlaceId: placeState.googlePlaceId,
    lat: marker.latitude,
    lng: marker.longitude,
  };
  const addPlacePayload = {
    meetingId: placeState.meetingId,
    payload,
  };
  const updatePlacePayload = {
    meetingId: placeState.meetingId,
    placeId: placeState.meetingPlaceId,
    payload,
  };
  const LockPlacePayload = {
    meetingId: placeState.meetingId,
    placeId: placeState.meetingPlaceId,
  };

  return { addPlacePayload, updatePlacePayload, LockPlacePayload };
};

export const getPlaceSelectState = (placeState: PlaceSelect) => {
  const buttonText = placeState.state === 'Add' ? '장소추가' : '장소수정';
  const isLockRequestReady = placeState.state === 'Modify' && placeState.isLock;
  const isRequestReady = checkIsRequestReady(placeState);
  const payloads = createPlacePayload(placeState);

  return {
    isLockRequestReady,
    buttonText,
    isRequestReady,
    payloads,
  };
};

const getCurrentLocation = (currentLocation: MapLocation | null): MapRegion => {
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

export const getRegion = (placeSelectState: PlaceSelect): MapRegion => {
  const { currentLocation, mapRegion } = placeSelectState;

  if (!mapRegion) {
    return getCurrentLocation(currentLocation);
  }

  return mapRegion;
};

export const onRegionChangeHandler =
  (dispatch: Dispatch, placeState: PlaceSelect) =>
  (region: Region, details: Details) => {
    if (!details.isGesture) return;

    dispatch({
      ...placeState,
      mapRegion: region,
    });
  };

export const createPlaceMapPayload = (placeState: PlaceSelect) => {
  return (response: Address) => {
    return {
      ...placeState,
      placeName: response.name,
      address: response.formatted_address,
      googlePlaceId: response.place_id,
      marker: {
        latitude: response.geometry.location.lat,
        longitude: response.geometry.location.lng,
      },
      isChanged: true,
    };
  };
};
