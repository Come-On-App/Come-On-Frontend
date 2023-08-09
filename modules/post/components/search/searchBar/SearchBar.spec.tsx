import { afterAll, describe, expect, test } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';
import { advanceTo, clear } from 'jest-date-mock';

import { render } from '@shared/utils/customRender';

import TestId from '@shared/constants/testIds';
import SearchBar from './SearchBar';

afterAll(() => {
  clear();
});

const calendarTestID = TestId.shared.calender;

describe('Search Compoent', () => {
  const june = 5;

  advanceTo(new Date(2023, june));

  const startDayTestID = `${calendarTestID}.day_${'2023-06-17'}`;
  const endDayTestID = `${calendarTestID}.day_${'2023-06-21'}`;
  const expected = '2023.06.17 ~ 2023.06.21';

  test('날짜를 전달하지 않으면 기본 텍스트 문구가 출력되어야 한다.', () => {
    const initText = '모이기로 한 날짜를 검색해 보세요!';

    render(<SearchBar />);

    expect(screen.getByText(initText)).toBeOnTheScreen();
  });

  test('컴포넌트 범위에 터치한다면 액션 이벤트가 발생해야 한다.', async () => {
    render(<SearchBar />);

    fireEvent.press(screen.getByTestId('TestId__post_button_searchBar'));

    fireEvent.press(screen.getByTestId(startDayTestID)); // 시작 날짜 선택
    fireEvent.press(screen.getByTestId(endDayTestID)); // 끝 날짜 선택

    fireEvent.press(screen.getByTestId('RNE__Overlay__backdrop')); // onBackdropPress 이벤트 발생

    expect(await screen.findByText(expected)).toBeOnTheScreen();
  });
});
