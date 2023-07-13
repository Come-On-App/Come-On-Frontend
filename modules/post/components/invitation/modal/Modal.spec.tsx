import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { render } from '@shared/utils/customRender';
import TestId from '@shared/constants/testIds';
import InvitationModal from './Modal';
import { IinvitationModal } from './type';

describe('Modal Compoent', () => {
  test('초대 코드가 생성 중일 때 화면이 렌더링 되어야 한다.', () => {
    const mockModal: IinvitationModal = {
      isVisible: true,
      code: '------',
      type: 'Loading',
      onPressRight: () => null,
    };

    render(
      <InvitationModal
        isVisible={mockModal.isVisible}
        code={mockModal.code}
        type={mockModal.type}
        onPressRight={mockModal.onPressRight}
      />,
    );

    expect(screen.queryByTestId(TestId.post.modal)).toBeOnTheScreen();
    expect(screen.queryByText('초대코드 생성중...')).toBeOnTheScreen();
    expect(
      screen.queryByText('코드 요청 중입니다 잠시만 기다려주세요'),
    ).toBeOnTheScreen();
    expect(
      screen.queryByRole('button', {
        name: '닫기',
        disabled: false,
      }),
    ).toBeOnTheScreen();
    expect(
      screen.queryByRole('button', {
        name: '복사하기',
        disabled: true,
      }),
    ).toBeOnTheScreen();
  });

  test('초대 코드가 만료됐을 때 화면이 렌더링 되어야 한다.', () => {
    const mockModal: IinvitationModal = {
      isVisible: true,
      code: '1B2C3D',
      type: 'Expired',
      onPressRight: () => null,
    };

    render(
      <InvitationModal
        isVisible={mockModal.isVisible}
        code={mockModal.code}
        type={mockModal.type}
        onPressRight={mockModal.onPressRight}
      />,
    );

    expect(screen.queryByTestId(TestId.post.modal)).toBeOnTheScreen();
    expect(screen.queryByText('초대코드가 만료됐습니다!')).toBeOnTheScreen();
    expect(
      screen.queryByText('갱신하기 버튼을 눌러 코드를 새로 생성하세요'),
    ).toBeOnTheScreen();
    expect(
      screen.queryByRole('button', {
        name: '닫기',
        disabled: false,
      }),
    ).toBeOnTheScreen();
    expect(
      screen.queryByRole('button', {
        name: '갱신하기',
        disabled: false,
      }),
    ).toBeOnTheScreen();
  });

  test('초대 코드가 생성됐을 때 화면이 렌더링 되어야 한다.', () => {
    const mockModal: IinvitationModal = {
      isVisible: true,
      code: '1B2C3D',
      type: 'Created',
      onPressRight: () => null,
    };

    render(
      <InvitationModal
        isVisible={mockModal.isVisible}
        code={mockModal.code}
        type={mockModal.type}
        onPressRight={mockModal.onPressRight}
      />,
    );

    expect(screen.queryByTestId(TestId.post.modal)).toBeOnTheScreen();
    expect(screen.queryByText('초대코드가 생성됐습니다!')).toBeOnTheScreen();
    expect(
      screen.queryByText('복사하기 버튼을 눌러 코드를 복사하세요'),
    ).toBeOnTheScreen();
    expect(
      screen.queryByRole('button', {
        name: '닫기',
        disabled: false,
      }),
    ).toBeOnTheScreen();
    expect(
      screen.queryByRole('button', {
        name: '복사하기',
        disabled: false,
      }),
    ).toBeOnTheScreen();
  });

  test('초대 코드가 복사됐을 때 화면이 렌더링 되어야 한다.', () => {
    const mockModal: IinvitationModal = {
      isVisible: true,
      code: '1B2C3D',
      type: 'Copied',
      onPressRight: () => null,
    };

    render(
      <InvitationModal
        isVisible={mockModal.isVisible}
        code={mockModal.code}
        type={mockModal.type}
        onPressRight={mockModal.onPressRight}
      />,
    );

    expect(screen.queryByText('초대코드가 복사되었습니다!')).toBeOnTheScreen();
    expect(
      screen.queryByText('모임에 참여하도록 다른 사용자에게 공유하세요'),
    ).toBeOnTheScreen();
    expect(
      screen.queryByRole('button', {
        name: '복사완료!',
        disabled: false,
      }),
    ).toBeOnTheScreen();
  });
});
