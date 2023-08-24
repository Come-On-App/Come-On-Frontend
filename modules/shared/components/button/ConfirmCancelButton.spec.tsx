import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { wrapper } from '@shared/utils/customRender';
import ConfirmCancelButton from './ConfirmCancelButton';

describe('ConfirmCancelButton Compoent', () => {
  test('두 개의 버튼 컴포넌트가 렌더링 되어야 한다.', () => {
    render(
      <ConfirmCancelButton onPressLeft={jest.fn()} onPressRight={jest.fn()} />,
      wrapper,
    );

    expect(screen.getAllByTestId(TestId.shared.button.default)).toHaveLength(2);
  });

  test('각각의 핸들러는 이벤트에 반응해야 한다.', () => {
    const onPressLeft = jest.fn();
    const onPressRight = jest.fn();

    render(
      <ConfirmCancelButton
        onPressLeft={onPressLeft}
        onPressRight={onPressRight}
      />,
      wrapper,
    );

    fireEvent.press(screen.getByText('취소'));

    expect(onPressLeft).toHaveBeenCalledTimes(1);

    fireEvent.press(screen.getByText('완료'));

    expect(onPressRight).toHaveBeenCalledTimes(1);
  });
});
