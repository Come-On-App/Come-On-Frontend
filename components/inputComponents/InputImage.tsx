/* eslint-disable global-require */
import React from 'react';
import { StyleSheet, Image, Pressable } from 'react-native';
import { View } from '../../components/Themed';
import { theme } from '../../constants/Colors';
import { PretendardText } from '../StyledText';

function InputImage() {
  const onPressImage = () => {
    console.log('gg');
  };

  // 추후 이미지 권한 얻어오기
  return (
    <View style={styles.container}>
      <PretendardText style={styles.label}>사진등록</PretendardText>
      <View style={styles.imageContainer}>
        <Pressable onPress={onPressImage}>
          <View>
            <Image
              style={styles.image}
              source={require('../../assets/images/favicon.png')}
            />
          </View>
        </Pressable>
      </View>
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
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  label: {
    fontSize: theme.textStyles?.title4?.fontSize,
    lineHeight: theme.textStyles?.title4?.lineHeight,
    fontWeight: 'bold',
  },
});
