import { nativeAlert } from '@utils/alert';
import fn from '@utils/fn';
import { promiseFlow } from '@utils/promise';
import { useEffect, useState, useCallback } from 'react';
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location';

import type { LocationObject } from '@type/index';
import type { MapLocation } from '@type/api.map';

function emitGPSErrorAlert() {
  const text = {
    title: 'GPS 로드에 실패하였습니다.',
    message: '해당 앱을 사용하려면 \n GPS 권한을 허용해 주세요.',
  };

  nativeAlert(text);
}

function getLatitudeLongitude({ coords }: LocationObject) {
  return {
    latitude: coords.latitude,
    longitude: coords.longitude,
  };
}

// promiseFlow 초기 코드
function startPromise<T>(
  func0: () => Promise<T>,
  func1: (value: T) => void,
): void {
  func0().then(func1);
}

export default function useCurrentLocation() {
  const [location, setLocation] = useState<MapLocation>();
  const [locationPermissionInformation, requestPpermission] =
    useForegroundPermissions();
  const permissionStatus = locationPermissionInformation?.status;
  const verifyPermissions = useCallback(async () => {
    // User hasn't granted or denied the permission yet.
    if (permissionStatus === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPpermission();

      return permissionResponse.granted;
    }

    // User has denied the permission.
    if (permissionStatus === PermissionStatus.DENIED) {
      emitGPSErrorAlert();

      return false;
    }

    return true;
  }, [permissionStatus, requestPpermission]);
  const extractLocationAndSetLocation = useCallback(
    (hasPermission: boolean) => {
      if (!hasPermission) return;

      const setLatitudeLongitude = fn.flow(getLatitudeLongitude, setLocation);

      promiseFlow(getCurrentPositionAsync, [setLatitudeLongitude], {
        onError: () => {
          // GPS Promise Rejection catch.
          setLocation(undefined);
        },
      });
    },
    [],
  );

  useEffect(() => {
    promiseFlow(verifyPermissions, [extractLocationAndSetLocation]);
  }, [verifyPermissions, extractLocationAndSetLocation]);

  return [location];
}
