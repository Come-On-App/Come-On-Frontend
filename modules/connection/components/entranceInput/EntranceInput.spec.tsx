import { describe, expect, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { wrapper } from '@shared/components/ThemeProvider';
import EntranceInput from './EntranceInput';

describe('EntranceInput Compoent', () => {
  test('요소가 올바르게 렌더링 되어야 한다.', () => {
    render(<EntranceInput />, wrapper);

    expect(screen.getByTestId(TestId.connection.codeField)).toBeOnTheScreen();
  });

  test('6개의 셀이 올바르게 렌더링 되어야 한다.', () => {
    const CELL_ID = TestId.shared.input.codeInput.cell;

    render(<EntranceInput />, wrapper);

    expect(screen.getAllByTestId(CELL_ID).length).toEqual(6);
  });

  test('코드의 입력값이 올바르게 업데이트 되어야 한다.', () => {
    render(<EntranceInput />, wrapper);

    const codeField = screen.getByTestId(TestId.shared.input.codeInput.field);

    fireEvent.changeText(codeField, '123abc');

    const cells = screen.getAllByTestId(TestId.shared.input.codeInput.cell);

    [...'123ABC'].forEach((code, index) => {
      expect(cells[index]).toHaveTextContent(code);
    });

    fireEvent.changeText(codeField, '123!bc');

    [...'123'].forEach((code, index) => {
      expect(cells[index]).toHaveTextContent(code);
    });
  });
});
