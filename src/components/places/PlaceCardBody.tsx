import { makeStyles } from '@rneui/themed';
import { Places } from '@type/api.meeting';
import React from 'react';
import { View } from 'react-native';
import { Font } from '../Font';
import Caption from './Caption';

type PlaceCardBodyProps = {
  data: Places;
};

function PlaceCardBody({ data }: PlaceCardBodyProps) {
  const styles = useStyles();
  const { placeName, category, memo, address } = data;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Font style={styles.title}>{placeName}</Font>
        <Caption>{category}</Caption>
      </View>
      <View>
        <Font style={styles.subTitle}>{memo}</Font>
      </View>
      <View>
        <Font style={styles.address}>{address}</Font>
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
