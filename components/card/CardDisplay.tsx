import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';

import {
  ConfirmDisplayProps,
  DisplayIconProps,
  GroupDisplayProps,
} from '../../types';
import Icon from '../Icon';
import Font from '../StyledText';

function DisplayIcon({ icon }: DisplayIconProps) {
  const iconProps = {
    color: '#FFFFFF',
    size: 16,
  };
  const styles = useStyles();

  return (
    <View style={styles.iconContainer}>
      <Icon name={icon} size={iconProps.size} color={iconProps.color} />
    </View>
  );
}

export function GroupDisplay({ people }: GroupDisplayProps) {
  const styles = useStyles();
  const totalPeople = `${people}명`;

  return (
    <View style={styles.contianer}>
      <DisplayIcon icon="groups" />
      <Font style={styles.font}>{totalPeople}</Font>
    </View>
  );
}

export function ConfirmDisplay({ isDecided }: ConfirmDisplayProps) {
  const styles = useStyles(isDecided);
  const title = isDecided ? '확정' : '미확정';

  return (
    <View style={styles.contianer}>
      {isDecided ? <DisplayIcon icon="check-circle" /> : null}
      <Font style={styles.font}>{title}</Font>
    </View>
  );
}

const useStyles = makeStyles((theme, isDecided: boolean) => ({
  contianer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: isDecided ? theme.colors.primary : theme.grayscale['100'],
    borderRadius: 2,
    maxWidth: 64,
    height: 24,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginRight: 4,
  },
  iconContainer: {
    marginTop: 1,
    marginRight: 2,
  },
  font: {
    color: isDecided ? theme.grayscale['0'] : theme.grayscale['500'],
    fontSize: 12,
    lineHeight: 18,
  },
}));
