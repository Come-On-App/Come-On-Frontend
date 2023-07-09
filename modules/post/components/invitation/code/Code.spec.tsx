import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { render } from '@shared/utils/customRender';
import Code from './Code';

describe('Code Compoent', () => {
  test('초기값 코드가 올바르게 렌더링 되어야 한다.', () => {
    render(<Code value="------" />);

    expect(screen.getAllByText('-')).toHaveLength(6);
  });

  test('전달된 코드가 올바르게 렌더링 되어야 한다.', () => {
    const code = '4A4BC4';

    render(<Code value="4A1BC3" />);

    [...code].forEach((eachCode) => {
      expect(screen.getByText(eachCode)).toBeOnTheScreen();
    });
  });
});
