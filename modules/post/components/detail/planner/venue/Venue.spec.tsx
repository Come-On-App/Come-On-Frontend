import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { meetingPlaceListResponse } from '@post/mocks/getMeetingPlaceListResponse';
import { render } from '@shared/utils/customRender';
import Venue from './Venue';

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

describe('Venue Compoent', () => {
  const data = meetingPlaceListResponse[1].contents[0];

  test('장소 순서와 정보가 올바르게 렌더링 되어야 한다.', () => {
    render(<Venue data={data} />);

    expect(screen.getByTestId(TestId.post.noteCard)).toBeOnTheScreen();
    expect(screen.getByTestId(TestId.post.order)).toBeOnTheScreen();
  });

  test('카드를 클릭하면 페이지가 이동되어야 한다.', () => {
    render(<Venue data={data} />);

    fireEvent.press(screen.getByText('공지 참고하기~'));

    expect(mockedNavigate).toHaveBeenCalledWith('PostDetailMeetingCardDetail', {
      fields: [
        {
          fieldType: 'TEXT',
          label: '공지사항',
          itemKey: 'TEXT3',
          content: '오늘 비오니 우산 챙기도록',
        },
        {
          fieldType: 'TEL',
          label: '가게 전화번호',
          itemKey: 'TEL2',
          content: '025859289',
        },
        {
          fieldType: 'LINK',
          label: '참고 블로그 주소!',
          itemKey: 'LINK1',
          content: 'https://m.blog.naver.com/young_925/221771739665',
        },
      ],
    });
  });
});
