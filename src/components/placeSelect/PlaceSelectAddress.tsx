import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';

import Font, { BoldFont } from '../Font';
import type {
  AddressProps,
  CategoryProps,
  SubAddressProps,
  AddressTitleProps,
} from '../../types';
import usePlace from '../../hooks/usePlace';

export default function AddressInfo() {
  const { placeState: locationState } = usePlace();
  const styles = useStyles();
  const data = {
    address: {
      title: locationState.name,
      category: locationState.category,
    },
    subAddress: {
      title: locationState.address,
    },
  };

  return (
    <View style={styles.container}>
      <Address info={data.address} />
      <SubAddress info={data.subAddress} />
    </View>
  );
}

function Address({ info }: AddressProps) {
  const styles = useStyles();

  return (
    <View style={styles.addressContainer}>
      <AddressTitle text={info.title} />
      <Category text={info.category} />
    </View>
  );
}

function AddressTitle({ text }: AddressTitleProps) {
  const styles = useStyles();

  return <BoldFont style={styles.addressText}>{text}</BoldFont>;
}

function Category({ text }: CategoryProps) {
  const styles = useStyles();

  return (
    <View style={styles.categoryContainer}>
      <Font style={styles.categoryText}>{text}</Font>
    </View>
  );
}

function SubAddress({ info }: SubAddressProps) {
  const styles = useStyles();

  return (
    <View>
      <Font style={styles.subAddressText}>{info.title}</Font>
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
    color: theme.grayscale['700'],
    fontSize: 14,
    lineHeight: 20,
  },
}));
