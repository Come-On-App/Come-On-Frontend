import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { wrapper } from '@shared/components/ThemeProvider';
import Venue from './Venue';
import { NoteCardInfo } from './noteCard/type';

describe('Venue Compoent', () => {
  test('장소 순서와 정보가 올바르게 렌더링 되어야 한다.', () => {
    const data = {
      order: 1,
      info: {
        title: '용산역',
        content: '오전 8시에 모여!',
        address: '서울특별시 마포구 망원동',
        type: '음식점',
      } as NoteCardInfo,
    };

    render(<Venue data={data} />, wrapper);

    expect(screen.getByTestId(TestId.post.noteCard)).toBeOnTheScreen();
    expect(screen.getByTestId(TestId.post.order)).toBeOnTheScreen();
  });
});
