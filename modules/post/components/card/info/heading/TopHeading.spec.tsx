import { describe, expect, jest, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { render } from '@shared/utils/customRender';
import TopHeading from './TopHeading';

jest.mock('@react-navigation/native', () => {
  const actualNav: unknown[] = jest.requireActual('@react-navigation/native');

  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe('TopHeading Compoent', () => {
  test('주어진 속성으로 올바르게 렌더링 되어야 한다.', () => {
    const id = 10;
    const people = 30;
    const decided = true;
    const notDecided = false;

    render(<TopHeading people={people} isDecided={decided} id={id} />);

    expect(screen.getByText('30명')).toBeOnTheScreen();
    expect(screen.getByText('확정')).toBeOnTheScreen();

    render(<TopHeading people={people} isDecided={notDecided} id={id} />);

    expect(screen.getByText('미확정')).toBeOnTheScreen();
  });
});
