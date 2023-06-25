import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import NoteCard from './NoteCard';

describe('NoteCard Compoent', () => {
  const noteInfo = {
    title: '용산역',
    content: '내용',
    address: '서울특별시 마포구 망원동',
    type: '음식점',
  };

  test('모임과 관련된 정보가 올바르게 렌더링 되어야 한다.', () => {
    render(<NoteCard info={noteInfo} />);

    expect(screen.getByText('용산역')).toBeOnTheScreen();
    expect(screen.getByText('음식점')).toBeOnTheScreen();
    expect(screen.getByText('오전 8시에 모여!')).toBeOnTheScreen();
    expect(screen.getByText('서울특별시 마포구 망원동')).toBeOnTheScreen();
  });
});
