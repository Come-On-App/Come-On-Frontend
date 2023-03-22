import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';

import usePlace from '@hooks/redux/usePlace';
import PlaceSelectModal from '@components/placeSelect/PlaceSelectModal';
import PlaceSelectSearchBar from '@components/placeSelect/PlaceSelectSearchBar';
import Map from '@components/placeSelect/PlaceSelectMap';
import AddressInfo from '@components/placeSelect/PlaceSelectAddress';
import PlaceSelectButton from '@components/placeSelect/PlaceSelectButton';
import { useNavigation } from '@react-navigation/native';
import usePlaceMutation from '@hooks/query/usePlaceMutation';
import type { PlaceSelectState } from '@type/index';
import { requestPostMeetingPlacesLock } from '@api/meeting/places';
import { promiseFlow } from '@utils/promise';
import { getPlaceSelectState } from '@components/placeSelect/data';
import { PlaceSelectBottomProps } from '@type/component.placeselect';
import { ErrorMeetingResponse } from '@type/api.meeting';
import { errorAlert } from '@utils/alert';
import RelativeHeightContent from '@components/RelativeHeight';

export default function PlaceSelect() {
  const styles = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const onOpenHandler = () => setOpenModal(true);
  const onCloseHandler = () => setOpenModal(false);

  return (
    <View style={styles.container}>
      <PlaceSelectTop />
      <PlaceSelectMain />
      <PlaceSelectBottom onOpen={onOpenHandler} />
      <PlaceSelectModal isVisible={openModal} onClose={onCloseHandler} />
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
    <View style={[styles.mainContainer]}>
      <Map />
    </View>
  );
}

function PlaceSelectBottom({ onOpen }: PlaceSelectBottomProps) {
  const styles = useStyles();
  const navigation = useNavigation();
  const isLockRequested = useRef(false);
  const { addMeetingPlace, updateMeetingPlace } = usePlaceMutation();
  const { placeState, placeResetDispatch } = usePlace();
  const { buttonText, isRequestReady, payloads, isLockRequestReady } =
    getPlaceSelectState(placeState);
  const { addPlacePayload, updatePlacePayload, LockPlacePayload } = payloads;
  const requestAPI = (placeStatus: PlaceSelectState): void => {
    return placeStatus === 'Add'
      ? addMeetingPlace(addPlacePayload)
      : updateMeetingPlace(updatePlacePayload);
  };
  const onPressHandler = () => {
    if (!isRequestReady) return;

    promiseFlow(placeState.state, [requestAPI], {
      onSuccess: placeResetDispatch,
    });
    navigation.goBack();
  };

  useEffect(() => {
    if (isLockRequestReady && !isLockRequested.current) {
      isLockRequested.current = true;
      promiseFlow(LockPlacePayload, [requestPostMeetingPlacesLock], {
        onError: (error: ErrorMeetingResponse) => {
          errorAlert(error.response.data.errorDescription);
          navigation.goBack();
        },
      });
    }
  }, [LockPlacePayload, isLockRequestReady, navigation]);

  return (
    <View style={styles.footerContainer}>
      <RelativeHeightContent>
        <AddressInfo />
        <PlaceSelectButton text="장소상세" onPress={onOpen} />
        <PlaceSelectButton
          text={buttonText}
          onPress={onPressHandler}
          isDisabled={!isRequestReady}
          buttonStyle={styles.submitButton}
        />
      </RelativeHeightContent>
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
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 0.7,
    paddingVertical: 10,
  },
  footerContainer: {
    flex: 0.25,
    marginHorizontal: 20,
  },
  submitButton: {
    backgroundColor: theme.colors.secondary,
  },
}));
