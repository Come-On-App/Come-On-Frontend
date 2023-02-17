import { useEffect, useState, useCallback } from 'react';
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location';

import { promiseFlow } from '@utils/promise';
import { LocationObject } from '@type/index';
import { native } from '@utils/alert';
import type { MapLocation } from '@type/api.map';

function emitGPSErrorAlert() {
  const text = {
    title: 'GPS 로드에 실패하였습니다.',
    message: '해당 앱을 사용하려면 \n GPS 권한을 허용해 주세요.',
  };

  native(text);
}

function getLatitudeLongitude({ coords }: LocationObject) {
  return {
    latitude: coords.latitude,
    longitude: coords.longitude,
  };
}

export default function useCurrentPosition() {
  const [location, setLocation] = useState<MapLocation>();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const permissionStatus = locationPermissionInformation?.status;
  const verifyPermissions = useCallback(async () => {
    // User hasn't granted or denied the permission yet.
    if (permissionStatus === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    // User has denied the permission.
    if (permissionStatus === PermissionStatus.DENIED) {
      emitGPSErrorAlert();

      return false;
    }

    return true;
  }, [permissionStatus, requestPermission]);
  const extractLocationAndSetLocation = useCallback(
    async (hasPermission: boolean) => {
      if (!hasPermission) return;

      promiseFlow(getCurrentPositionAsync, [getLatitudeLongitude, setLocation]);
    },
    [],
  );

  useEffect(() => {
    promiseFlow(verifyPermissions, [extractLocationAndSetLocation]);
  }, [verifyPermissions, extractLocationAndSetLocation]);

  return location;
}
