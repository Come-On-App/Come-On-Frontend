import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { render } from '@shared/components/ThemeProvider';
import Email from './Email';

describe('Email Compoent', () => {
  test('이메일 정보가 올바르게 렌더링 되어야 한다', () => {
    render(<Email email="abc@kfg.com" />);

    expect(screen.getByText('abc@kfg.com')).toBeOnTheScreen();
  });
});
