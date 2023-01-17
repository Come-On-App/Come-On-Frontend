import React, { useState } from 'react';
import { StyleSheet, Image, Pressable, View, Alert } from 'react-native';
import {
  useMediaLibraryPermissions,
  launchImageLibraryAsync,
  MediaTypeOptions,
  PermissionStatus,
} from 'expo-image-picker';

import theme from '../../constants/themed';
import { Font } from '../Font';
import Icon from '../Icon';

function InputImage() {
  const [libraryPermisson, requestPermission] = useMediaLibraryPermissions();
  const [image, setImage] = useState('');
  const title = '허가요청';
  const description = '이 앱을 사용하려면 사진첩 접근권한이 필요합니다.';

  // TODO ios permission 뜨는지 확인하기
  async function verifyPermissions() {
    if (libraryPermisson?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (libraryPermisson?.status === PermissionStatus.DENIED) {
      Alert.alert(title, description);

      return false;
    }

    return true;
  }

  async function pickImage() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  let picture = (
    <View style={styles.imageBox}>
      <Icon name="camera-alt" size={28} color={theme.grayscale?.[500]} />
      <Font style={styles.fontColor}>사진을 등록해 주세요</Font>
    </View>
  );

  if (image) {
    picture = <Image source={{ uri: image }} style={styles.image} />;
  }

  // 추후 이미지 권한 얻어오기
  return (
    <View style={styles.container}>
      <Font style={styles.label}>사진등록</Font>
      <Pressable onPress={() => pickImage()} style={[styles.imageContainer]}>
        {picture}
      </Pressable>
    </View>
  );
}

export default InputImage;

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
  },
  imageContainer: {
    overflow: 'hidden',
    marginTop: 12,
    width: '100%',
    height: 200,
    backgroundColor: theme.grayscale?.[100],
    borderColor: theme.grayscale?.[200],
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  label: {
    color: theme.grayscale?.[900],
    fontSize: theme.textStyles?.title4?.fontSize,
    lineHeight: theme.textStyles?.title4?.lineHeight,
    fontWeight: 'bold',
  },
  fontColor: {
    color: theme.grayscale?.[500],
  },
  imageBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
