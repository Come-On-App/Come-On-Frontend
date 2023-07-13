import { theme } from '@shared/constants/themed';
import { ModalType } from './type';

/**
 * 초대코드 생성할때
 */
const Loading = {
  message: {
    status: '초대코드 생성중...',
    subStatus: '코드 요청 중입니다 잠시만 기다려주세요',
  },
  button: {
    left: {
      text: '닫기',
      disabled: false,
      color: theme.lightColors?.primary,
    },
    right: {
      text: '복사하기',
      disabled: true,
    },
  },
};
/**
 * 초대코드가 만료됐을때
 */
const Expired = {
  message: {
    status: '초대코드가 만료됐습니다!',
    subStatus: '갱신하기 버튼을 눌러 코드를 새로 생성하세요',
  },
  button: {
    left: {
      text: '닫기',
      disabled: false,
    },
    right: {
      text: '갱신하기',
      disabled: false,
    },
  },
};
/**
 * 초대코드 생성됐을때
 */
const Created = {
  message: {
    status: '초대코드가 생성됐습니다!',
    subStatus: '복사하기 버튼을 눌러 코드를 복사하세요',
  },
  button: {
    left: {
      text: '닫기',
      disabled: false,
    },
    right: {
      text: '복사하기',
      disabled: false,
    },
  },
};
/**
 * 초대코드 복사됐을때
 */
const Copied = {
  message: {
    status: '초대코드가 복사되었습니다!',
    subStatus: '모임에 참여하도록 다른 사용자에게 공유하세요',
  },
  button: {
    left: {
      text: '닫기',
      disabled: false,
    },
    right: {
      text: '복사완료!',
      color: theme.lightColors?.success,
      disabled: false,
    },
  },
};

export default {
  Loading,
  Created,
  Expired,
  Copied,
} as ModalType;
