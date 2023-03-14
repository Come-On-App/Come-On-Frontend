import {
  MediaTypeOptions,
  PermissionStatus,
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
  ImagePickerAsset,
} from 'expo-image-picker';
import { useCallback, useState } from 'react';

import { promiseFlow } from '@utils/promise';
import { getFileName, inferTypeImage } from '@utils/image';
import { nativeAlert } from '@utils/alert';
import type { AssetState, PickImage } from '@type/hook.imagePicker';

function getAssetState(assets: ImagePickerAsset): AssetState {
  const imageURI = assets.uri;
  const fileName = getFileName(imageURI);
  const imageType = inferTypeImage(fileName);

  return {
    name: fileName,
    type: imageType,
    uri: imageURI,
    base64: assets.base64,
  };
}

function emitImageErrorAlert() {
  const text = {
    title: '사진 로드에 실패하였습니다.',
    message: '해당 앱을 사용하려면 \n 사진 권한을 허용해 주세요.',
  };

  nativeAlert(text);
}

const useImagePicker = (): [AssetState | null, PickImage] => {
  const [assetState, setAsset] = useState<AssetState | null>(null);
  const [libraryPermisson, requestPermission] = useMediaLibraryPermissions();
  const permissionStatus = libraryPermisson?.status;
  const verifyPermissions = useCallback(async () => {
    if (permissionStatus === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (permissionStatus === PermissionStatus.DENIED) {
      emitImageErrorAlert();

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
      const asset = getAssetState(imagePickerResult.assets[0]);

      setAsset(asset);
    }
  }, []);
  const pickImage = useCallback(
    () =>
      promiseFlow(verifyPermissions, [getImagePickerResult], {
        onSuccess: () => {
          setAsset(null);
        },
      }),
    [verifyPermissions, getImagePickerResult],
  );

  return [assetState, pickImage];
};

export default useImagePicker;
