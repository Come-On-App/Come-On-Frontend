import React, { useState } from 'react';
import { Keyboard, View } from 'react-native';
import { Input, makeStyles } from '@rneui/themed';

import {
  InputBoxTopTextLength,
  InputBoxTopTitle,
} from '@components/input/InputText';
import useUserQuery from '@hooks/query/useUserQuery';
import useUserMutation from '@hooks/query/useUserMutation';
import { errorAlert, successAlert } from '@utils/alert';
import type { NickNameIconButtonProps } from '@type/component.mypage';
import { IconButton } from '@components/button/Buttons';
import fn, { emptyString } from '@utils/fn';
import { promiseFlow } from '@utils/promise';

const Label = {
  name: '닉네임',
  length: 20,
  success: '닉네임 업데이트 완료 ✏️',
};

export default function Nickname() {
  const styles = useStyles();
  const { user } = useUserQuery();
  const { mutate } = useUserMutation();
  const [nickname, setNickname] = useState(user?.nickname || emptyString);
  const onPressHandler = () => {
    if (fn.isEmpty(user)) return;

    if (fn.isEmpty(nickname)) {
      errorAlert('공백일 수 없습니다');
      setNickname(user.nickname);

      return;
    }

    const payload = {
      nickname,
      profileImageUrl: user.profileImageUrl,
    };

    promiseFlow(payload, [mutate], {
      onSuccess: () => {
        Keyboard.dismiss();
        successAlert(Label.success);
      },
    });
  };

  return (
    <View style={styles.container}>
      <Input
        value={nickname}
        onChangeText={setNickname}
        placeholder={user?.nickname}
        inputStyle={styles.nickNameText}
        rightIcon={<NickNameIconButton onPress={onPressHandler} />}
        containerStyle={styles.nickNameWrap}
        inputContainerStyle={styles.nickNameContainer}
        onSubmitEditing={onPressHandler}
        maxLength={Label.length}
        label={
          <View style={styles.nickNameLable}>
            <InputBoxTopTitle
              style={styles.lableRightText}
              label={Label.name}
              bold
            />
            <InputBoxTopTextLength
              style={styles.labelLeftText}
              text={nickname}
              maxLength={Label.length}
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
    size: 23,
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
