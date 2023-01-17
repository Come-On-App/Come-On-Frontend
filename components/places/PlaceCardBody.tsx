import { makeStyles } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { PlaceCardBodyProps } from '../../types';

import { Font } from '../Font';
import Caption from './Caption';

function PlaceCardBody({ data }: PlaceCardBodyProps) {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Font style={styles.title}>{data.name}</Font>
        <Caption>{data.category}</Caption>
      </View>
      <View>
        <Font style={styles.subTitle}>{data.description}</Font>
      </View>
      <View>
        <Font style={styles.address}>{data.address}</Font>
      </View>
    </View>
  );
}

export default PlaceCardBody;

const useStyles = makeStyles(theme => ({
  wrapContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  container: {
    flex: 8.5,
    width: 305, // 임시
    height: 80,
    borderWidth: 1,
    borderColor: theme.grayscale?.[200],
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  title: {
    fontSize: theme.textStyles.title4.fontSize,
    lineHeight: theme.textStyles.title4.lineHeight,
    fontWeight: 'bold',
    marginBottom: 4,
    marginRight: 4,
  },

  subTitle: {
    color: theme.grayscale?.[700],
    fontSize: theme.textStyles.body1.fontSize,
    lineHeight: theme.textStyles.body1.lineHeight,
  },
  address: {
    color: theme.grayscale?.[500],
    fontSize: theme.textStyles.body3.fontSize,
    lineHeight: theme.textStyles.body3.lineHeight,
  },
}));
