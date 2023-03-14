import _ from 'lodash/fp';
import { Alert } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location';

import type { Location, LocationObject } from '@type/index';

function emitGPSErrorAlert() {
  const text = {
    title: 'GPS 로드에 실패하였습니다.',
    message: '해당 앱을 사용하려면 \n GPS 권한을 허용해 주세요.',
  };

  Alert.alert(text.title, text.message);
}

function getLatitudeLongitude({ coords }: LocationObject) {
  return {
    latitude: coords.latitude,
    longitude: coords.longitude,
  };
}

function startPromise<T>(
  func0: () => Promise<T>,
  func1: (value: T) => void,
): void {
  func0().then(func1);
}

export default function useCurrentPosition() {
  const [location, setLocation] = useState<Location>();
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

      const setLatitudeLongitude = _.flow(getLatitudeLongitude, setLocation);

      getCurrentPositionAsync()
        .then(setLatitudeLongitude)
        .catch(() => {
          // GPS Promise Rejection catch.
          // TODO: We might want to provide this error information to an error reporting service
          setLocation(undefined);
        });
    },
    [],
  );

  useEffect(() => {
    startPromise(verifyPermissions, extractLocationAndSetLocation);
  }, [verifyPermissions, extractLocationAndSetLocation]);

  return location;
}
