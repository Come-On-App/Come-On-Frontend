import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { render } from '@shared/utils/customRender';
import TestId from '@shared/constants/testIds';
import InvitationModal from './Modal';
import { IinvitationModal } from './type';

const mockModal: IinvitationModal = {
  isVisible: false,
  code: '------',
  message: {
    status: '초대코드 생성중...',
    subStatus: '코드 요청 중입니다 잠시만 기다려주세요',
  },
  button: {
    left: {
      text: '닫기',
      disabled: false,
    },
    right: {
      text: '복사하기',
      disabled: true,
      onPress: () => null,
    },
  },
};

describe('Modal Compoent', () => {
  test('모달이 활성화 되면 올바르레 렌더링 되어야 한다.', () => {
    render(
      <InvitationModal
        isVisible={mockModal.isVisible}
        button={mockModal.button}
        code={mockModal.code}
        message={mockModal.message}
      />,
    );

    expect(screen.queryByTestId(TestId.post.modal)).toBeOnTheScreen();
  });
});
