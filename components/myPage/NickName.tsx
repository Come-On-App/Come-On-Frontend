import React from 'react';
import { View } from 'react-native';
import { Input, makeStyles } from '@rneui/themed';

import { Font, BoldFont } from '../Font';
import IconButton from '../buttons/IconButton';

function NickNameIconButton() {
  const { nickNameIcon } = useStyles();
  const onPressHandler = () => console.log('click nickNameIconButton');

  return (
    <IconButton
      icon={{
        iconName: 'edit',
        size: nickNameIcon.size,
        color: nickNameIcon.color,
      }}
      onPress={onPressHandler}
    />
  );
}

function NickName() {
  const styles = useStyles();
  // SERVER-API: 추후 사용자 정보 처리
  const NICK_NAME = '스탠리';
  const NICK_NAME_LABLE = '닉네임';
  const NICK_NAME_LENGHT = '3/20';

  return (
    <View style={styles.container}>
      <Input
        value={NICK_NAME}
        inputStyle={styles.nickNameText}
        rightIcon={<NickNameIconButton />}
        containerStyle={styles.nickNameWrap}
        inputContainerStyle={styles.nickNameContainer}
        label={
          <View style={styles.nickNameLable}>
            <BoldFont style={styles.lableRightText}>{NICK_NAME_LABLE}</BoldFont>
            <Font style={styles.labelLeftText}>{NICK_NAME_LENGHT}</Font>
          </View>
        }
      />
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
  },
  nickNameIcon: {
    size: 20,
    color: theme.grayscale['500'],
  },
  nickNameWrap: {
    height: 70,
    marginTop: 16,
  },
  nickNameText: {
    fontSize: 14,
    fontFamily: 'pretendard-regular',
  },
  nickNameContainer: {
    marginTop: 8,
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
    height: 44,
    borderColor: theme.grayscale['200'],
  },
  nickNameLable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 3,
  },
  lableRightText: {
    fontSize: 12,
    lineHeight: 18,
  },
  labelLeftText: {
    lineHeight: 18,
    fontSize: 12,
    color: theme.grayscale['500'],
  },
}));

export default NickName;
