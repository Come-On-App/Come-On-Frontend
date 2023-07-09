import { IinvitationModal } from '@post/components/invitation/modal/type';

/**
 * 초대코드 생성할때
 */
export const mockInvitationModal1: IinvitationModal = {
  isVisible: true,
  code: '------',
  message: {
    status: '초대코드 생성중...',
    subStatus: '코드 요청 중입니다 잠시만 기다려주세요',
  },
  button: {
    left: {
      text: '닫기',
      disabled: false,
      color: '#337FFE',
    },
    right: {
      text: '복사하기',
      disabled: true,
      onPress: () => null,
    },
  },
};

/**
 * 초대코드가 만료됐을때
 */
export const mockInvitationModal2: IinvitationModal = {
  isVisible: true,
  code: '------',
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
      onPress: () => null,
    },
  },
};

/**
 * 초대코드 생성됐을때
 */
export const mockInvitationModal3: IinvitationModal = {
  isVisible: true,
  code: '4AABCA',
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
      onPress: () => null,
    },
  },
};

/**
 * 초대코드 복사됐을때
 */
export const mockInvitationModal4: IinvitationModal = {
  isVisible: true,
  code: '4AABCA',
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
      color: '#20BD4A',
      disabled: false,
      onPress: () => null,
    },
  },
};
