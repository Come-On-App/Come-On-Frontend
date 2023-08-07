import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/utils/customRender';
import PostInput from './PostInput';

describe('MeetingNameInput Compoent', () => {
  const mockFn = jest.fn();

  test('타이틀과 모임입력 컴포넌트가 올바르게 렌더링 되어야 한다.', () => {
    render(
      <PostInput
        title="모임 이름"
        placeholder="여기로 모여!"
        lengthMax={20}
        onInput={mockFn}
      />,
      wrapper,
    );

    expect(screen.getByText('모임 이름')).toBeOnTheScreen();
    expect(screen.getByText('0/20')).toBeOnTheScreen();

    fireEvent.changeText(screen.getByPlaceholderText('여기로 모여!'), '1234');

    expect(screen.getByText('4/20')).toBeOnTheScreen();
    expect(mockFn).toHaveBeenCalled();
  });
});
