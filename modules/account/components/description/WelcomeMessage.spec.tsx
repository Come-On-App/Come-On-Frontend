import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { render } from '@shared/utils/customRender';
import WelcomeMessage from './WelcomeMessage';

describe('WelcomeMessage Compoent', () => {
  test('속성이 존재하지 않으면 빈 문자열을 렌더링 해야 한다', () => {
    render(<WelcomeMessage />);

    expect(screen.getByText('어서오세요. 님!')).toBeOnTheScreen();
  });
});
