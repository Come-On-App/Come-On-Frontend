import React from 'react';
import { makeStyles } from '@rneui/themed';
import { View, Text, StyleProp, ViewStyle, Dimensions } from 'react-native';
import Icon from '@components/Icon';
import { IconProps } from '../../types';

export interface IconInputBoxProps {
  iconConfig: IconProps;
  condition: boolean;
  value: string;
  placeholder: string;
  style?: StyleProp<ViewStyle>;
}

export const isValid = <T extends string | object>(data: T): boolean => {
  if (!data) return false;

  return true;
};

function IconInputBox({
  iconConfig,
  condition,
  value,
  placeholder,
  style,
}: IconInputBoxProps) {
  const styles = useStyles();
  const { name, size, color } = iconConfig;

  return (
    <View style={[styles.dateContainer, style]}>
      <Icon name={name} size={size} color={color} />
      <Text style={styles.meetingNoteInput}>
        {condition ? value : placeholder}
      </Text>
    </View>
  );
}

const { width } = Dimensions.get('window');
const useStyles = makeStyles(theme => ({
  meetingNoteInput: {
    textAlignVertical: 'center',
    color: theme.grayscale['500'],
    marginLeft: 10,
  },
  dateContainer: {
    padding: width < 385 ? 8 + 1.75 : 12 + 1.85,
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    textAlignVertical: 'center',
    borderColor: theme.grayscale['200'],
  },
}));

export default IconInputBox;
