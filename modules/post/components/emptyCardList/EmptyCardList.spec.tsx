import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { render } from '@shared/utils/customRender';
import EmptyCardList from './EmptyCardList';

describe('EmptyCardList Compoent', () => {
  test('빈 상태의 컨텐츠를 올바르게 렌더링 해야한다.', () => {
    render(<EmptyCardList />);

    expect(
      screen.getByRole('button', {
        name: '모임 등록하러 가기',
      }),
    ).toBeOnTheScreen();

    expect(screen.getByText('등록된 모임이 없습니다. 모임을 등록해주세요!'));
  });
});
