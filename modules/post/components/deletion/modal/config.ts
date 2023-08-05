import { theme } from '@shared/constants/themed';

export default {
  message: {
    status: '모임을 탈퇴하시겠습니까?',
    subStatus: '탈퇴를 진행하면 자동으로 게시물이 삭제됩니다.',
  },
  button: {
    left: {
      text: '닫기',
      disabled: false,
    },
    right: {
      text: '탈퇴하기',
      disabled: false,
      color: theme.lightColors?.warning,
    },
  },
};
