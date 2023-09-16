import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';

import store from '@app/redux/store';
import {
  updateCategory,
  updateContent,
  updateSubContent,
  updateTitle,
} from '@post/features/detail/planner/plannerSlice';
import { render } from '@shared/utils/customRender';
import Preview from './Preview';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav: unknown[] = jest.requireActual('@react-navigation/native');

  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('Preview Compoent', () => {
  test('상태에 따라서 카드가 올바르게 렌더링 되어야 한다.', () => {
    // 카테고리 상태 반영
    store.dispatch(updateCategory('CAFE'));
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

  test('카드를 클릭하면 페이지가 이동되어야 한다.', () => {
    render(<Preview />);

    fireEvent.press(screen.getByText('update Content'));

    expect(mockedNavigate).toHaveBeenCalledWith('PostDetailMeetingCardDetail', {
      fields: [],
    });
  });
});
