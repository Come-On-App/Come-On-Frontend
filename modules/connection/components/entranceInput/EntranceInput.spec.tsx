import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { wrapper } from '@shared/utils/customRender';
import { useState } from 'react';
import { clearMocks } from 'jest.config';
import EntranceInput from './EntranceInput';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('EntranceInput Compoent', () => {
  test('요소가 올바르게 렌더링 되어야 한다.', () => {
    render(<EntranceInput code="" dispatch={jest.fn()} />, wrapper);

    expect(screen.getByTestId(TestId.connection.codeField)).toBeOnTheScreen();
  });

  test('6개의 셀이 올바르게 렌더링 되어야 한다.', () => {
    const CELL_ID = TestId.shared.input.codeInput.cell;

    render(<EntranceInput code="" dispatch={jest.fn()} />, wrapper);

    expect(screen.getAllByTestId(CELL_ID).length).toEqual(6);
  });

  test('알파벳 소문자는 대문자로 치환되어 렌더링 되어야 한다.', () => {
    const mockDispatch = jest.fn();

    render(<EntranceInput code="" dispatch={mockDispatch} />, wrapper);

    const codeField = screen.getByTestId(TestId.shared.input.codeInput.field);

    fireEvent.changeText(codeField, '123abc');

    expect(mockDispatch).toBeCalled();
    expect(mockDispatch).toHaveBeenCalledWith('123ABC');
  });

  test('입력값은 숫자와 알파벳 대소문자 이외의 문자가 포함되지 않아야 한다', () => {
    const mockDispatch = jest.fn();

    render(<EntranceInput code="" dispatch={mockDispatch} />, wrapper);

    const codeField = screen.getByTestId(TestId.shared.input.codeInput.field);

    fireEvent.changeText(codeField, '123!');

    expect(mockDispatch).not.toBeCalled();
  });
});
