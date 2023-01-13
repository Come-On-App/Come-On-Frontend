import React, { useState } from 'react';
import { makeStyles } from '@rneui/themed';
import { useWindowDimensions, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import Icon from '../Icon';
import Modal from '../Modal';
import Button from '../buttons/Buttons';
import Font, { BoldFont } from '../Font';
import InputBox from '../inputComponents/InputText';
import type { InputTextProps, ModalProps } from '../../types';

export default function PlaceSelectModal({ isVisible, onClose }: ModalProps) {
  const { width } = useWindowDimensions();
  const styles = useStyles();

  return (
    <Modal
      isVisible={isVisible}
      style={[styles.modalContainer, { width: width < 375 ? '80%' : '70%' }]}
    >
      <PlaceSelectModalTop />
      <PlaceSelectModalMain />
      <PlaceSelectModalBottom onClose={onClose} />
    </Modal>
  );
}

function PlaceSelectModalTop() {
  const styles = useStyles();
  const data = {
    address: '수노래연습장 홍대 본점',
    subAddress: '서울 마포구 서교동 364-24',
  };

  return (
    <View style={styles.topContainer}>
      {/* TODO: 기능적 스타일링 작업 - 최대 글자수의 따른 표기법 표시하기 */}
      <BoldFont style={styles.addressText}>{data.address}</BoldFont>
      <View style={styles.subAddressContainer}>
        <Icon
          name="location-on"
          color={styles.subAddressIcon.color}
          size={styles.subAddressIcon.size}
        />
        <Font style={styles.subAddressText}>{data.subAddress}</Font>
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

function CategoryDropdown() {
  const [value, setValue] = useState('');
  const data = [
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

  return (
    <View style={{ marginTop: 12 }}>
      <Dropdown
        style={{
          borderWidth: 1,
          borderRadius: 4,
          borderColor: '#EEEEEE',
          height: 44,
          justifyContent: 'center',
          padding: 12,
        }}
        placeholder="카테고리"
        selectedTextStyle={{
          fontSize: 14,
          color: '#212121',
        }}
        placeholderStyle={{
          fontSize: 14,
          color: '#9E9E9E',
        }}
        containerStyle={{
          borderRadius: 4,
          borderColor: '#EEEEEE',
        }}
        itemTextStyle={{
          color: '#212121',
          fontSize: 12,
        }}
        data={data}
        maxHeight={300}
        labelField="value"
        valueField="value"
        value={value}
        onChange={(item: { key: string; value: string }) => {
          setValue(item.value);
        }}
        renderRightIcon={() => (
          <Icon name="arrow-drop-down" color="#9E9E9E" size={20} />
        )}
      />
    </View>
  );
}

function MeetingNote() {
  const [text, setText] = useState('');
  const onChangeHandler = (enteredValue: string) => setText(enteredValue);
  const styles = useStyles();
  const config: InputTextProps = {
    label: '모임메모',
    placeholder: '모임장소에 대한 메모를 남겨보세요',
    maxLength: 150,
    value: text,
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
    marginBottom: 28,
  },
  addressText: {
    fontSize: 22,
  },
  subAddressContainer: {
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
    marginBottom: 28,
  },
  title: {
    fontSize: 16,
  },
  meetingNoteContainer: {
    marginBottom: 20,
  },
}));
