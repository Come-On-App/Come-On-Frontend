import React from 'react';
import { Pressable, View } from 'react-native';
import { Button as RneButton, makeStyles } from '@rneui/themed';

import Icon from '../Icon';
import type {
  ButtonProps,
  IconButtonProps,
  ButtonGroupProps,
} from '../../types';

export default function Button(props: ButtonProps) {
  const { text, bold, buttonStyle, textStyle, height, onPress, disabled } =
    props;
  const styles = useStyles({ bold, height });

  return (
    <RneButton
      disabled={disabled}
      title={text}
      onPress={onPress}
      buttonStyle={[styles.button, buttonStyle]}
      titleStyle={[styles.buttonText, textStyle]}
    />
  );
}

export function ButtonGroup(props: ButtonGroupProps) {
  const { spacing, height, firstButton, secondButton } = props;
  const styles = useStyles({ spacing, height });

  return (
    <View style={[styles.buttonContainer, { height }]}>
      <Button
        bold
        height={height}
        text={firstButton.text}
        textStyle={styles.buttonText}
        onPress={firstButton.onPress}
        buttonStyle={[styles.buttonRight, { ...firstButton.style }]}
      />
      <Button
        bold
        height={height}
        text={secondButton.text}
        textStyle={styles.buttonText}
        onPress={secondButton.onPress}
        buttonStyle={[styles.buttonLeft, { ...secondButton.style }]}
      />
    </View>
  );
}

export function IconButton({ style, icon, onPress }: IconButtonProps) {
  return (
    <Pressable onPress={onPress} style={style}>
      <Icon name={icon.iconName} size={icon.size} color={icon.color} />
    </Pressable>
  );
}

const useStyles = makeStyles(
  (theme, props: { bold?: boolean; spacing?: number; height?: number }) => ({
    button: {
      height: props.height ? props.height : 48,
      width: '100%',
      borderRadius: 4,
      backgroundColor: theme.colors.primary,
    },
    buttonText: {
      color: theme.grayscale['0'],
      fontSize: theme.textStyles.title4.fontSize,
      fontFamily: props.bold ? 'pretendard-bold' : 'pretendard-regular',
    },
    buttonContainer: {
      width: '100%',
      height: props.height ? props.height : 48,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    buttonLeft: {
      backgroundColor: theme.colors.primary,
      marginRight: props.spacing ? -props.spacing : -3,
    },
    buttonRight: {
      width: 100,
      backgroundColor: theme.grayscale['300'],
      marginRight: props.spacing ? props.spacing : 3,
    },
  }),
);
