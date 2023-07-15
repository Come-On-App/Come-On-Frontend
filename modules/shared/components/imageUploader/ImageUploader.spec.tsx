import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/utils/customRender';
import ImageUploader from './ImageUploader';

const uri =
  'https://images.unsplash.com/photo-1685789002226-66b99007e48d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80';

describe('ImageUploader Compoent', () => {
  const description = '사진을 등록해 주세요.';

  test('텍스트와 함께 아이콘이 렌더링 되어야 한다.', () => {
    render(
      <ImageUploader onPress={jest.fn()} description={description} />,
      wrapper,
    );

    expect(screen.getByTestId('RNE__ICON')).toBeOnTheScreen();
    expect(screen.getByText('사진을 등록해 주세요.')).toBeOnTheScreen();
  });

  test('컴포넌트를 클릭하면 액션이 발생해야 한다.', () => {
    const fn = jest.fn();

    render(<ImageUploader onPress={fn} description={description} />, wrapper);

    fireEvent.press(screen.getByText(description));

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('이미지 경로가 있다면 이미지를 렌더링 해야 한다.', () => {
    render(
      <ImageUploader onPress={jest.fn()} description={description} uri={uri} />,
      wrapper,
    );

    expect(screen.getByTestId('RNE__Image')).toBeOnTheScreen();
  });

  test('이미지를 클릭하면 액션이 발생해야 한다.', () => {
    const fn = jest.fn();

    render(
      <ImageUploader onPress={fn} description={description} uri={uri} />,
      wrapper,
    );

    fireEvent.press(screen.getByTestId('RNE__Image'));

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('로딩상태라면 인디게이터를 활성화 해야한다.', async () => {
    render(
      <ImageUploader
        onPress={jest.fn()}
        description={description}
        uri={uri}
        isLoading
      />,
      wrapper,
    );

    expect(await screen.findByAccessibilityHint('loading')).toBeOnTheScreen();
  });
});
