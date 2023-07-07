import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/utils/customRender';
import SearchBar from './SearchBar';

describe('Search Compoent', () => {
  test('날짜를 전달하지 않으면 기본 텍스트 문구가 출력되어야 한다.', () => {
    const initText = '모이기로 한 날짜를 검색해 보세요!';

    render(<SearchBar />, wrapper);

    expect(screen.getByText(initText)).toBeOnTheScreen();
  });

  test('날짜를 전달한다면 화면에 올바르게 렌더링 되어야 한다.', () => {
    const expected = '2023.06.10 ~ 2023.06.20';

    render(
      <SearchBar
        dateRange={{
          startFrom: '2023-06-10',
          endTo: '2023-06-20',
        }}
      />,
      wrapper,
    );

    expect(screen.getByText(expected)).toBeOnTheScreen();
  });

  test.todo('날짜가 올바르게 렌더링 되어야 한다.');

  test.todo('컴포넌트 범위에 터치한다면 액션 이벤트가 발생해야 한다.');
});
