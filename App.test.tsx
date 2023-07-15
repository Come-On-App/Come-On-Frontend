import React from 'react';
import { describe, test, expect } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { App } from './App';

describe('<App />', () => {
  describe('앱이 실행된다면 네비게이터가 올바르게 동작해야 한다.', () => {
    test('두 번째 하단 탭을 클릭하면 모임 입장 스크린으로 네비게이터 되어야 한다.', async () => {
      render(<App />);

      const BottomTap = await screen.findByRole('button', {
        name: '모임 입장',
      });

      fireEvent.press(BottomTap);

      expect(
        await screen.findByTestId(TestId.connection.code),
      ).toBeOnTheScreen();
    });

    test('세 번째 하단 탭을 클릭하면 마이페이지 스크린으로 네비게이터 되어야 한다.', async () => {
      render(<App />);

      const BottomTap = await screen.findByRole('button', {
        name: '마이페이지',
      });

      fireEvent.press(BottomTap);

      expect(
        await screen.findByTestId(TestId.account.myPage),
      ).toBeOnTheScreen();
    });
  });
});
