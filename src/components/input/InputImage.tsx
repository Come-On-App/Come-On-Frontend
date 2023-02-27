import React, { useEffect } from 'react';
import { StyleSheet, Image, Pressable, View } from 'react-native';

import useImagePath from '@hooks/useImagePicker';
import useAnimationBounce from '@hooks/useAnim';
import { setMeetingImgPath } from '../../features/meetingSlice';

import theme from '../../constants/themed';
import { Font } from '../Font';
import Icon from '../Icon';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

function InputImage() {
  const dispatch = useAppDispatch();
  const onSubmit = useAppSelector(state => state.meeting.onSubmit);
  const imgPath = useAppSelector(state => state.meeting.meetingImgPath);
  const [path, pickImage2] = useImagePath();
  const picture = path ? (
    <Image source={path} style={styles.image} />
  ) : (
    <View style={styles.imageBox}>
      <Icon name="camera-alt" size={28} color={theme.grayscale?.[500]} />
      <Font style={styles.fontColor}>사진을 등록해 주세요</Font>
    </View>
  );
  const { trigger, AnimationBounceView } = useAnimationBounce(['image']);

  useEffect(() => {
    if (path) {
      dispatch(setMeetingImgPath(path));
    }
  }, [dispatch, path]);

  if (onSubmit && !imgPath) {
    trigger('image');
  }

  // 추후 이미지 권한 얻어오기
  return (
    <View style={styles.container}>
      <Font style={styles.label}>사진등록</Font>
      <AnimationBounceView id="image">
        <Pressable onPress={pickImage2} style={[styles.imageContainer]}>
          {picture}
        </Pressable>
      </AnimationBounceView>
    </View>
  );
}

export default InputImage;

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    marginBottom: 28,
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
