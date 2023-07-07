import { describe, expect, jest, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import CodeField from './CodeField';
import { wrapper } from '../../utils/customRender';

describe('CodeField Compoent', () => {
  const CELL_COUNT = 6;
  const CELL_ID = TestId.shared.input.codeInput.cell;
  const FIELD_ID = TestId.shared.input.codeInput.field;

  test('6개의 셀이 올바르게 렌더링 되어야 한다.', () => {
    render(
      <CodeField cellCount={CELL_COUNT} value="" setValue={jest.fn()} />,
      wrapper,
    );

    expect(screen.getByTestId(FIELD_ID)).toBeOnTheScreen();

    expect(screen.getAllByTestId(CELL_ID).length).toEqual(6);
  });

  test('전달된 문자열이 셀에 올바르게 렌더링 되어야 한다.', () => {
    const value = '987654';

    render(
      <CodeField cellCount={CELL_COUNT} value={value} setValue={jest.fn()} />,
      wrapper,
    );

    [...value].forEach((str) => {
      expect(screen.getByText(str)).toBeOnTheScreen();
    });
  });
});
