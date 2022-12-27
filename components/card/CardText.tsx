import React from 'react';
import { View } from 'react-native';
import { Divider, makeStyles } from '@rneui/themed';

import Icon from '../Icon';
import Font from '../StyledText';
import { CardSubTitleProps, CardTtileProps } from '../../types';

export function CardTitle({ titleText }: CardTtileProps) {
  const styles = useStyles();

  return <Font style={styles.titleFont}>{titleText}</Font>;
}

export function CardSubTitle({ userText, dateText }: CardSubTitleProps) {
  const iconProps = {
    color: '#757575',
    size: 16,
  };
  const dividerProps = {
    color: '#E0E0E0',
    width: 1,
  };
  const styles = useStyles();

  return (
    <View style={styles.subTitleContianer}>
      <Icon
        name="account-circle"
        size={iconProps.size}
        color={iconProps.color}
      />
      <Font style={styles.subTitleUserFont}>{userText}</Font>
      <Divider
        orientation="vertical"
        color={dividerProps.color}
        width={dividerProps.width}
        style={styles.divider}
      />
      <Icon name="date-range" size={iconProps.size} color={iconProps.color} />
      <Font style={styles.subTitleDateFont}>{dateText}</Font>
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  titleFont: {
    color: theme.grayscale['900'],
    fontSize: theme.textStyles.title3.fontSize,
    lineHeight: theme.textStyles.title3.lineHeight,
    fontWeight: '100',
  },
  subTitleContianer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  subTitleUserFont: {
    color: theme.grayscale['600'],
    fontSize: theme.textStyles.body2.fontSize,
    lineHeight: theme.textStyles.body2.lineHeight,
    fontWeight: '400',
  },
  subTitleDateFont: {
    color: theme.grayscale['600'],
    fontSize: theme.textStyles.body2.fontSize,
    lineHeight: theme.textStyles.body2.lineHeight,
    fontWeight: '400',
  },
  divider: {
    marginHorizontal: 5,
    height: 12,
  },
}));
