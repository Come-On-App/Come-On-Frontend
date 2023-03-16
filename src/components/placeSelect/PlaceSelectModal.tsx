import React, { Fragment, useEffect, useState } from 'react';
import { Input, makeStyles } from '@rneui/themed';
import { Dimensions, Keyboard, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import type { InputTextProps } from '@type/index';
import type {
  CategoryDropdownItem,
  PlaceSelectModalBottomProps,
  PlaceSelectModalProps,
} from '@type/component.placeselect';
import Modal from '@components/Modal';
import usePlace from '@hooks/redux/usePlace';
import Icon from '@components/Icon';
import Font from '@components/Font';
import Button from '@components/button/Buttons';
import InputBox from '@components/input/InputText';
import PlaceSelectModalContent from '@components/RelativeHeight';
import { CATEGORY_DATA, convertKeyToValue } from './data';

export default function PlaceSelectModal({
  onClose,
  isVisible,
}: PlaceSelectModalProps) {
  const styles = useStyles();
  const { width } = Dimensions.get('screen');
  const [modalBottom, setModalBottom] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
      setModalBottom(-60);
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setModalBottom(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Modal
      isVisible={isVisible}
      style={[
        styles.modalContainer,
        {
          width: width < 375 ? '85%' : '75%',
          transform: [{ translateY: modalBottom }],
        },
      ]}
    >
      <PlaceSelectModalContent>
        <PlaceSelectModalTop />
        <PlaceSelectModalMain />
        <PlaceSelectModalBottom onClose={onClose} />
      </PlaceSelectModalContent>
    </Modal>
  );
}

function PlaceSelectModalTop() {
  const styles = useStyles();
  const { placeState, placeDispatch } = usePlace();
  const onChnageHandler = (text: string) => {
    placeDispatch({
      ...placeState,
      placeName: text,
      isChanged: true,
    });
  };

  return (
    <View style={styles.topContainer}>
      <Input
        onChangeText={onChnageHandler}
        value={placeState.placeName}
        style={styles.topInput}
        errorStyle={styles.topInputError}
      />
      <View style={styles.subAddressContainer}>
        <Icon
          name="location-on"
          color={styles.subAddressIcon.color}
          size={styles.subAddressIcon.size}
        />
        <Font style={styles.subAddressText}>{placeState.address}</Font>
      </View>
    </View>
  );
}

function PlaceSelectModalMain() {
  return (
    <>
      <PlaceSelectModalCategory />
      <MeetingNote />
    </>
  );
}

function PlaceSelectModalBottom({ onClose }: PlaceSelectModalBottomProps) {
  const BUTTON_TEXT = '완료';

  return <Button text={BUTTON_TEXT} onPress={onClose} />;
}

function PlaceSelectModalCategory() {
  const styles = useStyles();

  return (
    <View style={styles.categoryContainer}>
      <CategoryTitle />
      <CategoryDropdown />
    </View>
  );
}

function CategoryTitle() {
  const CATEGORY_TITLE = '카테고리 선택';
  const styles = useStyles();

  return (
    <View>
      <Font style={styles.title}>{CATEGORY_TITLE}</Font>
    </View>
  );
}

function CategoryDropdown() {
  const styles = useStyles();
  const { placeDispatch, placeState } = usePlace();
  const [dropdownState, setDropdownState] = useState<string>();
  const onPressHandler = ({ key }: CategoryDropdownItem) => {
    setDropdownState(key);
    placeDispatch({
      ...placeState,
      category: key,
      isChanged: true,
    });
  };

  return (
    <View style={styles.dropdownWrap}>
      <Dropdown
        style={styles.dropdown}
        placeholder={convertKeyToValue(placeState.category, '카테고리')}
        selectedTextStyle={styles.dropdownSelectedText}
        placeholderStyle={styles.dropdownPlaceholder}
        containerStyle={styles.dropdownContainer}
        itemTextStyle={styles.dropdownItemText}
        data={CATEGORY_DATA}
        maxHeight={300}
        labelField="value"
        valueField="key"
        value={dropdownState}
        onChange={onPressHandler}
        renderRightIcon={() => (
          <Icon
            name="arrow-drop-down"
            size={styles.dropdownRightIcon.size}
            color={styles.dropdownRightIcon.color}
          />
        )}
      />
    </View>
  );
}

function MeetingNote() {
  const styles = useStyles();
  const { placeDispatch, placeState } = usePlace();
  const [description, setDescription] = useState(placeState.description);
  const onChangeHandler = (text: string) => {
    setDescription(text);
    placeDispatch({
      ...placeState,
      description: text,
      isChanged: true,
    });
  };
  const config: InputTextProps = {
    label: '모임메모',
    placeholder: '모임장소에 대한 메모를 남겨보세요',
    maxLength: 150,
    value: description,
    onChangeText: onChangeHandler,
    multiline: true,
  };

  return (
    <View style={styles.meetingNoteContainer}>
      <InputBox config={config} />
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  modalContainer: {
    height: 'auto',
    padding: 20,
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  topInput: {
    textAlign: 'center',
    color: theme.grayscale['900'],
    fontSize: 22,
    fontFamily: 'pretendard-bold',
  },
  topInputError: {
    display: 'none',
  },
  addressText: {
    fontSize: 22,
  },
  subAddressContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  subAddressText: {
    color: theme.grayscale['700'],
    fontSize: 14,
    marginLeft: 2,
  },
  subAddressIcon: {
    color: theme.grayscale['700'],
    size: 20,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
  },
  meetingNoteContainer: {
    marginBottom: 20,
  },
  dropdownWrap: {
    marginTop: 12,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme.grayscale['200'],
    height: 44,
    justifyContent: 'center',
    padding: 12,
  },
  dropdownPlaceholder: {
    fontSize: theme.textStyles.body1.fontSize,
    color: theme.grayscale['900'],
  },
  dropdownContainer: {
    borderRadius: 4,
    borderColor: theme.grayscale['200'],
  },
  dropdownItemText: {
    color: theme.grayscale['900'],
    fontSize: theme.textStyles.body3.fontSize,
  },
  dropdownSelectedText: {
    fontSize: theme.textStyles.body1.fontSize,
    color: theme.grayscale['900'],
  },
  dropdownRightIcon: {
    color: theme.grayscale['500'],
    size: 20,
  },
}));
