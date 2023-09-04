import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { render } from '@shared/utils/customRender';
import Invitation from './Invitation';

const mockSetStringAsync = jest.fn();
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

jest.mock('expo-clipboard', () => {
  const actualNav: unknown[] = jest.requireActual('expo-clipboard');

  return {
    ...actualNav,
    setStringAsync: () => mockSetStringAsync(),
  };
});

jest.useFakeTimers();

describe('(API) Invitation Compoent', () => {
  const loadingText = '초대 코드를 생성 중입니다...';

  describe('Invitation Compoent (Success)', () => {
    const meetingId = 10;
    const Component = (
      <QueryClientProvider client={queryClient}>
        <Invitation id={meetingId} showModal onClose={jest.fn()} />
      </QueryClientProvider>
    );
    const expectedCode = 'DJE52P';

    test('서버 응답에 올바르게 렌더링 되어야 한다.', async () => {
      render(Component);

      expect(screen.getByText(loadingText)).toBeOnTheScreen();

      expect(
        await screen.findByText('초대 코드가 생성되었습니다!'),
      ).toBeOnTheScreen();

      [...expectedCode].forEach((eachCode) => {
        expect(screen.getByText(eachCode)).toBeOnTheScreen();
      });
    });

    test('복사 버튼을 클릭하면 모달의 상태가 바뀌어야 한다.', async () => {
      render(Component);

      const Button = await screen.findByRole('button', {
        name: '복사하기',
      });

      fireEvent.press(Button);

      expect(mockSetStringAsync).toHaveBeenCalled();

      expect(
        await screen.findByText('초대 코드가 복사되었습니다!'),
      ).toBeOnTheScreen();
      expect(
        screen.getByRole('button', {
          name: '복사완료!',
        }),
      ).toBeOnTheScreen();
    });
  });

  describe('(Error) Invitation Compoent', () => {
    const throwError = 1;

    test('서버 응답에 올바르게 렌더링 되어야 한다.', async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <Invitation id={throwError} showModal onClose={jest.fn()} />
        </QueryClientProvider>,
      );

      expect(screen.getByText(loadingText)).toBeOnTheScreen();

      expect(
        await screen.findByText('초대코드 발급에 실패했습니다.'),
      ).toBeOnTheScreen();
    });
  });

  describe('(Expired) Invitation Compoent', () => {
    const expiredCode = 2;
    const Component = (
      <QueryClientProvider client={queryClient}>
        <Invitation id={expiredCode} showModal onClose={jest.fn()} />
      </QueryClientProvider>
    );

    test('서버 응답에 올바르게 렌더링 되어야 한다.', async () => {
      render(Component);

      expect(screen.getByText(loadingText)).toBeOnTheScreen();

      expect(
        await screen.findByText('초대 코드가 만료되었습니다.'),
      ).toBeOnTheScreen();
      expect(
        screen.getByRole('button', {
          name: '갱신하기',
        }),
      ).toBeOnTheScreen();
    });

    test('갱신 버튼을 클릭하면 모달의 상태가 바뀌어야 한다.', async () => {
      render(Component);

      const Button = screen.getByRole('button', {
        name: '갱신하기',
      });

      fireEvent.press(Button);

      expect(
        await screen.findByText('초대 코드가 생성되었습니다!'),
      ).toBeOnTheScreen();
    });
  });
});
