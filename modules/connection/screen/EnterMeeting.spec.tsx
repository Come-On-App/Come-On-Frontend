import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { render } from '@shared/utils/customRender';
import EnterMeeting from './EnterMeeting';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav: unknown[] = jest.requireActual('@react-navigation/native');

  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
      setOptions: jest.fn(),
    }),
  };
});

describe('<EnterMeeting />', () => {
  test('모임 입장 컴포넌트가 렌더링 되어야 한다.', () => {
    render(<EnterMeeting />);

    expect(screen.getByTestId(TestId.connection.code)).toBeOnTheScreen();
    expect(screen.getByTestId(TestId.shared.logo.defulat)).toBeOnTheScreen();
    expect(
      screen.getByText('공유 받은 입장 코드를 입력해 주세요.'),
    ).toBeOnTheScreen();
    expect(screen.getByTestId(TestId.connection.codeField)).toBeOnTheScreen();
    expect(
      screen.getByRole('button', {
        name: '입장하기',
      }),
    ).toBeOnTheScreen();
  });

  test('이미 모임에 가입된 경우 이에 맞는 텍스트를 렌더링 해야 한다.', async () => {
    render(<EnterMeeting />);

    const ERROR_CODE = '300000';
    const codeField = screen.getByTestId(TestId.shared.input.codeInput.field);

    fireEvent.changeText(codeField, ERROR_CODE);
    fireEvent.press(
      screen.getByRole('button', {
        name: '입장하기',
      }),
    );

    expect(
      await screen.findByText('이미 해당 모임에 가입하셨습니다.'),
    ).toBeOnTheScreen();
  });

  test('입장 코드와 일치하는 모임이 없는 경우 이에 맞는 텍스트를 렌더링 해야 한다.', async () => {
    render(<EnterMeeting />);

    const ERROR_CODE = '300100';
    const codeField = screen.getByTestId(TestId.shared.input.codeInput.field);

    fireEvent.changeText(codeField, ERROR_CODE);
    fireEvent.press(
      screen.getByRole('button', {
        name: '입장하기',
      }),
    );

    expect(
      await screen.findByText('입력한 입장코드와 일치하는 모임이 없습니다.'),
    ).toBeOnTheScreen();
  });
});
