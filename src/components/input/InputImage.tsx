import React, { useEffect } from 'react';
import { Image, Pressable, View } from 'react-native';

import useImagePicker from '@hooks/useImagePicker';
import useMeeting from '@hooks/useMeeting';

import { makeStyles } from '@rneui/themed';
import { Font } from '../Font';
import Icon from '../Icon';

function InputImage() {
  const styles = useStyles();
  const { setMyMeetingImgPath } = useMeeting();
  const [path, pickImage2] = useImagePicker();

  useEffect(() => {
    if (path) {
      setMyMeetingImgPath(path);
    }
  }, [path, setMyMeetingImgPath]);

  // 추후 이미지 권한 얻어오기
  return (
    <View style={styles.container}>
      <Font style={styles.label}>사진등록</Font>
      <Pressable onPress={pickImage2} style={[styles.imageContainer]}>
        {path ? <Image source={path} style={styles.image} /> : <ImageContent />}
      </Pressable>
    </View>
  );
}

export default InputImage;

function ImageContent() {
  const styles = useStyles();

  return (
    <View style={styles.imageBox}>
      <Icon
        name="camera-alt"
        size={28}
        color={styles.imageContentColor.color}
      />
      <Font style={styles.fontColor}>사진을 등록해 주세요</Font>
    </View>
  );
}

const useStyles = makeStyles(theme => ({
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
  imageContentColor: {
    color: theme.grayscale?.[500],
  },
}));
