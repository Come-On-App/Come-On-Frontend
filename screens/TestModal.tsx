import { makeStyles } from '@rneui/themed';
import React, { useState } from 'react';
import { View } from 'react-native';
import Icon from '../components/Icon';
import InputText from '../components/inputComponents/InputText';
import Label from '../components/inputComponents/Label';
import { Font } from '../components/Font';
import theme from '../constants/themed';

function TestModal() {
  const [memo, setMemo] = useState('');
  const memoChangeHandler = (enteredValue: string): void => {
    setMemo(enteredValue);
  };
  const styles = useStyles();
  const inputProps = {
    label: '모임메모',
    placeholder: '모임장소에 대한 메모를 남겨보세요',
    length: 150,
    onChangeText: memoChangeHandler,
    value: memo,
    isMultiline: true,
  };
  const CATEGORY_LIST = [
    { name: 'SCHOOL', value: '학교' },
    { name: 'CAFE', value: '카페' },
    { name: 'BAR', value: '술집' },
    { name: 'SPORT', value: '스포츠' },
    { name: 'SHOPPING', value: '쇼핑' },
    { name: 'ETC', value: '기타' },
    { name: 'ATTRACTION', value: '관광명소' },
    { name: 'RESTAURANT', value: '음식점' },
    { name: 'ACCOMMODATION', value: '숙박' },
    { name: 'CULTURE', value: '문화시설' },
    { name: 'ACTIVITY', value: '액티비티' },
    { name: '기타', value: 'ETC' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Font style={styles.title}>수노래연습장 홍대 본점</Font>
        <View style={styles.addressContainer}>
          <Icon name="location-on" color={theme.grayscale?.[700]} size={20} />
          <Font style={styles.address}>서울 마포구 서교동 어쩌구</Font>
        </View>
      </View>
      <View style={styles.categoryWrap}>
        <Label>카테고리선택</Label>
        <View style={styles.categoryContainer}>
          <Font style={styles.category}>카테고리</Font>
        </View>
      </View>
      <InputText inputProps={inputProps} />
    </View>
  );
}

export default TestModal;

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingTop: 32,
    paddingBottom: 20,
  },
  categoryWrap: {
    marginTop: 28,
  },
  pressed: {
    opacity: 0.7,
  },
  addressContainer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.textStyles.title2.fontSize,
    lineHeight: theme.textStyles.title2.lineHeight,
    fontWeight: 'bold',
  },
  titleContainer: {
    alignItems: 'center',
  },
  categoryContainer: {
    borderColor: theme.grayscale?.[200],
    borderWidth: 1,
    marginTop: 12,
    height: 44,
    borderRadius: 4,
    padding: 12,
  },
  category: {
    color: theme.grayscale?.[500],
    fontSize: theme.textStyles.body1.fontSize,
    lineHeight: theme.textStyles.body1.lineHeight,
  },
  address: {
    fontSize: theme.textStyles.body1.fontSize,
    lineHeight: theme.textStyles.body1.lineHeight,
    color: theme.grayscale?.[700],
  },
}));
