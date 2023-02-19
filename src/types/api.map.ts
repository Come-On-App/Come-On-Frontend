/**
 * 타입 명시 규칙
 *
 * ***
 * {서버 메소드} + 이름 + {payload or response}
 * ***
 */

export interface MapLocation {
  latitude: number;
  longitude: number;
}

export interface GetPlaceDetailResponse {
  result: Address;
  status: string;
}

export interface GetGoogleMapResponse {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  place_id: string;
}

export interface GetReverseGeocodeResponse {
  results: GetGoogleMapResponse[];
  status: string;
}

export interface Address extends GetGoogleMapResponse {
  name: string;
}
