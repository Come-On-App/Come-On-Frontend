import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { render } from '@shared/utils/customRender';
import NoteCard from './NoteCard';
import { NoteCardInfo } from './type';

describe('NoteCard Compoent', () => {
  const noteInfo: NoteCardInfo = {
    placeId: 0,
    type: 'RESTAURANT',
    title: '용산역',
    address: '서울특별시 마포구 망원동',
    content: '오전 8시에 모여!',
    fields: [],
  };

  test('모임과 관련된 정보가 올바르게 렌더링 되어야 한다.', () => {
    render(
      <NavigationContainer>
        <NoteCard info={noteInfo} />
      </NavigationContainer>,
    );

    expect(screen.getByText('용산역')).toBeOnTheScreen();
    expect(screen.getByText('음식점')).toBeOnTheScreen();
    expect(screen.getByText('오전 8시에 모여!')).toBeOnTheScreen();
    expect(screen.getByText('서울특별시 마포구 망원동')).toBeOnTheScreen();
  });
});
