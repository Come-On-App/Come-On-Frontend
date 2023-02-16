import { promiseFlow } from '@utils/promise';
import fn, { enableCache } from '@utils/fn';
import type {
  Address,
  MapLocation,
  GetPlaceDetailResponse,
  GetReverseGeocodeResponse,
} from '@type/api.map';
import { mapAxios } from '../axiosInstance';

enum ErrorType {
  noResult = 'noResult',
  network = 'network',
}

function getReverseGeocodeURL(location: MapLocation) {
  const config = {
    resultType: 'food|restaurant|bar|point_of_interest|route|street_address',
    locationType: 'ROOFTOP',
  };
  const url = `/geocode/json?latlng=${location.latitude},${location.longitude}&result_type=${config.resultType}&location_type=${config.locationType}`;

  return url;
}

function getPlaceDetailURL(placeId: string) {
  const config = {
    language: 'ko',
    fields: 'formatted_address,name,geometry,place_id',
  };
  const url = `/place/details/json?place_id=${placeId}&language=${config.language}&fields=${config.fields}`;

  return url;
}

function mapErrorHandler(location: MapLocation, errorType: ErrorType): Address {
  const error = {
    noResult: {
      message:
        '해당 위치 정보를 불러올 수 없습니다. 다른 장소를 선택해 주세요.',
      reason: '결과 없음',
    },
    network: {
      message: '네트워크 에러가 발생하였습니다.',
      reason: '네트워크 에러',
    },
  };

  return {
    formatted_address: error[errorType].message,
    name: error[errorType].reason,
    geometry: {
      location: {
        lat: location.latitude,
        lng: location.longitude,
      },
    },
    place_id: '',
  };
}

async function requestReverseGeocode(url: string) {
  return mapAxios
    .get<GetReverseGeocodeResponse>(url)
    .then(({ data }) => data.results[0]?.place_id);
}

async function requestPlaceDetail(url: string) {
  return mapAxios
    .get<GetPlaceDetailResponse>(url)
    .then(({ data }) => data.result);
}

export const getPlaceId = fn.flow(getReverseGeocodeURL, requestReverseGeocode);

export const getPlaceDetailResult = fn.flow(
  getPlaceDetailURL,
  requestPlaceDetail,
);

// 캐싱 작업으로 불필요한 API 요청을 최적화
const cache = enableCache<string, Address>();

export async function requestGetAddress(
  location: MapLocation,
): Promise<Address> {
  const createAddress = (placeDetail: Address) => {
    return {
      ...placeDetail,
      name: placeDetail.name,
      geometry: {
        location: {
          lat: location.latitude,
          lng: location.longitude,
        },
      },
    };
  };
  const placeId = await getPlaceId(location);

  if (fn.isEmpty(placeId)) {
    return mapErrorHandler(location, ErrorType.noResult);
  }

  if (cache.has(placeId)) {
    const cachedAddress = cache.get(placeId) as Address;

    return createAddress(cachedAddress);
  }

  return promiseFlow(placeId, [getPlaceDetailResult, createAddress], {
    onError: () => {
      return mapErrorHandler(location, ErrorType.network);
    },
    onSucess: data => {
      cache.set(data.place_id, data);
    },
  });
}
