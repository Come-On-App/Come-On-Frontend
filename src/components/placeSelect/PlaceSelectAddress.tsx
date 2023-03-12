import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';

import type {
  AddressProps,
  CategoryProps,
  SubAddressProps,
  AddressTitleProps,
  DescriptionProps,
} from '@type/component.placeselect';
import usePlace from '@hooks/redux/usePlace';
import Font, { BoldFont } from '@components/Font';
import { convertKeyToValue } from './data';

export default function AddressInfo() {
  const styles = useStyles();
  const { placeState } = usePlace();
  const data = {
    address: {
      title: placeState.placeName,
      category: placeState.category,
    },
    subAddress: {
      title: placeState.address,
    },
  };

  return (
    <View style={styles.container}>
      <Address info={data.address} />
      <SubAddress info={data.subAddress} />
    </View>
  );
}

export function Address({ info }: AddressProps) {
  const styles = useStyles();

  return (
    <View style={styles.addressContainer}>
      <AddressTitle text={info.title} />
      <Category category={info.category} />
    </View>
  );
}

function AddressTitle({ text }: AddressTitleProps) {
  const styles = useStyles();

  return <BoldFont style={styles.addressText}>{text}</BoldFont>;
}

function Category({ category }: CategoryProps) {
  const styles = useStyles();
  const value = convertKeyToValue(category);

  return (
    <View style={styles.categoryContainer}>
      <Font style={styles.categoryText}>{value}</Font>
    </View>
  );
}

export function SubAddress({ info }: SubAddressProps) {
  const styles = useStyles();

  return (
    <View>
      <Font style={styles.subAddressText}>{info.title}</Font>
    </View>
  );
}

export function Description({ info }: DescriptionProps) {
  const styles = useStyles();

  return (
    <View>
      <Font style={styles.descriptionText}>{info.text}</Font>
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: 12,
  },
  addressContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 18,
    lineHeight: 24,
  },
  categoryContainer: {
    justifyContent: 'center',
    marginLeft: 4,
  },
  categoryText: {
    color: theme.grayscale['500'],
    fontSize: 10,
    backgroundColor: theme.grayscale['200'],
    overflow: 'hidden',
    borderRadius: 2,
    paddingVertical: 1,
    paddingHorizontal: 3,
  },
  subAddressText: {
    color: theme.grayscale['500'],
    fontSize: 12,
    lineHeight: 20,
  },
  descriptionText: {
    color: theme.grayscale['700'],
    fontSize: 14,
    lineHeight: 20,
  },
}));
