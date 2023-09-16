import { describe, expect, jest, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { render } from '@shared/utils/customRender';
import NoteCardMenu from './Menu';
import { NoteCardInfo } from '../type';

jest.mock('@react-navigation/native', () => {
  const actualNav: unknown[] = jest.requireActual('@react-navigation/native');

  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe('NoteCardMenu Compoent', () => {
  const prevCardInfo: NoteCardInfo = {
    address: '사당역 2번 출구',
    content: '',
    fields: [
      {
        content: '010-0000-0000',
        fieldType: 'TEL',
        itemKey: 'TEL7',
        label: '숙소 전화번호',
      },
    ],
    placeId: 1,
    title: '스타벅스',
    type: 'CAFE',
  };

  test('아이콘 형태의 메뉴 팝업 버튼이 렌더링 되어야 한다.', () => {
    render(<NoteCardMenu prevCardInfo={prevCardInfo} />);

    const Component = screen.getByTestId('RNE__ICON');

    expect(Component).toBeVisible();
  });
});
