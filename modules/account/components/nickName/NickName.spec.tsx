import { describe, expect, test } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';

import { render } from '@shared/utils/customRender';
import TestId from '@shared/constants/testIds';
import NickName from './NickName';

describe('NickName Compoent', () => {
  test('닉네임이 수정되면 수정 아이콘이 렌더링 되어야 한다.', () => {
    render(<NickName />);

    fireEvent.changeText(screen.getByDisplayValue(''), 'Appl');

    expect(screen.getByDisplayValue('Appl')).toBeOnTheScreen();
    expect(screen.getByTestId(TestId.shared.button.icon)).toBeOnTheScreen();
  });

  test('닉네임이 업데이트될 때마다 글자 수가 업데이트되어야 한다.', () => {
    render(<NickName />);

    fireEvent.changeText(screen.getByDisplayValue(''), 'Apple123');

    expect(screen.getByText('8/20')).toBeOnTheScreen();
  });
});
