import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { Input, makeStyles } from '@rneui/themed';

import useUser from '@hooks/useUser';
import useMutateUser from '@hooks/useMutateUser';
import { mutateStateRefToast } from '@utils/alert';
import type { NickNameIconButtonProps } from '@type/mypage.nickname';
import {
  InputBoxTopTextLength,
  InputBoxTopTitle,
} from '@components/input/InputText';
import { IconButton } from '@components/buttons/Buttons';

export default function Nickname() {
  const [NICK_NAME_LABLE, NICK_NAME_LENGHT] = ['닉네임', 20];
  const isNicknameSubmit = useRef(false);
  const styles = useStyles();
  const { user } = useUser();
  const { mutate, isSuccess } = useMutateUser();
  const [nickName, setNickName] = useState('');
  const onPressHandler = () => {
    mutate({
      nickname: nickName,
      profileImageUrl: user?.profileImageUrl,
    });

    Keyboard.dismiss();
    isNicknameSubmit.current = false;
  };

  useEffect(() => {
    if (isSuccess) {
      mutateStateRefToast(isNicknameSubmit, '닉네임 업데이트 완료 ✏️');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!user) return;

    setNickName(user.nickname);
  }, [user]);

  return (
    <View style={styles.container}>
      <Input
        value={nickName}
        onChangeText={setNickName}
        inputStyle={styles.nickNameText}
        rightIcon={<NickNameIconButton onPress={onPressHandler} />}
        containerStyle={styles.nickNameWrap}
        inputContainerStyle={styles.nickNameContainer}
        onSubmitEditing={onPressHandler}
        maxLength={NICK_NAME_LENGHT}
        label={
          <View style={styles.nickNameLable}>
            <InputBoxTopTitle
              style={styles.lableRightText}
              label={NICK_NAME_LABLE}
              bold
            />
            <InputBoxTopTextLength
              style={styles.labelLeftText}
              text={nickName}
              maxLength={NICK_NAME_LENGHT}
            />
          </View>
        }
      />
    </View>
  );
}

function NickNameIconButton({ onPress }: NickNameIconButtonProps) {
  const { nickNameIcon } = useStyles();

  return (
    <IconButton
      icon={{
        iconName: 'edit',
        size: nickNameIcon.size,
        color: nickNameIcon.color,
      }}
      onPress={onPress}
    />
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
