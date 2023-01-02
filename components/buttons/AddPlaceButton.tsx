import React from 'react';
import { View, Pressable } from 'react-native';
import { makeStyles } from '@rneui/themed';
import Icon from '../Icon';
import Font from '../StyledText';
import { AddPlaceButtonProps } from '../../types';

function AddPlaceButton({ navigation, iconName, text }: AddPlaceButtonProps) {
  const styles = useStyles();

  return (
    <Pressable
      onPress={() => navigation.navigate('TestModal')}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <View style={styles.courseContainer}>
        <Icon name={iconName} color={styles.textColor.color} size={24} />
        <Font style={styles.text}>{text}</Font>
      </View>
    </Pressable>
  );
}

export default AddPlaceButton;

const useStyles = makeStyles(theme => ({
  courseContainer: {
    marginTop: 12,
    width: '100%',
    height: 80,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 4,
    borderColor: theme.grayscale?.[400],
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: theme.grayscale?.[700],
    lineHeight: theme.textStyles?.body1?.lineHeight,
    fontSize: theme.textStyles?.body1?.fontSize,
  },
  textColor: {
    color: theme.grayscale?.[500],
  },
}));
