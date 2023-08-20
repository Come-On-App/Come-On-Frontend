import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function useImagePicker(): [
  ImagePicker.ImagePickerAsset | null,
  () => Promise<void>,
  boolean,
] {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [isLoading, setLoading] = useState(false);
  const pickImage = async () => {
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
  };

  return [image, pickImage, isLoading];
}
