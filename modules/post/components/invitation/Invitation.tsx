import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { vigilAsync } from 'promise-vigilant';

import { QueryKeys } from '@app/api/type';
import { requestGetEntryCode, requestPostEntryCode } from '@post/api/v1';
import { isExpiry } from '@shared/utils/utils';
import { PostEntryCodeResponse } from '@post/api/v1/type';
import InvitationModal from './modal/Modal';
import { ModalStatus } from './modal/type';
import { Iinvitation } from './type';

const INIT_CODE = '------';

export default function Invitation({ id, showModal, onClose }: Iinvitation) {
  const [code, setCode] = useState(INIT_CODE);
  const [modalType, setModalType] = useState<ModalStatus>('Loading');
  const { data, status } = useQuery({
    queryKey: [QueryKeys.code, id],
    queryFn: () => requestGetEntryCode(id),
  });

  useEffect(() => {
    if (data && status === 'success') {
      setCode(data.entryCode);
      setModalType(isExpiry(data.expiredAt) ? 'Expired' : 'Created');
    }

    if (status === 'error') {
      setModalType('Failed');
    }
  }, [data, status]);

  // 모달 응답 타입에 따라 핸들러 분기
  function onPressRightHandler(type: ModalStatus) {
    const copyAndHaptic = async () => {
      vigilAsync([() => Clipboard.setStringAsync(code)], {
        onSuccess: () => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          setModalType('Copied');
        },
      });
    };

    switch (type) {
      case 'Created':
        return copyAndHaptic;
      case 'Copied':
        return copyAndHaptic;
      case 'Expired':
        return () =>
          vigilAsync(
            [
              () => setCode(INIT_CODE),
              () => setModalType('Loading'),
              () => requestPostEntryCode(id),
            ],
            {
              onSuccess: ({ entryCode }: PostEntryCodeResponse) => {
                setModalType('Created');
                setCode(entryCode);
              },
              onError: () => setModalType('Failed'),
            },
          );
      default:
        return () => {
          return new ReferenceError('should have a handle');
        };
    }
  }

  return (
    <View>
      <InvitationModal
        type={modalType}
        isVisible={showModal}
        onPressLeft={onClose}
        onPressRight={onPressRightHandler(modalType)}
        code={code}
      />
    </View>
  );
}
