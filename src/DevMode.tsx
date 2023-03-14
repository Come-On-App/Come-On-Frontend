/* eslint-disable padding-line-between-statements */
import React, { Dispatch, SetStateAction, useState } from 'react';
import { SpeedDial } from '@rneui/themed';
import { ScrollView, View } from 'react-native';

import useAuth from '@hooks/useAuth';
import { api } from './api';
import Modal from './components/Modal';
import Button from './components/buttons/Buttons';
import { BoldFont } from './components/Font';

/**
 * 여러가지 테스트를 해볼수있는 환경입니다.
 *
 */

function DevScreen({
  isVisible,
  children,
}: {
  isVisible: boolean;
  children: React.ReactNode;
}) {
  return (
    <Modal
      isVisible={isVisible}
      style={{
        height: '80%',
        width: '90%',
        overflow: 'hidden',
      }}
    >
      <ScrollView snapToStart={false}>{children}</ScrollView>
    </Modal>
  );
}

function UserDevScreen({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}) {
  const { setTokens } = useAuth();
  // TODO: 토큰정보 가져오기
  const closeModal = () => onClose(false);

  return (
    <DevScreen isVisible={isVisible}>
      <View style={{ minHeight: 1000 }}>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        />
        <View
          style={{
            borderColor: 'balck',
            borderWidth: 1,
            padding: 10,
            borderRadius: 8,
            marginBottom: 30,
          }}
        >
          <Button
            text="token 수동 발급"
            onPress={async () => {
              const { data } = await api.post(
                'http://211.204.19.184:8088/test-api/v1/tokens',
                {
                  userIds: [11],
                  atkExpirationSec: 5,
                },
              );

              const payload = data.result[0];
              await setTokens(payload);
              const DateFormat = new Date(
                payload.accessToken.expiry,
              ).toLocaleString();

              console.log('토큰 만료 기한:', DateFormat);
              console.log('token', payload);

              api.defaults.headers.common.Authorization = `Bearer ${payload.token}`;
            }}
          />
        </View>

        <Button text="닫기" onPress={closeModal} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <BoldFont>:carrot:</BoldFont>
      </View>
    </DevScreen>
  );
}

export function DevMode() {
  const [open, setOpen] = useState(false);
  const [openUserDev, setOpenUserDev] = useState(false);

  return (
    <>
      <UserDevScreen isVisible={openUserDev} onClose={setOpenUserDev} />

      <SpeedDial
        isOpen={open}
        icon={{ name: 'bug-report', color: '#fff' }}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        style={{
          position: 'absolute',
          bottom: 0,
          paddingBottom: 50, // 80
        }}
        color="red"
      >
        <SpeedDial.Action
          icon={{ name: 'account-circle', color: '#fff' }}
          title="사용자 정보"
          onPress={() => setOpenUserDev(true)}
          color="red"
        />
        <SpeedDial.Action
          icon={{ name: 'account-circle', color: '#fff' }}
          title="_사용자 정보"
          onPress={() => setOpenUserDev(true)}
          color="red"
        />
      </SpeedDial>
    </>
  );
}

export default DevMode;
