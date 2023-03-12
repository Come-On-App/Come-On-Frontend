import React from 'react';
import { makeStyles } from '@rneui/themed';
import { View, Pressable } from 'react-native';

import usePlace from '@hooks/redux/usePlace';
import { common, PlaceAddButtonProps } from '@type/component.placecard';
import Icon from '@components/Icon';
import Font from '@components/Font';

function PlaceAddButton({ navigation, meetingId }: PlaceAddButtonProps) {
  const title = '새로운 코스를 추가해보세요';
  const styles = useStyles();
  const { placeEachDispatch } = usePlace();
  const onPressHandler = () => {
    placeEachDispatch('meetingId', meetingId);
    navigation.navigate('PlaceSelect', { screen: 'Main' });
  };

  return (
    <Pressable
      onPress={onPressHandler}
      style={({ pressed }) => [styles.wrap, pressed && styles.pressed]}
    >
      <View style={styles.container}>
        <Icon name="map" color={styles.textColor.color} size={24} />
        <Font style={styles.text}>{title}</Font>
      </View>
    </Pressable>
  );
}

const useStyles = makeStyles(theme => ({
  wrap: {
    margin: 14,
  },
  container: {
    height: common.Height,
    borderWidth: 1,
    borderRadius: 4,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.grayscale['400'],
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: theme.grayscale['700'],
    fontSize: theme.textStyles.body1.fontSize,
    lineHeight: theme.textStyles.body1.lineHeight,
  },
  textColor: {
    color: theme.grayscale['500'],
  },
}));

export default PlaceAddButton;
