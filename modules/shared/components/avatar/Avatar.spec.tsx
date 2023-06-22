import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import Avatar from './Avatar';

describe('Avatar Component', () => {
  test('주어진 속성으로 올바르게 렌더링 해야한다.', () => {
    const uri = 'https://image...';

    render(<Avatar path={uri} />);

    expect(screen.getByTestId('RNE__Avatar__Image')).toHaveProp('source', {
      uri,
    });
  });
});
