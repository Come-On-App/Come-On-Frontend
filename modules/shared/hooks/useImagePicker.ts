import { useCallback, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function useImagePicker() {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [isImageLoading, setLoading] = useState(false);
  const initImage = useCallback(() => setImage(null), []);
  const pickImage = useCallback(async () => {
    setLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }

    setLoading(false);
  }, []);

  return {
    image,
    pickImage,
    isImageLoading,
    initImage,
  };
}
