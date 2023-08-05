import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { render } from '@shared/utils/customRender';
import Uploader from './Uploader';

describe('Uploader Compoent', () => {
  test('타이틀과 사진등록 컴포넌트가 올바르게 렌더링 되어야 한다.', () => {
    render(<Uploader />);

    expect(screen.getByText('사진 등록')).toBeOnTheScreen();
    expect(screen.getByText('사진을 등록해 주세요')).toBeOnTheScreen();
  });
});
