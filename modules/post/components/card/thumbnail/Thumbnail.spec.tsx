import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { Text, View } from 'react-native';

import Thumbnail from './Thumbnail';

describe('Thumbnail Compoent', () => {
  const path = '@shared/assets/preview01.png';

  test('이미지가 올바르게 렌더링 되어야 한다', () => {
    render(<Thumbnail uri={path} />);

    expect(screen.getByTestId('RNE__Image')).toBeOnTheScreen();
  });

  test('썸네일 상단에는 컴포넌트가 렌더링 할 수 있도록 해야 한다.', () => {
    const text = 'CardTopInfo';

    render(
      <Thumbnail uri={path}>
        <View>
          <Text>{text}</Text>
        </View>
      </Thumbnail>,
    );

    expect(screen.getByText(text)).toBeOnTheScreen();
  });
});
