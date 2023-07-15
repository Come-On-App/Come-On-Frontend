import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { wrapper } from '@shared/utils/customRender';
import ConfirmCancelButton from './ConfirmCancelButton';

describe('ConfirmCancelButton Compoent', () => {
  test('두 개의 버튼 컴포넌트가 렌더링 되어야 한다.', () => {
    render(
      <ConfirmCancelButton
        onCancelHandler={jest.fn()}
        onConfirmlHandler={jest.fn()}
      />,
      wrapper,
    );

    expect(screen.getAllByTestId(TestId.shared.button.default)).toHaveLength(2);
  });

  test('각각의 핸들러는 이벤트에 반응해야 한다.', () => {
    const onCancelHandler = jest.fn();
    const onConfirmlHandler = jest.fn();

    render(
      <ConfirmCancelButton
        onCancelHandler={onCancelHandler}
        onConfirmlHandler={onConfirmlHandler}
      />,
      wrapper,
    );

    fireEvent.press(screen.getByText('취소'));

    expect(onCancelHandler).toHaveBeenCalledTimes(1);

    fireEvent.press(screen.getByText('완료'));

    expect(onConfirmlHandler).toHaveBeenCalledTimes(1);
  });
});
