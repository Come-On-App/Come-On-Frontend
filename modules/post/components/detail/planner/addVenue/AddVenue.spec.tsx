import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import TestId from '@shared/constants/testIds';
import { render } from '@shared/utils/customRender';
import AddVenue from './AddVenue';

describe('addVenue Compoent', () => {
  test('장소를 추가할 수 있는 버튼이 올바르게 렌더링 되어야 한다.', () => {
    render(
      <NavigationContainer>
        <AddVenue />,
      </NavigationContainer>,
    );

    expect(screen.getByTestId(TestId.post.button.addVenue)).toBeOnTheScreen();

    expect(screen.getByTestId('RNE__ICON')).toBeOnTheScreen();

    expect(
      screen.getByText('새로운 모임 카드를 추가해 보세요!'),
    ).toBeOnTheScreen();
  });
});
