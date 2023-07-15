import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/utils/customRender';
import TopHeading from './TopHeading';

describe('TopHeading Compoent', () => {
  test('주어진 속성으로 올바르게 렌더링 되어야 한다.', () => {
    const people = 30;
    const decided = true;
    const notDecided = false;

    render(<TopHeading people={people} isDecided={decided} />, wrapper);

    expect(screen.getByText('30명')).toBeOnTheScreen();
    expect(screen.getByText('확정')).toBeOnTheScreen();

    render(<TopHeading people={people} isDecided={notDecided} />, wrapper);

    expect(screen.getByText('미확정')).toBeOnTheScreen();
  });
});
