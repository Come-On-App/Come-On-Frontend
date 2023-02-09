import _ from 'lodash/fp';
import React, { Fragment, useEffect, useState } from 'react';
import { Input, makeStyles } from '@rneui/themed';
import { Dimensions, Keyboard, ScrollView, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import Icon from '../Icon';
import Modal from '../Modal';
import Button from '../buttons/Buttons';
import Font from '../Font';
import InputBox from '../input/InputText';
import usePlace from '../../hooks/usePlace';
import type { InputTextProps, PlaceSelectModalProps } from '../../types';

function PlaceSelectModalContent({
  children,
  width,
}: {
  children: React.ReactNode;
  width: number;
}) {
  const Wrap = width < 375 ? ScrollView : Fragment;

  return <Wrap>{children}</Wrap>;
}

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
          width: width < 375 ? '80%' : '70%',
          transform: [{ translateY: modalBottom }],
        },
      ]}
    >
      <PlaceSelectModalContent width={width}>
        <PlaceSelectModalTop />
        <PlaceSelectModalMain />
        <PlaceSelectModalBottom onClose={onClose} />
      </PlaceSelectModalContent>
    </Modal>
  );
}

function PlaceSelectModalTop() {
  const styles = useStyles();
  const { placeState, setPlaceSelectDispatch } = usePlace();
  const onChnageHandler = (text: string) => {
    setPlaceSelectDispatch({
      ...placeState,
      name: text,
    });
  };

  return (
    <View style={styles.topContainer}>
      <Input
        onChangeText={onChnageHandler}
        value={placeState.name}
        style={styles.topInput}
        errorStyle={styles.topInputError}
      />
      <View style={styles.subAddressContainer}>
        <Icon
          name="location-on"
          color={styles.subAddressIcon.color}
          size={styles.subAddressIcon.size}
        />
        <Font style={styles.subAddressText}>
          {_.truncate({ length: 25 }, placeState.address)}
        </Font>
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

function PlaceSelectModalBottom({ onClose }: { onClose: () => void }) {
  return <Button text="완료" onPress={onClose} />;
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

const DROPDOWN_DATA = [
  { key: 'SCHOOL', value: '학교' },
  { key: 'CAFE', value: '카페' },
  { key: 'BAR', value: '술집' },
  { key: 'SPORT', value: '스포츠' },
  { key: 'SHOPPING', value: '쇼핑' },
  { key: 'ATTRACTION', value: '관광명소' },
  { key: 'RESTAURANT', value: '음식점' },
  { key: 'ACCOMMODATION', value: '숙박' },
  { key: 'CULTURE', value: '문화시설' },
  { key: 'ACTIVITY', value: '액티비티' },
  { key: 'ETC', value: '기타' },
];

function CategoryDropdown() {
  const styles = useStyles();
  const { setPlaceSelectDispatch, placeState } = usePlace();
  const [value, setValue] = useState(placeState.category);
  const onPressHandler = (item: { key: string; value: string }) => {
    const category = item.value;

    setValue(category);
    setPlaceSelectDispatch({ ...placeState, category });
  };

  return (
    <View style={styles.dropdownWrap}>
      <Dropdown
        style={styles.dropdown}
        placeholder="카테고리"
        selectedTextStyle={styles.dropdownSelectedText}
        placeholderStyle={styles.dropdownPlaceholder}
        containerStyle={styles.dropdownContainer}
        itemTextStyle={styles.dropdownItemText}
        data={DROPDOWN_DATA}
        maxHeight={300}
        labelField="value"
        valueField="value"
        value={value}
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
  const { setPlaceSelectDispatch, placeState: placeSelectState } = usePlace();
  const [description, setDescription] = useState(placeSelectState.description);
  const onChangeHandler = (text: string) => {
    setDescription(text);
    setPlaceSelectDispatch({ ...placeSelectState, description: text });
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
