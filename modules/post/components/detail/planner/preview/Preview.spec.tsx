import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import store from '@app/redux/store';
import {
  updateCategory,
  updateContent,
  updateSubContent,
  updateTitle,
} from '@post/features/detail/plannerSlice';
import { render } from '@shared/utils/customRender';
import Preview from './Preview';

describe('Preview Compoent', () => {
  test('상태에 따라서 카드가 올바르게 렌더링 되어야 한다.', () => {
    // 카테고리 상태 반영
    store.dispatch(updateCategory('카페'));
    // 제목 필드상태 반영
    store.dispatch(updateTitle('update Title'));
    // 요약 필드 상태 반영
    store.dispatch(updateContent('update Content'));
    // 서브 내용 필드 상태 반영
    store.dispatch(updateSubContent('update SubContent'));

    render(<Preview />);

    expect(screen.getByText('카페')).toBeOnTheScreen();
    expect(screen.getByText('update Title')).toBeOnTheScreen();
    expect(screen.getByText('update Content')).toBeOnTheScreen();
    expect(screen.getByText('update SubContent')).toBeOnTheScreen();
  });
});
