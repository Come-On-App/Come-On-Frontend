import React, { useState } from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';

import Map from './PlaceSelectMap';
import AddressInfo from './PlaceSelectAddress';
import PlaceSelectModal from './PlaceSelectModal';
import PlaceSelectButton from './PlaceSelectButton';
import PlaceSelectSearchBar from './PlaceSelectSearchBar';

export default function PlaceSelect() {
  const styles = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const openCodeModal = () => setOpenModal(true);
  const closeCodeModal = () => setOpenModal(false);

  return (
    <View style={styles.container}>
      <PlaceSelectTop />
      <PlaceSelectMain />
      <PlaceSelectBottom openCodeModal={openCodeModal} />
      <PlaceSelectModal isVisible={openModal} onClose={closeCodeModal} />
    </View>
  );
}

function PlaceSelectTop() {
  const styles = useStyles();

  return (
    <View style={styles.searchContainer}>
      <PlaceSelectSearchBar />
    </View>
  );
}

function PlaceSelectMain() {
  const styles = useStyles();

  return (
    <View style={styles.mainContainer}>
      <Map />
    </View>
  );
}

function PlaceSelectBottom({ openCodeModal }: { openCodeModal: () => void }) {
  const styles = useStyles();

  return (
    <View style={styles.footerContainer}>
      <AddressInfo />
      <PlaceSelectButton onPress={openCodeModal} />
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    borderTopWidth: 0.5,
    borderColor: theme.grayscale['200'],
    backgroundColor: theme.grayscale['0'],
  },
  searchContainer: {
    flex: 0.15,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 0.6,
    paddingVertical: 10,
  },
  footerContainer: {
    flex: 0.25,
    marginHorizontal: 20,
  },
}));
