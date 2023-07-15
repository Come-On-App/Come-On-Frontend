import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { render } from '@shared/utils/customRender';
import PolicyVersionList from './PolicyVersionList';

describe('PolicyVersionList Compoent', () => {
  test('요소들이 올바르게 렌더링 되어야 한다.', () => {
    render(<PolicyVersionList />);

    expect(screen.getAllByTestId('RNE__Divider')).toHaveLength(2);
  });
});
