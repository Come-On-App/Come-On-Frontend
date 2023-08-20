import { View } from 'react-native';
import React from 'react';

import UserAvatar from '@account/components/userAvatar/UserAvatar';
import Email from '@account/components/description/Email';
import WelcomeMessage from '@account/components/description/WelcomeMessage';
import NickName from '@account/components/nickName/NickName';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import useMyInfoQuery from '@account/hooks/useMyInfoQuery';
import { EMPTY_STRING } from '@shared/utils';
import { GetMyInfoResponse } from '@account/api/v2/type';
import useStyles from './style';

/**
 * 사용자의 프로필 이미지, 닉네임 등 사용자 정보를 표시한다.
 */
export default function UserInfo() {
  const { userContainer, msgContainer } = useStyles();
  const { isLoading, data } = useMyInfoQuery();
  const { userAvatarPath, userEmail, userName, userNickname } =
    extractUserInfo(data);

  return (
    <ScreenLayout>
      <View style={userContainer}>
        <UserAvatar path={userAvatarPath} isLoading={isLoading} />
        <View style={msgContainer}>
          <WelcomeMessage userName={userName} isLoading={isLoading} />
          <Email email={userEmail} />
        </View>
      </View>
      <NickName name={userNickname} isLoaindg={isLoading} />
    </ScreenLayout>
  );
}

/**
 * [헬퍼 함수]
 * API 응답 데이터를 유효한 데이터로 가공한다.
 */
function extractUserInfo(payload: GetMyInfoResponse | undefined) {
  return {
    userAvatarPath: payload?.profileImageUrl || EMPTY_STRING,
    userName: payload?.name || EMPTY_STRING,
    userEmail: payload?.email || ' ',
    userNickname: payload?.nickname || EMPTY_STRING,
  };
}
