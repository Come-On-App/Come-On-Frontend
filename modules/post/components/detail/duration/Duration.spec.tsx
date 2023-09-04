import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';
import { render } from '@shared/utils/customRender';
import { NavigationContainer } from '@react-navigation/native';

import store from '@app/redux/store';
import { updateCurrentPostId } from '@post/features/detail/detailSlice';
import Duration from './Duration';

describe('Duration Compoent', () => {
  const POST_ID_ONE = 1;
  const POST_ID_TWO = 2;

  test('모임 기간과 관련된 정보가 올바르게 렌더링 되어야 한다.', async () => {
    // 특정 게시물 ID 구현 (확정 모임)
    store.dispatch(updateCurrentPostId(POST_ID_ONE));

    render(
      <NavigationContainer>
        <Duration />
      </NavigationContainer>,
    );

    expect(
      await screen.findByText('2023년 07월 10일', {}, { timeout: 2000 }),
    ).toBeOnTheScreen();

    expect(screen.getByText('날짜가 확정되었습니다!')).toBeOnTheScreen();

    // 특정 게시물 ID 구현 (미확정 모임)
    store.dispatch(updateCurrentPostId(POST_ID_TWO));

    render(
      <NavigationContainer>
        <Duration />
      </NavigationContainer>,
    );

    expect(
      await screen.findByText(
        '2023년 06월 02일 ~ 2023년 06월 03일',
        {},
        { timeout: 2000 },
      ),
    ).toBeOnTheScreen();

    expect(
      screen.getByText('참석 가능 날짜에 투표해 보세요!'),
    ).toBeOnTheScreen();
  });
});
