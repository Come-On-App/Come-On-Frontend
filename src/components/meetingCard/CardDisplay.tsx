import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';

import type {
  DisplayIconProps,
  GroupDisplayProps,
  ConfirmDisplayProps,
} from '@type/component.card';
import Icon from '@components/Icon';
import Font from '@components/Font';
import { meeting } from '@assets/config';

const { display } = meeting.text;

function DisplayIcon({ icon: iconName }: DisplayIconProps) {
  const { icon, iconContainer } = useStyles();

  return (
    <View style={iconContainer}>
      <Icon name={iconName} size={icon.size} color={icon.color} />
    </View>
  );
}

export function GroupDisplay({ people }: GroupDisplayProps) {
  const styles = useStyles();

  return (
    <View style={styles.contianer}>
      <DisplayIcon icon="groups" />
      <Font style={styles.font}>{display.totalPeople(people)}</Font>
    </View>
  );
}

export function ConfirmDisplay({ isDecided }: ConfirmDisplayProps) {
  const styles = useStyles(isDecided);

  return (
    <View style={styles.contianer}>
      {isDecided ? <DisplayIcon icon="check-circle" /> : null}
      <Font style={styles.font}>{display.decided(isDecided)}</Font>
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
  icon: {
    color: theme.grayscale['0'],
    size: 16,
  },
}));
