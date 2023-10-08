import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';
import { Text, View } from 'react-native';

import { render } from '@shared/utils/customRender';
import { NavigationContainer } from '@react-navigation/native';
import Thumbnail from './Thumbnail';

describe('Thumbnail Compoent', () => {
  const path = '@shared/assets/preview01.png';

  test('이미지가 올바르게 렌더링 되어야 한다', () => {
    render(
      <NavigationContainer>
        <Thumbnail uri={path} id={0} title="postTitle" />
      </NavigationContainer>,
    );

    expect(screen.getByTestId('RNE__Image')).toBeOnTheScreen();
  });

  test('썸네일 상단에는 컴포넌트가 렌더링 할 수 있도록 해야 한다.', () => {
    const text = 'CardTopInfo';

    render(
      <NavigationContainer>
        <Thumbnail uri={path} id={0} title="postTitle">
          <View>
            <Text>{text}</Text>
          </View>
        </Thumbnail>
      </NavigationContainer>,
    );

    expect(screen.getByText(text)).toBeOnTheScreen();
  });
});
