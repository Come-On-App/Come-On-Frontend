import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { render } from '@shared/utils/customRender';
import { NavigationContainer } from '@react-navigation/native';
import PolicyVersionMenu from './PolicyVersionMenu';

describe('PolicyVersionList Compoent', () => {
  test('요소들이 올바르게 렌더링 되어야 한다.', () => {
    render(
      <NavigationContainer>
        <PolicyVersionMenu />
      </NavigationContainer>,
    );

    expect(screen.getAllByTestId('RNE__Divider')).toHaveLength(4);
  });
});
