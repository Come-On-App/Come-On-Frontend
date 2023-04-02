import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import useImagePicker from '@hooks/useImagePicker';
import useMeeting from '@hooks/useMeeting';

import { makeStyles } from '@rneui/themed';
import ImageContent from '@components/Image';
import { Title } from '@screens/meeting/detail/common';
import { reportConfig } from '@constants/config';

function InputImage() {
  const styles = useStyles();
  const { setMyMeetingImgPath, setImgUri: setMyImgUri } = useMeeting();
  const {
    meetingSelector: { meetingImgPath, imgUri },
  } = useMeeting();
  const [path, pickImage] = useImagePicker();
  const [imageUri, setImageUri] = useState<string>();

  useEffect(() => {
    if (path) setImageUri(path.uri);
  }, [imageUri, path]);

  useEffect(() => {
    if (path) {
      setMyMeetingImgPath(path);
      setMyImgUri(path.uri);

      setImageUri(imgUri);
    }

    if (imgUri) {
      setImageUri(imgUri);
    }
  }, [imgUri, meetingImgPath, path, setMyImgUri, setMyMeetingImgPath]);

  return (
    <View style={styles.container}>
      <Title title={reportConfig.text.image} />
      <ImageContent onPress={pickImage} imageURL={imageUri} />
    </View>
  );
}

export default InputImage;

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 28,
    marginBottom: 12,
  },
}));
