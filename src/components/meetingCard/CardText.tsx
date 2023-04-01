import React from 'react';
import { View } from 'react-native';
import { Divider, makeStyles } from '@rneui/themed';

import type { CardSubTitleProps, CardTtileProps } from '@type/component.card';
import Icon from '@components/Icon';
import Font, { BoldFont } from '@components/Font';
import { meeting } from '@assets/config';

const { display } = meeting.text;

export function CardTitle({ titleText }: CardTtileProps) {
  const styles = useStyles();

  return <BoldFont style={styles.titleFont}>{titleText}</BoldFont>;
}

export function CardSubTitle({ userText, dateRange }: CardSubTitleProps) {
  const styles = useStyles();

  return (
    <View style={styles.subTitleContianer}>
      <Icon
        name="account-circle"
        size={styles.icon.size}
        color={styles.icon.color}
      />
      <Font style={styles.subTitleUserFont}>{userText}</Font>
      <Divider
        orientation="vertical"
        color={styles.dividerBorder.color}
        width={styles.dividerBorder.width}
        style={styles.divider}
      />
      <Icon
        name="date-range"
        size={styles.icon.size}
        color={styles.icon.color}
      />
      <Font style={styles.subTitleDateFont}>{display.subTitle(dateRange)}</Font>
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
    color: theme.grayscale['300'],
    width: 1,
  },
  dividerBorder: {
    color: theme.grayscale['300'],
    width: 1,
  },
  icon: {
    color: theme.grayscale['600'],
    size: 16,
  },
}));
