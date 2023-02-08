import {
  MediaTypeOptions,
  PermissionStatus,
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from 'expo-image-picker';
import { useCallback, useState } from 'react';

export type ImageState = {
  assetId: string | null | undefined;
  fileName: string | null | undefined;
  base64: string | null | undefined;
  uri: string;
};
type PickImage = () => void;

function startPromise<T>(
  func0: () => Promise<T>,
  func1: (value: T) => void,
): void {
  func0().then(func1);
}

const useImagePath = (): [ImageState | null, PickImage] => {
  const [path, setPath] = useState<ImageState | null>(null);
  const [libraryPermisson, requestPermission] = useMediaLibraryPermissions();
  const permissionStatus = libraryPermisson?.status;
  const verifyPermissions = useCallback(async () => {
    if (permissionStatus === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (permissionStatus === PermissionStatus.DENIED) {
      return false;
    }

    return true;
  }, [permissionStatus, requestPermission]);
  const getImagePickerResult = useCallback(async (hasPermission: boolean) => {
    if (!hasPermission) return;

    const imagePickerResult = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!imagePickerResult.canceled) {
      const assets = imagePickerResult.assets[0];

      setPath({
        assetId: assets.assetId,
        fileName: assets.fileName,
        base64: assets.base64,
        uri: assets.uri,
      });
    }
  }, []);
  const pickImage = useCallback(
    () => startPromise(verifyPermissions, getImagePickerResult),
    [verifyPermissions, getImagePickerResult],
  );

  return [path, pickImage];
};

export default useImagePath;
