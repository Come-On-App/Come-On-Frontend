import React from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';

import Font from '@components/Font';
import { Icon, Image, makeStyles } from '@rneui/themed';
import { PickImage } from '@type/hook.imagePicker';
import { emptyString } from '@utils/fn';

interface ImageContentProps {
  onPress: PickImage;
  imageURL: string | undefined;
  isLoading?: boolean;
}

export default function ImageContent({
  onPress,
  imageURL = emptyString,
  isLoading,
}: ImageContentProps) {
  const styles = useStyles();

  if (isLoading) {
    return (
      <Image PlaceholderContent={<ActivityIndicator />} style={styles.image} />
    );
  }

  return (
    <View>
      {imageURL ? (
        <Image
          source={{ uri: imageURL }}
          onPress={onPress}
          style={styles.image}
        />
      ) : (
        <ImagePlaceholder onPress={onPress} />
      )}
    </View>
  );
}

function ImagePlaceholder({ onPress }: { onPress: PickImage }) {
  const styles = useStyles();
  const config = {
    title: '사진을 등록해 주세요',
    icon: {
      name: 'camera-alt',
      size: 28,
    },
  };

  return (
    <Pressable style={styles.imageBox} onPress={onPress}>
      <Icon
        name={config.icon.name}
        size={config.icon.size}
        color={styles.imageContentColor.color}
      />
      <Font style={styles.fontColor}>{config.title}</Font>
    </Pressable>
  );
}

const useStyles = makeStyles(theme => ({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 5,
  },
  fontColor: {
    color: theme.grayscale[500],
  },
  imageBox: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  imageContentColor: {
    color: theme.grayscale[500],
  },
}));
