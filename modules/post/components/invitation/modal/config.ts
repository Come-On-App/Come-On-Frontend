import { theme } from '@shared/constants/themed';
import { ModalType } from './type';

/**
 * 초대코드 생성할때
 */
const Loading = {
  message: {
    status: '초대 코드를 생성 중입니다...',
    subStatus: '코드 요청 중입니다. 잠시만 기다려주세요.',
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
    status: '초대 코드가 만료되었습니다.',
    subStatus: '"갱신하기" 버튼을 클릭하여 코드를 생성해주세요.',
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
    status: '초대 코드가 생성되었습니다!',
    subStatus: '"복사하기" 버튼을 클릭하여 코드를 복사해주세요.',
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
    status: '초대 코드가 복사되었습니다!',
    subStatus: '다른 사용자에게 모임에 참여하도록 공유해주세요.',
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
/**
 * 초대코드 로드실패했을때
 */
const Failed = {
  message: {
    status: '초대코드 발급에 실패했습니다.',
    subStatus: '서버 문제가 발생했습니다.',
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

export default {
  Loading,
  Created,
  Expired,
  Copied,
  Failed,
} as ModalType;
