import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';

import { render } from '@shared/components/ThemeProvider';
import PolicyInfo from './PolicyInfo';

describe('PolicyInfo Compoent', () => {
  const policyText = '약관 및 정책';

  test('주어진 문자열이 올바르게 렌더링 되어야 한다.', () => {
    render(<PolicyInfo title={policyText} />);

    expect(screen.getByText(policyText)).toBeOnTheScreen();
  });

  test('아이콘은 속성에 따라 렌더링 되어야 한다.', () => {
    render(<PolicyInfo title={policyText} />);

    expect(screen.getByTestId('RNE__ICON')).toBeOnTheScreen();

    render(<PolicyInfo title={policyText} showIcon={false} />);

    expect(screen.queryByTestId('RNE__ICON')).toBeNull();
  });

  test('터치 액션에 따라서 이벤트가 발생해야 한다.', () => {
    const mockFn = jest.fn();

    render(<PolicyInfo title={policyText} onPress={mockFn} />);

    fireEvent.press(screen.getByText(policyText));

    expect(mockFn).toBeCalled();
  });
});
