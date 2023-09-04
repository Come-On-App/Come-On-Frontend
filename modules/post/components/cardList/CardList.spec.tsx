import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';
import _ from 'lodash';

import TestId from '@shared/constants/testIds';
import { render } from '@shared/utils/customRender';
import CardList from './CardList';
import { ICardInfo } from '../card/type';

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

const testCase: ICardInfo[] = _.range(4).map(() => ({
  id: 1,
  uri: 'path',
  people: 30,
  isDecided: false,
  title: '물개들의 모임',
  subTitle: {
    userName: '여행마스터',
    range: {
      startFrom: '2023-06-10',
      endTo: '2023-06-20',
    },
  },
}));

describe('CardList Compoent', () => {
  test('요소의 개수만큼 올바르게 렌더링 되어야 한다.', () => {
    render(<CardList payload={testCase} />);

    expect(screen.getByTestId(TestId.post.cardList)).toBeOnTheScreen();
    expect(screen.getAllByTestId(TestId.post.card)).toHaveLength(4);
  });

  test('빈 요소라면 다른 화면을 렌더링 해야 한다.', () => {
    const TITLE = '모임 등록하러 가기';
    const DESCRIPTION = '등록된 모임이 없습니다. 모임을 등록해주세요!';

    render(<CardList payload={[]} />);

    expect(screen.getByText(TITLE)).toBeOnTheScreen();
    expect(screen.getByText(DESCRIPTION)).toBeOnTheScreen();
  });

  test('MeetingPostCreation 컴포넌트로 네비게이터 되는 버튼이 있어야 한다.', () => {
    render(<CardList payload={[]} />);

    const Button = screen.getByRole('button', {
      name: '모임 등록하러 가기',
    });

    fireEvent.press(Button);

    expect(mockedNavigate).toHaveBeenCalledWith('MeetingPostCreation');
  });
});
